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
  theme: Extract<
    Theme,
    | 'G-HCA-Green-40'
    | 'H-HCA-Green-20'
    | 'I-HCA-Turquoise-20'
    | 'J-HCA-Turquoise-10'
    | 'K-HCA-Turquoise-5'
  >;
  cqc?: JSX.Element;
  doctify?: JSX.Element;
}
