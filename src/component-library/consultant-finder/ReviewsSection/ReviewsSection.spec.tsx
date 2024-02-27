import React from 'react';
import { render } from '@testing-library/react';
import ReviewsSection from './ReviewsSection';
import { ReviewsSectionProps } from './ReviewsSection.types';

const mockProps: ReviewsSectionProps = {
  children: <p>Hello world</p>,
};

describe('ReviewsSection', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<ReviewsSection {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
