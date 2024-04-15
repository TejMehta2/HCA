import React from 'react';
import TextBlockHeader from './TextBlockHeader';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof TextBlockHeader> = {
  title: 'site-components/TextBlockHeader',
  component: TextBlockHeader,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof TextBlockHeader> = {
  args: {
    children: (
      <>
        <Text variation={'subheading-1'}>Payment plans</Text>
        <Text variation={'display-2'}>New to private healthcare?</Text>
      </>
    ),
  },
};
