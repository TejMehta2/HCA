import React, { useContext } from 'react';
import { LocationsTopSectionProps } from './LocationsTopSection.types';
import styles from './LocationsTopSection.module.scss';
import Button from '../../core-components/Button/Button';
import Icons from '../../foundation/Icons/Icons';
import { ConsultantFinderContext } from '../../../hcamain/src/context/consultantFinderContext';
import LocationsSearch from '../LocationsSearch/LocationsSearch';
import Text from '../../foundation/Text/Text';

const LocationsTopSection = (props: LocationsTopSectionProps): JSX.Element => {
  const { children } = props;
  const { selectedLocations, setSelectedLocations } = useContext(
    ConsultantFinderContext
  );
  console.log('selectedLocations', selectedLocations);
  console.log('selectedLocations length', selectedLocations.length);

  const selectAllLocations = () => {
    console.log('select all');
    setSelectedLocations(props.slugs);
  };

  const removeAllLocations = () => {
    console.log('remove all');
    setSelectedLocations([]);
    // props.setArray([]);
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
            placeholder={''} 
            doctifyBaseURL={''} 
            limit={0} 
            noResultsMsg={''} 
            searchIcon={undefined} 
            loadingText={'Loading results'} 
            postcodesFacilities={props.postcodesFacilities} 
            hospitals={props.hospitals}
            setHospitals={props.setHospitals}
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
