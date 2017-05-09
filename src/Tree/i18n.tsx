import * as React from 'react';

import { Item } from '..';

const stringToParts = function(input: string, query: string) {
  let offset = 0;
  const parts = [] as { highlighted: boolean, text: string }[];
  input.toLowerCase().split(query.toLowerCase()).forEach(function(part) {
    parts.push({
      highlighted: false,
      text: input.substr(offset, part.length),
    });
    offset += part.length;
    parts.push({
      highlighted: true,
      text: input.substr(offset, query.length),
    });
    offset += query.length
  });
  return parts.filter(part => part.text);
}

export function highlightedName(item: Item, filter: string): React.ReactElement<{}> {
  const parts = stringToParts(item.label, filter);
  return <span>
    {parts.map((part, i) => part.highlighted
      ? <strong key={i}>{part.text}</strong>
      : <span key={i}>{part.text}</span>
    )}
  </span>;
};

export function matches(item: Item, filter: string): boolean {
  return item.label.toLowerCase().indexOf(filter.toLowerCase()) > -1;
};
