/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react';
import Text from '../../foundation/Text/Text';
import SearchDropdownProps from './SearchDropdown.types';
import styles from './SearchDropdown.module.scss';
import Icons from '../../foundation/Icons/Icons';
import Loader from '../../foundation/Loader/Loader';
import { ConsultantFinderContext } from '../../context/consultantFinderContext';

const SearchDdropdownConsultant = (props: SearchDropdownProps): JSX.Element => {
  const { setConsultantSlug } = useContext(ConsultantFinderContext);

  const handleClick = (name: string, lastName: string, slug: string) => {
    props.setIsComponentVisible(false);
    setConsultantSlug(slug);

    if (props.setSearchStringConsultantName) {
      props.setSearchStringConsultantName(`${name} ${lastName}`);
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
                {props.searchConsultantsResultsHeaderText}
              </Text>
            </div>

            <ul>
              {props.data.length > 0 &&
                props.data.map((item: any) => (
                  <li
                    key={item.id || item.doctifyId}
                    aria-label="option"
                    onClick={() =>
                      handleClick(item.firstName, item.lastName, item.slug)
                    }
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
                      {!props.resultsIcon && (
                        <Icons iconName="iconStethoscope" />
                      )}
                    </span>
                    <div>
                      <Text tag="p" variation="body-medium">
                        {`${item.firstName} ${item.lastName}`}
                      </Text>
                      <div className={styles.specialty}>
                        <Text tag="h4" variation="body-small">
                          {item?.specialty ||
                            item?.keywords?.[0]?.name ||
                            'Specialty'}
                        </Text>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchDdropdownConsultant;
