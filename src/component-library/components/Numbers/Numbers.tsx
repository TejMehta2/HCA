import React from 'react';
import { NumbersProps } from './Numbers.types';
import styles from './Numbers.module.scss';
import Text from '../../foundation/Text/Text';

const Numbers = (props: NumbersProps): JSX.Element => {
  const { number, size = 'large' } = props;
  return (
    <div className={`${styles.wrapper} ${styles[size]}`}>
      {
        <Text tag="p" variation="body-medium-large">
          {number}
        </Text>
      }
    </div>
  );
};

export default Numbers;
