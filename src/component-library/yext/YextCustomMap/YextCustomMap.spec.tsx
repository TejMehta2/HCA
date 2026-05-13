import React from 'react';
import { render } from '@testing-library/react';
import YextCustomMap from './YextCustomMap';
import { YextCustomMapProps } from './YextCustomMap.types';

const mockProps: YextCustomMapProps = {
  apiKey: process.env.STORYBOOK_GOOGLE_MAPS_API_KEY || '',
  center: {
    lat: 51.5072,
    lng: 0.1276,
  },
  callback: () => {},
};

describe('YextCustomMap', () => {
  it('Renders', async () => {
    const { getByText } = render(<YextCustomMap {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
