import React from 'react';
import HeaderProfile from './HeaderProfile';
import type { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';
import Icons from '../../foundation/Icons/Icons';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof HeaderProfile> = {
  title: 'site-components/HeaderProfile',
  component: HeaderProfile,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof HeaderProfile> = {
  args: {
    theme: 'Palace-Beige',
    image: (
      <Image
        src="/placeholders/quote-block-author-full.png"
        alt="Dr May Abboudi"
        width="214"
        height="214"
      />
    ),
    title: (
      <Text variation="display-2" tag="h1">
        Dr May Abboudi
      </Text>
    ),
    department: (
      <Text variation="subheading-1" tag="p">
        General Practice (GP)
      </Text>
    ),
    ctas: (
      <Button size="large" variation="full" contentVariation="full-width">
        <a href="#">
          <Icons iconName="iconPhone" />
          <span>
            Call us to <strong>book an appointment</strong>
          </span>
        </a>
      </Button>
    ),
  },
};
