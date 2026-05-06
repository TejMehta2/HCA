import React from 'react';
import CQCBlock from './CQCBlock';
import type { Meta, StoryObj } from '@storybook/react';
import Icons from '../../foundation/Icons/Icons';
import Image from 'next/image';
import Themes from '../../foundation/Themes/Themes';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof CQCBlock> = {
  title: 'components/CQCBlock',
  component: CQCBlock,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Short: StoryObj<typeof CQCBlock> = {
  args: {
    logo: {
      dark: (
        <Image src="/cqc-white.png" alt="cqc logo" width="120" height="37" />
      ),
      light: (
        <Image src="/cqc-color.png" alt="cqc logo" width="120" height="37" />
      ),
    },
    title: 'Care Quality Commission verified',
    text: 'All our hospitals are rated Good or Outstanding.',
    icon: <Icons iconName="iconCheckCircle"></Icons>,
    link: <a href="#"></a>,
  },

  decorators: [
    (Story) => (
      <Themes theme="B-HCA-Navy-Blue">
        <Story />
      </Themes>
    ),
  ],
};

export const Long: StoryObj<typeof CQCBlock> = {
  args: {
    length: 'long',
    logo: {
      dark: (
        <Image src="/cqc-white.png" alt="cqc logo" width="120" height="37" />
      ),
      light: (
        <Image src="/cqc-color.png" alt="cqc logo" width="120" height="37" />
      ),
    },
    title: 'Care Quality Commission verified',
    text: 'All our hospitals are rated Good or Outstanding.',
    icon: <Icons iconName="iconCheckCircle"></Icons>,
    link: <a href="#"></a>,
  },
  parameters: {
    backgrounds: {
      default: 'dark-blue',
      values: [{ name: 'dark-blue', value: '#0c2141' }],
    },
  },

  decorators: [
    (Story) => (
      <Themes theme="A-HCA-White">
        <Story />
      </Themes>
    ),
  ],
};

export const Rating: StoryObj<typeof CQCBlock> = {
  args: {
    logo: {
      dark: (
        <Image src="/cqc-white.png" alt="cqc logo" width="120" height="37" />
      ),
      light: (
        <Image src="/cqc-color.png" alt="cqc logo" width="120" height="37" />
      ),
    },
    icon: <Icons iconName="iconCheckCircle"></Icons>,
    rating: 'Outstanding',
    link: <a href="#"></a>,
  },

  parameters: {
    backgrounds: {
      default: 'dark-blue',
      values: [{ name: 'dark-blue', value: '#0c2141' }],
    },
  },

  decorators: [
    (Story) => (
      <Themes theme="A-HCA-White">
        <Story />
      </Themes>
    ),
  ],
};

export const RatingDark: StoryObj<typeof CQCBlock> = {
  args: {
    logo: {
      dark: (
        <Image src="/cqc-white.png" alt="cqc logo" width="120" height="37" />
      ),
      light: (
        <Image src="/cqc-color.png" alt="cqc logo" width="120" height="37" />
      ),
    },
    icon: <Icons iconName="iconCheckCircle"></Icons>,
    rating: 'Outstanding',
    link: <a href="#"></a>,
  },

  decorators: [
    (Story) => (
      <Themes theme="B-HCA-Navy-Blue">
        <Story />
      </Themes>
    ),
  ],
};
