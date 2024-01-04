import { Theme } from '../../foundation/Themes/Themes.types';

interface open {
  text: JSX.Element;
  icon: JSX.Element;
}

interface address {
  text: JSX.Element;
  icon: JSX.Element;
  link: JSX.Element;
}

export interface HeaderLocationProps {
  title: JSX.Element;
  open?: open;
  address: address;
  ctas: JSX.Element;
  image: JSX.Element;
  theme: Extract<Theme, 'g' | 'h' | 'i' | 'j' | 'k'>;
  cqc?: JSX.Element;
  doctify?: JSX.Element;
}
