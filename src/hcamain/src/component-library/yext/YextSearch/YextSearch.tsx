import React, { useRef, useEffect, useState } from 'react';
import { UniversalResults } from '@yext/search-ui-react';
import styles from './YextSearch.module.scss';
import YextTabs from '../YextTabs/YextTabs';
import StyledYextSearchBar from '../StyledYextSearchBar/StyledYextSearchBar';

import YextCustomPagination from '../YextCustomPagination/YextCustomPagination';

import { useSearchActions, useSearchState } from '@yext/search-headless-react';

import { AlternativeVerticals } from '../YextCustomAlternativeVerticals/YextCustomAlternativeVerticals';
import YextFiltersAdaptor from '../YextFilters/YextFilters.adaptor';
import { ResultsCount } from '../YextCustomResultsCount/YextCustomResultsCount';
import Themes from '../../foundation/Themes/Themes';
import { useRouter } from 'next/router';
import YextNoResults from '../YextNoResults/YextNoResults';
import { verticalConfigMap } from './verticalConfigMap';
import Verticals from './Verticals';

const YextSearch = (): JSX.Element => {
  const searchQuery = useSearchState((state) => state.query.input);
  const verticalKey = useSearchState((state) => state.vertical.verticalKey);
  const searchActions = useSearchActions();
  const [hasLoaded, setHasLoaded] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchQuery) {
      if (router.isReady) {
        searchParams.set('query', searchQuery);
        router.push(
          {
            pathname: location.pathname,
            query: searchParams.toString(),
          },
          undefined,
          { shallow: true }
        );
      }
    } else if (!hasLoaded) {
      const query = searchParams.get('query');
      searchActions.setQuery(query || '');
      verticalKey
        ? searchActions.executeVerticalQuery()
        : searchActions.executeUniversalQuery();
    }
    setHasLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const resultsCountRef = useRef<HTMLDivElement>(null);
  const isLoading = useSearchState((state) => state.searchStatus.isLoading);

  const universalResults = useSearchState((state) => state.universal.verticals);
  const universalResultsLength = universalResults?.length || 0;
  const verticalResultsLength =
    useSearchState((state) => state.vertical?.resultsCount) || 0;

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <StyledYextSearchBar />
        <div ref={resultsCountRef} className={styles.tabs}>
          <YextTabs />
        </div>
        <div className={styles.header}>
          <ResultsCount
            customCssClasses={{ resultsCountContainer: styles.results }}
          />
          <div className={styles.filters}>
            <YextFiltersAdaptor />
          </div>
        </div>

        {universalResultsLength > 0 && !isLoading ? (
          <UniversalResults verticalConfigMap={verticalConfigMap} />
        ) : (
          searchQuery !== '' &&
          !isLoading &&
          !verticalKey && (
            <YextNoResults
              currentVerticalLabel=""
              displayAllOnNoResults={false}
            />
          )
        )}
        {!isLoading &&
          verticalKey &&
          verticalKey !== 'healthcare_facilities' &&
          verticalResultsLength <= 0 && (
            <Themes theme={'O-HCA-Teal-20'}>
              <AlternativeVerticals
                currentVerticalLabel={
                  verticalConfigMap[
                    verticalKey as
                      | 'articles'
                      | 'tests_and_treatments'
                      | 'specialties'
                      | 'faqs'
                  ]?.label || ''
                }
                verticalConfigMap={verticalConfigMap}
              />
            </Themes>
          )}
        <Verticals />
        <YextCustomPagination
          callback={() => {
            resultsCountRef?.current?.scrollIntoView({
              behavior: 'smooth',
            });
          }}
        />
      </div>
    </div>
  );
};

export default YextSearch;
