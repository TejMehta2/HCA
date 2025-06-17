import React from 'react';
import YextResultCardArticlesAdaptor from '../YextResultCardArticles/YextResultCardArticles.adaptor';
import YextResultCardLinksAdaptor from '../YextResultCardLinks/YextResultCardLinks.adaptor';
import YextResultCardFAQsAdaptor from '../YextResultCardFAQs/YextResultCardFAQs.adaptor';
import YextResultSectionLocationsAdaptor from '../YextResultSectionLocations/YextResultSectionLocations.adaptor';
import YextResultCardAskAQuestionAdaptor from '../YextResultCardAskAQuestion/YextResultCardAskAQuestion.adaptor';
import YextResultCardConsultantsAdaptor from '../YextResultCardConsultants/YextResultCardConsultants.adaptor';
import HealthcareFacility from '../../types/yext/healthcare_facilities';
import YextResultCardDepartmentsAdaptor from '../YextResultCardDepartments/YextResultCardDepartments.adaptor';
import YextResultCardTestsAndTreatmentsAdaptor from '../YextResultCardTestsAndTreatments/YextResultCardTestsAndTreatments.adaptor';
import { VerticalKey } from './YextSearch.types';
import { VerticalResults } from '@yext/search-ui-react';
import { Result, useSearchState } from '@yext/search-headless-react';
import styles from './YextSearch.module.scss';
import YextResultCardCareersAdaptor from '../YextResultCardCareers/YextResultCardCareers.adaptor';

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
    case 'jobs':
      return (
        <VerticalResults
          CardComponent={YextResultCardCareersAdaptor}
          customCssClasses={{ verticalResultsContainer: styles.vertical }}
        />
      );
    default:
      return <></>;
  }
};

export default Verticals;
