import React from 'react';
import { CardRoleProps } from './CardRole.types';
import styles from './CardRole.module.scss';

const CardRole = (props: CardRoleProps): JSX.Element => {
  const { image, icon, title, cta } = props;
  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>{image}</div>
      <div className={styles.icon}>{icon}</div>
      {title}
      <div className={styles.cta}>{cta}</div>
    </div>
  );
};

export default CardRole;
