export interface CardNavigationProps {
  category: 'service' | 'blog';
  title: JSX.Element;
  body: JSX.Element;
  cta?: JSX.Element;
  tag?: JSX.Element;
  date?: JSX.Element;
}
