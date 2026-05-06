import { ReactNode, type JSX } from 'react';
import styles from './FormContainer.module.scss';

interface FormContainerProps {
  children: ReactNode | JSX.Element;
  heading: JSX.Element;
  copy: JSX.Element;
  aside?: JSX.Element;
}

const FormContainer = (props: FormContainerProps): JSX.Element => {
  const { children, heading, copy, aside } = props;

  return (
    <div
      className={[styles.background, aside && styles['has-aside']].join(' ')}
    >
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            {heading}
            {copy}
          </div>
          {children}
        </div>
        {aside && <div className={styles.aside}>{aside}</div>}
      </div>
    </div>
  );
};

export default FormContainer;
