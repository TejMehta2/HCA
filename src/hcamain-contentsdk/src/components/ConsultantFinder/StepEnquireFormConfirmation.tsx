/* eslint-disable @typescript-eslint/no-explicit-any */
// Template finder component

'use client';

import { type JSX } from 'react';
import React, { useContext } from 'react';
import {
  RichText as JssRichText,
  ImageField,
  Field,
  LinkField,
import { useRouter } from 'next/router';
} from '@sitecore-content-sdk/nextjs';
import Button from '@component-library/core-components/Button/Button';
import Text from '@component-library/foundation/Text/Text';
import Breadcrumbs from '@component-library/site-components/Breadcrumbs/Breadcrumbs';
import CFAside from '@component-library/consultant-finder/CFAside/CFAside';
import LiveFormConfirmationMain from '@component-library/consultant-finder/LiveFormConfirmation/LiveFormConfirmationMain';
import NeedHelp from '@component-library/consultant-finder/NeedHelp/NeedHelp';
import LiveFormConfirmation from '@component-library/consultant-finder/LiveFormConfirmation/LiveFormConfirmation';
import Container from '@component-library/foundation/Containers/Container';
import TextLink from '@component-library/core-components/TextLink/TextLink';
import Icons from '@component-library/foundation/Icons/Icons';
import Link from 'next/link';
import Script from 'next/script';
import { ConsultantFinderContext } from '@component-library/context/consultantFinderContext';

interface Fields {
  EnquireFormConfirmationBreadcrumbsHomePage: Field<string>;
  EnquireFormConfirmationBreadcrumbsCurrentPage: Field<string>;
  EnquireFormConfirmationContactBoxHeadline: Field<string>;
  EnquireFormConfirmationContactBoxPhone0Label: Field<string>;
  EnquireFormConfirmationContactBoxOpeningHoursLabel: Field<string>;
  EnquireFormConfirmationContactBoxOpeningHoursDays: Field<string>;
  EnquireFormConfirmationContactBoxOpeningHoursTime: Field<string>;
  EnquireFormConfirmationContactBoxPhone0Phone: Field<string>;
  Text: Field<string>;
  TitleText: Field<string>;
  SubHeadline: Field<string>;
  CardImage: ImageField;
  StartLink: LinkField;
  NextLink: LinkField;
  BackLink: LinkField;
  BreadcrumbHomePage: LinkField;
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
  //console.log('enquire thank you', props.fields);
  const {
    consultantReviews,
    selectedLocationName,
    consultantName,
    consultantMainSpecialty,
    finderFormPayor,
    finderFormPrevious,
    completedFormId,
  } = useContext(ConsultantFinderContext);
  const router = useRouter();

  if (props.fields) {
    return (
      <>
        {completedFormId && completedFormId.length > 0 && (
          <Script /* HWPD-3463 - data layer */
            id="cf-gtm-enquiryBooking"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                'event': 'consultantFinder',
                'goalType': 'formComplete',
                'formType': 'enquiry',
                'consultantName': '${consultantName}',
                'consultantSpecialty': '${consultantMainSpecialty}',
                'consultantReviews': '${consultantReviews}',
                'finderFormPayor': '${finderFormPayor}',
                'finderFormPrevious': '${finderFormPrevious}',
                'finderFormPractice': '${selectedLocationName}',
                'completedFormId': '${completedFormId}'
                });`,
            }}
          ></Script>
        )}
        <Breadcrumbs
          backCta={{
            text: 'Consultant Finder',
            link: `${
              props?.fields?.BreadcrumbHomePage?.value?.href ||
              '/finder/step-intro'
            }`,
          }}
        >
          <TextLink>
            <a href="/">
              <Icons iconName="iconHome"></Icons>
              <span className="sr-only">Home</span>
            </a>
          </TextLink>
          <TextLink>
            <Link
              href={`${
                props?.fields?.BreadcrumbHomePage?.value?.href ||
                '/finder/step-intro'
              }`}
            >
              {props?.fields?.EnquireFormConfirmationBreadcrumbsHomePage
                ?.value || 'Consultant Finder'}
            </Link>
          </TextLink>
          <span>
            {props?.fields?.EnquireFormConfirmationBreadcrumbsCurrentPage
              ?.value || 'Thank you'}
          </span>
        </Breadcrumbs>
        <LiveFormConfirmation>
          <LiveFormConfirmationMain
            headline={
              <>
                <Text tag="h1" variation="display-4">
                  {props?.fields?.TitleText?.value ||
                    'Enquire form confirmation'}
                </Text>
                <Text tag="h2" variation="body-medium-extra-large">
                  {props?.fields?.SubHeadline?.value ||
                    'Thank you for taking the time to complete the form.'}
                </Text>
              </>
            }
            isEnquireForm={true}
          >
            <Text tag="div" variation="body-extra-large">
              <JssRichText field={props?.fields?.Text} />
            </Text>
            <Container marginBottom="spacing-6" marginTop="spacing-6">
              <Button size={'large'} variation={'full-dark'}>
                <button
                  onClick={() =>
                    router.push(
                      props?.fields?.NextLink?.value.href ||
                        `/finder/step-intro`
                    )
                  }
                >
                  <span>
                    {props?.fields?.NextLink?.value?.text || 'Go to Homepage'}
                  </span>
                </button>
              </Button>
            </Container>
          </LiveFormConfirmationMain>
          <CFAside>
            <NeedHelp
              headline={
                props?.fields?.EnquireFormConfirmationContactBoxHeadline
                  ?.value || 'Need help?'
              }
              subheadline={
                props?.fields?.EnquireFormConfirmationContactBoxPhone0Label
                  ?.value || 'General enquiries'
              }
              workingHoursHeadline={
                props?.fields
                  ?.EnquireFormConfirmationContactBoxOpeningHoursLabel?.value ||
                'Opening hours'
              }
              workingHours={
                props?.fields?.EnquireFormConfirmationContactBoxOpeningHoursDays
                  ?.value || 'Mon – Fri'
              }
              workingHoursTime={
                props?.fields?.EnquireFormConfirmationContactBoxOpeningHoursTime
                  ?.value || '8am – 6pm'
              }
              phoneNumber={
                props?.fields?.EnquireFormConfirmationContactBoxPhone0Phone
                  ?.value || '020 3797 7236'
              }
            />
          </CFAside>
        </LiveFormConfirmation>
      </>
    );
  }

  return <StepDefaultComponent {...props} />;
};
