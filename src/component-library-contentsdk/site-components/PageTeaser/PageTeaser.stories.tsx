import React from 'react';
import Image from 'next/image';
import PageTeaser from './PageTeaser';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import Themes from '../../foundation/Themes/Themes';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof PageTeaser> = {
  title: 'site-components/PageTeaser',
  component: PageTeaser,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof PageTeaser> = {
  args: {
    image: (
      <Image
        src="/placeholders/couple-on-bench.jpeg"
        alt="couple on a bench"
        width="150"
        height="150"
      />
    ),
    title: (
      <Text tag="h3" variation="heading-2">
        Non-melanoma skin cancers
      </Text>
    ),
    bodyCopy: (
      <Text tag="div" variation="body-large">
        Nisi do amet mollit ea. Ullamco id Lorem minim aliqua labore sit culpa
        consectetur quis magna duis. Commodo irure proident commodo in
        consectetur esse aliquip.
      </Text>
    ),
    link: (
      <a href="#">
        <span>Learn more</span>
      </a>
    ),
  },
  decorators: [
    (Story) => (
      <Themes theme={'L-HCA-Teal-5'}>
        <Story />
      </Themes>
    ),
  ],
};
