import React from 'react';
import ErrorMessage from './ErrorMessage';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import Themes from '../../foundation/Themes/Themes';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ErrorMessage> = {
  title: 'site-components/ErrorMessage',
  component: ErrorMessage,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <Themes theme={'A-HCA-White'}>
        <Story />
      </Themes>
    ),
  ],
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof ErrorMessage> = {
  args: {
    children: (
      <>
        <Text tag="h2" variation="display-4">
          No patient stories results found.
        </Text>
        <Text tag="p" variation="body-extra-large">
          Duis culpa aute cillum aute aute enim proident tempor dolor non fugiat
          officia deserunt aliqua minim. Dolore cillum duis ad cillum deserunt
          consequat nisi.
        </Text>
      </>
    ),
  },
};
