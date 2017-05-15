import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as Perf from 'react-addons-perf';
(window as any).Perf = Perf;

import { TreeSelect } from '../src/public';

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
    new Array(30).join('.').split('.').map((_, n) =>
      i('Item ' + n))
  ),
];

const render = function(value: Item[]) {
  ReactDOM.render(<TreeSelect
    data={data}
    labelTop={n => n * 19}
    onChange={v => render(v)}
    value={value}
  />, document.getElementById('demo'));
};

render([data[0], data[1].children![1]]);
