import React from 'react';
import {
  Image as JssImage,
  Link as JssLink,
  Field,
  Text,
  LinkField,
  ImageField,
  RichText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SideScrollingCards from 'temp/component-library/components/SideScrollingCards/SideScrollingCards';
import CardPatientStories from 'temp/component-library/components/CardPatientStories/CardPatientStories';

type CTAIconFields = {
  SVGMarkup: Field<string>;
};

interface StoriesFields {
  title: Field<string>;
  description: Field<string>;
  date: Field<string>;
  image: ImageField;
  link: LinkField;
  url: string;
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
      cTALink: LinkField;
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
    <JssImage field={props.fields.data.item.stories.StoriesList[1].image} />
    <SideScrollingCards
      title={<Text field={props.fields.data.item.title} />}
      link={<JssLink field={props.fields.data.item.cTALink} />}
      bodyCopy={<RichText field={props.fields.data.item.text} />}
    >
      {props.fields.data.item.stories.StoriesList.map((story, index) => (
        <CardPatientStories
          key={index}
          title={<Text field={story.title} tag={'h3'} />}
          link={
            <a href={story.url}>{props.fields.data.item.cardCTAText.value} </a>
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
