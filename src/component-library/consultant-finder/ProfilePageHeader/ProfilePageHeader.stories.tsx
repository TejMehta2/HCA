import React from 'react';
import ProfilePageHeader from './ProfilePageHeader';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ProfilePageHeader> = {
  title: 'consultant-finder/ProfilePageHeader',
  component: ProfilePageHeader,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof ProfilePageHeader> = {
  args: {
    children: <p>ProfilePageHeader</p>,
  },
};
