import React from 'react';
import {
  ResultsCount,
  Pagination,
  UniversalResults,
  VerticalResults,
  VerticalConfig,
} from '@yext/search-ui-react';
import styles from './YextSearch.module.scss';
import YextTabs from '../YextTabs/YextTabs';
import YextCardArticles from '../YextCardArticles/YextCardArticles';
import YextProvider from '../YextProvider/YextProvider';
import YextSection from '../YextSection/YextSection';
import StyledYextSearchBar from '../StyledYextSearchBar/StyledYextSearchBar';

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
                SectionComponent:
                  YextSection as VerticalConfig['SectionComponent'],
                CardComponent: YextCardArticles,
              },
              articles: {
                label: 'Articles',
                SectionComponent:
                  YextSection as VerticalConfig['SectionComponent'],
                CardComponent: YextCardArticles,
              },
              tests_and_treatments: {
                label: 'Tests & Treatments',
                SectionComponent:
                  YextSection as VerticalConfig['SectionComponent'],
                CardComponent: YextCardArticles,
              },
              specialties: {
                label: 'Service Lines',
                SectionComponent:
                  YextSection as VerticalConfig['SectionComponent'],
                CardComponent: YextCardArticles,
              },
              healthcare_professionals: {
                label: 'Consultants',
                SectionComponent:
                  YextSection as VerticalConfig['SectionComponent'],
                CardComponent: YextCardArticles,
              },
            }}
          />
          <VerticalResults
            CardComponent={YextCardArticles}
            customCssClasses={{ verticalResultsContainer: styles.vertical }}
          />
          <Pagination />
        </YextProvider>
      </div>
    </div>
  );
};

export default YextSearch;
