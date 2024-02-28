import Switches from './Switches';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Switches> = {
  title: 'core-components/Switches',
  component: Switches,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof Switches> = {
  args: {
    label: 'switch',
  },
};

export const Light: StoryObj<typeof Switches> = {
  args: {
    label: 'switch',
    mode: 'light',
  },
};

export const Dark: StoryObj<typeof Switches> = {
  args: {
    label: 'switch',
    mode: 'dark',
  },

  parameters: {
    backgrounds: {
      default: 'dark-blue',
      values: [{ name: 'dark-blue', value: '#0c2141' }],
    },
  },
};

export const Medium: StoryObj<typeof Switches> = {
  args: {
    label: 'switch',
    mode: 'medium',
  },
  parameters: {
    backgrounds: {
      default: 'main-turquoise',
      values: [{ name: 'main-turquoise', value: '#77c7c3' }],
    },
  },
};

export const Disabled: StoryObj<typeof Switches> = {
  args: {
    label: 'switch',
    disabled: true,
  },
};
