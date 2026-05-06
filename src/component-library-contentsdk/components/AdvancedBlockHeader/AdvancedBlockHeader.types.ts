import { ReactNode, type JSX } from 'react';

export interface AdvancedBlockHeaderProps {
  subtitle?: ReactNode | JSX.Element;
  title?: ReactNode | JSX.Element;
  body?: ReactNode | JSX.Element;
  ctas?: ReactNode | JSX.Element;
  children?: ReactNode | JSX.Element;
  paddingSize?: 'small' | 'medium' | 'large' | 'none' | 'small-mobile';
  contentVariation?: 'half-width' | 'centered';
}
