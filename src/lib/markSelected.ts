import { Items } from './lib';

export default function markSelected(data: Items, value: {}[] | true): Items {
  return data.map(function(item) {
    const selected = value === true || value.indexOf(item.original) > -1;
    return { ...item, children: markSelected(item.children, selected || value), selected };
  });
};
