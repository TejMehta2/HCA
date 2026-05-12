'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, type JSX } from 'react';
import Text from '../../foundation/Text/Text';
import SearchDropdownProps from './SearchDropdown.types';
import styles from './SearchDropdown.module.scss';
import Icons from '../../foundation/Icons/Icons';
import Loader from '../../foundation/Loader/Loader';
import { ConsultantFinderContext } from '../../context/consultantFinderContext';

const SearchDdropdown = (props: SearchDropdownProps): JSX.Element => {
  const { setSearchStringConsultantName } = useContext(ConsultantFinderContext);
  const specialties =
    props?.data?.filter((item: any) => item.type === 'specialty') || [];
  // console.log('specialties', specialties);
  const conditionsProcedures =
    props?.data?.filter((item: any) => item.type !== 'specialty') || [];
  // console.log('conditionsProcedures', conditionsProcedures);

  const handleClick = (name: string, id: number) => {
    if (props.setSearchString) {
      props.setSearchString(name);
    }
    if (props.setKeywordId) {
      props.setKeywordId(id);
    }

    setSearchStringConsultantName('');
    props.setIsComponentVisible(false);
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
          <div className={styles['consultant-finder-search-dropdown-col']}>
            <div className={styles['consultant-finder-search-dropdown-header']}>
              <Text tag="h2" variation="subheading-2">
                {props.specialtyLabel || 'SPECIALITIES'}
              </Text>
            </div>
            <ul>
              {specialties.length > 0 &&
                specialties.map((item: any) => (
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
                      {item.name}
                    </Text>
                  </li>
                ))}
            </ul>
          </div>
          <div className={styles['consultant-finder-search-dropdown-col']}>
            <div className={styles['consultant-finder-search-dropdown-header']}>
              <Text tag="p" variation="subheading-2">
                {props.conditionsProceduresLabel || 'CONDITIONS/ TREATMENTS'}
              </Text>
            </div>
            <ul>
              {conditionsProcedures.length > 0 &&
                conditionsProcedures.map((item: any) => (
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
                      <Icons iconName="iconSearch" />
                    </span>
                    <Text tag="p" variation="body-medium">
                      {item.name}
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

export default SearchDdropdown;
