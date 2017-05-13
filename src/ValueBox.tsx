import * as React from 'react';

import { Item, Items } from '.';

export interface Props {
  filter: string | null;
  inputRef?: (input: HTMLInputElement) => void;
  onFilter: (s: string) => void;
  onRemove: (item: Item) => void;
  style?: React.CSSProperties;
  styles?: {
    filterInput?: React.CSSProperties;
    values?: React.CSSProperties;
  }
  value: Items;
};


const removeLast = function(props: Props) {
  return function(e: React.KeyboardEvent<{}>) {
    if (e.key === 'Backspace' && !props.filter)
      props.onRemove(props.value[props.value.length - 1])
  }
}

export default function ValueBox(props: Props) {
  const styles = props.styles || {};
  return <div>
    <ul style={{
      margin: 0,
      padding: 0,
      ...props.style,
    }}>
      {props.value.map(v =>
        <li key={v.reactKey} style={{
          display: 'inline-block'
        }}>
          <button onClick={() => props.onRemove(v)} style={{
            background: 'none',
            border: 0,
            cursor: 'pointer',
            font: 'inherit',
            marginRight: 7,
            ...styles.values
          }}>
            {v.label}
          </button>
        </li>
      )}
      <li style={{
        display: 'inline-block'
      }}>
        <input type="search" value={props.filter || ''}
          onKeyDown={removeLast(props)}
          onChange={e => props.onFilter(e.target.value)}
          ref={props.inputRef}
          style={{
            font: 'inherit',
            ...styles.filterInput
          }} />
      </li>
    </ul>
  </div>
};
