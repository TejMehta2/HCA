import { Result } from '@yext/search-headless-react';
import { VerticalConfigMap } from '@yext/search-ui-react';
import React from 'react';
import HealthcareFacility from '../../types/yext/healthcare_facilities';
import YextResultCardArticlesAdaptor from '../YextResultCardArticles/YextResultCardArticles.adaptor';
import YextResultCardConsultantsAdaptor from '../YextResultCardConsultants/YextResultCardConsultants.adaptor';
import YextResultCardDepartmentsAdaptor from '../YextResultCardDepartments/YextResultCardDepartments.adaptor';
import YextResultCardFAQsAdaptor from '../YextResultCardFAQs/YextResultCardFAQs.adaptor';
import YextResultCardLinksAdaptor from '../YextResultCardLinks/YextResultCardLinks.adaptor';
import YextResultCardSharedAdaptor from '../YextResultCardShared/YextResultCardShared.adaptor';
import YextResultCardTestsAndTreatmentsAdaptor from '../YextResultCardTestsAndTreatments/YextResultCardTestsAndTreatments.adaptor';
import YextResultSectionLocationsAdaptor from '../YextResultSectionLocations/YextResultSectionLocations.adaptor';
import YextUniversalSection from '../YextUniversalSection/YextUniversalSection';
import YextResultCardCareersAdaptor from '../YextResultCardCareers/YextResultCardCareers.adaptor';

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
  conditions: unknown;
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
    label: '',
    SectionComponent: () => (
      null
    ),
  },
  conditions: {
    label: 'Conditions',
    SectionComponent: (props) => (
      <YextUniversalSection
        results={props.results}
        CardComponent={YextResultCardTestsAndTreatmentsAdaptor}
        title="Conditions"
        verticalKey="conditions"
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
    label: 'Vacancies',
    SectionComponent: (props) => (
      <YextUniversalSection
        results={props.results}
        CardComponent={YextResultCardCareersAdaptor}
        title="Vacancies"
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
