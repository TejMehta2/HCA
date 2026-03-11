import { ReactNode } from 'react';
import styles from './ContainerWrapper.module.scss';

interface ContainerWrapper {
  children: ReactNode | JSX.Element;
}

const ContainerWrapper = (props: ContainerWrapper): JSX.Element => {
  const { children } = props;

  return <div className={styles.container}>{children}</div>;
};

export default ContainerWrapper;
