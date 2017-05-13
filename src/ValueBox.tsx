import * as React from 'react';

import { Item, Items } from '.';

export interface Props {
  classNames?: {
    filterInput?: string;
    valueBox?: string;
    values?: string;
  }
  filter: string | null;
  inputRef?: (input: HTMLInputElement) => void;
  onAttemptToAddFiltered: () => void;
  onFilter: (s: string) => void;
  onRemove: (item: Item) => void;
  value: Items;
};


const handleKey = function(props: Props) {
  return function(e: React.KeyboardEvent<{}>) {
    if (e.key === 'Backspace' && !props.filter)
      props.onRemove(props.value[props.value.length - 1])
    if (e.key === 'Enter')
      props.onAttemptToAddFiltered();
  }
}

export default function ValueBox(props: Props) {
  const classes = props.classNames || {};
  return <div className={classes.valueBox}>
    <ul style={{ margin: 0, padding: 0 }}>
      {props.value.map(v =>
        <li key={v.reactKey} style={{ display: 'inline-block' }}>
          <button className={classes.values} onClick={() => props.onRemove(v)}>
            {v.label}
          </button>
        </li>
      )}
      <li style={{ display: 'inline-block' }}>
        <input
          className={classes.filterInput}
          type="search"
          value={props.filter || ''}
          onKeyDown={handleKey(props)}
          onChange={e => props.onFilter(e.target.value)}
          ref={props.inputRef}
          />
      </li>
    </ul>
  </div>
};
