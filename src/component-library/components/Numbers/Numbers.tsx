import React from 'react';
import { NumbersProps } from './Numbers.types';
import styles from './Numbers.module.scss';
import Text from '../../foundation/Text/Text';

const Numbers = (props: NumbersProps): JSX.Element => {
  const { number, size = 'large' } = props;
  return (
    <span className={`${styles.wrapper} ${styles[size]}`}>
      {
        <Text tag="span" variation="body-medium-large">
          {number}
        </Text>
      }
    </span>
  );
};

export default Numbers;
