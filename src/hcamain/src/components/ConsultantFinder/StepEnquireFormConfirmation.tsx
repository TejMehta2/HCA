/* eslint-disable @typescript-eslint/no-explicit-any */
// Template finder component

import React from 'react';
import {
  RichText as JssRichText,
  ImageField,
  Field,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { useRouter } from 'next/router';
import Button from '@component-library/core-components/Button/Button';
import Text from '@component-library/foundation/Text/Text';
import Breadcrumbs from '@component-library/site-components/Breadcrumbs/Breadcrumbs';
import Link from 'next/link';
import CFAside from '@component-library/consultant-finder/CFAside/CFAside';
import LiveFormConfirmationMain from '@component-library/consultant-finder/LiveFormConfirmation/LiveFormConfirmationMain';
import NeedHelp from '@component-library/consultant-finder/NeedHelp/NeedHelp';
import LiveFormConfirmation from '@component-library/consultant-finder/LiveFormConfirmation/LiveFormConfirmation';
import Container from '@component-library/foundation/Containers/Container';

interface Fields {
  Text: any;
  IntroText: any;
  EnquireFormContactBoxHeadline: Field<string>;
  EnquireFormContactBoxPhone0Label: Field<string>;
  EnquireFormContactBoxOpeningHoursLabel: Field<string>;
  EnquireFormContactBoxOpeningHoursDays: Field<string>;
  EnquireFormContactBoxOpeningHoursTime: Field<string>;
  EnquireFormContactBoxPhone0Phone: Field<string>;
  TitleText: Field<string>;
  CardImage: ImageField;
  StartLink: LinkField;
  NextLink: LinkField;
  BackLink: LinkField;
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
  console.log('enquire thank you', props.fields);
  const router = useRouter();

  if (props.fields) {
    return (
      <>
        <Breadcrumbs>
          <Link href="/Finder/Step-Intro">{'Consultant Finder'}</Link>
          <span>Thank you</span>
        </Breadcrumbs>
        <LiveFormConfirmation>
          <LiveFormConfirmationMain
            headline={
              <>
                <Text tag="h1" variation="display-4">
                  {props?.fields?.TitleText?.value || ''}
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
                <button onClick={() => router.push(`/Finder/Step-Intro`)}>
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
                props?.fields?.EnquireFormContactBoxHeadline?.value ||
                'Need help?'
              }
              subheadline={
                props?.fields?.EnquireFormContactBoxPhone0Label?.value ||
                'General enquiries'
              }
              workingHoursHeadline={
                props?.fields?.EnquireFormContactBoxOpeningHoursLabel?.value ||
                'Opening hours'
              }
              workingHours={
                props?.fields?.EnquireFormContactBoxOpeningHoursDays?.value ||
                'Mon – Fri'
              }
              workingHoursTime={
                props?.fields?.EnquireFormContactBoxOpeningHoursTime?.value ||
                '8am – 6pm'
              }
              phoneNumber={
                props?.fields?.EnquireFormContactBoxPhone0Phone?.value ||
                '020 3797 7236'
              }
            />
          </CFAside>
        </LiveFormConfirmation>
      </>
    );
  }

  return <StepDefaultComponent {...props} />;
};
