import React, { useState } from 'react';
import styles from './YextResultCardFAQs.module.scss';
import Accordion from '../../components/Accordion/Accordion';
import { YextResultCardFAQsProps } from './YextResultCardFAQs.types';

const YextResultCardFAQs = (props: YextResultCardFAQsProps): JSX.Element => {
  const [active, setActive] = useState<boolean>(false);

  const handleShow = () => {
    setActive(!active);
  };

  const { title, children } = props;
  return (
    <div className={styles.wrapper}>
      <Accordion
        title={title}
        children={children}
        onShow={handleShow}
        isActive={active}
      />
    </div>
  );
};

export default YextResultCardFAQs;
