import React from 'react';
import AddressFinder from './AddressFinder';
import type { Meta, StoryObj } from '@storybook/react';
import Themes from '../../../foundation/Themes/Themes';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AddressFinder> = {
  title: 'core-components/Form/AddressFinder',
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
export const Default: StoryObj<typeof AddressFinder> = {
  args: {
    children: <p>AddressFinder</p>,
  },
};
