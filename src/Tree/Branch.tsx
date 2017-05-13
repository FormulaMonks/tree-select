import * as React from 'react';

import { exists } from '..';
import { Item, Items } from '..';
import { highlightedName, matches } from './i18n';

const ItemName = function(props: { item: Item, filter: string | null }) {
  const { item, filter } = props;
  if (!filter || !matches(item, filter)) {
    return <span>{item.label}</span>;
  }
  return <span>{highlightedName(item, filter)}</span>;
};

export interface Props {
  classNames?: {
    treeBranch?: string;
    treeCheckbox?: string;
    treeItem?: string;
    treeItemLabel?: string;
  }
  data: Items;
  filter: string | null;
  labelTop: (level: number) => number;
  level: number;
  onAdd: (item: Item) => void;
  onRemove: (item: Item) => void;
};

export default function Branch(props: Props): React.ReactElement<Props> {
  const classes = props.classNames || {};
  const { filter, labelTop, level, onAdd, onRemove } = props;

  return <ul className={classes.treeBranch}>
    {props.data.map(function(item) {
      if (filter && !matches(item, filter) && !exists(item.children, i => matches(i, filter)))
        return null;
      return <li
        className={classes.treeItem}
        data-level={level}
        key={item.reactKey}>
        <label className={classes.treeItemLabel} style={{
          top: labelTop(level),
          zIndex: 88 - level,
        }}>
          {!filter || matches(item, filter)
            ? <input
              className={classes.treeCheckbox}
              type="checkbox"
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
