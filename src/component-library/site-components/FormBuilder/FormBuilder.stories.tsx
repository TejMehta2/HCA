import React from 'react';
import FormBuilder from './FormBuilder';
import type { Meta, StoryObj } from '@storybook/react';
import FormBuilderExample from './FormBuilderExample';
import Themes from '../../foundation/Themes/Themes';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof FormBuilder> = {
  title: 'site-components/FormBuilder',
  component: FormBuilder,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof FormBuilder> = {
  args: {
    children: <FormBuilderExample />,
  },
  decorators: [
    (Story) => (
      <Themes theme="A-HCA-White">
        <Story />
      </Themes>
    ),
  ],
};
