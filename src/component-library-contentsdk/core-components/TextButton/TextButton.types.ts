import { ReactNode, type JSX } from 'react';

type TextButtonVariationUnionTypes = 'dark' | 'light';
export interface TextButtonProps {
  theme?: TextButtonVariationUnionTypes;
  children?: ReactNode | JSX.Element;
}
