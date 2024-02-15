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

  // add specific fields defined in the data template here...
  EnquireNowLink: LinkField;
  BookOnlineLink: LinkField;
  ViewProfileLink: LinkField;
  BackFromAdvSearchLink: LinkField;
  BackFromQuickSearchLink: LinkField;

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
  console.log('search consultant by name', props);
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
                Each card would carry the view profile link and either the
                enquire now or book online link
              </h3>
              <Button size={'small'} theme={'outline'}>
                <JssLink
                  field={props.fields.EnquireNowLink}
                  title={props.fields.EnquireNowLink.value.text}
                ></JssLink>
              </Button>
              <Button size={'small'} theme={'outline'}>
                <JssLink
                  field={props.fields.BookOnlineLink}
                  title={props.fields.BookOnlineLink.value.text}
                ></JssLink>
              </Button>
              <Button size={'small'} theme={'outline'}>
                <JssLink
                  field={props.fields.ViewProfileLink}
                  title={props.fields.ViewProfileLink.value.text}
                ></JssLink>
              </Button>
              <h3>Back if coming from advanced search path...</h3>
              <Button size={'small'} theme={'outline'}>
                <JssLink
                  field={props.fields.BackFromAdvSearchLink}
                  title={props.fields.BackFromAdvSearchLink.value.text}
                ></JssLink>
              </Button>
              <h3>Back if coming from quick search path...</h3>
              <Button size={'small'} theme={'outline'}>
                <JssLink
                  field={props.fields.BackFromQuickSearchLink}
                  title={props.fields.BackFromQuickSearchLink.value.text}
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
