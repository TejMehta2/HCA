'use client';

import React, { useContext, type JSX } from 'react';
import { LocationsTopSectionProps } from './LocationsTopSection.types';
import styles from './LocationsTopSection.module.scss';
import Button from '../../core-components/Button/Button';
import Icons from '../../foundation/Icons/Icons';
import { ConsultantFinderContext } from '../../context/consultantFinderContext';
import LocationsSearch from '../LocationsSearch/LocationsSearch';
import Text from '../../foundation/Text/Text';

const LocationsTopSection = (props: LocationsTopSectionProps): JSX.Element => {
  const { selectedLocations, setSelectedLocations } = useContext(
    ConsultantFinderContext
  );
  // console.log('props LocationsTopSection', props);
  // console.log('selectedLocations', selectedLocations);
  // console.log('selectedLocations length', selectedLocations.length);

  const selectAllLocations = () => {
    setSelectedLocations(props.slugs);
  };

  const removeAllLocations = () => {
    setSelectedLocations([]);
  };

  return (
    <div className={styles['locations-top']}>
      <div className={styles.header}>
        <Text tag="h2" variation="subheading-2">
          {props.subheadline}
        </Text>
        <Text tag="h1" variation="display-5">
          {props.title}
        </Text>
        <Text tag="p" variation="body-large">
          {props.text}
        </Text>
      </div>
      <div className={styles.controls}>
        <div className={styles['locations-search']}>
          <LocationsSearch
            locationsAPI={props.locationAPI}
            placeholder={props.searchPlaceholderText}
            doctifyBaseURL={''}
            limit={0}
            noResultsMsg={''}
            searchIcon={undefined}
            loadingText={'Loading results'}
            postcodesFacilities={props.postcodesFacilities}
            hospitals={props.hospitals}
            setHospitals={props.setHospitals}
            setCalculate={props.setCalculate}
          />
        </div>
        <div className={styles.buttons}>
          <Button size={'small'} variation={'outline-dark'}>
            <button
              disabled={selectedLocations.length === props.slugs.length}
              onClick={selectAllLocations}
            >
              <Icons iconName="iconPlus" />
              <span>{props.selectAllLocationsButtonText}</span>
            </button>
          </Button>
          <Button size={'small'} variation={'outline-dark'}>
            <button
              disabled={selectedLocations.length === 0}
              onClick={removeAllLocations}
            >
              <Icons iconName="iconCross" />
              <span>{props.removeAllLocationsButtonText}</span>
            </button>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LocationsTopSection;
