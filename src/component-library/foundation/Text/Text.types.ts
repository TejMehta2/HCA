import { ReactNode } from 'react';

export type TextVariationUnionTypes =
  | 'display-1'
  | 'display-2'
  | 'display-3'
  | 'display-4'
  | 'display-5'
  | 'display-6'
  | 'heading-1'
  | 'heading-2'
  | 'subheading-1'
  | 'subheading-2'
  | 'body-extra-large'
  | 'body-medium-extra-large'
  | 'body-bold-extra-large'
  | 'body-large'
  | 'body-medium-large'
  | 'body-bold-large'
  | 'body-medium'
  | 'body-medium-medium'
  | 'body-bold-medium'
  | 'body-small'
  | 'body-medium-small'
  | 'body-bold-small'
  | 'decorative';

export interface TextProps {
  tag?: keyof JSX.IntrinsicElements;
  variation?: TextVariationUnionTypes;
  children: string | JSX.Element | ReactNode;
  isHtml?: boolean; // When children is HTML string
}
