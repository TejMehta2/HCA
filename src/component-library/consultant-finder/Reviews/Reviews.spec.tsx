import React from 'react';
import { render } from '@testing-library/react';
import Reviews from './Reviews';
import { ReviewsProps } from './Reviews.types';

const mockProps: ReviewsProps = {
  children: <p>Hello world</p>,
};

describe('Reviews', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<Reviews {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
