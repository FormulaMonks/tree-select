# Tree select

A select that allows the user to choose multiple options from a tree of options.

## Usage

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

### `onChange` and `value`

The component is only available as a [controlled component](https://facebook.github.io/react/docs/forms.html). This means you need to store the current value and update the component in response to a change event.

The value you provide in `value` and receive in `onChange` is a flat array of objects from `data`.

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
