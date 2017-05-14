# Tree select

A select that allows the user to choose multiple options from a tree of options.

## Usage

Install with `npm` and import as a named import using the syntax of your choice:

```js
import { TreeSelect } from 'tree-select';
var TreeSelect = require('tree-select').TreeSelect;
```

There are three required props on the component: `data`, the actual contents of the tree; and `onChange` and `value` to control the contents. This is the simplest usage of the component:

```jsx
<TreeSelect
  data={data}
  onChange={value => this.setState({ value: value })}
  value={this.state.value}
 />
```

### `data`

The shape of `data` is a list of items with fields `name` and `children`:

```js
[
  { name: "Kitchen", children: [
    { name: "Dishwashing machine" },
    { name: "Teapot" }
  ] },
  { name: "Living room", children: [
    { name: "Sofa" },
    { name: "Chairs", children: [ { name: "Green chair" }, { name: "Blue char" } ] }
  ] }
]
```

Optional fields on data objects:

- `id`. A freeform field for your own tracking purposes.
- `reactKey`. A string to uniquely identify the object amongst its siblings in case you modify `data` on the fly. Without it, the performance of modifying `data` will suffer. More in [React docs](https://facebook.github.io/react/docs/lists-and-keys.html).
- `selectable`. A corner-case feature where you can select some items as non-selectable. A scenario where a selectable parent contains non-selectable children is at the moment not supported.

### `onChange` and `value`

The component is only available as a [controlled component](https://facebook.github.io/react/docs/forms.html). This means you need to store the current value and update the component in response to a change event.

The value you provide in `value` and receive in `onChange` is a flat array of objects from `data`.

## Styling

Default looks on the dropdown are purposefully spartan. You should customize that using CSS and content replacements. There is also some work to improve sticky sections.

### CSS

Style using CSS in accordance to your application using the ability to set custom class names on components:

```jsx
<TreeSelect classNames={{
  filterBox: '',
  filterInput: '',
  topContainer: '',
  tree: '',
  treeBranch: '',
  treeCheckbox: '',
  treeItem: '',
  treeItemLabel: '',
  valueBox: '',
  valueBoxActive: '',
  valueButton: '',
  valueItem: '',
}} />
```

In addition, there are some data attributes that can narrow the styles down:

* `data-level` on a `valueItem` allows to style value items depending on how deep they were in the tree.

It is recommended to load the styles using `css-loader` with [modules enabled](https://github.com/webpack-contrib/css-loader/blob/fe4cf7aba6bf67d2403a8d44d0ea010e4c36ba90/README.md#modules).

The default styles will not be changed without bumping a major version number.

### Content style

You can modify the content the component shows. In the simplest case, you can provide a string, but any React element will do.

```jsx
<TreeSelect customContent={{
  noResults: <div>No results found! :-(</div>,
  title: <h1>Choose your poison</h1>,
}} />
```

### Sticky sections

By default, the top level of the tree items will be sticky: they will stay on the screen if the user is scrolling through a long list.

To make all levels sticky, you need to provide a function that knows the heights of all individual items to correctly calculate the placement. For instance, if every label in your tree is 18 pixels high, use the following function:

```jsx
<TreeSelect labelTop={n => n * 18} />
```

# About Citrusbyte

![Citrusbyte](http://i.imgur.com/W6eISI3.png)

This software is lovingly maintained and funded by Citrusbyte.
At Citrusbyte, we specialize in solving difficult computer science problems for startups and the enterprise.

At Citrusbyte we believe in and support open source software.
* Check out more of our open source software at Citrusbyte Labs.
* Learn more about [our work](https://citrusbyte.com/portfolio).
* [Hire us](https://citrusbyte.com/contact) to work on your project.
* [Want to join the team?](http://careers.citrusbyte.com)

*Citrusbyte and the Citrusbyte logo are trademarks or registered trademarks of Citrusbyte, LLC.*
