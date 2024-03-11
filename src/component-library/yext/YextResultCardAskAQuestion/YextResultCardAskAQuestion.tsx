import React, { useState } from 'react';
import { YextResultCardAskAQuestionProps } from './YextResultCardAskAQuestion.types';
import styles from './YextResultCardAskAQuestion.module.scss';
import Accordion from '../../components/Accordion/Accordion';

const YextResultCardAskAQuestion = (
  props: YextResultCardAskAQuestionProps
): JSX.Element => {
  const [active, setActive] = useState<boolean>(false);

  const handleShow = () => {
    setActive(!active);
  };

  const { title, children } = props;
  return (
    <Accordion
      title={<div className={styles.title}>{title}</div>}
      children={children}
      onShow={handleShow}
      isActive={active}
    />
  );
};

export default YextResultCardAskAQuestion;
