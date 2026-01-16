/* eslint-disable prettier/prettier */
import React from 'react';

import {
  Field,
  Text as JssText,
  RichText,
  ImageField,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import CarouselReviews from '@component-library/site-components/CarouselReviews/CarouselReviews';
import Text from '@component-library/foundation/Text/Text';
import Params from 'src/types/params';
import { inPageNavGlobalStore } from '../../context/inPageNavGlobalStorage';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';

interface TestimonialsFields {
  fields?: {
    Text?: Field<string>;
  };
}

interface DoctifyLogoFields {
  fields?: {
    Text?: Field<string>;
    Logo?: ImageField;
  };
}

interface DoctifyReviewsFields {
  fields?: {
    Stars?: Field<string>;
    Reviews?: Field<string>;
    DoctifyLogo?: DoctifyLogoFields;
  };
}

interface Fields {
  Image?: ImageField;
  Reviews?: DoctifyReviewsFields;
  Testimonials?: TestimonialsFields[];
}

type DoctifyTestimonialsCarouselProps = {
  params?: Params;
  fields?: Fields;
};

const DoctifyTestimonialsCarouselDefaultComponent = (
  props: DoctifyTestimonialsCarouselProps
): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            Doctify Testimonials please click to select datasource
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

export const Default = (
  props: DoctifyTestimonialsCarouselProps
): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (!props.fields) {
    return <DoctifyTestimonialsCarouselDefaultComponent {...props} />;
  }

  const componentAnchorId = inPageNavGlobalStore.addItem(props?.params, '');
  const tableOfContentTitle = props?.params?.TableOfContentsLinkTitle;

  const ratingAsNumber = Number(props.fields?.Reviews?.fields?.Stars?.value);

  return (
    <CarouselReviews
      id={componentAnchorId}
      {...(tableOfContentTitle &&
      props?.params?.ExcludeFromTableOfContents !== '1'
        ? { tableOfContentTitle: tableOfContentTitle }
        : {})}
      rating={ratingAsNumber}
      reviewCount={
        <>
          <JssText field={props.fields?.Reviews?.fields?.Reviews} /> Reviews
        </>
      }
      theme={props.params?.Theme || 'A-HCA-White'}
      image={
        props.fields?.Image || isExperienceEditor ? (
          <NextJssImage
            field={props.fields?.Image}
            next={{
              width: '1024',
              height: '683',
              loading: 'eager',
              priority: true,
            }}
          />
        ) : undefined
      }
    >
      {props.fields?.Testimonials?.map((testimonial, index) => (
        <React.Fragment key={index}>
          <Text tag="div" variation="body-extra-large">
            <RichText tag="div" field={testimonial?.fields?.Text} />
          </Text>
        </React.Fragment>
      ))}
    </CarouselReviews>
  );
};
