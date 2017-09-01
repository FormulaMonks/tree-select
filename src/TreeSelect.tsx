import * as React from 'react';

import { Item, Items, PublicItem, TreeSelectProps as Props } from '.';
import { exists, findAll, map, markSelected, normalizeType } from './lib';
import { addOurStyles } from './styles';
import FocusHandler from './FocusHandler';
import Tree, { matches } from './Tree';
import ValueBox from './ValueBox';

export interface State {
  filter: string | null;
  focused: boolean;
}

const prepareItems = function(data: PublicItem[], value: {}[]) {
  let items: Items;
  items = normalizeType(data);
  items = markSelected(items, value);
  return items;
};


const select = function(items: Items, itemToSelect: Item): Items {
  return selectMultiple(items, [itemToSelect]);
};

const selectMultiple = function(items: Items, itemsToSelect: Items): Items {
  const originals = itemsToSelect.map(item => item.original);
  const clicked = (item: Item) => originals.indexOf(item.original) > -1;
  return map(items, item => ({
    children: clicked(item)
      ? map(item.children, () => ({ selected: true }))
      : item.children,
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
    focused: false,
  };

  public componentDidUpdate(_: Props, prevState: State) {
    const changesTriggeringFocus = [
      this.state.focused && !prevState.focused,
      this.state.filter !== prevState.filter,
    ];
    if (this.filterInput && changesTriggeringFocus.indexOf(true) > -1)
      this.filterInput.focus();
  }

  private attemptToAddFiltered(items: Items) {
    const toAdd = findAll(items,
      item => !item.selected && matches(item, this.state.filter || ''));
    if (toAdd.length < 11) {
      this.reportChanged(selectMultiple(items, toAdd));
    }
  }

  public render() {
    const classes = addOurStyles(this.props.classNames || {});
    const customContent = this.props.customContent || {};
    const items = prepareItems(this.props.data, this.props.value);
    const onRemove = (item: Item) => this.reportChanged(deselect(items, item));
    return <FocusHandler onClick={inside => this.setState({ focused: inside })}>
      {customContent.title ? customContent.title : null}
      <div className={classes.topContainer}>
        <ValueBox
          classNames={{
            filterBox: classes.filterBox,
            filterInput: classes.filterInput,
            valueBox: classes.valueBox +
            (this.state.focused ? ' ' + classes.valueBoxActive : ''),
            valueButton: classes.valueButton,
            valueItem: classes.valueItem,
          }}
          filter={this.state.filter}
          inputRef={input => this.filterInput = input}
          onAttemptToAddFiltered={() => this.attemptToAddFiltered(items)}
          onFilter={s => this.setState({ filter: s || null })}
          onRemove={onRemove}
          value={findAll(items, i => i.selected, { skipNestedResults: true })}
        />
        {this.state.focused &&
          <Tree
            classNames={{
              tree: classes.tree,
              treeBranch: classes.treeBranch,
              treeCheckbox: classes.treeCheckbox,
              treeItem: classes.treeItem,
              treeItemLabel: classes.treeItemLabel,
            }}
            customContent={{
              noResults: customContent.noResults
            }}
            data={items}
            filter={this.state.filter}
            labelTop={this.props.labelTop}
            onAdd={item => this.reportChanged(select(items, item))}
            onRemove={onRemove}
          />
        }
      </div>
    </FocusHandler>;
  }

  private reportChanged(items: Items) {
    this.props.onChange(findAll(items, i => i.selected && i.selectable)
      .map(i => i.original) as PublicItem[]);
    this.setState({ filter: null });
  };
};
