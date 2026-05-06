import React from 'react';
import { TemplateComponentProps } from './TemplateComponent.types';
import styles from './TemplateComponent.module.scss';

const TemplateComponent = (props: TemplateComponentProps): JSX.Element => {
  const { children } = props;
  return <div className={styles.bold}>{children}</div>;
};

export default TemplateComponent;
