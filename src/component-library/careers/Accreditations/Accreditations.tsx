import React from 'react';
import { AccreditationsProps } from './Accreditations.types';
import styles from './Accreditations.module.scss';
import Text from '../../foundation/Text/Text';

const Accreditations = (props: AccreditationsProps): JSX.Element => {
  const { items } = props;
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {items?.map(({ text, logo }, index) => (
            <div className={styles.item} key={index}>
              <div className={styles.logo}>{logo}</div>
              <Text variation="body-small">{text}</Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accreditations;
