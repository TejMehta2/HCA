/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { MouseEventHandler, useId, useState, useContext } from 'react';
import axios from 'axios';
import styles from './SearchLocation.module.scss';
import Icons from '../../foundation/Icons/Icons';
import useComponentVisible from '../../hooks/useComponentVisible';
import SearchProps from './Search.types';
let cancelToken: any;
import { ConsultantFinderContext } from '../../context/consultantFinderContext';
import TextLink from '../../core-components/TextLink/TextLink';
import { transformFields } from '../../utility-functions/index';
import SearchLocationDdropdown from './SearchLocationDropwdown';

const SearchLocation = (props: SearchProps): JSX.Element => {
  const { setSearchStringConsultantName, setConsultantSlug, searchStringLocations, setSearchStringLocations, selectedLocationConsultants, setSelectedLocationConsultants } = useContext(
    ConsultantFinderContext
  );
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const [data, setData] = useState([]);
  const [dataSpecialists, setDataSpecialists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const searchId = useId();

  console.log(props.locationList);

  const matchLocations = (userValue: string, locations: any[]) => {
    const query = userValue.toLowerCase().trim();


    // empty => show all
    if (!query) return locations;

    // prefix match ONLY (prevents "contains letter" matching)
    return locations.filter((item) =>
      (item.name ?? '').toLowerCase().startsWith(query)
    );
  };


  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setData(props.locationList);
    setIsComponentVisible((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedLocationConsultants('Anywhere');

    console.log('click');
    const value = e.target.value;

    const matches: any = matchLocations(value, props.locationList);
    console.log('location list', props.locationList);
    console.log('matches', matches);
    setData(matches);
    setIsComponentVisible(true);

    if (props.setSearchString) {
      props.setSearchString(e.target.value);
    }
  };

  const handleOnClick: MouseEventHandler<HTMLInputElement> = (e) => {
    console.log('click');
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      className={`${styles['consultant-finder-search']} ${!props.isStepIntro ? styles.secondary : ''
        }`}
    >

      <div ref={ref} className={styles['consultant-finder-search-searchbar']}>
        <label htmlFor={searchId}>
          <input
            id={searchId}
            type="text"
            placeholder={'Location'}
            onChange={handleChange}
            onClick={handleOnClick}
            value={props.searchString}
          />
        </label>
        {isComponentVisible && (
          <SearchLocationDdropdown
            isStepIntro={props?.isStepIntro}
            isStepCards={props?.isStepCards}
            applyLocationToSearch={props?.applyLocationToSearch}
            dataSpecialists={dataSpecialists}
            data={data}
            loading={loading}
            noResults={noResults}
            noResultsMsg={props.noResultsMsg}
            error={error}
            setKeywordId={props.setKeywordId}
            setSearchString={setSearchStringLocations}
            setIsComponentVisible={setIsComponentVisible}
            resultsIcon={props.searchIcon}
            specialtyLabel={props.specialtyLabel}
            conditionsProceduresLabel={props.conditionsProceduresLabel}
            loadingText={props.loadingText}
          />
        )}
        <span className={styles['consultant-finder-search-icon']}>
          {/* {props.searchIcon && (
            <span
              dangerouslySetInnerHTML={{
                __html: props.searchIcon,
              }}
            ></span>
          )} */}
          {/* {!props.searchIcon && <Icons iconName="iconPin" />} */}
          <Icons iconName="iconPin" />
        </span>
        <div
          className={`${styles['consultant-finder-search-close-btn']} ${isComponentVisible ? styles['is-open'] : ''
            }`}
        >
          {/* {props.searchString !== '' && ( */}
          <TextLink>
            <button onClick={handleClose}>
              {/* <Icons iconName="iconArrowDropdown" /> */}
              <Icons iconName="iconChevronDown" />
            </button>
          </TextLink>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default SearchLocation;
