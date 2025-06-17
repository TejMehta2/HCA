import React, { useContext } from 'react';
import { AppointmentTypeCardProps } from './AppointmentTypeCard.types';
import Text from '../../foundation/Text/Text';
import styles from './AppointmentTypeCard.module.scss';
import { ConsultantFinderContext } from '../../context/consultantFinderContext';

const AppointmentTypeCard = (props: AppointmentTypeCardProps): JSX.Element => {
  const { selectedTypeOfAppointment } = useContext(ConsultantFinderContext);

  return (
    <div
      className={`${styles['appointment-type-card']} ${
        selectedTypeOfAppointment === props.isFollowUpAppointment
          ? styles['selected']
          : ''
      }`}
      onClick={(e) => props.handleClick(e)}
      data-is-follow-up-appointment={props.isFollowUpAppointment}
      data-parent="parent"
    >
      <div className={styles.icon}>{props.icon}</div>
      <div className={styles.title}>
        <Text tag="h3" variation="body-medium-large">
          {props.title}
        </Text>
      </div>
      <div className={styles.description}>
        <Text tag="div" variation="body-medium-small">
          {props.text}
        </Text>
      </div>
    </div>
  );
};

export default AppointmentTypeCard;
