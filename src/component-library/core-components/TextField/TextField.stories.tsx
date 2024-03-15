import React from 'react';
import TextField from './TextField';
import type { Meta, StoryObj } from '@storybook/react';
import Themes from '../../foundation/Themes/Themes';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof TextField> = {
  title: 'core-components/TextField',
  component: TextField,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof TextField> = {
  args: {
    id: 'input1',
    label: 'Field label',
    helpText: 'Helper text',
  },
  decorators: [
    (Story) => (
      <Themes theme="A-HCA-White">
        <div style={{ maxWidth: '56rem', margin: 'auto', padding: '1rem' }}>
          <Story />
        </div>
      </Themes>
    ),
  ],
};

export const Required: StoryObj<typeof TextField> = {
  args: {
    id: 'input1',
    label: 'Field label',
    helpText: 'Helper text',
    required: true,
    errorMessage: 'Error message',
  },
  decorators: [
    (Story) => (
      <Themes theme="A-HCA-White">
        <div style={{ maxWidth: '56rem', margin: 'auto' }}>
          <Story />
        </div>
      </Themes>
    ),
  ],
};

export const Email: StoryObj<typeof TextField> = {
  args: {
    id: 'input1',
    label: 'Email Address',
    type: 'email',
    required: true,
    errorMessage: 'Error message',
  },
  decorators: [
    (Story) => (
      <Themes theme="A-HCA-White">
        <div style={{ maxWidth: '56rem', margin: 'auto' }}>
          <Story />
        </div>
      </Themes>
    ),
  ],
};
