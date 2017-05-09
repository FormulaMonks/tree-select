// Individual items in the tree as provided by the consumer
export interface Item {
  id?: string | number | object;
  name: string;
  children?: Item[];
  reactKey?: string;
};

export interface TreeSelectProps {
  data: Item[];
  labelTop?: (level: number) => number;
  onChange: (value: Item[]) => void;
  styles?: {
    tree?: React.CSSProperties
  }
  value: Item[];
}

export { TreeSelect as default } from '.';
