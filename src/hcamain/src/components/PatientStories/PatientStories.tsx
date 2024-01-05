import React from 'react';
import {
  Image as JssImage,
  Link as JssLink,
  Field,
  Text as JssText,
  ImageField,
  RichText,
  LinkField,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SideScrollingCards from '@component-library/site-components/SideScrollingCards/SideScrollingCards';
import CardPatientStories from '@component-library/components/CardPatientStories/CardPatientStories';
import Text from '@component-library/foundation/Text/Text';

type CTAIconFields = {
  svgMarkup: Field<string>;
};

interface StoriesFields {
  title: Field<string>;
  description: Field<string>;
  date: Field<string>;
  image: { jsonValue: ImageField };
  link: LinkField;
  url: { url: string };
}

interface Fields {
  data: {
    item: {
      title: { jsonValue: Field<string> };
      text: { jsonValue: Field<string> };
      cardCTAText: { jsonValue: Field<string> };
      cTAIcon: {
        Icon: CTAIconFields;
      };
      cTALink: { jsonValue: LinkField };
      stories: {
        StoriesList: StoriesFields[];
      };
    };
  };
}

type PatientStoriesProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const PatientStoriesDefaultComponent = (
  props: PatientStoriesProps
): JSX.Element => {
  return (
    <div className={`component promo ${props.params.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">Patient Stories</span>
      </div>
    </div>
  );
};

export const Carousel = (props: PatientStoriesProps): JSX.Element => {
  return (
    <div className={`component promo ${props.params.styles}`}>
      <div className="component-content">
        <p>Patient Stories Carousel Not Implemented</p>
      </div>
    </div>
  );
};

export const Default = (props: PatientStoriesProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (!props.fields) {
    return <PatientStoriesDefaultComponent {...props} />;
  }
  return (
    <div className={`component ${props.params.styles}`}>
      <SideScrollingCards
        title={<JssText field={props.fields.data.item.title.jsonValue} />}
        link={
          !isExperienceEditor ? (
            <JssLink field={props.fields.data.item.cTALink.jsonValue}>
              {props?.fields?.data?.item?.cTAIcon?.Icon && (
                <span
                  dangerouslySetInnerHTML={{
                    __html: props.fields.data.item.cTAIcon.Icon.svgMarkup.value,
                  }}
                />
              )}
              <RichText
                tag="span"
                field={{
                  value: props.fields.data.item.cTALink.jsonValue.value.text,
                }}
              />
            </JssLink>
          ) : (
            <JssLink field={props.fields.data.item.cTALink.jsonValue}></JssLink>
          )
        }
        bodyCopy={
          <RichText tag="span" field={props.fields.data.item.text.jsonValue} />
        }
      >
        {props.fields.data.item.stories.StoriesList.map((story, index) => (
          <CardPatientStories
            key={index}
            title={
              <Text tag="h3" variation="display-4">
                <JssText field={story.title} />
              </Text>
            }
            link={
              <a href={story.url.url}>
                <RichText
                  tag="span"
                  field={{
                    value: props.fields.data.item.cardCTAText.jsonValue?.value,
                  }}
                />
              </a>
            }
            bodyCopy={
              <Text tag="div" variation="body-large">
                <RichText tag="span" field={story.description} />
              </Text>
            }
            image={<JssImage field={story.image.jsonValue} />}
          ></CardPatientStories>
        ))}
      </SideScrollingCards>
    </div>
  );
};
