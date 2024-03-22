import React, { useContext } from 'react';
import { SelectAppointmentTypeProps } from './SelectAppointmentType.types';
import styles from './SelectAppointmentType.module.scss';
import AppointmentTypeCard from '../AppointmentTypeCard/AppointmentTypeCard';
import { ConsultantFinderContext } from '../../../hcamain/src/context/consultantFinderContext';

const SelectAppointmentType = (
  props: SelectAppointmentTypeProps
): JSX.Element => {
  const { setSelectedTypeOfAppointment } = useContext(ConsultantFinderContext);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLDivElement;
    const targetParent = target.closest(
      '[data-parent="parent"]'
    ) as HTMLDivElement;
    if (targetParent) {
      setSelectedTypeOfAppointment(
        targetParent.dataset.isFollowUpAppointment === 'true'
          ? 'followup'
          : 'initial'
      );
    }
  };

  return (
    <div className={styles['select-appointment']}>
      <AppointmentTypeCard
        icon={props.iconCard1}
        title={props.titleCard1}
        text={props.textCard1}
        handleClick={handleClick}
        isFollowUpAppointment={true}
        id={'followup'}
      />
      <AppointmentTypeCard
        icon={props.iconCard2}
        title={props.titleCard2}
        text={props.textCard2}
        handleClick={handleClick}
        isFollowUpAppointment={false}
        id={'initial'}
      />
    </div>
  );
};

export default SelectAppointmentType;
