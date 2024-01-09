import React from 'react';

import {
  Field,
  Text as JssText,
  RichText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import CarouselReviews from '@component-library/site-components/CarouselReviews/CarouselReviews';
import Text from '@component-library/foundation/Text/Text';
import { CarouselReviewsTheme } from '@component-library/site-components/CarouselReviews/CarouselReviews.types';

interface TestimonialsFields {
  fields: {
    Text: Field<string>;
  };
}

interface DoctifyReviewsFields {
  fields: {
    Stars: Field<string>;
    Reviews: Field<string>;
  };
}

interface Fields {
  Reviews: DoctifyReviewsFields;
  Testimonials: TestimonialsFields[];
}

type DoctifyTestimonialsCarouselProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const DoctifyTestimonialsCarouselDefaultComponent = (
  props: DoctifyTestimonialsCarouselProps
): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <h1>Doctify Testimonials Carousel no datasorce</h1>
  </div>
);

export const Default = (
  props: DoctifyTestimonialsCarouselProps
): JSX.Element => {
  if (!props.fields) {
    return <DoctifyTestimonialsCarouselDefaultComponent {...props} />;
  }

  const themeName: CarouselReviewsTheme = props.params.Theme;
  console.log(themeName);

  const ratingAsNumber = Number(props.fields.Reviews.fields.Stars.value);

  return (
    <CarouselReviews
      rating={ratingAsNumber}
      reviewCount={
        <>
          <JssText field={props.fields.Reviews.fields.Reviews} /> Reviews
        </>
      }
      theme={themeName}
    >
      {props.fields.Testimonials.map((testimonial, index) => (
        <React.Fragment key={index}>
          <Text tag="div" variation="body-extra-large">
            <RichText tag="p" field={testimonial.fields.Text} />
          </Text>
        </React.Fragment>
      ))}
    </CarouselReviews>
  );
};
