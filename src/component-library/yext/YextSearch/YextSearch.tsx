import React, { useRef } from 'react';
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
  const resultsCountRef = useRef<HTMLDivElement>(null);
  const verticalKey = useSearchState((state) => state.vertical.verticalKey);

  const Verticals = () => {
    const searchState = useSearchState((state) => state);
    const verticalKey = searchState.vertical.verticalKey as
      | VerticalKey
      | 'links';
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
          <VerticalResults
            CardComponent={YextResultCardConsultantsAdaptor}
            customCssClasses={{ verticalResultsContainer: styles.vertical }}
          />
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
          <>
            <VerticalResults
              CardComponent={YextResultCardTestsAndTreatmentsAdaptor}
              customCssClasses={{ verticalResultsContainer: styles.vertical }}
            />
          </>
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
        <UniversalResults verticalConfigMap={verticalConfigMap} />
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
