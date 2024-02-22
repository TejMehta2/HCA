import React from 'react';
import Image from 'next/image';
import CardContent from './CardContent';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import Themes from '../../foundation/Themes/Themes';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof CardContent> = {
  title: 'components/CardContent',
  component: CardContent,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof CardContent> = {
  args: {
    image: (
      <Image
        src="/placeholders/couple-on-bench.jpeg"
        alt="baby crying"
        width="456"
        height="253"
      />
    ),
    title: (
      <Text tag="h3" variation="display-4">
        Every new birth tells its own story
      </Text>
    ),
    bodyCopy: (
      <Text tag="p" variation="body-large">
        Quis laboris proident sint amet id cillum do dolor in tempor est
        exercitation aute sint tempor eu ut.
      </Text>
    ),
    link: (
      <a href="#">
        <span>
          Read the <strong>Story</strong>
        </span>
      </a>
    ),
  },
  decorators: [
    (Story) => (
      <Themes theme={'D-HCA-Teal'}>
        <Story />
      </Themes>
    ),
  ],
};
