/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { type JSX } from 'react';
import { TreatmentsConditionsProps } from './TreatmentsConditions.types';
import styles from './TreatmentsConditions.module.scss';
import Text from '../../foundation/Text/Text';

const TreatmentsConditions = (
  props: TreatmentsConditionsProps
): JSX.Element => {
  return (
    <div className={styles['treatments-contidions']}>
      <div className={styles.item}>
        <Text tag="h3" variation="subheading-1">
          {props.treatmentsLabel}
        </Text>
        {props.treatmentsList.length > 0 && (
          <ul>
            {props.treatmentsList.map((item: any) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        )}
        {props.treatmentsList.length === 0 && (
          <Text tag="p" variation="body-large">
            {props.noTreatmentsMsg}
          </Text>
        )}
      </div>
      <div className={styles.item}>
        <Text tag="h3" variation="subheading-1">
          {props.conditionsLabel}
        </Text>
        {props.conditionsList.length > 0 && (
          <ul>
            {props.conditionsList.map((item: any) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        )}
        {props.conditionsList.length === 0 && (
          <Text tag="p" variation="body-large">
            {props.noConditionsMsg}
          </Text>
        )}
      </div>
    </div>
  );
};

export default TreatmentsConditions;
