import React from 'react';
import { ConsultantFeesProps } from './ConsultantFees.types';
import styles from './ConsultantFees.module.scss';
import Text from '../../foundation/Text/Text';

const ConsultantFees = (props: ConsultantFeesProps): JSX.Element => {
  return (
    <div className={styles.fees}>
      <Text tag="h2" variation="heading-1">
        {props.title}
      </Text>
      <div className={styles.info}>
        {props.newAppointmentFees && props.newAppointmentFees !== '' && (
          <Text tag="p" variation="body-extra-large">
            {props.newAppointmentFeesLabel} £{props.newAppointmentFees}
          </Text>
        )}
        {props.followUpAppointmentFees &&
          props.followUpAppointmentFees !== '' && (
            <Text tag="p" variation="body-extra-large">
              {props.followUpAppointmentFeesLabel} £
              {props.followUpAppointmentFees}
            </Text>
          )}
        {!props.followUpAppointmentFees && !props.newAppointmentFees && (
          <Text tag="p" variation="body-extra-large">
            {props.noFeesInfo}
          </Text>
        )}
      </div>
    </div>
  );
};

export default ConsultantFees;
