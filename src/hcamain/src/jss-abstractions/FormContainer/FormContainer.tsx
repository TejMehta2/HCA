import { ReactNode } from 'react';
import styles from './FormContainer.module.scss';

interface FormContainerProps {
  children: ReactNode | JSX.Element;
  heading: JSX.Element;
  copy: JSX.Element;
}

const FormContainer = (props: FormContainerProps): JSX.Element => {
  const { children, heading, copy } = props;

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            {heading}
            {copy}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
