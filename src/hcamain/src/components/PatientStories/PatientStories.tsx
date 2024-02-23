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
import CarouselCards from '@component-library/site-components/CarouselCards/CarouselCards';
import { Theme, HeadingTag, HeadingSize } from 'src/types/params';
import getSubheadingTag from 'lib/subheading-tag-getter';

type CTAIconFields = {
  svgMarkup: Field<string>;
};

interface StoriesFields {
  title: Field<string>;
  text: Field<string>;
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
  params: {
    [key: string]: string;
    Theme: Theme;
    HeadingTag: HeadingTag;
    HeadingSize: HeadingSize;
  };
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
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (!props.fields) {
    return <PatientStoriesDefaultComponent {...props} />;
  }

  return (
    <CarouselCards
      theme={props.params.Theme || 'F-HCA-White'}
      title={
        <Text
          tag={props.params.HeadingTag || 'h2'}
          variation={props.params.HeadingSize || 'display-3'}
        >
          <JssText field={props.fields.data.item.title.jsonValue} />
        </Text>
      }
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
    >
      {props.fields.data.item.stories.StoriesList.map((story, index) => (
        <CardPatientStories
          key={index}
          title={
            <Text
              tag={getSubheadingTag(props.params.HeadingTag, 'h3')}
              variation="display-4"
            >
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
              <RichText tag="span" field={story.text} />
            </Text>
          }
          image={<JssImage field={story.image.jsonValue} />}
        ></CardPatientStories>
      ))}
    </CarouselCards>
  );
};

export const Default = (props: PatientStoriesProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (!props.fields) {
    return <PatientStoriesDefaultComponent {...props} />;
  }
  return (
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
              <RichText tag="span" field={story.text} />
            </Text>
          }
          image={<JssImage field={story.image.jsonValue} />}
        ></CardPatientStories>
      ))}
    </SideScrollingCards>
  );
};
