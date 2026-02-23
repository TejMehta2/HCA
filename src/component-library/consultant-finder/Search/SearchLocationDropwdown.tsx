/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react';
import Text from '../../foundation/Text/Text';
import SearchDropdownProps from './SearchDropdown.types';
import styles from './SearchLocationsDropdown.module.scss';
import Icons from '../../foundation/Icons/Icons';
import Loader from '../../foundation/Loader/Loader';
import { ConsultantFinderContext } from '../../context/consultantFinderContext';

const SearchLocationDdropdown = (props: SearchDropdownProps): JSX.Element => {
  const { setSearchStringConsultantName, setSearchStringLocations, searchStringLocations, setSelectedLocationConsultants } = useContext(ConsultantFinderContext);
  console.log(props.data);

  const locationConfig = [
    {
      location: 'Anywhere',
      lat: 51.507217,
      lon: -0.1275862,
      distance: 0
    },
    {
      location: 'London',
      lat: 51.507217,
      lon: -0.1275862,
      distance: 0
    },
    {
      location: 'Manchester',
      lat: 53.480759,
      lon: -2.242631,
      distance: 30
    },
    {
      location: 'Birmingham',
      lat: 52.486244,
      lon: -1.890401,
      distance: 30
    },
  ];

  const handleClick = (location: string) => {
    console.log('location', searchStringLocations);
    // console.log(setSearchStringLocations);
    // console.log(props.setSearchString);
    if (props.setSearchString) {
      props.setSearchString(location);
    }
    setSelectedLocationConsultants(location);

    // setSearchStringConsultantName('');
    props.setIsComponentVisible(false);

    if (props.isStepCards) {
      props.applyLocationToSearch(location);
    }
  };

  return (
    <div
      className={`${styles['consultant-finder-search-dropdown']} ${!props.isStepIntro ? styles.secondary : ''
        }`}
    >
      <div className={styles['consultant-finder-search-dropdown-results']}>
        <div className={styles['consultant-finder-search-dropdown-col']}>
          <div className={styles['consultant-finder-search-dropdown-header']}>
            <Text tag="h2" variation="subheading-2">
              {'LOCATIONS'}
            </Text>
          </div>
          <ul>
            {props.data.length > 0 &&
              props.data.map((item: any, index: any) => (
                <li
                  key={index}
                  aria-label="option"
                  onClick={() => {
                    handleClick(item.name);
                  }}
                >
                  <span
                    className={
                      styles['consultant-finder-search-dropdown-icon']
                    }
                  >
                    <Icons iconName="iconPin" />
                  </span>
                  <Text tag="p" variation="body-medium">
                    {item.name}
                  </Text>
                </li>
              ))}
            {
              props.data.length === 0 &&
              <li
                aria-label="option"
              >
                <span
                  className={
                    styles['consultant-finder-search-dropdown-icon']
                  }
                >
                  <Icons iconName="iconPin" />
                </span>
                <Text tag="p" variation="body-medium">
                  {props.noResultsMsg}
                </Text>
              </li>
            }
          </ul>
        </div>
      </div>

    </div>
  );
};

export default SearchLocationDdropdown;
