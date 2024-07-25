import { ReactNode } from 'react';
import { TextVariationUnionTypes } from '../../foundation/Text/Text.types';

export interface TextLinkProps {
  children: ReactNode | JSX.Element;
  variation?: Extract<
    TextVariationUnionTypes,
    | 'body-medium'
    | 'body-medium-large'
    | 'body-large'
    | 'body-extra-large'
    | 'heading-2'
  >;
  full?: boolean;
}
