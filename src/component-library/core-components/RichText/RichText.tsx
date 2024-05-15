import React from 'react';
import { RichTextProps } from './RichText.types';
import styles from './RichText.module.scss';

// The applyCssModules can be abstracted to a utility folder if the need appears in other components
// Here it is essentially a way to allow us to parse a list of CMSable class strings based on bootstrap grids and use them as CSS grids via our CSS module instead
type ClassName = string | undefined;
interface CssModule {
  [key: string]: string;
}
const applyCssModules = (
  classList: ClassName | ClassName[] | undefined,
  styles: CssModule
) => {
  const parseClassName = (className?: ClassName) =>
    className
      ?.split(' ')
      ?.map((style) => styles[style])
      ?.join(' ') || '';

  if (typeof classList === 'string') {
    return parseClassName(classList);
  }
  return (
    // join before split to accommodate a mix of individual and multi-class strings in array
    parseClassName(classList?.join(' '))
  );
};

export const RichTextElement = (props: RichTextProps) => {
  const { additionalStyles = '', children, id } = props;
  return (
    <div
      id={id}
      className={[applyCssModules(additionalStyles, styles)].join(' ')}
    >
      {children}
    </div>
  );
};

const RichText = (props: RichTextProps): JSX.Element => {
  const {
    additionalStyles = '',
    imageKeepAspectRatio = false,
    children,
  } = props;
  return (
    <div
      className={[
        styles['rich-text'],
        imageKeepAspectRatio ? styles['keep-aspect-ratio'] : '',
        applyCssModules(additionalStyles, styles),
      ].join(' ')}
    >
      {children}
    </div>
  );
};

export default RichText;
