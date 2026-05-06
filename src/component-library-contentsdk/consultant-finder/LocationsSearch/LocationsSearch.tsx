/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useId, useState, type JSX } from 'react';
import axios from 'axios';
import styles from './Search.module.scss';
import Icons from '../../foundation/Icons/Icons';
import useComponentVisible from '../../hooks/useComponentVisible';
import SearchProps from './Search.types';
let cancelToken: any;
import SearchDdropdown from './SearchDropwdown';
import TextLink from '../../core-components/TextLink/TextLink';
import { ConsultantFinderContext } from '../../context/consultantFinderContext';

const LocationsSearch = (props: SearchProps): JSX.Element => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const [resultsAddress, setResultsAddress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const searchId = useId();
  const { setSelectedLocations } = useContext(ConsultantFinderContext);

  const getAddress = (userInput: string) => {
    setLoading(true);
    const URL = `${props.locationsAPI}/SuggestLocation?provider=Default&searchTerm=${userInput}&searchType=Default`;

    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel('Operation canceled due to new request.');
    }

    // Save the cancel token for the current request
    cancelToken = axios.CancelToken.source();

    axios
      .get(URL, { cancelToken: cancelToken.token })
      .then((resp) => {
        // console.log('results address', resp);

        if (resp.data.length > 0) {
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
          setLoading(true);
        } else {
          console.log(error.message);
          setLoading(false);
          // Show error for other types of errors
          setError(true);
        }
      });
  };

  const success = (position: any) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLoading(true);
    setIsComponentVisible(true);
    // update lat and lon for URL
    // setLat(latitude);
    // setLon(longitude);
    // console.log('geolocation lat', latitude, 'geolocation lon', longitude);
    const URL = `${
      props.locationsAPI
    }/SuggestLocation?provider=Default&searchTerm=${`${latitude},${longitude}`}&searchType=geoResolve`;
    axios
      .get(URL)
      .then((resp) => {
        // console.log(resp);
        setResultsAddress(resp.data);
        setIsComponentVisible(true);
        setLoading(false);
        // setNoResults(false);
        // setError(false);
      })
      .catch((error) => {
        console.log(error);
        // setLoading(false);
      });
  };

  const errorGeolocation = () => {
    console.log('Unable to retrieve your location');
    setLoading(false);
    setIsComponentVisible(true);
    // setIsGeolocation(false);
  };

  const getGeolocation = () => {
    setLoading(true);
    setInputValue('');
    setIsComponentVisible(true);

    if (!navigator.geolocation) {
      // no browser support
      console.log('no browser support for geolocation');
      setLoading(false);
      setIsComponentVisible(true);
      // setIsGeolocation(false);
    } else {
      // setIsGeolocation(true);
      navigator.geolocation.getCurrentPosition(success, errorGeolocation);
    }
  };

  const clearLocationSearch = () => {
    setInputValue(''); // clear out search term
    // reset hospitals to default sort order
    props.hospitals.sort((h1: any, h2: any) => {
      if (h1?.fields?.Order?.value > h2?.fields?.Order?.value) return 1;
      if (h1?.fields?.Order?.value < h2?.fields?.Order?.value) return -1;
      return 0;
    });
    props.setHospitals(props.hospitals);
    setSelectedLocations([]);
    setIsComponentVisible(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log('value input', e.target.value);
    setLoading(true);
    setInputValue(e.target.value);
    setIsComponentVisible(true);
    const userInput = encodeURIComponent(e.target.value);

    if (e.target.value.trim().length > 0) {
      getAddress(userInput);
    } else {
      setIsComponentVisible(false);
      setResultsAddress([]);
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
            value={inputValue}
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
            hospitals={props.hospitals}
            setHospitals={props.setHospitals}
            locationsAPI={props.locationsAPI}
            setInputValue={setInputValue}
            setCalculate={props.setCalculate}
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
              {inputValue.length == 0 && (
                <button title="my location" onClick={getGeolocation}>
                  <Icons iconName="iconLocation" />
                </button>
              )}
              {inputValue.length > 0 && (
                <button title="reset" onClick={clearLocationSearch}>
                  <Icons iconName="iconCross" />
                </button>
              )}
            </TextLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationsSearch;
