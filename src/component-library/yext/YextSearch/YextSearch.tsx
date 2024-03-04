import React from 'react';
import {
  ResultsCount,
  Pagination,
  UniversalResults,
  VerticalResults,
} from '@yext/search-ui-react';
import styles from './YextSearch.module.scss';
import YextTabs from '../YextTabs/YextTabs';
import YextProvider from '../YextProvider/YextProvider';
import StyledYextSearchBar from '../StyledYextSearchBar/StyledYextSearchBar';
import YextResultCardArticlesAdaptor from '../YextResultCardArticles/YextResultCardArticles.adaptor';

const YextSearch = (): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <YextProvider>
          <StyledYextSearchBar />
          <YextTabs />
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
          <Pagination />
        </YextProvider>
      </div>
    </div>
  );
};

export default YextSearch;
