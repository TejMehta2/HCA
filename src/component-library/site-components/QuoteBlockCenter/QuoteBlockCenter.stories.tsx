import React from 'react';
import QuoteBlockCenter from './QuoteBlockCenter';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import Image from 'next/image';
import Themes from '../../foundation/Themes/Themes';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof QuoteBlockCenter> = {
  title: 'site-components/QuoteBlockCenter',
  component: QuoteBlockCenter,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <Themes theme={'D-HCA-Teal'}>
        <Story />
      </Themes>
    ),
  ],
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Left: StoryObj<typeof QuoteBlockCenter> = {
  args: {
    children: (
      <Text variation="display-5">
        “Above all else, we are committed to the care and improvement of human
        life”
      </Text>
    ),
    author: {
      name: <Text variation="subheading-1">Dr Thomas frist sr</Text>,
      image: (
        <Image
          src="/placeholders/quote-block-author.png"
          alt="author of quote"
          width="70"
          height="70"
        />
      ),
      tag: <a href="#">HCA Healthcare Co-Founder</a>,
    },
    alignment: 'left',
  },
};

export const Center: StoryObj<typeof QuoteBlockCenter> = {
  args: {
    ...Left.args,
    alignment: 'center',
  },
};
