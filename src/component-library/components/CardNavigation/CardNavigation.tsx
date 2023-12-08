import React from 'react';
import { CardNavigationProps } from './CardNavigation.types';
import styles from './CardNavigation.module.scss';
import Button from '../../core-components/Button/Button';
import Tags from '../../core-components/Tags/Tags';

const CardNavigation = (props: CardNavigationProps): JSX.Element => {
  const { category = 'service', title, body, cta, date, tag } = props;
  return (
    <div className={styles.wrapper}>
      <div className={styles['text-content']}>
        {category === 'blog' && date && date}
        {title}
        {body}
      </div>
      <div>
        {category === 'service' && cta && (
          <Button size="small" theme="full">
            {cta}
          </Button>
        )}
        {category === 'blog' && tag && <Tags>{tag}</Tags>}
      </div>
    </div>
  );
};

export default CardNavigation;
