import Checkbox from './Checkbox';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Checkbox> = {
  title: 'core-components/Checkbox',
  component: Checkbox,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof Checkbox> = {
  args: {
    label: 'Checkbox',
    id: '1',
    name: 'example',
    value: 'example',
  },
};

export const Dark: StoryObj<typeof Checkbox> = {
  args: {
    label: 'Checkbox',
    mode: 'dark',
    id: '1',
    name: 'example',
    value: 'example',
  },

  parameters: {
    backgrounds: {
      default: 'dark-blue',
      values: [{ name: 'dark-blue', value: '#112f34' }],
    },
  },
};

export const Medium: StoryObj<typeof Checkbox> = {
  args: {
    id: '1',
    name: 'example',
    value: 'example',
    label: 'Checkbox',
    mode: 'medium',
  },

  parameters: {
    backgrounds: {
      default: 'main-turquoise',
      values: [{ name: 'main-turquoise', value: '#77c7c3' }],
    },
  },
};
