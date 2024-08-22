import React, { useRef, useEffect } from 'react';
import { UniversalResults, VerticalResults } from '@yext/search-ui-react';
import styles from './YextSearch.module.scss';
import YextTabs from '../YextTabs/YextTabs';
import StyledYextSearchBar from '../StyledYextSearchBar/StyledYextSearchBar';
import YextResultCardArticlesAdaptor from '../YextResultCardArticles/YextResultCardArticles.adaptor';
import YextResultCardLinksAdaptor from '../YextResultCardLinks/YextResultCardLinks.adaptor';
import YextResultCardFAQsAdaptor from '../YextResultCardFAQs/YextResultCardFAQs.adaptor';
import YextCustomPagination from '../YextCustomPagination/YextCustomPagination';
import YextResultSectionLocationsAdaptor from '../YextResultSectionLocations/YextResultSectionLocations.adaptor';
import { Result, useSearchState } from '@yext/search-headless-react';
import YextResultCardAskAQuestionAdaptor from '../YextResultCardAskAQuestion/YextResultCardAskAQuestion.adaptor';
import YextResultCardConsultantsAdaptor from '../YextResultCardConsultants/YextResultCardConsultants.adaptor';
import HealthcareFacility from '../../types/yext/healthcare_facilities';
import YextResultCardDepartmentsAdaptor from '../YextResultCardDepartments/YextResultCardDepartments.adaptor';
import YextResultCardTestsAndTreatmentsAdaptor from '../YextResultCardTestsAndTreatments/YextResultCardTestsAndTreatments.adaptor';
import { VerticalKey } from './YextSearch.types';
import { AlternativeVerticals } from '../YextCustomAlternativeVerticals/YextCustomAlternativeVerticals';
import YextFiltersAdaptor from '../YextFilters/YextFilters.adaptor';
import { ResultsCount } from '../YextCustomResultsCount/YextCustomResultsCount';
import Themes from '../../foundation/Themes/Themes';
import { useRouter } from 'next/router';
import YextNoResults from '../YextNoResults/YextNoResults';
import { verticalConfigMap } from './verticalConfigMap';

const Verticals = () => {
  const searchState = useSearchState((state) => state);
  const verticalKey = searchState.vertical.verticalKey as VerticalKey | 'links';
  const results = searchState.vertical.results;

  switch (verticalKey) {
    case 'healthcare_facilities':
      return (
        <YextResultSectionLocationsAdaptor
          results={(results as unknown as Result<HealthcareFacility>[]) || []}
          variation={'side-by-side'}
        />
      );

    case 'healthcare_professionals':
      return (
        <>
          <VerticalResults
            CardComponent={YextResultCardConsultantsAdaptor}
            customCssClasses={{ verticalResultsContainer: styles.vertical }}
          />
        </>
      );
    case 'faqs':
      return (
        <>
          <VerticalResults
            CardComponent={YextResultCardFAQsAdaptor}
            customCssClasses={{ verticalResultsContainer: styles.vertical }}
          />
          <YextResultCardAskAQuestionAdaptor />
        </>
      );
    case 'tests_and_treatments':
      return (
        <VerticalResults
          CardComponent={YextResultCardTestsAndTreatmentsAdaptor}
          customCssClasses={{ verticalResultsContainer: styles.vertical }}
        />
      );

    case 'articles':
      return (
        <VerticalResults
          CardComponent={YextResultCardArticlesAdaptor}
          customCssClasses={{ verticalResultsContainer: styles.vertical }}
        />
      );
    case 'specialties':
      return (
        <VerticalResults
          CardComponent={YextResultCardDepartmentsAdaptor}
          customCssClasses={{ verticalResultsContainer: styles.vertical }}
        />
      );
    case 'links':
      return (
        <VerticalResults
          CardComponent={YextResultCardLinksAdaptor}
          customCssClasses={{ verticalResultsContainer: styles.vertical }}
        />
      );
    default:
      return <></>;
  }
};

const YextSearch = (): JSX.Element => {
  const searchQuery = useSearchState((state) => state.query.input);
  const router = useRouter();

  useEffect(() => {
    if (!searchQuery) return;
    if (router.isReady) {
      const searchParams = new URLSearchParams(location.search);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, router.isReady]);

  const resultsCountRef = useRef<HTMLDivElement>(null);
  const verticalKey = useSearchState((state) => state.vertical.verticalKey);
  const isLoading = useSearchState((state) => state.searchStatus.isLoading);

  const verticalResults = useSearchState((state) => state.universal?.verticals);

  const verticalResultsLength = verticalResults
    ? verticalResults && verticalResults?.length
    : 0;

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

        {verticalResultsLength > 0 && !isLoading ? (
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
        {verticalKey && verticalKey !== 'healthcare_facilities' && (
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
