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

  const onChange = function(item: Item, selected: boolean) {
    if (item.selectable) {
      return selected ? onAdd(item) : onRemove(item);
    }
    return item.children.every(child => child.selected) ? onRemove(item) : onAdd(item);
  };

  return <ul className={classes.treeBranch}>
    {props.data.map(function(item) {
      if (filter && !matches(item, filter) && !exists(item.children, i => matches(i, filter)))
        return null;
      const selectable = item.selectable && (!filter || matches(item, filter));
      return <li
        className={classes.treeItem}
        data-level={level}
        key={item.reactKey}>
        <label className={classes.treeItemLabel} style={{
          top: labelTop(level),
          zIndex: 88 - level,
        }}>
          <input
            className={classes.treeCheckbox}
            type="checkbox"
            checked={item.selected}
            onChange={e => onChange(item, e.target.checked)}
            style={{ visibility: selectable ? 'visible' : 'hidden' }}
          />
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
