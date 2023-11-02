import React from 'react';
import Button from './Button';
import Icons from '../../foundation/Icons/Icons';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Button> = {
  title: 'core-components/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const LargeFullDark: StoryObj<typeof Button> = {
  args: {
    size: 'large',
    children: (
      <>
        <button type="button">
          <Icons iconName="iconPhone" />
          Large <strong>Button</strong>
        </button>
      </>
    ),
    theme: 'full-dark',
  },
};

export const LargeFullLight: StoryObj<typeof Button> = {
  args: {
    size: 'large',
    children: (
      <a href="#">
        <span>
          Large <strong>Button</strong>
        </span>
      </a>
    ),
    theme: 'full-light',
  },
  parameters: {
    backgrounds: {
      default: 'dark-blue',
      values: [{ name: 'dark-blue', value: '#112f34' }],
    },
  },
};

export const LargeOutlineDark: StoryObj<typeof Button> = {
  args: {
    size: 'large',
    children: (
      <>
        <button type="button">
          Large <strong>Button</strong>
          <Icons iconName="iconPhone" />
        </button>
      </>
    ),
    theme: 'outline-dark',
  },
};

export const LargeOutlineLight: StoryObj<typeof Button> = {
  args: {
    size: 'large',
    children: (
      <>
        <button type="button">
          Large <strong>Button</strong>
          <Icons iconName="iconPhone" />
        </button>
      </>
    ),
    theme: 'outline-light',
  },

  parameters: {
    backgrounds: {
      default: 'dark-blue',
      values: [{ name: 'dark-blue', value: '#112f34' }],
    },
  },
};

export const SmallFullDark: StoryObj<typeof Button> = {
  args: {
    size: 'small',
    children: (
      <>
        <button type="button">
          Small <strong>Button</strong>
          <Icons iconName="iconPhone" />
        </button>
      </>
    ),
    theme: 'full-dark',
  },
};

export const SmallFullLight: StoryObj<typeof Button> = {
  args: {
    size: 'small',
    children: (
      <>
        <button type="button">
          Small <strong>Button</strong>
          <Icons iconName="iconPhone" />
        </button>
      </>
    ),
    theme: 'full-light',
  },

  parameters: {
    backgrounds: {
      default: 'dark-blue',
      values: [{ name: 'dark-blue', value: '#112f34' }],
    },
  },
};

export const SmallOutlineLight: StoryObj<typeof Button> = {
  args: {
    size: 'small',
    children: (
      <>
        <button type="button">
          Small <strong>Button</strong>
          <Icons iconName="iconPhone" />
        </button>
      </>
    ),
    theme: 'outline-light',
  },

  parameters: {
    backgrounds: {
      default: 'dark-blue',
      values: [{ name: 'dark-blue', value: '#112f34' }],
    },
  },
};

export const SmallOutlineDark: StoryObj<typeof Button> = {
  args: {
    size: 'small',
    children: (
      <>
        <button type="button">
          Small <strong>Button</strong>
          <Icons iconName="iconPhone" />
        </button>
      </>
    ),
    theme: 'outline-dark',
  },
};

export const SmallFullLightBlue: StoryObj<typeof Button> = {
  args: {
    size: 'small',
    children: (
      <>
        <button type="button">
          Small <strong>Button</strong>
          <Icons iconName="iconPhone" />
        </button>
      </>
    ),
    theme: 'full-light-blue',
  },
};

export const SocialLight: StoryObj<typeof Button> = {
  args: {
    size: 'small',
    theme: 'social-light',
    children: (
      <>
        <button>
          <Icons iconName="iconFacebook" />
          <span className="sr-only">Facebook link</span>
        </button>
      </>
    ),
  },
};

export const SocialDark: StoryObj<typeof Button> = {
  args: {
    size: 'small',
    theme: 'social-dark',
    children: (
      <>
        <button>
          <Icons iconName="iconFacebook" />
          <span className="sr-only">Instagram link</span>
        </button>
      </>
    ),
  },
  parameters: {
    backgrounds: {
      default: 'dark-blue',
      values: [{ name: 'dark-blue', value: '#112f34' }],
    },
  },
};
const loading = true;
export const LoadingLargeFullDark: StoryObj<typeof Button> = {
  args: {
    loading: loading,
    size: 'large',
    children: (
      <button type="button">
        <span>test text</span>
      </button>
    ),
    theme: 'full-dark',
  },
};

export const CarouselButton: StoryObj<typeof Button> = {
  args: {
    size: 'small',
    theme: 'carousel',
    children: (
      <button>
        <Icons iconName="iconArrowRight" />
        <span className="sr-only">Next Slide</span>
      </button>
    ),
  },
};
