import React, { useContext } from 'react';
import Text from '../../foundation/Text/Text';
import SearchDropdownProps from './SearchDropdown.types';
import styles from './SearchDropdown.module.scss';
import Icons from '../../foundation/Icons/Icons';
import Loader from '../../foundation/Loader/Loader';
import { ConsultantFinderContext } from '../../../hcamain/src/context/consultantFinderContext';
import { capitalizeFirstLetter } from '../../utility-functions/index';

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
    props.setIsComponentVisible(false);
    setIsSelfPayment(false);

    if (props.setSearchStringPayment) {
      props.setSearchStringPayment(name);
    }
  };

  return (
    <div className={styles['consultant-finder-search-dropdown']}>
      {props.loading && (
        <div className={styles['consultant-finder-search-dropdown-loader']}>
          <Loader theme="light" />
        </div>
      )}
      {props.noResults && (
        <Text tag="p" variation="body-small">
          {props.noResultsMsg ||
            'No matches found, please try typing something else.'}
        </Text>
      )}
      {/* results */}
      {!props.noResults && (
        <div className={styles['consultant-finder-search-dropdown-results']}>
          <div
            className={
              styles['consultant-finder-search-dropdown-col--full-width']
            }
          >
            <div className={styles['consultant-finder-search-dropdown-header']}>
              <Text tag="h2" variation="subheading-2">
                {props.insuranceProvidersFilterHeaderText || 'INSURERS'}
              </Text>
            </div>
            <ul>
              {props.data.length > 0 &&
                props.data.map((item: any) => (
                  <li
                    key={item.id}
                    aria-label="option"
                    onClick={() => handleClick(item.name)}
                  >
                    <span
                      className={
                        styles['consultant-finder-search-dropdown-icon']
                      }
                    >
                      {props.resultsIcon && (
                        <span
                          dangerouslySetInnerHTML={{
                            __html: props.resultsIcon,
                          }}
                        ></span>
                      )}
                      {!props.resultsIcon && <Icons iconName="iconSearch" />}
                    </span>
                    <Text tag="p" variation="body-medium">
                      {capitalizeFirstLetter(item.name)}
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
