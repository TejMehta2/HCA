import React from 'react';
import RadioButtons from './RadioButtons';
import type { Meta, StoryObj } from '@storybook/react';
import Themes from '../../foundation/Themes/Themes';

import RadioButton from '../RadioButton/RadioButton';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof RadioButtons> = {
  title: 'core-components/RadioButtons',
  component: RadioButtons,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof RadioButtons> = {
  args: {
    children: (
      <>
        <RadioButton label="example A" value="example-a" name="test" />
        <RadioButton label="example B" value="example-b" name="test" />
        <RadioButton label="example C" value="example-c" name="test" />
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
