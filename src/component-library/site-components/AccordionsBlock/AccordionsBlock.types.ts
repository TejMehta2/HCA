import { ReactNode } from 'react';
import { IconName } from '../../foundation/Icons/icon-map.generated';
import { Accordions } from '../../components/Accordions/Accordions.types';
import { Theme } from '../../foundation/Themes/Themes.types';

export interface AccordionsBlockProps {
  theme: Theme;
  header?: ReactNode | JSX.Element;
  body?: ReactNode | JSX.Element;
  accordions: Accordions;
  cta?: ReactNode | JSX.Element;
  openIcon?: IconName;
  closeIcon?: IconName;
}
