import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as Perf from 'react-addons-perf';
(window as any).Perf = Perf;

import TreeSelect from '../src/public';

interface Item { name: string, children?: Item[] };

const i = function(name: string, children?: Item[]): Item {
  return {
    name,
    children
  };
};

const data = [
  i('Kitchen', [i('Dishwashing machine'), i('Teapot')]),
  i('Living room', [
    i('Furniture', [
      i('Chairs', [i('Blue chair'), i('Red chair')]),
      i('Sofas')
    ]),
    i('Electronics', [i('TV'), i('Radio')])
  ]),
  i('Other stuff',
    '.'.repeat(30).split('.').map((_, n) =>
      i('Item ' + n))
  ),
];

const render = function(value: Item[]) {
  ReactDOM.render(<TreeSelect
    data={data}
    onChange={v => render(v)}
    styles={{
      filterInput: {
        border: 0,
      },
      tree: {
        border: '1px solid black',
        width: 400
      },
      valueBox: {
        border: '1px solid black',
        width: 400
      },
      values: {
        border: '1px solid gray',
        borderRadius: 3,
        backgroundColor: 'hsl(0, 0%, 95%)',
        marginRight: 3,
      },
    }}
    value={value}
  />, document.getElementById('demo'));
};

render([data[0], data[1].children![1]]);
