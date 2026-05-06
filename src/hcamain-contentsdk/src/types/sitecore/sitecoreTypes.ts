export interface SitecoreTemplate {
  id: string;
  name: string;
}

export interface SitecoreItem {
  id: string;
  name: string;
  displayName: string;
  path: string;
  template: SitecoreTemplate;
}
