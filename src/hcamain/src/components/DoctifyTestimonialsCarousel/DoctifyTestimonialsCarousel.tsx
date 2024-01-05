import React from 'react';
import { Field, Text, RichText } from '@sitecore-jss/sitecore-jss-nextjs';

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
  return (
    <div className={`component ${props.params.styles}`}>
      <Text field={props.fields.Reviews.fields.Stars} /> <br />
      <RichText field={props.fields.Reviews.fields.Reviews} />
      <ul>
        {props.fields.Testimonials.map((testimonial, index) => (
          <li key={index}>
            <Text field={testimonial.fields.Text} />
          </li>
        ))}
      </ul>
    </div>
  );
};
