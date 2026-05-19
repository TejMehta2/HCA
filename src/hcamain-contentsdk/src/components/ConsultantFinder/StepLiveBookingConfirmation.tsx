/* eslint-disable @typescript-eslint/no-explicit-any */
// Template finder component

'use client';

import { type JSX } from 'react';
import React, { useEffect, useState, useContext } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Image as JssImage,
  ImageField,
  Field,
  LinkField,
} from '@sitecore-content-sdk/nextjs';
import Button from '@component-library/core-components/Button/Button';
import Text from '@component-library/foundation/Text/Text';
import HeaderLDB from '@component-library/consultant-finder/HeaderLDB/HeaderLDB';
import ProgressBar from '@component-library/consultant-finder/ProgressBar/ProgressBar';
import LiveFormConfirmation from '@component-library/consultant-finder/LiveFormConfirmation/LiveFormConfirmation';
import LiveFormConfirmationMain from '@component-library/consultant-finder/LiveFormConfirmation/LiveFormConfirmationMain';
import ConfirmationSummary from '@component-library/components/ConfirmationSummary/ConfirmationSummary';
import { ConsultantFinderContext } from '@component-library/context/consultantFinderContext';
import CFAside from '@component-library/consultant-finder/CFAside/CFAside';
import NeedHelp from '@component-library/consultant-finder/NeedHelp/NeedHelp';
import Script from 'next/script';
import { getQueryValue } from './routeQuery';

interface Fields {
  TitleText: Field<string>;
  IntroText: Field<string>;
  CardImage: ImageField;
  HCALogo: ImageField | undefined;
  Steps: any;
  CurrentStep: any;
  StartLink: LinkField;
  NextLink: LinkField;
  BackLink: LinkField;
  SummaryTitle: Field<string>;
  SummaryPatientTitle: Field<string>;
  SummaryDateTitle: Field<string>;
  SummaryTimeTitle: Field<string>;
  SummaryConsultantTitle: Field<string>;
  SummaryFacilityTitle: Field<string>;
  LiveBookingFormContactBoxHeadline: Field<string>;
  LiveBookingFormContactBoxPhone0Label: Field<string>;
  LiveBookingFormContactBoxOpeningHoursLabel: Field<string>;
  LiveBookingFormContactBoxOpeningHoursDays: Field<string>;
  LiveBookingFormContactBoxOpeningHoursTime: Field<string>;
  LiveBookingFormContactBoxPhone0Phone: Field<string>;
  nextStepsTitle: Field<string>;
  nextStepsContent: Field<string>;
  amendBookingTitle: Field<string>;
  amendBookingContent: Field<string>;
}

type StepProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const StepDefaultComponent = (props: StepProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Consultant Finder Step</span>
    </div>
  </div>
);

