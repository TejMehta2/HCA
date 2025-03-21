/* eslint-disable @typescript-eslint/no-explicit-any */
// Template finder component

import React from 'react';

import {
  Image as JssImage,
  ImageField,
  Field,
  LinkField,
  Placeholder,
  ComponentRendering,
} from '@sitecore-jss/sitecore-jss-nextjs';
import HeaderLDB from '@component-library/consultant-finder/HeaderLDB/HeaderLDB';
import ProgressBar from '@component-library/the-birth-company/ProgressBar/ProgressBar';
import PlaceHolderWrapper from 'src/jss-abstractions/PlaceholderWrapper/PlaceholderWrapper';

interface Fields {
  HCALogo: ImageField | undefined;
  CurrentStep: any;
  Steps: any;
  TitleText: Field<string>;
  CardImage: ImageField;
  StartLink: LinkField;
  NextLink: LinkField;
  BackLink: LinkField;
  API_C2_ReserveConsultantSlot_BaseURL: Field<string>;
  API_C2_ReserveConsultantSlot_RecapchaKey: Field<string>;
}

export type StepProps = {
  params: { [key: string]: string };
  rendering?: ComponentRendering;
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
  const id = props.params.RenderingIdentifier;
  const phKey = `booking-step-${props.params?.DynamicPlaceholderId}`;

  if (props.fields) {
    return (
      <div
        className={`component promo ${props.params.styles}`}
        id={id ? id : undefined}
      >
        <>
          <HeaderLDB
            logo={<JssImage field={props?.fields?.HCALogo} />}
            progress={
              <ProgressBar
                currentPage={props?.fields?.CurrentStep?.value}
                steps={props?.fields?.Steps}
              ></ProgressBar>
            }
          ></HeaderLDB>
          {props.rendering && (
            <PlaceHolderWrapper>
              <Placeholder name={phKey} rendering={props.rendering} />
            </PlaceHolderWrapper>
          )}
        </>
      </div>
    );
  }

  return <StepDefaultComponent {...props} />;
};
