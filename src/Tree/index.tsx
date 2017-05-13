import * as React from 'react';

import { Item, Items } from '..';
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
  data: Items;
  filter: string | null;
  labelTop?: (level: number) => number;
  onAdd: (item: Item) => void;
  onRemove: (item: Item) => void;
}

export default function Tree(props: Props) {
  const classes = props.classNames || {};
  const labelTop = props.labelTop || (() => 0);
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
