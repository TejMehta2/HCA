import React from 'react';
import {
  Image as JssImage,
  Link as JssLink,
  Field,
  Text,
  ImageField,
  RichText,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SideScrollingCards from '@component-library/components/SideScrollingCards/SideScrollingCards';
import Icons from '@component-library/foundation/Icons/Icons';
import CardPatientStories from '@component-library/components/CardPatientStories/CardPatientStories';

type CTAIconFields = {
  SVGMarkup: Field<string>;
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
      title: { jsonValue?: Field<string> };
      text: { jsonValue?: Field<string> };
      cardCTAText: { jsonValue?: Field<string> };
      cTAIcon: {
        ctaIcon: CTAIconFields[];
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
): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <SideScrollingCards
      title={<Text field={props.fields.data.item.title.jsonValue} />}
      link={
        <JssLink field={props.fields.data.item.cTALink.jsonValue}>
          <Icons iconName="iconSearch" />
          <span>{props.fields.data.item.cTALink.jsonValue?.value.text}</span>
        </JssLink>
      }
      bodyCopy={<RichText field={props.fields.data.item.text.jsonValue} />}
    >
      {props.fields.data.item.stories.StoriesList.map((story, index) => (
        <CardPatientStories
          key={index}
          title={<Text field={story.title} tag={'h3'} />}
          link={
            <a href={story.url.url}>
              {props.fields.data.item.cardCTAText.jsonValue?.value}
            </a>
          }
          bodyCopy={<RichText field={story.description} />}
          image={<JssImage field={story.image.jsonValue} />}
        ></CardPatientStories>
      ))}
    </SideScrollingCards>
  </div>
);

export const Carousel = (props: PatientStoriesProps): JSX.Element => {
  return <PatientStoriesDefaultComponent {...props} />;
};

export const Default = (props: PatientStoriesProps): JSX.Element => {
  return <PatientStoriesDefaultComponent {...props} />;
};
