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

interface Fields {
  // from the Specific component data template e.g. /sitecore/templates/Project/HCA/Consultant finder/StepSPECIFIC
  InitialAppointmentLink: LinkField;
  FollowOnAppointmentLink: LinkField;

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
  if (props.fields) {
    return (
      <div
        className={`component promo ${props.params.styles}`}
        id={id ? id : undefined}
      >
        <div className="component-content">
          <div className="field-promoicon">
            <JssImage field={props.fields.CardImage} />
          </div>
          <div className="promo-text">
            <div>
              <div className="field-promotext">
                <Text tag="div">
                  <JssRichText field={props.fields.TitleText} />
                </Text>
              </div>
            </div>
            <div className="field-promolink">
              <h2>Links from the specifc component template</h2>
              <h3>
                These point to the same page as the next link, but also broken
                out here just in case
              </h3>
              <Button size={'small'} theme={'outline'}>
                <JssLink
                  field={props.fields.InitialAppointmentLink}
                  title={props.fields.InitialAppointmentLink.value.text}
                ></JssLink>
              </Button>
              <Button size={'small'} theme={'outline'}>
                <JssLink
                  field={props.fields.FollowOnAppointmentLink}
                  title={props.fields.FollowOnAppointmentLink.value.text}
                ></JssLink>
              </Button>
            </div>
            <div className="field-promolink">
              <h2>Links from the base template</h2>
              <Button size={'small'} theme={'outline'}>
                <JssLink
                  field={props.fields.NextLink}
                  title={props.fields.NextLink.value.text}
                ></JssLink>
              </Button>
              <Button size={'small'} theme={'outline'}>
                <JssLink
                  field={props.fields.BackLink}
                  title={props.fields.BackLink.value.text}
                ></JssLink>
              </Button>
              <Button size={'small'} theme={'outline'}>
                <JssLink
                  field={props.fields.StartLink}
                  title={props.fields.StartLink.value.text}
                ></JssLink>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <StepDefaultComponent {...props} />;
};
