import React, { useContext } from 'react';
import { LocationsTopSectionProps } from './LocationsTopSection.types';
import styles from './LocationsTopSection.module.scss';
import Button from '../../core-components/Button/Button';
import Icons from '../../foundation/Icons/Icons';
import { ConsultantFinderContext } from '../../../hcamain/src/context/consultantFinderContext';
import LocationsSearch from '../LocationsSearch/LocationsSearch';

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
    <div className={styles.bold}>
      <LocationsSearch placeholder={''} doctifyBaseURL={''} limit={0} noResultsMsg={''} searchIcon={undefined} loadingText={''} />
      <Button size={'small'} variation={'outline-dark'}>
        <button
          disabled={selectedLocations.length === props.slugs.length}
          onClick={selectAllLocations}
        >
          <Icons iconName="iconPlus" />
          <span>Select all locations</span>
        </button>
      </Button>
      <Button size={'small'} variation={'outline-dark'}>
        <button
          disabled={selectedLocations.length === 0}
          onClick={removeAllLocations}
        >
          <Icons iconName="iconMinus" />
          <span>Remove all locations</span>
        </button>
      </Button>
    </div>
  );
};

export default LocationsTopSection;
