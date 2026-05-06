import React, { type JSX } from 'react';
import { YextResultCardConsultantsProps } from './YextResultCardConsultants.types';
import styles from './YextResultCardConsultants.module.scss';
import Button from '../../core-components/Button/Button';

const YextResultCardConsultants = (
  props: YextResultCardConsultantsProps
): JSX.Element => {
  const { title, doctify, copy, phone, specialties, cta, image } = props;
  return (
    <div className={styles.wrapper}>
      {<div className={styles.image}>{image}</div>}
      <div className={styles.text}>
        {title && title}
        {doctify && doctify}
        {copy && <div className={styles.copy}>{copy}</div>}
        {phone && <div className={styles.inline}>{phone}</div>}
        {specialties && (
          <div className={styles.inline}>
            <span>{specialties.icon}</span>
            <span>{specialties.text}</span>
          </div>
        )}
      </div>
      {cta && (
        <div className={styles.cta}>
          <Button variation="full" size="large" contentVariation="card">
            {cta}
          </Button>
        </div>
      )}
    </div>
  );
};

export default YextResultCardConsultants;
