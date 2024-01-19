import React from 'react';
import { render } from '@testing-library/react';
import OurLocations from './OurLocations';
import { OurLocationsProps } from './OurLocations.types';

const mockProps: OurLocationsProps = {
  children: <p>Hello world</p>,
};

describe('OurLocations', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<OurLocations {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
