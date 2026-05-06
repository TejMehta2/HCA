import { ReactNode, type JSX } from 'react';
import styles from './PlaceholderWrapper.module.scss';

interface PlaceHolderWrapperProps {
  children: ReactNode | JSX.Element;
}

const PlaceHolderWrapper = (props: PlaceHolderWrapperProps): JSX.Element => {
  const { children } = props;

  return <div className={styles.placeholder}>{children}</div>;
};

export default PlaceHolderWrapper;
