import React, { type JSX } from 'react';
import { PromoPiotrProps } from './PromoPiotr.types';
import styles from './PromoPiotr.module.scss';
import RichTextWrapper from '../RichTextWrapper/RichTextWrapper';
import Icons from '../../foundation/Icons/Icons';

const PromoPiotr = (props: PromoPiotrProps): JSX.Element => {
  const { children, id, image, richText, link } = props;
  return (
    <div id={id ? id : undefined} className={styles.wrapper}>
      <Icons iconName={'icon3Lines'} />
      <Icons iconName={'iconSearch'} />
      <div className={styles.image}>{image}</div>
      <RichTextWrapper>{richText}</RichTextWrapper>
      {link}
      <div className={styles.children}>{children}</div>
    </div>
  );
};

export default PromoPiotr;
