import React from 'react';
import { YextResultCardAskAQuestionProps } from './YextResultCardAskAQuestion.types';
import styles from './YextResultCardAskAQuestion.module.scss';

const YextResultCardAskAQuestion = (props: YextResultCardAskAQuestionProps): JSX.Element => {
  const { children } = props;
  return <div className={styles.bold}>{children}</div>;
};

export default YextResultCardAskAQuestion;
