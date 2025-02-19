import React from 'react';
import { render } from '@testing-library/react';
import CarouselTestimonials from './CarouselTestimonials';
import { CarouselTestimonialsProps } from './CarouselTestimonials.types';

const mockProps: CarouselTestimonialsProps = {
  children: <p>Hello world</p>,
};

describe('CarouselTestimonials', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<CarouselTestimonials {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
