import { PublicItem, Item, Items } from './lib';

export default function normalizeType(data: PublicItem[], parents: Items = []): Items {
  return data.map(function(item, index) {
    const res = {
      children: [],
      label: item.name,
      level: parents.length,
      original: item,
      reactKey: (parents.length ? parents[parents.length - 1].reactKey + '/' : '')
      + (item.reactKey || index),
      selected: false,
      selectable: "selectable" in item ? item.selectable : true
    } as Item;
    res.children = normalizeType(item.children || [], parents.concat([res]));
    return res;
  });
};
