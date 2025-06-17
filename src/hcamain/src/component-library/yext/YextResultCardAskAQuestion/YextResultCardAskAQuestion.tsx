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

  const { title, titleDescription, children } = props;
  return (
    <Accordion
      title={
        <div className={styles['title-wrapper']}>
          <div className={styles.title}>{title}</div>
          {titleDescription && (
            <div className={styles['title-description']}>
              {titleDescription}
            </div>
          )}
        </div>
      }
      onShow={handleShow}
      isActive={active}
    >
      <div className={styles.children}>{children}</div>
    </Accordion>
  );
};

export default YextResultCardAskAQuestion;
