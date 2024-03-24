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
    | 'A-HCA-White'
    | 'B-HCA-Navy-Blue'
    | 'C-HCA-Denim'
    | 'D-HCA-Teal'
    | 'E-HCA-Cerulean'
    | 'F-HCA-Fern'
    | 'G-HCA-Orange'
    | 'H-HCA-Tangerine'
    | 'I-HCA-Goldenrod'
  >;
  cqc?: JSX.Element;
  doctify?: JSX.Element;
}
