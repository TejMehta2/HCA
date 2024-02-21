import React from 'react';
import { render } from '@testing-library/react';
import Reviews from './Reviews';
import { ReviewsProps } from './Reviews.types';

const tooltipContent = (
  <div>
    <p>This is a tooltip content.</p>
  </div>
);

const mockProps: ReviewsProps = {
  reviewsTotal: 10,
  reviewsCount: 4.5,
  isConsultantProfileReviews: true,
  reviewsText: 'Sample reviews text',
  hasTooltip: true,
  tooltipContent: tooltipContent,
  titleText: 'Sample title text',
  doctifyText: 'Sample doctify text',
  doctifyLogo: <img src="doctify-logo.png" alt="Doctify Logo" />,
  hasDoctifyBranding: true,
};

describe('Reviews', () => {
  it('Renders component with existing props', async () => {
    const { getByTestId } = render(<Reviews {...mockProps} />);
    const reviewsComponent = getByTestId('reviews-component');

    expect(reviewsComponent).toBeInTheDocument();
  });
});
