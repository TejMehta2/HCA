/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { SelectLocationProps } from './SelectLocation.types';
import LocationCard from '../LocationCardSlots/LocationCard';
import { ConsultantFinderContext } from '../../context/consultantFinderContext';
import styles from './SelectLocation.module.scss';

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
              router.push(
                props.nextLink
              )
              setSelectedLocation(item?.facilityCRMID || '');
              setSelectedLocationName(item?.facilityFullName || '');
              setLocationGUID(item?.facilityCRMID || '');
              setFirstAppointmentDate(item?.firstAppointmentSlotDateTime || '');
              setLat(item?.latitude || '');
              setLon(item?.longitude || '');
              setLocationID(item?.facilityLocation || '');
            }}
          />
        ))}
      {!props.locations.length && props.locations.length === 0 && (
        <div>No results</div>
      )}
    </div>
  );
};

export default SelectLocation;
