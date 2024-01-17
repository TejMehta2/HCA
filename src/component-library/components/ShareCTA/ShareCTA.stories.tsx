import React from 'react';
import ShareCTA from './ShareCTA';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ShareCTA> = {
  title: 'components/ShareCTA',
  component: ShareCTA,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof ShareCTA> = {
  args: {
    shareData: {
      url: '',
      title: '',
      text: '',
    },

    heading: (
      <Text tag="h2" variation="display-2">
        Share this cost
      </Text>
    ),

    subheading: (
      <Text tag="p" variation="subheading-1">
        Hip Surgery - £5,000
      </Text>
    ),
  },
};
