import React, { useRef } from 'react';
import {
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
import YextCustomPagination from '../YextCustomPagination/YextCustomPagination';

const YextSearch = (): JSX.Element => {
  const resultsCountRef = useRef<HTMLDivElement>(null);
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <YextProvider>
          <StyledYextSearchBar />
          <YextTabs />
          <div ref={resultsCountRef}></div>
          <ResultsCount />
          <UniversalResults
            verticalConfigMap={{
              healthcare_facilities: {
                label: 'Locations',
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
              },
              healthcare_professionals: {
                label: 'Consultants',
              },
            }}
          />
          <VerticalResults
            CardComponent={YextResultCardArticlesAdaptor}
            customCssClasses={{ verticalResultsContainer: styles.vertical }}
          />
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
