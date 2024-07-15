import React, { useRef, useEffect } from 'react';
import {
  UniversalResults,
  VerticalConfigMap,
  VerticalResults,
} from '@yext/search-ui-react';
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
import YextResultCardSharedAdaptor from '../YextResultCardShared/YextResultCardShared.adaptor';
import YextUniversalSection from '../YextUniversalSection/YextUniversalSection';
import { VerticalKey } from './YextSearch.types';
import { AlternativeVerticals } from '../YextCustomAlternativeVerticals/YextCustomAlternativeVerticals';
import YextFiltersAdaptor from '../YextFilters/YextFilters.adaptor';
import { ResultsCount } from '../YextCustomResultsCount/YextCustomResultsCount';
import Themes from '../../foundation/Themes/Themes';
import { useRouter } from 'next/router';
import YextNoResults from '../YextNoResults/YextNoResults';

export const verticalConfigMap: VerticalConfigMap<{
  healthcare_facilities: unknown;
  articles: unknown;
  tests_and_treatments: unknown;
  specialties: unknown;
  healthcare_professionals: unknown;
  faqs: unknown;
  links: unknown;
  jobs: unknown;
  scans: unknown;
  patientstories: unknown;
  treatments: unknown;
  promotion: unknown;
}> = {
  healthcare_facilities: {
    label: 'Locations',
    SectionComponent: (props) => (
      <YextResultSectionLocationsAdaptor
        results={props.results as Result<HealthcareFacility>[]}
        variation="stacked"
      />
    ),
  },
  articles: {
    label: 'Articles',
    SectionComponent: (props) => (
      <YextUniversalSection
        results={props.results}
        CardComponent={YextResultCardArticlesAdaptor}
        title="Articles"
        verticalKey="articles"
      />
    ),
  },
  tests_and_treatments: {
    label: 'Tests & Treatments',
    SectionComponent: (props) => (
      <YextUniversalSection
        results={props.results}
        CardComponent={YextResultCardTestsAndTreatmentsAdaptor}
        title="Tests & Treatments"
        verticalKey="tests_and_treatments"
      />
    ),
  },
  treatments: {
    label: 'Treatments',
    SectionComponent: (props) => (
      <YextUniversalSection
        results={props.results}
        CardComponent={YextResultCardTestsAndTreatmentsAdaptor}
        title="Treatments"
      />
    ),
  },
  specialties: {
    label: 'Departments',
    SectionComponent: (props) => (
      <YextUniversalSection
        results={props.results}
        CardComponent={YextResultCardDepartmentsAdaptor}
        title="Departments"
        verticalKey="specialties"
      />
    ),
  },
  healthcare_professionals: {
    label: 'Consultants',
    SectionComponent: (props) => (
      <YextUniversalSection
        results={props.results}
        CardComponent={YextResultCardConsultantsAdaptor}
        title="Consultants"
        verticalKey="healthcare_professionals"
      />
    ),
  },
  faqs: {
    label: 'FAQs',
    SectionComponent: (props) => (
      <YextUniversalSection
        results={props.results}
        CardComponent={YextResultCardFAQsAdaptor}
        title="FAQs"
        verticalKey="faqs"
      />
    ),
  },
  links: {
    label: 'Links',
    SectionComponent: (props) => (
      <YextUniversalSection
        results={props.results}
        CardComponent={YextResultCardLinksAdaptor}
        title="Links"
      />
    ),
  },
  jobs: {
    label: 'Jobs',
    SectionComponent: (props) => (
      <YextUniversalSection
        results={props.results}
        CardComponent={YextResultCardSharedAdaptor}
        title="Jobs"
      />
    ),
  },
  scans: {
    label: 'Scans',
    SectionComponent: (props) => (
      <YextUniversalSection
        results={props.results}
        CardComponent={YextResultCardSharedAdaptor}
        title="Scans"
      />
    ),
  },
  patientstories: {
    label: 'Patient Stories',
    SectionComponent: (props) => (
      <YextUniversalSection
        results={props.results}
        CardComponent={YextResultCardSharedAdaptor}
        title="Patient Stories"
      />
    ),
  },
  promotion: {
    label: 'Promotion',
    SectionComponent: (props) => (
      <YextUniversalSection
        results={props.results}
        CardComponent={YextResultCardSharedAdaptor}
        title="Promotion"
      />
    ),
  },
};

const YextSearch = (): JSX.Element => {
  const searchQuery = useSearchState((state) => state.query.input);
  const router = useRouter();

  useEffect(() => {
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, query: searchQuery },
      },
      undefined,
      { shallow: true }
    );
  }, [searchQuery]);

  const resultsCountRef = useRef<HTMLDivElement>(null);
  const verticalKey = useSearchState((state) => state.vertical.verticalKey);
  const isLoading = useSearchState((state) => state.searchStatus.isLoading);

  const verticalResults = useSearchState((state) => state.universal?.verticals);

  const verticalResultsLength = verticalResults
    ? verticalResults && verticalResults?.length
    : 0;

  const Verticals = () => {
    const searchState = useSearchState((state) => state);
    const verticalKey = searchState.vertical.verticalKey as
      | VerticalKey
      | 'links';
    const results = searchState.vertical.results;

    let resultsCount = 0;
    if (results) {
      resultsCount = results.length;
    }

    switch (verticalKey) {
      case 'healthcare_facilities':
        return (
          <>
            {resultsCount > 0 ? (
              <YextResultSectionLocationsAdaptor
                results={
                  (results as unknown as Result<HealthcareFacility>[]) || []
                }
                variation={'side-by-side'}
              />
            ) : (
              !isLoading && (
                <YextNoResults
                  displayAllOnNoResults={false}
                  currentVerticalLabel="Locations"
                />
              )
            )}
          </>
        );

      case 'healthcare_professionals':
        return (
          <>
            {resultsCount > 0
              ? ''
              : !isLoading && (
                  <YextNoResults currentVerticalLabel="Consultants" />
                )}
            <VerticalResults
              CardComponent={YextResultCardConsultantsAdaptor}
              customCssClasses={{ verticalResultsContainer: styles.vertical }}
            />
          </>
        );
      case 'faqs':
        return (
          <>
            {resultsCount > 0
              ? ''
              : !isLoading && <YextNoResults currentVerticalLabel="FAQs" />}
            <VerticalResults
              CardComponent={YextResultCardFAQsAdaptor}
              customCssClasses={{ verticalResultsContainer: styles.vertical }}
            />
            <YextResultCardAskAQuestionAdaptor />
          </>
        );
      case 'tests_and_treatments':
        return (
          <>
            {resultsCount > 0
              ? ''
              : !isLoading && (
                  <YextNoResults currentVerticalLabel="Tests and Treatments" />
                )}
            <VerticalResults
              CardComponent={YextResultCardTestsAndTreatmentsAdaptor}
              customCssClasses={{ verticalResultsContainer: styles.vertical }}
            />
          </>
        );

      case 'articles':
        return (
          <>
            {resultsCount > 0
              ? ''
              : !isLoading && <YextNoResults currentVerticalLabel="Articles" />}
            <VerticalResults
              CardComponent={YextResultCardArticlesAdaptor}
              customCssClasses={{ verticalResultsContainer: styles.vertical }}
            />
          </>
        );
      case 'specialties':
        return (
          <>
            {resultsCount > 0
              ? ''
              : !isLoading && (
                  <YextNoResults currentVerticalLabel="Departments" />
                )}
            <VerticalResults
              CardComponent={YextResultCardDepartmentsAdaptor}
              customCssClasses={{ verticalResultsContainer: styles.vertical }}
            />
          </>
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
