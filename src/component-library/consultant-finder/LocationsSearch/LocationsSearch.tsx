/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { MouseEventHandler, useId, useState } from 'react';
import axios from 'axios';
import styles from './Search.module.scss';
import Icons from '../../foundation/Icons/Icons';
import useComponentVisible from '../../hooks/useComponentVisible';
import SearchProps from './Search.types';
let cancelToken: any;
import SearchDdropdown from './SearchDropwdown';
import TextLink from '../../core-components/TextLink/TextLink';

const LocationsSearch = (props: SearchProps): JSX.Element => {
  
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const [resultsAddress, setResultsAddress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const searchId = useId();

  // we are using search specialists api from Doctify when we have id for specialty
  const getAddress = (userInput: string) => {
    const URL = `${props.locationsAPI}/SuggestLocation?provider=Default&searchTerm=${encodeURIComponent(userInput)}&searchType=Default`
    
    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel('Operation canceled due to new request.');
    }

    // Save the cancel token for the current request
    cancelToken = axios.CancelToken.source();

    axios
      .get(URL, { cancelToken: cancelToken.token })
      .then((resp) => {
        

        console.log('results address', resp);

        if(resp.data.length > 0) {
          setResultsAddress(resp.data);
          setNoResults(false);
        } else {
          setResultsAddress([]);
          setNoResults(true);
        }

        setLoading(false);
        setError(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);

        if (axios.isCancel(error)) {
          console.log(error.message);
          // Don't show error message for canceled requests
          setError(false);
        } else {
          console.log(error.message);
          // Show error for other types of errors
          setError(true);
        }
      });
  };

  const handleClose = () => {
    if (props.setSearchStringPayment) {
      props.setSearchStringPayment('');
      setIsComponentVisible(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('value input', e.target.value);
    setLoading(true);
    setIsComponentVisible(true);
    const userInput = encodeURIComponent(e.target.value);

    if (e.target.value.trim().length > 0) {
      getAddress(userInput);
    }
  };

  return (
    <div className={styles['consultant-finder-search']}>
      <div ref={ref} className={styles['consultant-finder-search-searchbar']}>
        <label htmlFor={searchId}>
          <input
            id={searchId}
            type="text"
            placeholder={props.placeholder}
            onChange={handleChange}
            value={props.searchStringPayment}
          />
        </label>
        {isComponentVisible && (
          <SearchDdropdown
            data={resultsAddress}
            loading={loading}
            noResults={noResults}
            noResultsMsg={props.noResultsMsg}
            error={error}
            setIsComponentVisible={setIsComponentVisible}
            resultsIcon={props.searchIcon}
            searchStringPayment={props.searchStringPayment}
            setSearchStringPayment={props.setSearchStringPayment}
            insuranceProvidersFilterHeaderText={
              props.insuranceProvidersFilterHeaderText
            }
            loadingText={props.loadingText}
            postcodesFacilities={props.postcodesFacilities}
          />
        )}
        <span className={styles['consultant-finder-search-icon']}>
          {props.searchIcon && (
            <span
              dangerouslySetInnerHTML={{
                __html: props.searchIcon,
              }}
            ></span>
          )}
          {!props.searchIcon && <Icons iconName="iconSearch" />}
        </span>
        <div className={styles['consultant-finder-search-close-btn']}>
          {props.searchStringPayment !== '' && (
            <TextLink>
              <button onClick={handleClose}>
                <Icons iconName="iconCross" />
              </button>
            </TextLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationsSearch;
