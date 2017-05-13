import * as React from 'react';

import { Item, Items, PublicItem, TreeSelectProps as Props } from '.';
import { exists, findAll, map, markSelected, normalizeType } from './lib';
import FocusHandler from './FocusHandler';
import Tree from './Tree';
import ValueBox from './ValueBox';

export interface State {
  filter: string | null;
  treeVisible: boolean;
}

const prepareItems = function(data: PublicItem[], value: {}[]) {
  let items: Items;
  items = normalizeType(data);
  items = markSelected(items, value);
  return items;
};


const select = function(items: Items, itemToSelect: Item): Items {
  const clicked = (item: Item) => item.original === itemToSelect.original;
  return map(items, item => ({
    selected: item.selected || clicked(item)
    || (item.children.every(child => child.selected) && exists(item.children, clicked))
  }));
};

const deselect = function(items: Items, itemToDeselect: Item): Items {
  const clicked = (item: Item) => item.original === itemToDeselect.original;
  return map(items, item => ({
    children: clicked(item)
      ? map(item.children, () => ({ selected: false }))
      : item.children,
    selected: item.selected
    && !clicked(item)
    && item.children.every(child => child.selected)
  }));
};

export default class TreeSelect extends React.Component<Props, State> {
  private filterInput: HTMLInputElement | null;

  state = {
    filter: null,
    treeVisible: false,
  };

  public componentDidUpdate(_: Props, prevState: State) {
    if (this.state.treeVisible && !prevState.treeVisible && this.filterInput)
      this.filterInput.focus();
  }

  public render() {
    const styles = this.props.styles || {};
    const items = prepareItems(this.props.data, this.props.value);
    const onRemove = (item: Item) => this.reportChanged(deselect(items, item));
    return <FocusHandler onClick={inside => this.setState({ treeVisible: inside })}>
      <ValueBox
        filter={this.state.filter}
        inputRef={input => this.filterInput = input}
        onFilter={s => this.setState({ filter: s || null })}
        onRemove={onRemove}
        style={styles.valueBox}
        styles={{
          filterInput: styles.filterInput,
          values: styles.values
        }}
        value={findAll(items, i => i.selected, { skipNestedResults: true })}
      />
      {this.state.treeVisible &&
        <Tree data={items}
          filter={this.state.filter}
          labelTop={this.props.labelTop}
          onAdd={item => this.reportChanged(select(items, item))}
          onRemove={onRemove}
          style={styles.tree}
        />
      }
    </FocusHandler>;
  }

  private reportChanged(items: Items) {
    this.props.onChange(findAll(items, i => i.selected).map(i => i.original) as PublicItem[]);
  };
};
