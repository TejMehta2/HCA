import { type JSX } from 'react';

const getSubheadingTag = (
  parentTag: keyof JSX.IntrinsicElements = 'p',
  fallback: keyof JSX.IntrinsicElements
) => {
  switch (parentTag) {
    case 'h1':
      return 'h2';
    case 'h2':
      return 'h3';
    case 'h3':
      return 'h4';
    case 'h4':
      return 'h5';
    case 'h5':
      return 'h6';
    default:
      return fallback;
  }
};

export default getSubheadingTag;
