import React from 'react';
import {
  Image as JssImage,
  Link as JssLink,
  Field,
  Text,
  ImageField,
  RichText,
  LinkFieldValue,
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
  image: ImageField;
  link: LinkField;
  url: { url: string };
}

interface Fields {
  data: {
    item: {
      title: Field<string>;
      text: Field<string>;
      cardCTAText: Field<string>;
      cTAIcon: {
        ctaIcon: CTAIconFields[];
      };
      cTALink: LinkFieldValue;
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
      title={<Text field={props.fields.data.item.title} />}
      link={
        <JssLink field={props.fields.data.item.cTALink}>
          <Icons iconName="iconSearch" />
          <span>{props.fields.data.item.cTALink.text}</span>
        </JssLink>
      }
      bodyCopy={<RichText field={props.fields.data.item.text} />}
    >
      {props.fields.data.item.stories.StoriesList.map((story, index) => (
        <CardPatientStories
          key={index}
          title={<Text field={story.title} tag={'h3'} />}
          link={
            <a href={story.url.url}>
              {props.fields.data.item.cardCTAText.value}
            </a>
          }
          bodyCopy={<RichText field={story.description} />}
          image={<JssImage field={story.image} />}
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
