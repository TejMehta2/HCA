import React from 'react';
import Button from './Button';
import Icons from '../../foundation/Icons/Icons';
import type { Meta, StoryObj } from '@storybook/react';

import Themes from '../../foundation/Themes/Themes';

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

const exampleClick = () => {
  alert('Button was clicked');
};

export const LargeFullDark: StoryObj<typeof Button> = {
  args: {
    size: 'large',
    children: (
      <button type="button" onClick={exampleClick}>
        <Icons iconName="iconPhone" />
        <span>
          Large <strong>Button</strong>
        </span>
      </button>
    ),
    variation: 'full-dark',
  },

  decorators: [
    (Story) => (
      <Themes theme="A-HCA-White">
        <Story />
      </Themes>
    ),
  ],
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
    variation: 'full-light',
  },

  decorators: [
    (Story) => (
      <Themes theme="B-HCA-Navy-Blue">
        <Story />
      </Themes>
    ),
  ],

  parameters: {
    backgrounds: {
      default: 'dark-blue',
      values: [{ name: 'dark-blue', value: '#0c2141' }],
    },
  },
};

export const LargeOutlineDark: StoryObj<typeof Button> = {
  args: {
    size: 'large',
    children: (
      <>
        <button type="button">
          <span>
            Large <strong>Button</strong>
          </span>
          <Icons iconName="iconPhone" />
        </button>
      </>
    ),
    variation: 'outline-dark',
  },

  decorators: [
    (Story) => (
      <Themes theme="A-HCA-White">
        <Story />
      </Themes>
    ),
  ],
};

export const LargeOutlineLight: StoryObj<typeof Button> = {
  args: {
    size: 'large',
    children: (
      <>
        <button type="button">
          <span>
            Large <strong>Button</strong>
          </span>
          <Icons iconName="iconPhone" />
        </button>
      </>
    ),
    variation: 'outline-light',
  },

  parameters: {
    backgrounds: {
      default: 'dark-blue',
      values: [{ name: 'dark-blue', value: '#0c2141' }],
    },
  },

  decorators: [
    (Story) => (
      <Themes theme="B-HCA-Navy-Blue">
        <Story />
      </Themes>
    ),
  ],
};

export const SmallFullDark: StoryObj<typeof Button> = {
  args: {
    size: 'small',
    children: (
      <>
        <button type="button">
          <span>
            Small <strong>Button</strong>
          </span>
          <Icons iconName="iconPhone" />
        </button>
      </>
    ),
    variation: 'full-dark',
  },

  decorators: [
    (Story) => (
      <Themes theme="A-HCA-White">
        <Story />
      </Themes>
    ),
  ],
};

export const SmallFullLight: StoryObj<typeof Button> = {
  args: {
    size: 'small',
    children: (
      <>
        <button type="button">
          <span>
            Small <strong>Button</strong>
          </span>
          <Icons iconName="iconPhone" />
        </button>
      </>
    ),
    variation: 'full-light',
  },

  parameters: {
    backgrounds: {
      default: 'dark-blue',
      values: [{ name: 'dark-blue', value: '#0c2141' }],
    },
  },

  decorators: [
    (Story) => (
      <Themes theme="B-HCA-Navy-Blue">
        <Story />
      </Themes>
    ),
  ],
};

export const SmallOutlineDark: StoryObj<typeof Button> = {
  args: {
    size: 'small',
    children: (
      <>
        <button type="button">
          <span>
            Small <strong>Button</strong>
          </span>
          <Icons iconName="iconPhone" />
        </button>
      </>
    ),
    variation: 'outline-dark',
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
    variation: 'outline-light',
  },

  parameters: {
    backgrounds: {
      default: 'dark-blue',
      values: [{ name: 'dark-blue', value: '#0c2141' }],
    },
  },

  decorators: [
    (Story) => (
      <Themes theme="B-HCA-Navy-Blue">
        <Story />
      </Themes>
    ),
  ],
};

export const SmallFullLightBlue: StoryObj<typeof Button> = {
  args: {
    size: 'small',
    children: (
      <>
        <button type="button">
          <span>
            Small <strong>Button</strong>
          </span>
          <Icons iconName="iconPhone" />
        </button>
      </>
    ),
    variation: 'full-light-blue',
  },
};

export const SocialDark: StoryObj<typeof Button> = {
  args: {
    size: 'small',
    variation: 'social-dark',
    children: (
      <>
        <button>
          <Icons iconName="iconFacebook" />
          <span className="sr-only">Instagram link</span>
        </button>
      </>
    ),
  },
};

export const SocialLight: StoryObj<typeof Button> = {
  args: {
    size: 'small',
    variation: 'social-light',
    children: (
      <>
        <button>
          <Icons iconName="iconFacebook" />
          <span className="sr-only">Facebook link</span>
        </button>
      </>
    ),
  },
  parameters: {
    backgrounds: {
      default: 'dark-blue',
      values: [{ name: 'dark-blue', value: '#0c2141' }],
    },
  },

  decorators: [
    (Story) => (
      <div style={{ background: 'navy-blue-100' }}>
        <Story />
      </div>
    ),
  ],
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
    variation: 'full-dark',
  },
};

export const StandardCarouselButtonDark: StoryObj<typeof Button> = {
  args: {
    size: 'small',
    variation: 'standard-carousel-dark',
    children: (
      <button>
        <Icons iconName="iconArrowRight" />
        <span className="sr-only">Next Slide</span>
      </button>
    ),
  },
};

export const StandardCarouselButtonLight: StoryObj<typeof Button> = {
  args: {
    size: 'small',
    variation: 'standard-carousel-light',
    children: (
      <button>
        <Icons iconName="iconArrowRight" />
        <span className="sr-only">Next Slide</span>
      </button>
    ),
  },

  parameters: {
    backgrounds: {
      default: 'dark-blue',
      values: [{ name: 'dark-blue', value: '#0c2141' }],
    },
  },

  decorators: [
    (Story) => (
      <div style={{ background: 'navy-blue-100' }}>
        <Story />
      </div>
    ),
  ],
};

export const HoverCarouselButton: StoryObj<typeof Button> = {
  args: {
    size: 'small',
    variation: 'hover-carousel',
    children: (
      <button>
        <Icons iconName="iconArrowRight" />
        <span className="sr-only">Next Slide</span>
      </button>
    ),
  },
};

export const ResponsiveContainerExample: StoryObj<typeof Button> = {
  args: {
    size: 'large',
    children: (
      <button type="button" onClick={exampleClick}>
        <Icons iconName="iconPhone" />
        <span>
          Large <strong>Button</strong>
        </span>
      </button>
    ),
    variation: 'full-dark',
  },

  decorators: [
    (Story) => (
      <div style={{ padding: '1rem' }}>
        <Themes theme="A-HCA-White">
          <Story />
        </Themes>
      </div>
    ),
  ],

  parameters: {
    layout: 'fullscreen',
  },
};
