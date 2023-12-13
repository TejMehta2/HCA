import React from 'react';
import Checkboxes from './Checkboxes';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Checkboxes> = {
  title: 'core-components/Checkboxes',
  component: Checkboxes,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof Checkboxes> = {
  args: {
    children: <p>Checkboxes</p>,
  },
};
