import React from 'react';
import {
  Text as JssText,
  Image as JssImage,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import PaymentFormHeader from '@component-library/site-components/PaymentFormHeader/PaymentFormHeader';
import Icons from '@component-library/foundation/Icons/Icons';
import { LandingPageHeaderProps } from './LandingPageHeader.types';
import { OpeningHours } from 'src/jss-abstractions/OpeningHoursTextFormatting/OpeningHours';

const LandingPageHeaderDefaultComponent = (
  props: LandingPageHeaderProps
): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            Form Header please click to select datasource
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

export const Default = (props: LandingPageHeaderProps): JSX.Element => {
  if (!props.fields) {
    return <LandingPageHeaderDefaultComponent {...props} />;
  }
  const fields = props?.fields?.data?.item;
  const contactUnit = fields?.contactUnit?.contactUnitList;
  const phoneNumber =
    contactUnit?.telephoneNumber?.telephoneNumberList[0]?.phoneNumber?.value;

  const availabilityString = OpeningHours(contactUnit);

  return (
    <>
      <PaymentFormHeader
        logo={<JssImage field={fields?.logo?.jsonValue} />}
        paymentsText={
          <JssText
            tag={props.params?.HeadingTag || 'h1'}
            field={fields?.text?.jsonValue}
          />
        }
        contactText={<JssText field={fields?.anyQuestionsText?.jsonValue} />}
        phoneNumber={
          phoneNumber
            ? {
                icon: <Icons iconName="iconPhone" />,
                text: phoneNumber,
                number: phoneNumber,
              }
            : undefined
        }
        openingHours={
          availabilityString
            ? {
                icon: <Icons iconName="iconClock" />,
                text: availabilityString as string,
              }
            : undefined
        }
      />
    </>
  );
};
