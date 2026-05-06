import React from 'react';
import PromoPiotrChild from './PromoPiotrChild';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof PromoPiotrChild> = {
  title: 'components/PromoPiotrChild',
  component: PromoPiotrChild,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof PromoPiotrChild> = {
  args: {
    link: <p>PromoPiotrChild</p>,
  },
};