export const Default = (props: StepProps): JSX.Element => {
  //console.log(props.fields);
  const {
    selectedLocationName,
    selectedDate,
    selectedTime,
    consultantName,
    consultantMainSpecialty,
    finderFormPayor,
    finderFormPrevious,
    completedFormId,
    patientName,
  } = useContext(ConsultantFinderContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [slug, setSlug] = useState<string>('');
  const [gmcNumber, setGmcNumber] = useState<string>('');
  const [reviewsTotal, setReviewsTotal] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    // get slug from URL
    const slugURL = searchParams.get('slug');
    if (slugURL) {
      setSlug(slugURL.toString());
    }
    // get gmc number from URL
    setGmcNumber(getQueryValue(searchParams, 'gmcNumber'));
    // get reviews total number from URL
    const reviewsTotal = searchParams.get('reviewsTotal');
    setReviewsTotal(Number(reviewsTotal));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  if (props.fields) {
    return (
      <>
        {(
          <>
            {completedFormId && completedFormId.length > 0 && (
              <Script /* HWPD-3463 - data layer */
                id="cf-gtm-liveBooking"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `window.dataLayer = window.dataLayer || [];
                   window.dataLayer.push({
                   'event': 'consultantFinder',
                   'formType': 'live',
                   'goalType': 'finderBookingSubmit',
                   'consultantName': '${consultantName}',
                   'consultantSpecialty': '${consultantMainSpecialty}',
                   'consultantReviews': '${reviewsTotal}',
                   'finderFormPayor': '${finderFormPayor}',
                   'finderFormPrevious': '${finderFormPrevious}',
                   'finderFormPractice': '${selectedLocationName}',
                   'completedFormId': '${completedFormId}'
                   });`,
                }}
              ></Script>
            )}
            <HeaderLDB
              logo={<JssImage field={props?.fields?.HCALogo} />}
              progress={
                <ProgressBar
                  currentPage={props?.fields?.CurrentStep?.value}
                  steps={props?.fields?.Steps}
                  slug={slug}
                  gmcNumber={gmcNumber}
                  reviewsTotal={reviewsTotal}
                ></ProgressBar>
              }
            ></HeaderLDB>
            <LiveFormConfirmation>
              <LiveFormConfirmationMain
                headline={
                  <>
                    <Text tag="h1" variation="display-4">
                      {props?.fields?.TitleText?.value || ''}
                    </Text>
                    <Text tag="p" variation="body-extra-large">
                      {props?.fields?.IntroText?.value ||
                        'You have booked an appointment, once confirmed you will receive an email confirmation'}
                    </Text>
                  </>
                }
                summary={
                  <ConfirmationSummary
                    title={
                      props?.fields?.SummaryTitle?.value ||
                      'Appointment summary'
                    }
                    patientTitle={
                      props?.fields?.SummaryPatientTitle?.value || 'Patient'
                    }
                    patientName={patientName}
                    dateTitle={props?.fields?.SummaryDateTitle?.value || 'Date'}
                    date={selectedDate}
                    consultantTitle={
                      props?.fields?.SummaryConsultantTitle?.value ||
                      'Consultant'
                    }
                    timeTitle={props?.fields?.SummaryTimeTitle?.value || 'Time'}
                    time={selectedTime}
                    consultantName={consultantName}
                    facilityTitle={
                      props?.fields?.SummaryFacilityTitle?.value || 'Hospital'
                    }
                    facilityName={selectedLocationName}
                  />
                }
                nextStepsTitle={
                  props?.fields?.nextStepsTitle?.value || 'Next steps'
                }
                nextStepsContent={
                  props?.fields?.nextStepsContent?.value ||
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse.'
                }
                amendBookingTitle={
                  props?.fields?.amendBookingTitle?.value ||
                  'How to amend your booking'
                }
                amendBookingContent={
                  props?.fields?.amendBookingContent?.value ||
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse.'
                }
              >
                <Button size={'large'} variation={'full-dark'}>
                  <button onClick={() => router.push(`/finder/step-intro`)}>
                    <span>
                      {props?.fields?.NextLink?.value?.text || 'Go to Homepage'}
                    </span>
                  </button>
                </Button>
              </LiveFormConfirmationMain>
              <CFAside>
                <NeedHelp
                  headline={
                    props?.fields?.LiveBookingFormContactBoxHeadline?.value ||
                    'Need help?'
                  }
                  subheadline={
                    props?.fields?.LiveBookingFormContactBoxPhone0Label
                      ?.value || 'General enquiries'
                  }
                  workingHoursHeadline={
                    props?.fields?.LiveBookingFormContactBoxOpeningHoursLabel
                      ?.value || 'Opening hours'
                  }
                  workingHours={
                    props?.fields?.LiveBookingFormContactBoxOpeningHoursDays
                      ?.value || 'Mon – Fri'
                  }
                  workingHoursTime={
                    props?.fields?.LiveBookingFormContactBoxOpeningHoursTime
                      ?.value || '8am – 6pm'
                  }
                  phoneNumber={
                    props?.fields?.LiveBookingFormContactBoxPhone0Phone
                      ?.value || '020 3797 7236'
                  }
                />
              </CFAside>
            </LiveFormConfirmation>
          </>
        )}
      </>
    );
  }

  return <StepDefaultComponent {...props} />;
};
