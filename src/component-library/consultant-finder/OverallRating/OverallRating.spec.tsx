import React from 'react';
import { render } from '@testing-library/react';
import OverallRating from './OverallRating';
import { OverallRatingProps } from './OverallRating.types';

const mockProps: OverallRatingProps = {
  children: <p>Hello world</p>,
};

describe('OverallRating', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<OverallRating {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
