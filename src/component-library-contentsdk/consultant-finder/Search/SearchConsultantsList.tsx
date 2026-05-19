'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  MouseEventHandler,
  useId,
  useState,
  useContext,
  FormEvent,
  type JSX,
} from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import styles from './Search.module.scss';
import Icons from '../../foundation/Icons/Icons';
import useComponentVisible from '../../hooks/useComponentVisible';
import SearchProps from './Search.types';
import SearchDdropdown from './SearchDropwdownConsultantsList';
let cancelToken: any;
import { ConsultantFinderContext } from '../../context/consultantFinderContext';
import TextLink from '../../core-components/TextLink/TextLink';
import { transformFields } from '../../utility-functions/index';

const Search = (props: SearchProps): JSX.Element => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { setSearchStringConsultantName, setConsultantSlug } = useContext(
    ConsultantFinderContext
  );
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const searchId = useId();

  const transformedDataTreatments = props.conditionsTreatmentsList.map(
    (item: any) => ({
      ...transformFields(item.fields),
    })
  );

  const transformedDataSpecialty = props.specialitiesList.map((item: any) => ({
    ...transformFields(item.fields),
  }));

  const newData: any = [
    ...transformedDataTreatments,
    ...transformedDataSpecialty,
  ];

  // remove search and keywordId from URL
  const removeSearchKeywordIdQueries = () => {
    const queryParams = new URLSearchParams(searchParams.toString());
    queryParams.delete('search');
    queryParams.delete('keywordId');
    queryParams.set('offset', '0');

    const queryString = queryParams.toString();
    router.push(`${pathname}${queryString ? `?${queryString}` : ''}`);
  };

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

    setData(newData);
  };

  const handleClose = () => {
    if (props.setSearchString) {
      props.setSearchString('');
    }

    if (props.setKeywordId) {
      props.setKeywordId(0);
    }

    removeSearchKeywordIdQueries();

    setSearchStringConsultantName('');
    setIsComponentVisible(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setLoading(true);
    setIsComponentVisible(true);
    const userInput = encodeURIComponent(e.target.value);
    const URL = `${props.doctifyBaseURL}=${userInput}&limit=${props.limit}`;

    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel('Operation canceled due to new request.');
    }

    // Save the cancel token for the current request
    cancelToken = axios.CancelToken.source();

    setSearchStringConsultantName('');
    setConsultantSlug('');

    if (props.setSearchString) {
      props.setSearchString(e.target.value);
    }

    if (props.setKeywordId) {
      props.setKeywordId(0);
    }

    if (e.target.value.trim().length > 0) {
      axios
        .get(URL, { cancelToken: cancelToken.token })
        .then((resp) => {
          // console.log(resp.data);

          if (resp.data.keywords.length > 0) {
            // console.log(resp.data.keywords);
            setData(resp.data.keywords);
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
    } else if (e.target.value.trim().length === 0) {
      // console.log('popular search');
      handlePopularSearch();
      removeSearchKeywordIdQueries();
    }
  };

  const handleOnClick: MouseEventHandler<HTMLInputElement> = (e) => {
    if ((e.target as HTMLInputElement).value.trim().length === 0) {
      handlePopularSearch();
    }
  };

  return (
    <form
      autoComplete="off"
      onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}
    >
      <div className={styles['consultant-finder-search']}>
        <div ref={ref} className={styles['consultant-finder-search-searchbar']}>
          <label htmlFor={searchId}>
            <input
              id={searchId}
              type="text"
              placeholder={props.placeholder}
              onChange={handleChange}
              onClick={handleOnClick}
              value={props.searchString}
            />
          </label>
          {isComponentVisible && (
            <SearchDdropdown
              data={data}
              loading={loading}
              noResults={noResults}
              noResultsMsg={props.noResultsMsg}
              error={error}
              setKeywordId={props.setKeywordId}
              setSearchString={props.setSearchString}
              setIsComponentVisible={setIsComponentVisible}
              resultsIcon={props.searchIcon}
              specialtyLabel={props.specialtyLabel}
              conditionsProceduresLabel={props.conditionsProceduresLabel}
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
            {props.searchString !== '' && (
              <TextLink>
                <button onClick={handleClose}>
                  <Icons iconName="iconCross" />
                </button>
              </TextLink>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default Search;
