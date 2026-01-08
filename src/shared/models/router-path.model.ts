export interface RouterPath {
  path: string;
  loadComponent: () => Promise<any>;
}