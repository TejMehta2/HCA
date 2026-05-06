import React, { type JSX } from 'react';
import { PromoPiotrChildProps } from './PromoPiotrChild.types';
import styles from './PromoPiotrChild.module.scss';
import RichTextWrapper from '../RichTextWrapper/RichTextWrapper';

const PromoPiotrChild = (props: PromoPiotrChildProps): JSX.Element => {
  const { icon, text, link, text2 } = props;

  return (
    <div className={styles.wrapper}>
      {icon}
      <RichTextWrapper>{text}</RichTextWrapper>
      {link}
      <RichTextWrapper>{text2}</RichTextWrapper>
    </div>
  );
};

export default PromoPiotrChild;
