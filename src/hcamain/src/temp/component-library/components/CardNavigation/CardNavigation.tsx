import React from 'react';
import { CardNavigationProps } from './CardNavigation.types';
import styles from './CardNavigation.module.scss';
import Tags from '../../core-components/Tags/Tags';

const CardNavigation = (props: CardNavigationProps): JSX.Element => {
  const { title, body, cta, date, tag } = props;
  return (
    <div className={styles.wrapper}>
      <div className={styles['text-content']}>
        {date}
        {title}
        {body}
        {cta}
        {tag && <Tags>{tag}</Tags>}
      </div>
    </div>
  );
};

export default CardNavigation;
