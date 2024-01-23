import React from 'react';
import CardMap from './CardMap';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof CardMap> = {
  title: 'components/CardMap',
  component: CardMap,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof CardMap> = {
  args: {
    amount: (
      <Text tag="p" variation="display-1">
        35
      </Text>
    ),
    title: (
      <Text tag="p" variation="heading-2">
        Locations across the UK
      </Text>
    ),
    cta: (
      <a href="#">
        <span>
          View <strong>all</strong>
        </span>
      </a>
    ),
  },
};
