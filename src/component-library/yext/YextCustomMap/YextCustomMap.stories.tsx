import YextCustomMap from './YextCustomMap';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof YextCustomMap> = {
  title: 'yext/YextCustomMap',
  component: YextCustomMap,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

const locationExamples = [
  {
    id: '1',
    title: 'The Harley Street Clinic',
    address: '35 Weymouth Street W1G 8BJ London',
    center: {
      lat: 51.52036,
      lng: -0.14797,
    },
  },
  {
    id: '2',
    title: 'London Bridge Hospital',
    address: '27 Tooley Street London SE1 2PR',
    center: {
      lat: 51.506359,
      lng: -0.08786,
    },
  },
  {
    id: '3',
    title: 'The Wellington Hospital',
    address: `Wellington Place St John's Wood NW8 9LE`,
    center: {
      lat: 51.53204,
      lng: -0.16985,
    },
  },
];

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof YextCustomMap> = {
  args: {
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
  },
  decorators: [
    (Story) => (
      <div style={{ height: '600px' }}>
        <Story />
      </div>
    ),
  ],
};
