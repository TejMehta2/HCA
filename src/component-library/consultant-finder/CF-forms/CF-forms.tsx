import React from 'react';
import { CF-formsProps } from './CF-forms.types';
import styles from './CF-forms.module.scss';

const CF-forms = (props: CF-formsProps): JSX.Element => {
  const { children } = props;
  return <div className={styles.bold}>{children}</div>;
};

export default CF-forms;
