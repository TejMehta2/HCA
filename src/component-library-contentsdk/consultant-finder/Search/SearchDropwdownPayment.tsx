'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, type JSX } from 'react';
import { useRouter } from 'next/router';
import Text from '../../foundation/Text/Text';
import SearchDropdownProps from './SearchDropdown.types';
import styles from './SearchDropdown.module.scss';
import Icons from '../../foundation/Icons/Icons';
import Loader from '../../foundation/Loader/Loader';
import { ConsultantFinderContext } from '../../context/consultantFinderContext';
import { capitalizeFirstLetter, isMobile } from '../../utility-functions/index';

const SearchDdropdownPayment = (props: SearchDropdownProps): JSX.Element => {
  const { setIsSelfPayment, setSelectedInsurerPaymentStep, keywordId, searchStringLocations } = useContext(
    ConsultantFinderContext
  );
  const router = useRouter();

  const handleClick = (name: string, id: number) => {
    console.log('isMobile()', isMobile());
    props.setIsComponentVisible(false);
    setSelectedInsurerPaymentStep(id);
    setIsSelfPayment(false);
    if (props.setSearchStringPayment) {
      props.setSearchStringPayment(name);
      if (!isMobile() && props.nextLink) {
        if (searchStringLocations !== 'London' && searchStringLocations !== 'Anywhere') {
          router.push(
            `/finder/step-consultant-cards?search=${props.search}&keywordId=${keywordId}&sortType=relevance&lat=51.507217&lon=-0.1275862&distance=0&limit=12&offset=0&insurer=${id}`)
        } else {
          router.push(
            `${props.nextLink}&insurer=${id}`
          )
        }
      }
      if (!isMobile() && props.setShowContinueBtn) {
        props.setShowContinueBtn(false);
      }
    }
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
                    onClick={() => handleClick(item.name, item.id)}
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
