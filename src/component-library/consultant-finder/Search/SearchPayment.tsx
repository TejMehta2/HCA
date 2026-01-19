/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { MouseEventHandler, useId, useState } from 'react';
import axios from 'axios';
import styles from './Search.module.scss';
import Icons from '../../foundation/Icons/Icons';
import useComponentVisible from '../../hooks/useComponentVisible';
import SearchProps from './Search.types';
let cancelToken: any;
import SearchDdropdownPayment from './SearchDropwdownPayment';
import TextLink from '../../core-components/TextLink/TextLink';
import { transformFields } from '../../utility-functions/index';

const SearchPayment = (props: SearchProps): JSX.Element => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const searchId = useId();

  // we are using search specialists api from Doctify when we have id for specialty
  const getDoctifyData = (userInput: string) => {
    const URL = props.doctifyBaseURL;
    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel('Operation canceled due to new request.');
    }

    // Save the cancel token for the current request
    cancelToken = axios.CancelToken.source();

    axios
      .get(URL, { cancelToken: cancelToken.token })
      .then((resp) => {
        const docitfyInsurersFiltered = resp.data.filter((item: any) =>
          item.name.toUpperCase().startsWith(userInput.toUpperCase())
        );

        // console.log('filtered results', docitfyInsurersFiltered);

        if (docitfyInsurersFiltered.length > 0) {
          setNoResults(false);
          setData(docitfyInsurersFiltered);
        } else {
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

  // when we dont have an id for speciality we will use sitecore data for 0 value
  const getSitecoreData = () => {
    const sitecorePopularConsultantList = props.insurersList;

    const popularDataSitecore = sitecorePopularConsultantList.map(
      (item: any) => ({
        ...transformFields(item.fields),
      })
    );

    setData(popularDataSitecore);

    // console.log('data sitecore insurers', popularDataSitecore);
  };

  const handleClose = () => {
    if (props.setSearchStringPayment) {
      props.setSearchStringPayment('');
      setIsComponentVisible(false);
    }
  };

  // if user selcted a condition/treatment/speciality we call doctify using the id otherwise we use our data
  const handlePopularSearch = () => {
    setIsComponentVisible(true);
    setLoading(false);
    setError(false);
    setNoResults(false);
    setData([]);

    // Cancel any ongoing API request
    if (typeof cancelToken !== 'undefined') {
      cancelToken.cancel('Operation canceled due to new request.');
    }

    // Reset cancelToken
    cancelToken = axios.CancelToken.source();

    // Call sitecore data
    getSitecoreData();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('value input', e.target.value);
    setLoading(true);
    setIsComponentVisible(true);
    const userInput = encodeURIComponent(e.target.value);

    if (props.setSearchStringPayment) {
      props.setSearchStringPayment(e.target.value);
    }

    if (e.target.value.trim().length > 0) {
      getDoctifyData(userInput);
    } else if (e.target.value.trim().length === 0) {
      handlePopularSearch();
    }
  };

  const handleOnClick: MouseEventHandler<HTMLInputElement> = (e) => {
    if ((e.target as HTMLInputElement).value.trim().length === 0) {
      handlePopularSearch();
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
            onClick={handleOnClick}
            value={props.searchStringPayment}
          />
        </label>
        {isComponentVisible && (
          <SearchDdropdownPayment
            data={data}
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
            nextLink={props.nextLink}
            setShowContinueBtn={props.setShowContinueBtn}
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

export default SearchPayment;
