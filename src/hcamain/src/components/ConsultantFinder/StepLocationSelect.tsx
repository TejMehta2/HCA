// Template finder component

import React from 'react';
import {
  Image as JssImage,
  Link as JssLink,
  RichText as JssRichText,
  ImageField,
  Field,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Button from '@component-library/core-components/Button/Button';
import Text from '@component-library/foundation/Text/Text';
import HeaderLDB from '@component-library/consultant-finder/HeaderLDB/HeaderLDB';
import ProgressBar from '@component-library/consultant-finder/ProgressBar/ProgressBar';

interface Fields {
  [x: string]: any;
  // from the Specific component data template e.g. /sitecore/templates/Project/HCA/Consultant finder/StepSPECIFIC

  // add specific fields defined in the data template here...

  // from the StepCommon template e.g. /sitecore/templates/Project/HCA/Consultant finder/StepCommon
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
  const id = props.params.RenderingIdentifier;
  console.log('step location', props.fields);
  if (props.fields) {
    return (
      <div
        className={`component promo ${props.params.styles}`}
        id={id ? id : undefined}
      >
        <HeaderLDB
          logo={<JssImage field={props?.fields?.HCALogo} />}
          progress={
            <ProgressBar
              currentPage={props?.fields?.CurrentStep?.value}
              steps={props?.fields?.Steps}
            ></ProgressBar>
          }
        ></HeaderLDB>
      </div>
    );
  }

  return <StepDefaultComponent {...props} />;
};
