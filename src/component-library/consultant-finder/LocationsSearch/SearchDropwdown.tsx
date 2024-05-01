/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react';
import Text from '../../foundation/Text/Text';
import SearchDropdownProps from './SearchDropdown.types';
import styles from './SearchDropdown.module.scss';
import Icons from '../../foundation/Icons/Icons';
import Loader from '../../foundation/Loader/Loader';
import { ConsultantFinderContext } from '../../../hcamain/src/context/consultantFinderContext';
import { capitalizeFirstLetter } from '../../utility-functions/index';
import axios from 'axios';

const SearchDdropdownPayment = (props: SearchDropdownProps): JSX.Element => {
  const { setIsSelfPayment } = useContext(ConsultantFinderContext);

  // const capitalizeFirstLetter = (string: string) => {
  //   if (!string) {
  //     return '';
  //   } else {
  //     return string.charAt(0).toUpperCase() + string.slice(1);
  //   }
  // };

  const handleClick = (name: string) => {
    const URL = `http://localhost:3000/api/locationAPI/GetDistances?provider=Default&method=Default&units=Kilometers&order=Default&origin=${name}&originType=Postcode&destinations=${props.postcodesFacilities}&destinationType=Postcode`;

    axios
      .get(URL)
      .then((resp) => {
        console.log('results', resp);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles['consultant-finder-search-dropdown']}>
      {props.loading && (
        <div className={styles['consultant-finder-search-dropdown-loader']}>
          <Loader theme="light" />
          <Text tag="p" variation="body-small">
            {props.loadingText}
          </Text>
        </div>
      )}
      {props.noResults && !props.loading && (
        <Text tag="p" variation="body-small">
          {props.noResultsMsg ||
            'No matches found, please try typing something else.'}
        </Text>
      )}
      {/* results */}
      {!props.noResults && !props.loading && (
        <div className={styles['consultant-finder-search-dropdown-results']}>
          <div
            className={
              styles['consultant-finder-search-dropdown-col--full-width']
            }
          >
            <ul>
              {props.data.length > 0 &&
                props.data.map((item: any) => (
                  <li
                    key={item.LocationKey}
                    aria-label="option"
                    onClick={() => handleClick(item.LocationName)}
                  >
                    <span
                      className={
                        styles['consultant-finder-search-dropdown-icon']
                      }
                    >
                      {/* {props.resultsIcon && (
                        <span
                          dangerouslySetInnerHTML={{
                            __html: props.resultsIcon,
                          }}
                        ></span>
                      )} */}
                      {/* {!props.resultsIcon && <Icons iconName="iconPin" />} */}
                      <Icons iconName="iconPin" />
                    </span>
                    <Text tag="p" variation="body-medium">
                      {capitalizeFirstLetter(item.LocationName)}
                    </Text>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchDdropdownPayment;
