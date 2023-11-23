import React from 'react';
import Doctify from './Doctify';
import type { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Doctify> = {
  title: 'components/Doctify',
  component: Doctify,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof Doctify> = {
  args: {
    rating: 4,
    reviews: '13,500 +',
    logo: {
      dark: (
        <Image src="/cqc-white.png" alt="cqc logo" width="120" height="37" />
      ),
      light: (
        <Image src="/cqc-color.png" alt="cqc logo" width="120" height="37" />
      ),
    },
    theme: 'light',
  },
};
