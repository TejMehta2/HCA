import React from 'react';
import RadioButton from './RadioButton';
import type { Meta, StoryObj } from '@storybook/react';
import Themes from '../../foundation/Themes/Themes';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof RadioButton> = {
  title: 'core-components/RadioButton',
  component: RadioButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof RadioButton> = {
  args: {
    label: 'radio button',
    value: 'light-example',
  },
  decorators: [
    (Story) => (
      <Themes theme="A-HCA-White">
        <Story />
      </Themes>
    ),
  ],
};

export const Medium: StoryObj<typeof RadioButton> = {
  args: {
    label: 'radio button',
    value: 'medium-example',
  },
  decorators: [
    (Story) => (
      <Themes theme="D-HCA-Teal">
        <Story />
      </Themes>
    ),
  ],

  parameters: {
    backgrounds: {
      default: 'main-turquoise',
      values: [{ name: 'main-turquoise', value: '#77c7c3' }],
    },
  },
};

export const Dark: StoryObj<typeof RadioButton> = {
  args: {
    label: 'radio button',
    value: 'dark-example',
  },
  decorators: [
    (Story) => (
      <Themes theme="B-HCA-Navy-Blue">
        <Story />
      </Themes>
    ),
  ],
  parameters: {
    backgrounds: {
      default: 'dark-blue',
      values: [{ name: 'dark-blue', value: '#0c2141' }],
    },
  },
};
