import React from 'react';
import Textarea from './Textarea';
import type { Meta, StoryObj } from '@storybook/react';
import Themes from '../../foundation/Themes/Themes';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Textarea> = {
  title: 'core-components/Textarea',
  component: Textarea,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof Textarea> = {
  args: {
    id: 'input1',
    label: 'Field label',
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

export const Required: StoryObj<typeof Textarea> = {
  args: {
    id: 'input1',
    label: 'Field label',
    required: true,
    errorMessage: 'Error message',
    helperText: 'Optional helper text',
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
