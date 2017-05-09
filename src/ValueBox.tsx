import * as React from 'react';

import { Item, Items } from '.';

export interface Props {
  filter: string | null;
  onFilter: (s: string) => void;
  onRemove: (item: Item) => void;
  value: Items;
};


const removeLast = function(props: Props) {
  return function(e: React.KeyboardEvent<{}>) {
    if (e.key === 'Backspace' && !props.filter)
      props.onRemove(props.value[props.value.length - 1])
  }
}

export default function ValueBox(props: Props) {
  const liStyle = {
    display: 'inline-block',
    marginRight: 10,
  };
  return <div>
    <ul style={{
      margin: 0,
      padding: 0,
    }}>
      {props.value.map(v =>
        <li key={v.reactKey} style={liStyle}>
          <button onClick={() => props.onRemove(v)} style={{
            background: 'none',
            border: 0,
            cursor: 'pointer',
            font: 'inherit'
          }}>
            {v.label}
          </button>
        </li>
      )}
      <li style={liStyle}>
        <input type="search" value={props.filter || ''}
          onKeyDown={removeLast(props)}
          onChange={e => props.onFilter(e.target.value)} />
      </li>
    </ul>
  </div>
};
