import { type JSX } from 'react';
export interface CardContentProps {
  image?: JSX.Element;
  title: JSX.Element;
  bodyCopy?: JSX.Element;
  link?: JSX.Element;
  imageKeepAspectRatio?: boolean;
}
