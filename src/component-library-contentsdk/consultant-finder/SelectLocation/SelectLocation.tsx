'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, type JSX } from 'react';
import { useRouter } from 'next/navigation';
import { SelectLocationProps } from './SelectLocation.types';
import LocationCard from '../LocationCardSlots/LocationCard';
import { ConsultantFinderContext } from '../../context/consultantFinderContext';
import styles from './SelectLocation.module.scss';
import TextButton from '../../core-components/TextButton/TextButton';
import Container from '../../foundation/Containers/Container';
import { isMobile } from '../../utility-functions';

const SelectLocation = (props: SelectLocationProps): JSX.Element => {
  const {
    setSelectedLocation,
    setSelectedLocationName,
    setLocationGUID,
    setFirstAppointmentDate,
    setLat,
    setLon,
    setLocationID,
  } = useContext(ConsultantFinderContext);

  const router = useRouter();

  return (
    <div className={styles['select-location']}>
      {props.locations.length &&
        props.locations.length > 0 &&
        props.locations.map((item: any, index: any) => (
          <LocationCard
            key={index}
            facilityCRMID={item?.facilityCRMID}
            viewOnMapText={props.viewOnMapText}
            lat={item?.latitude || ''}
            lon={item?.longitude || ''}
            icon={props.icon}
            iconPhone={props.iconPhone}
            title={item?.facilityFullName}
            text={item?.facilityAddress}
            time={item?.firstAppointmentSlotDateTime}
            filteredTime={item?.firstAppointmentSlotDateTimeFiltered}
            handleClick={() => {
              if (!isMobile()) {
                router.push(
                  props.nextLink
                )
              }
              setSelectedLocation(item?.facilityCRMID || '');
              props.setIsSelected(item?.facilityCRMID || '');
              setSelectedLocationName(item?.facilityFullName || '');
              setLocationGUID(item?.facilityCRMID || '');
              setFirstAppointmentDate(item?.firstAppointmentSlotDateTime || '');
              setLat(item?.latitude || '');
              setLon(item?.longitude || '');
              setLocationID(item?.facilityLocation || '');
            }}
            isSelected={props.isSelected}
          />
        ))}
      {!props.locations.length && props.locations.length === 0 && (
        <div>No results</div>
      )}
      {props.cantFindNumber &&
        <Container marginTop='spacing-5' marginLeft='spacing-5' marginRight='spacing-5'>
          {props.cantFindTitle}
          <Container marginTop='spacing-4'>
            <TextButton>
              <a
                href={`tel:${props.cantFindNumber.replace(
                  /\s/g,
                  ''
                )}`}
              >
                {props.cantFindIcon}
                <span>{props.cantFindNumber}</span>
              </a>
            </TextButton>
          </Container>
        </Container>
      }

    </div>
  );
};

export default SelectLocation;
