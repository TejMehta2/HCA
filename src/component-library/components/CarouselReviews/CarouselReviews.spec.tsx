import React from 'react';
import { render } from '@testing-library/react';
import CarouselReviews from './CarouselReviews';
import { CarouselReviewsProps } from './CarouselReviews.types';

const mockProps: CarouselReviewsProps = {
  children: <p>Hello world</p>,
};

describe('CarouselReviews', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<CarouselReviews {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
