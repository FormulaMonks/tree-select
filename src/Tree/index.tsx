import * as React from 'react';

import { exists, Item, Items } from '..';
import { matches } from './i18n'
import Branch from './Branch';

export { matches } from './i18n';

export interface Props {
  classNames?: {
    tree?: string;
    treeBranch?: string;
    treeCheckbox?: string;
    treeItem?: string;
    treeItemLabel?: string;
  }
  customContent?: {
    noResults?: React.ReactChild;
  }
  data: Items;
  filter: string | null;
  labelTop?: (level: number) => number;
  onAdd: (item: Item) => void;
  onRemove: (item: Item) => void;
}

export default function Tree(props: Props) {
  const customContent = props.customContent || {};
  const classes = props.classNames || {};
  const labelTop = props.labelTop || (() => 0);

  const filter = props.filter;
  if (filter && !exists(props.data, item => matches(item, filter))) {
    return <div className={classes.tree}>
      {customContent.noResults || <div>No results</div>}
    </div>;
  }

  return <div className={classes.tree}>
    <Branch
      classNames={{
        treeBranch: classes.treeBranch,
        treeCheckbox: classes.treeCheckbox,
        treeItem: classes.treeItem,
        treeItemLabel: classes.treeItemLabel
      }}
      data={props.data}
      filter={props.filter}
      labelTop={labelTop}
      level={0}
      onAdd={props.onAdd}
      onRemove={props.onRemove}
    />
  </div>
}
