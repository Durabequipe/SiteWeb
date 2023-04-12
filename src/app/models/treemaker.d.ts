export type Tree = {
  [key: string]: Tree;
};

type Style = {
  [key: string]: string;
};

export type TreeParams = {
  [key: string]: {
    trad: string;
    styles?: Style;
  };
};

export type TreeMakerOptions = {
  id: string;
  card_click?: (element: HTMLElement) => void;
  treeParams: TreeParams;
  link_width: string;
  link_color: string;
};
