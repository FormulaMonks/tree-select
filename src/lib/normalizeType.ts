import { PublicItem, Items } from './lib';

export default function normalizeType(data: PublicItem[], prefix: string = ''): Items {
  return data.map(function(item, index) {
    const reactKey = (prefix ? prefix + '/' : '') + (item.reactKey || index);
    return {
      children: normalizeType(item.children || [], reactKey),
      label: item.name,
      original: item,
      reactKey,
      selected: false
    };
  });
};
