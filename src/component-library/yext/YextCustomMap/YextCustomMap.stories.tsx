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

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof YextCustomMap> = {
  args: {
    apiKey: process.env.STORYBOOK_GOOGLE_MAPS_API_KEY || '',
    center: {
      lat: 51.5072,
      lng: 0.1276,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: '600px' }}>
        <Story />
      </div>
    ),
  ],
};
