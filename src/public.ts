// Individual items in the tree as provided by the consumer
export interface Item {
  id?: string | number | object;
  name: string;
  children?: Item[];
  reactKey?: string;
  selectable?: string;
};

export interface TreeSelectProps {
  classNames?: {
    filterBox?: string;
    filterInput?: string;
    topContainer?: string;
    tree?: string;
    treeBranch?: string;
    treeCheckbox?: string;
    treeItem?: string;
    treeItemLabel?: string;
    valueBox?: string;
    valueBoxActive?: string;
    valueButton?: string;
    valueItem?: string;
  }
  customContent?: {
    noResults?: React.ReactChild;
    title?: React.ReactChild;
  }
  data: Item[];
  labelTop?: (level: number) => number;
  onChange: (value: Item[]) => void;
  required?: boolean;
  styles?: {
    filterInput?: React.CSSProperties;
    valueBox?: React.CSSProperties;
    values?: React.CSSProperties;
  }
  value: Item[];
}

export { TreeSelect } from '.';
