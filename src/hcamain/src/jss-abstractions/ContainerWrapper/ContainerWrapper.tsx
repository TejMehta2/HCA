import { ReactNode } from 'react';
import styles from './ContainerWrapper.module.scss';

interface ContainerWrapper {
  children: ReactNode | JSX.Element;
  [key: string]: unknown;
}

const ContainerWrapper = (props: ContainerWrapper): JSX.Element => {
  const { children, ...restProps } = props;

  return (
    <div className={styles.container} {...restProps}>
      {children}
    </div>
  );
};

export default ContainerWrapper;
