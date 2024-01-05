import React from 'react';
import TabsBlock from './TabsBlock';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof TabsBlock> = {
  title: 'site-components/TabsBlock',
  component: TabsBlock,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof TabsBlock> = {
  args: {
    theme: 'k',
    title: (
      <Text tag="h2" variation="display-4">
        Our appointments & memberships
      </Text>
    ),
  },
};
