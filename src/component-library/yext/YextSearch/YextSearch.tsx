import React, { useRef } from 'react';
import {
  Facets,
  ResultsCount,
  UniversalResults,
  VerticalResults,
} from '@yext/search-ui-react';
import styles from './YextSearch.module.scss';
import YextTabs from '../YextTabs/YextTabs';
import YextProvider from '../YextProvider/YextProvider';
import StyledYextSearchBar from '../StyledYextSearchBar/StyledYextSearchBar';
import YextResultCardArticlesAdaptor from '../YextResultCardArticles/YextResultCardArticles.adaptor';
import YextResultCardLinksAdaptor from '../YextResultCardLinks/YextResultCardLinks.adaptor';
import YextResultCardFAQsAdaptor from '../YextResultCardFAQs/YextResultCardFAQs.adaptor';
import YextCustomPagination from '../YextCustomPagination/YextCustomPagination';
import YextFiltersAdaptor from '../YextFilters/YextFilters.adaptor';
import YextResultSectionLocationsAdaptor from '../YextResultSectionLocations/YextResultSectionLocations.adaptor';
import { useSearchState } from '@yext/search-headless-react';
import YextResultCardAskAQuestionAdaptor from '../YextResultCardAskAQuestion/YextResultCardAskAQuestion.adaptor';
import YextResultCardConsultantsAdaptor from '../YextResultCardConsultants/YextResultCardConsultants.adaptor';

const YextSearch = (): JSX.Element => {
  const resultsCountRef = useRef<HTMLDivElement>(null);

  const Verticals = () => {
    const searchState = useSearchState((state) => state);
    const verticalKey = searchState.vertical.verticalKey;
    const results = searchState.vertical.results;
    switch (verticalKey) {
      case 'healthcare_facilities':
        return (
          <YextResultSectionLocationsAdaptor
            results={results || []}
            variation={'stacked'}
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
      case 'articles':
      case 'tests_and_treatments':
      case 'specialties':
      default:
        return (
          <VerticalResults
            CardComponent={YextResultCardArticlesAdaptor}
            customCssClasses={{ verticalResultsContainer: styles.vertical }}
          />
        );
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <YextProvider>
          <StyledYextSearchBar />
          <div className={styles.tabs}>
            <YextTabs />
          </div>

          <div ref={resultsCountRef}></div>
          <div className={styles.header}>
            <ResultsCount />
            <div className={styles.filters}>
              <YextFiltersAdaptor />
              <Facets />
            </div>
          </div>
          <UniversalResults
            verticalConfigMap={{
              healthcare_facilities: {
                label: 'Locations',
                SectionComponent: (props) => (
                  <YextResultSectionLocationsAdaptor
                    results={props.results}
                    variation={'side-by-side'}
                  />
                ),
              },
              articles: {
                label: 'Articles',
                CardComponent: YextResultCardArticlesAdaptor,
              },
              tests_and_treatments: {
                label: 'Tests & Treatments',
                CardComponent: YextResultCardLinksAdaptor,
              },
              specialties: {
                label: 'Service Lines',
                CardComponent: YextResultCardArticlesAdaptor,
              },
              healthcare_professionals: {
                label: 'Consultants',
                CardComponent: YextResultCardConsultantsAdaptor,
              },
              faqs: {
                CardComponent: YextResultCardFAQsAdaptor,
              },
              links: {
                CardComponent: YextResultCardLinksAdaptor,
              },
            }}
          />
          <Verticals />
          <YextCustomPagination
            callback={() => {
              resultsCountRef?.current?.scrollIntoView({
                behavior: 'smooth',
              });
            }}
          />
        </YextProvider>
      </div>
    </div>
  );
};

export default YextSearch;
