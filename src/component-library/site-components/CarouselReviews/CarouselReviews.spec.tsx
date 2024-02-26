import React from 'react';
import { render } from '@testing-library/react';
import CarouselReviews from './CarouselReviews';
import { CarouselReviewsProps } from './CarouselReviews.types';
import Text from '../../foundation/Text/Text';

const mockProps: CarouselReviewsProps = {
  theme: 'A-HCA-White',
  rating: 4.85,
  reviewCount: <span>13,500+ reviews</span>,
  children: [
    <Text key={0} tag="p" variation="body-extra-large">
      All the staff and services at The Wellington were exemplary. It was like
      being treated in a 6* hospital within a 4-5* star hotel. All my needs were
      immediately attended to. The team had the utmost patience and flexibility
    </Text>,
    <Text key={1} tag="p" variation="body-extra-large">
      2 All the staff and services at The Wellington were exemplary. It was like
      being treated in a 6* hospital within a 4-5* star hotel. All my needs were
      immediately attended to. The team had the utmost patience and flexibility
    </Text>,
  ],
};

describe('CarouselReviews', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<CarouselReviews {...mockProps} />);
    expect(getByText('13,500+ reviews')).toBeVisible();
  });
});
