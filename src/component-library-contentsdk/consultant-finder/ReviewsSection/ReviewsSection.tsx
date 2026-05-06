/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, type JSX } from 'react';
import Tabs from '../../core-components/Tabs/Tabs';
import Themes from '../../foundation/Themes/Themes';
import PatientsReviews from './PatientReviews/PatientsReviews';
import PeerReviews from './PeerReviews/PeerReviews';
import { ReviewsSectionProps } from './ReviewsSection.types';

const ReviewsSection = (props: ReviewsSectionProps): JSX.Element => {
  const [typeOfReviews, setTypeOfReviews] = useState<'patient' | 'peer'>(
    'patient'
  );
  const [consultantSlug, setConsultantSlug] = useState<string | null>(null);

  useEffect(() => {
    //console.log('iframe', window.location.search);
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');
    //console.log('iframe slug', slug);
    if (slug) {
      setConsultantSlug(slug);
    }
  }, []);

  const handleTabChange = (label: any) => {
    //console.log(label);
    if (label.label === 'Patient Reviews') {
      setTypeOfReviews('patient');
    } else if (label.label === 'Peer Reviews') {
      setTypeOfReviews('peer');
    }
  };

  // test iframe
  // Function to update iframe height
  const updateIframeHeight = () => {
    const contentHeight = document.body.scrollHeight;

    if (window.parent) {
      const iframe = window.parent.document.getElementById('specialistReviews');
      if (iframe) {
        iframe.style.height = contentHeight + 'px';
      }
    }
  };

  // Set up a MutationObserver to watch for changes in the DOM
  useEffect(() => {
    const observer = new MutationObserver(updateIframeHeight);

    // Observe changes in the body element
    const body = document.body;
    observer.observe(body, {
      childList: true,
      subtree: true,
    });

    // Clean up the observer when the component unmounts
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div>
      {consultantSlug && (
        <div>
          <Themes theme={'A-HCA-White'}>
            <Tabs
              callback={(label) => handleTabChange(label)}
              tabs={[
                {
                  label: 'Patient Reviews',
                },
                {
                  label: 'Peer Reviews',
                },
              ]}
            />
          </Themes>
          {typeOfReviews === 'patient' && (
            <PatientsReviews
              slug={consultantSlug}
              doctifyLogo={props.DoctifyReviewsImage}
              doctifyReviewsURL={props.DoctifyPatientReviewsURL}
              doctifyReviewsLimit={props.DoctifyPatientReviewsLimit}
              reviewsFromPatientsTitleText={props.ReviewsFromPatientsTitleText}
              verifyByDoctifyText={props.VerifyByDoctifyText}
              noReviewsText={props.NoReviewsText}
            ></PatientsReviews>
          )}
          {typeOfReviews === 'peer' && (
            <PeerReviews
              slug={consultantSlug}
              doctifyLogo={props.DoctifyReviewsImage}
              doctifyReviewsURL={props.DoctifyPeerReviewsURL}
              doctifyReviewsLimit={props.DoctifyPeerReviewsLimit}
              reviewsFromPeersTitleText={props.ReviewsFromPeersTitleText}
              verifyByDoctifyText={props.VerifyByDoctifyText}
              noReviewsText={props.NoReviewsText}
            ></PeerReviews>
          )}
        </div>
      )}
      {consultantSlug === null && <div>No consultant selected</div>}
    </div>
  );
};

export default ReviewsSection;
