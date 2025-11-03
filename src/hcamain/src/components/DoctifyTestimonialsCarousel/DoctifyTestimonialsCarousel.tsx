/* eslint-disable prettier/prettier */
import React from 'react';

import {
  Field,
  Text as JssText,
  RichText,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import CarouselReviews from '@component-library/site-components/CarouselReviews/CarouselReviews';
import Text from '@component-library/foundation/Text/Text';
import Params from 'src/types/params';
import { inPageNavGlobalStore } from '../../context/inPageNavGlobalStorage';

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
  Reviews?: DoctifyReviewsFields;
  Testimonials?: TestimonialsFields[];
}

type DoctifyTestimonialsCarouselProps = {
  params?: Params;
  fields?: Fields;
};

const DoctifyTestimonialsCarouselDefaultComponent = (
  props: DoctifyTestimonialsCarouselProps
): JSX.Element => (
  <div className={`component ${props.params?.styles}`}>
    <h1>Doctify Testimonials Carousel no datasorce</h1>
  </div>
);

export const Default = (
  props: DoctifyTestimonialsCarouselProps
): JSX.Element => {
  if (!props.fields) {
    return <DoctifyTestimonialsCarouselDefaultComponent {...props} />;
  }

  const componentAnchorId = inPageNavGlobalStore.addItem(props?.params, '');
  const tableOfContentTitle = props?.params?.TableOfContentsLinkTitle;

  const ratingAsNumber = Number(props.fields?.Reviews?.fields?.Stars?.value);

  return (
    <CarouselReviews
      id={componentAnchorId}
      {...(tableOfContentTitle && !props?.params?.ExcludeFromTableOfContents ? { tableOfContentTitle: tableOfContentTitle } : {})}
      rating={ratingAsNumber}
      reviewCount={
        <>
          <JssText field={props.fields?.Reviews?.fields?.Reviews} /> Reviews
        </>
      }
      theme={props.params?.Theme || 'A-HCA-White'}
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
