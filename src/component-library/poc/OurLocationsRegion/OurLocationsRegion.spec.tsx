import React from 'react';
import { render } from '@testing-library/react';
import OurLocationsRegion from './OurLocationsRegion';
import { OurLocationsRegionProps } from './OurLocationsRegion.types';
import MapEngland from '../../assets/locations/map-england.png';

const mockProps: OurLocationsRegionProps = {
  id: 0,
  name: 'Locations across the UK',
  amount: '35',
  theme: 'B-HCA-Navy-Blue',
  area: { mobile: MapEngland },
  mapStyles: { transform: 'translateY(0) scale(1.1)' },
  cardStyles: { transform: 'translateY(-50%)' },
  activeRegion: true,
};

describe('OurLocationRegion', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<OurLocationsRegion {...mockProps} />);
    expect(getByText('Locations across the UK')).toBeVisible();
  });
});
