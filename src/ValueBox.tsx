import * as React from 'react';

import { Item, Items } from '.';

export interface Props {
  classNames?: {
    filterBox?: string;
    filterInput?: string;
    valueBox?: string;
    valueButton?: string;
    valueItem?: string;
  }
  filter: string | null;
  inputRef?: (input: HTMLInputElement) => void;
  onAttemptToAddFiltered: () => void;
  onFilter: (s: string) => void;
  onRemove: (item: Item) => void;
  required?: boolean;
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
    {props.value.map(v =>
      <div key={v.reactKey} className={classes.valueItem} data-level={v.level}>
        <button className={classes.valueButton} onClick={() => props.onRemove(v)}>
          {v.label}
        </button>
      </div>
    )}
    <div className={classes.filterBox}>
      <input
        className={classes.filterInput}
        type="search"
        value={props.filter || ''}
        onKeyDown={handleKey(props)}
        onChange={e => props.onFilter(e.target.value)}
        ref={props.inputRef}
        required={props.required}
      />
    </div>
  </div>
};
