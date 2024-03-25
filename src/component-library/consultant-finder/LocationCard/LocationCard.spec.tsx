import React from 'react';
import { render } from '@testing-library/react';
import LocationCard from './LocationCard';
import { LocationCardProps } from './LocationCard.types';

const mockProps: LocationCardProps = {
  children: <p>Hello world</p>,
};

describe('LocationCard', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<LocationCard {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
