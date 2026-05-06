import React, { type JSX } from 'react';
import styles from './LoaderCF.module.scss';
import { LoaderCFProps } from './LoaderCF.types';
import Loader from '../../foundation/Loader/Loader';
import Text from '../../foundation/Text/Text';

const LoaderCF = (props: LoaderCFProps): JSX.Element => {
  return (
    <div className={styles.loader}>
      <Loader theme={'dark'} />
      {props.loadingMsg && (
        <div className={styles.text}>
          <Text tag="p" variation="body-medium-medium">
            {props.loadingMsg}
          </Text>
        </div>
      )}
    </div>
  );
};

export default LoaderCF;
