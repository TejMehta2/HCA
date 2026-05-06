import React from 'react';
import SearchButton from './SearchButton';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof SearchButton> = {
  title: 'components/SearchButton',
  component: SearchButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Default: StoryObj<typeof SearchButton> = {
  args: {
    children: (
      <span>
        How can we <b>help you?</b>
      </span>
    ),
    onClick: () => {},
  },
};
