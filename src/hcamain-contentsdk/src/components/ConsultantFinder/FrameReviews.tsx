/* eslint-disable @typescript-eslint/no-explicit-any */
// Template finder component

import { type JSX } from 'react';
import React from 'react';
import { Field } from '@sitecore-content-sdk/nextjs';
import ReviewsSection from '@component-library/consultant-finder/ReviewsSection/ReviewsSection';

interface Fields {
  DoctifyReviewsImage: any;
  API_DoctifyPatientReviews_BaseURL: Field<string>;
  API_DoctifyPatientReviews_Limit: Field<number>;
  API_DoctifyPeerReviews_BaseURL: Field<string>;
  API_DoctifyPeerReviews_Limit: Field<number>;
  NoReviewsText: Field<string>;
  PatientReviewsText: Field<string>;
  PeerReivewsText: Field<string>;
  ReasonText: Field<string>;
  ReviewsFromPatientsTitleText: Field<string>;
  ReviewsFromPeersTitleText: Field<string>;
  VerifyByDoctifyText: Field<string>;
}

type ReviewFrameProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const ReviewsFrameDefaultComponent = (): JSX.Element => (
  <div>
    <div className="component-content">
      <span className="is-empty-hint">Consultant Finder Reviews</span>
    </div>
  </div>
);

export const Default = (props: ReviewFrameProps): JSX.Element => {
  //console.log('reviews frame props', props);
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div id={id ? id : undefined}>
        <div className="component-content">
          <ReviewsSection
            DoctifyReviewsImage={
              props?.fields?.DoctifyReviewsImage?.value?.src || ''
            }
            DoctifyPatientReviewsURL={
              props?.fields?.API_DoctifyPatientReviews_BaseURL?.value || ''
            }
            DoctifyPatientReviewsLimit={
              props?.fields?.API_DoctifyPatientReviews_Limit?.value || 2
            }
            DoctifyPeerReviewsURL={
              props?.fields?.API_DoctifyPeerReviews_BaseURL?.value || ''
            }
            DoctifyPeerReviewsLimit={
              props?.fields?.API_DoctifyPeerReviews_Limit?.value || 2
            }
            NoReviewsText={
              props?.fields?.NoReviewsText?.value ||
              'This consultant doesn’t have any reviews at the moment.'
            }
            PatientReviewsText={
              props?.fields?.PatientReviewsText?.value || 'patient reviews'
            }
            PeerReivewsText={
              props?.fields?.PeerReivewsText?.value || 'peer reivews'
            }
            ReasonText={''}
            ReviewsFromPatientsTitleText={
              props?.fields?.ReviewsFromPatientsTitleText?.value ||
              'Reviews from patients'
            }
            ReviewsFromPeersTitleText={
              props?.fields?.ReviewsFromPeersTitleText?.value ||
              'Reviews from peers'
            }
            VerifyByDoctifyText={
              props?.fields?.VerifyByDoctifyText?.value || 'Verified by'
            }
          />
        </div>
      </div>
    );
  }

  return <ReviewsFrameDefaultComponent />;
};
