import React from 'react';
import { render } from '@testing-library/react';
import Locations from './Locations';
import { LocationsProps } from './Locations.types';

const mockProps: LocationsProps = {
  children: <p>Hello world</p>,
};

describe('Locations', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<Locations {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
