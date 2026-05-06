/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { MouseEventHandler, useId, useState, useContext } from 'react';
import axios from 'axios';
import styles from './Search.module.scss';
import Icons from '../../foundation/Icons/Icons';
import useComponentVisible from '../../hooks/useComponentVisible';
import SearchProps from './Search.types';
import SearchDdropdownConsultant from './SearchDropwdownConsultant';
let cancelToken: any;
import { ConsultantFinderContext } from '../../context/consultantFinderContext';
import TextLink from '../../core-components/TextLink/TextLink';
import { transformFields } from '../../utility-functions/index';

const SearchConsultant = (props: SearchProps): JSX.Element => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const { keywordId, setConsultantSlug } = useContext(ConsultantFinderContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const searchId = useId();
  const doctifyURL = `${props.doctifySearchBaseURL}?sortType=relevance&keywordId=${keywordId}&distance=0&lat=51.5073509&lon=-0.1277583&limit=5&offset=0`;

  // we are using search specialists api from Doctify when we have id for specialty
  const getDoctifyDataWithId = () => {
    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel('Operation canceled due to new request.');
    }

    // Save the cancel token for the current request
    cancelToken = axios.CancelToken.source();

    axios
      .get(doctifyURL)
      .then((resp) => {
        // console.log('resp', resp.data);

        if (resp.data.rows.length > 0) {
          setData(resp.data.rows);
          setNoResults(false);
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

  // we are using autocomplete api from doctify when we dont have a speciality id
  const getDoctifyDataWithoutId = (URL: string) => {
    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel('Operation canceled due to new request.');
    }

    // Save the cancel token for the current request
    cancelToken = axios.CancelToken.source();

    axios
      .get(URL, { cancelToken: cancelToken.token })
      .then((resp) => {
        // console.log(resp.data);

        if (resp.data.specialists.length > 0) {
          setData(resp.data.specialists);
          setNoResults(false);
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
    const sitecorePopularConsultantList = props.popularConsultantsList;

    const popularDataSitecore = sitecorePopularConsultantList.map(
      (item: any) => ({
        ...transformFields(item.fields),
      })
    );

    setData(popularDataSitecore);

    // console.log('popular data sitecore', popularDataSitecore);
  };

  const handleClose = () => {
    if (props.setSearchStringConsultantName) {
      props.setSearchStringConsultantName('');
    }

    setConsultantSlug('');
    setIsComponentVisible(false);
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

    if (keywordId > 0) {
      // call doctify api
      getDoctifyDataWithId();
    } else {
      // get popular data from sitecore
      getSitecoreData();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setLoading(true);
    setIsComponentVisible(true);
    const userInput = encodeURIComponent(e.target.value);
    const URL = `${props.doctifyBaseURL}=${userInput}&limit=${props.limit}`;

    if (props.setSearchStringConsultantName) {
      props.setSearchStringConsultantName(e.target.value);
    }

    setConsultantSlug('');

    if (e.target.value.trim().length > 0) {
      // // get data depending if there is an keyword id or not
      getDoctifyDataWithoutId(URL);
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
            value={props.searchStringConsultantName}
          />
        </label>
        {isComponentVisible && (
          <SearchDdropdownConsultant
            data={data}
            loading={loading}
            noResults={noResults}
            noResultsMsg={props.noResultsMsg}
            error={error}
            setIsComponentVisible={setIsComponentVisible}
            resultsIcon={props.searchIconResults}
            searchStringConsultantName={props.searchStringConsultantName}
            setSearchStringConsultantName={props.setSearchStringConsultantName}
            searchConsultantsResultsHeaderText={
              props.searchConsultantsResultsHeaderText
            }
            loadingText={props.loadingText}
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
          {props.searchStringConsultantName !== '' && (
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

export default SearchConsultant;
