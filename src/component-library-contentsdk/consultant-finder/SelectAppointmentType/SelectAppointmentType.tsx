'use client';

import React, { useContext, type JSX } from 'react';
import { useRouter } from 'next/navigation';
import { SelectAppointmentTypeProps } from './SelectAppointmentType.types';
import styles from './SelectAppointmentType.module.scss';
import AppointmentTypeCard from '../AppointmentTypeCard/AppointmentTypeCard';
import { ConsultantFinderContext } from '../../context/consultantFinderContext';
import { isMobile } from '../../utility-functions';

const SelectAppointmentType = (
  props: SelectAppointmentTypeProps
): JSX.Element => {
  const { setSelectedTypeOfAppointment } = useContext(ConsultantFinderContext);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLDivElement;
    const targetParent = target.closest(
      '[data-parent="parent"]'
    ) as HTMLDivElement;
    if (targetParent) {
      const value = targetParent?.dataset?.isFollowUpAppointment;
      console.log('value', value);
      if (value) {
        setSelectedTypeOfAppointment(value);
        props.setIsSelected(value);
        if (!isMobile()) {
          router.push(`${props.nextLink}&isFollowOnAppointment=${value}`);
        }
      }
    }
  };

  return (
    <div className={styles['select-appointment']}>
      <AppointmentTypeCard
        icon={props.iconCard1}
        title={props.titleCard1}
        text={props.textCard1}
        handleClick={handleClick}
        isFollowUpAppointment={'false'}
        isSelected={props.isSelected}
      />
      <AppointmentTypeCard
        icon={props.iconCard2}
        title={props.titleCard2}
        text={props.textCard2}
        handleClick={handleClick}
        isFollowUpAppointment={'true'}
        isSelected={props.isSelected}
      />
    </div>
  );
};

export default SelectAppointmentType;
