import * as React from 'react';

import { Item, Items } from '..';
import Branch from './Branch';

export { matches } from './i18n';

export interface Props {
  data: Items;
  filter: string | null;
  labelTop?: (level: number) => number;
  onAdd: (item: Item) => void;
  onRemove: (item: Item) => void;
  style?: React.CSSProperties;
}

export default function Tree(props: Props) {
  const labelTop = props.labelTop || (() => 0);
  return <div style={{
    maxHeight: 500,
    overflow: 'auto',
    position: 'absolute',
    ...props.style
  }}>
    <Branch
      data={props.data}
      filter={props.filter}
      labelTop={labelTop}
      level={0}
      onAdd={props.onAdd}
      onRemove={props.onRemove}
    />
  </div>
}
