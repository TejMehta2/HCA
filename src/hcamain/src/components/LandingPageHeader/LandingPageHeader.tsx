import React from 'react';
import {
  Field,
  ImageField,
  Text as JssText,
  Image as JssImage,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Text from '@component-library/foundation/Text/Text';
import { ContactUnitFields } from 'src/jss-abstractions/OpeningHoursTextFormatting/OpeningHours.types';
import Params from 'src/types/params';

interface Fields {
  Logo?: ImageField;
  Text?: Field<string>;
  AnyQuestionsText?: Field<string>;
  ContactUnit?: ContactUnitFields;
}

type LandingPageHeaderProps = {
  params?: Params;
  fields?: Fields;
};

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

  return (
    <>
      <JssImage field={props.fields?.Logo} />
      <Text
        variation={props.params?.HeadingSize || 'display-4'}
        tag={props.params?.HeadingTag || 'h2'}
      >
        <JssText field={props.fields?.Text} />
      </Text>
      <Text>
        <JssText field={props.fields?.AnyQuestionsText} />
      </Text>
    </>
  );
};
