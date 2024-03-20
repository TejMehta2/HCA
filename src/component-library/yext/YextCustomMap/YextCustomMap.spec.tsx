import React from 'react';
import { render } from '@testing-library/react';
import YextCustomMap from './YextCustomMap';
import { YextCustomMapProps } from './YextCustomMap.types';

export const locationExamples = [
  {
    id: `1`,
    title: 'The Harley Street Clinic',
    address: '35 Weymouth Street W1G 8BJ London',
    center: {
      lat: 51.52036,
      lng: -0.14797,
    },
  },
  {
    id: `2`,
    title: 'London Bridge Hospital',
    address: '27 Tooley Street London SE1 2PR',
    center: {
      lat: 51.506359,
      lng: -0.08786,
    },
  },
  {
    id: `3`,
    title: 'The Wellington Hospital',
    address: `Wellington Place St John's Wood NW8 9LE`,
    center: {
      lat: 51.53204,
      lng: -0.16985,
    },
  },
];

const mockProps: YextCustomMapProps = {
  apiKey: 'AIzaSyCJu0aTsRYKOQVPsETLeTvI84jxDZjRGAg',
  center: {
    lat: 51.5072,
    lng: 0.1276,
  },
  locations: locationExamples.map((location, index) => ({
    id: location.id,
    center: location.center,
    callback: () => {
      console.log(`marker ${index}`);
    },
  })),
};

describe('YextCustomMap', () => {
  it('Renders', async () => {
    const { getByText } = render(<YextCustomMap {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
