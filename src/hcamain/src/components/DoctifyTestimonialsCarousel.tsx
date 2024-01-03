import React from 'react';
import { Field } from '@sitecore-jss/sitecore-jss-nextjs';

interface TestimonialsFields {
  Text: Field<string>;
}

interface DoctifyReviewsFields {
  Stars: Field<string>;
  Reviews: Field<string>;
}

interface Fields {
  Reviews: DoctifyReviewsFields[];
  testimonials: {
    Testimonials: TestimonialsFields[];
  };
}

type DoctifyTestimonialsCarouselProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const DoctifyTestimonialsCarouselDefaultComponent = (
  props: DoctifyTestimonialsCarouselProps
): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <h1>Doctify Testimonials Carousel</h1>
  </div>
);

export const Default = (
  props: DoctifyTestimonialsCarouselProps
): JSX.Element => {
  return <DoctifyTestimonialsCarouselDefaultComponent {...props} />;
};
