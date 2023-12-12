import React from 'react';
import RadioButtons from './RadioButtons';
import type { Meta, StoryObj } from '@storybook/react';

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
        <RadioButton
          key="1"
          label="example A"
          mode="light"
          value="example-a"
          name="test"
        />
        <RadioButton
          key="2"
          label="example B"
          mode="light"
          value="example-b"
          name="test"
        />
        <RadioButton
          key="3"
          label="example C"
          mode="light"
          value="example-c"
          name="test"
        />
      </>
    ),
  },
};
