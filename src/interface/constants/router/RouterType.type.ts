export type RouterType = {
  path: string;
  name: string;
  type: string;
  title: string;
  breakcrumb: BreakcrumbType[];
  component: any; 
};

export type BreakcrumbType = {
  orderBy: Number;
  name: string;
  path: string;
}