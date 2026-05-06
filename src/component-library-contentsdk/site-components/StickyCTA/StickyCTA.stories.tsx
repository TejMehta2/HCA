import React from 'react';
import StickyCTA from './StickyCTA';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof StickyCTA> = {
  title: 'site-components/StickyCTA',
  component: StickyCTA,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '3000px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof StickyCTA> = {
  args: {
    children: (
      <Text tag="h2" variation="heading-1">
        Start your journey now...
      </Text>
    ),
    cta: (
      <Button size="large" variation="full">
        <button>Book an appointment</button>
      </Button>
    ),
  },
};
