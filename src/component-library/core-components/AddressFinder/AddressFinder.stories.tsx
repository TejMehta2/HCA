import React from 'react';
import AddressFinder from './AddressFinder';
import type { Meta, StoryObj } from '@storybook/react';
import Themes from '../../foundation/Themes/Themes';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AddressFinder> = {
  title: 'core-components/AddressFinder',
  component: AddressFinder,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },

  decorators: [
    (Story) => (
      <Themes theme="A-HCA-White">
        <div style={{ width: 700, margin: 'auto', padding: '2rem' }}>
          <Story />
        </div>
      </Themes>
    ),
  ],
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

const mockTestAddress = {
  line1: '123 Test Street',
  line2: '',
  city: 'London',
  country: 'United Kingdom',
  postcode: 'SE1 1AB',
};

const mockResults = [
  {
    line1: '1 Test Street',
    line2: 'Somewhere',
    city: 'London',
    country: 'UK',
    postcode: 'SE1 1AB',
    id: '1',
  },
  {
    line1: '2 Test Street',
    line2: 'Somewhere',
    city: 'London',
    country: 'UK',
    postcode: 'SE1 1AB',
    id: '2',
  },
  {
    line1: '3 Test Street',
    line2: '',
    city: 'London',
    country: 'UK',
    postcode: 'SE1 1AB',
    id: '3',
  },
];
export const Default: StoryObj<typeof AddressFinder> = {
  args: {
    children: <p>AddressFinder</p>,
    addressResults: mockResults,
  },
};
