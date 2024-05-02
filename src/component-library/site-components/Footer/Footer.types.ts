export interface FooterColumn {
  title?: JSX.Element | string;
  links?: JSX.Element[];
  reviews?: JSX.Element[];
  socials?: JSX.Element[];
}

export interface FooterProps {
  buttons: JSX.Element;
  columns: FooterColumn[];
  legals?: JSX.Element[];
  copyright?: JSX.Element;
}
