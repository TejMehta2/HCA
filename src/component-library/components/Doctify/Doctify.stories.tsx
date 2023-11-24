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
    link: <a href="#"></a>,
    rating: 4,
    reviews: '13,500 +',
    theme: 'dark',
    logo: {
      dark: (
        <Image
          src="/doctify-dark.png"
          alt="doctify logo"
          width="83"
          height="21"
        />
      ),
      light: (
        <Image
          src="/doctify-light.png"
          alt="doctify logo"
          width="83"
          height="21"
        />
      ),
    },
  },

  parameters: {
    backgrounds: {
      default: 'main-turqoise',
      values: [{ name: 'main-turqoise', value: '#77c7c3' }],
    },
  },
};

export const Light: StoryObj<typeof Doctify> = {
  args: {
    link: <a href="#"></a>,
    rating: 4,
    reviews: '13,500 +',
    theme: 'light',
    logo: {
      dark: (
        <Image
          src="/doctify-dark.png"
          alt="doctify logo"
          width="83"
          height="21"
        />
      ),
      light: (
        <Image
          src="/doctify-light.png"
          alt="doctify logo"
          width="83"
          height="21"
        />
      ),
    },
  },
  parameters: {
    backgrounds: {
      default: 'dark-blue',
      values: [{ name: 'dark-blue', value: '#112f34' }],
    },
  },
};
