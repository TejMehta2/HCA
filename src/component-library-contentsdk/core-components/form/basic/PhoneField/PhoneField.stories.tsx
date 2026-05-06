import React from 'react';
import PhoneField from './PhoneField';
import type { Meta, StoryObj } from '@storybook/react';
import Themes from '../../../../foundation/Themes/Themes';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof PhoneField> = {
  title: 'core-components/form/basic/PhoneField',
  component: PhoneField,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem' }}>
        <Themes theme="A-HCA-White">
          <Story />
        </Themes>
      </div>
    ),
  ],
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof PhoneField> = {
  args: {
    label: 'Field label',
    helpText: 'Helper text',
  },
};

export const Required: StoryObj<typeof PhoneField> = {
  args: {
    label: 'Field label',
    helpText: 'Helper text',
  },
};
