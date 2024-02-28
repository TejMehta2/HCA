import React from 'react';
import TextButton from './TextButton';
import Icons from '../../foundation/Icons/Icons';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof TextButton> = {
  title: 'core-components/TextButton',
  component: TextButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

const exampleClick = () => {
  alert('TextLink was clicked');
};

export const Dark: StoryObj<typeof TextButton> = {
  args: {
    theme: 'dark',
    children: (
      <button onClick={exampleClick}>
        Text button <Icons iconName="iconArrowSmallRight" />
      </button>
    ),
  },
};

export const Light: StoryObj<typeof TextButton> = {
  args: {
    theme: 'light',
    children: <button onClick={exampleClick}>Text button</button>,
  },
  parameters: {
    backgrounds: {
      default: 'dark-blue',
      values: [{ name: 'dark-blue', value: '#0c2141' }],
    },
  },
};
