import * as React from 'react';

import { exists } from '../lib';
import { Item, Items } from '..';
import { highlightedName, matches } from './i18n';

const sticky = navigator.userAgent.indexOf('Chrome') > -1
  ? 'sticky' : '-webkit-sticky' as 'sticky';

const ItemName = function(props: { item: Item, filter: string | null }) {
  const { item, filter } = props;
  if (!filter || !matches(item, filter)) {
    return <span>{item.label}</span>;
  }
  return <span>{highlightedName(item, filter)}</span>;
};

export interface Props {
  data: Items;
  filter: string | null;
  labelTop: (level: number) => number;
  level: number;
  onAdd: (item: Item) => void;
  onRemove: (item: Item) => void;
};

export default function Branch(props: Props): React.ReactElement<Props> {
  const { filter, labelTop, level, onAdd, onRemove } = props;

  return <ul style={{
    listStyleType: 'none',
    margin: 0,
    padding: 0
  }}>
    {props.data.map(function(item) {
      if (filter && !matches(item, filter) && !exists(item.children, i => matches(i, filter)))
        return null;
      return <li key={item.reactKey} style={{
        marginLeft: level === 0 ? 0 : 25
      }}>
        <label style={{
          backgroundColor: 'white',
          cursor: 'pointer',
          display: 'block',
          position: sticky,
          top: labelTop(level),
          zIndex: 88 - level,
        }}>
          {!filter || matches(item, filter)
            ? <input type="checkbox"
              checked={item.selected}
              onChange={e => e.target.checked ? onAdd(item) : onRemove(item)} />
            : null}
          <ItemName item={item} filter={filter} />
        </label>
        {item.children.length ?
          <Branch {...props}
            data={item.children}
            level={level + 1}
          />
          : null}
      </li>;
    })}
  </ul>;
};
