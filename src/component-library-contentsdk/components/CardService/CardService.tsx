import React, { type JSX } from 'react';
import { CardServiceProps } from './CardService.types';
import TextButton from '../../core-components/TextButton/TextButton';
import styles from './CardService.module.scss';

const CardService = (props: CardServiceProps): JSX.Element => {
  const { children, link } = props;
  return (
    <div className={styles.container}>
      <div className={styles.link}>{link}</div>
      {children}
      <div className={styles['text-button-link']}>
        <TextButton theme="light">{link}</TextButton>
      </div>
    </div>
  );
};

export default CardService;
