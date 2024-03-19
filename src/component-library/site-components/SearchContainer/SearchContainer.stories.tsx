import React from 'react';
import SearchContainer from './SearchContainer';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof SearchContainer> = {
  title: 'site-components/SearchContainer',
  component: SearchContainer,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof SearchContainer> = {
  args: {
    children: <p>SearchContainer</p>,
  },
};
