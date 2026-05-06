import React from 'react';
import Checkboxes from './Checkboxes';
import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from '../Checkbox/Checkbox';
import Themes from '../../foundation/Themes/Themes';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Checkboxes> = {
  title: 'core-components/Checkboxes',
  component: Checkboxes,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof Checkboxes> = {
  args: {
    children: (
      <>
        <Checkbox label="Example 1" name="example" value={1} id="example-1" />
        <Checkbox label="Example 2" name="example" value={2} id="example-2" />
        <Checkbox label="Example 3" name="example" value={3} id="example-3" />
      </>
    ),
  },
  decorators: [
    (Story) => (
      <Themes theme="A-HCA-White">
        <Story />
      </Themes>
    ),
  ],
};
