export { PublicItem, Item, Items } from '..';

import { Item, Items } from '..';

export interface FindAllOptions {
  skipNestedResults?: boolean;
}

export function findAll(items: Items, predicate: (item: Item) => boolean, options: FindAllOptions = {}): Items {
  let res = [] as Items;
  items.forEach(function(item) {
    const includeCurrent = predicate(item);
    if (includeCurrent) res.push(item);
    if (!(includeCurrent && options.skipNestedResults))
      res = res.concat(findAll(item.children, predicate, options));
  });
  return res;
};

export function exists(items: Items, predicate: (item: Item) => boolean): boolean {
  return findAll(items, predicate).length > 0;
};

export function map(items: Items, f: (item: Item) => Partial<Item>): Items {
  return items.map(function(item) {
    const itemWithNewChildren = {
      ...item,
      children: map(item.children, f),
    };
    return {
      ...itemWithNewChildren,
      ...f(itemWithNewChildren),
    };
  });
};
