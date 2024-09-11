import React from 'react';
import {
  Field,
  ImageField,
  RichText as JssRichText,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';
import Accreditations from '@component-library/careers/Accreditations/Accreditations';
import Themes from '@component-library/foundation/Themes/Themes';

interface CardFields {
  fields?: {
    Title?: Field<string>;
    Text?: Field<string>;
    Image?: ImageField;
  };
}

interface Fields {
  Cards?: CardFields[];
}

type ImageTextListProps = {
  params?: Params;
  fields?: Fields;
};

const ImageTextListDefaultComponent = (
  props: ImageTextListProps
): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            ImageTextList. Please click to select datasource
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

export const Default = (props: ImageTextListProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext?.pageEditing;
  if (!props.fields) {
    return <ImageTextListDefaultComponent {...props} />;
  }

  if (!props.fields?.Cards?.length && !isExperienceEditor) {
    return <></>;
  }

  return (
    <Themes theme={props.params?.Theme || 'B-HCA-Navy-Blue'}>
      <Accreditations
        items={
          props.fields?.Cards?.map((cards) => ({
            text: <JssRichText tag={'div'} field={cards?.fields?.Text} />,
            logo: (
              <NextJssImage
                field={cards?.fields?.Image}
                editable={false}
                next={{
                  width: 643,
                  height: 605,
                }}
              />
            ),
          })) || []
        }
      />
    </Themes>
  );
};
