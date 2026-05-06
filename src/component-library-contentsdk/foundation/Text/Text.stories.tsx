import Text from './Text';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Text> = {
  title: 'foundation/Text',
  component: Text,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Display1: StoryObj<typeof Text> = {
  args: {
    tag: 'h1',
    variation: 'display-1',
    children: 'Display 1',
  },
};

export const Display2: StoryObj<typeof Text> = {
  args: {
    tag: 'h2',
    variation: 'display-2',
    children: 'Display 2',
  },
};

export const Display3: StoryObj<typeof Text> = {
  args: {
    tag: 'h3',
    variation: 'display-3',
    children: 'Display 3',
  },
};

export const Display4: StoryObj<typeof Text> = {
  args: {
    tag: 'h4',
    variation: 'display-4',
    children: 'Display 4',
  },
};

export const Display5: StoryObj<typeof Text> = {
  args: {
    tag: 'h5',
    variation: 'display-5',
    children: 'Display 5',
  },
};

export const Display6: StoryObj<typeof Text> = {
  args: {
    tag: 'h6',
    variation: 'display-6',
    children: 'Display 6',
  },
};

export const Heading1: StoryObj<typeof Text> = {
  args: {
    tag: 'h1',
    variation: 'heading-1',
    children: 'Heading 1',
  },
};

export const Heading2: StoryObj<typeof Text> = {
  args: {
    tag: 'h2',
    variation: 'heading-2',
    children: 'Heading 2',
  },
};

export const Subheading1: StoryObj<typeof Text> = {
  args: {
    tag: 'p',
    variation: 'subheading-1',
    children: 'Subheading 1',
  },
};

export const Subheading2: StoryObj<typeof Text> = {
  args: {
    tag: 'p',
    variation: 'subheading-2',
    children: 'Subheading 2',
  },
};

export const BodyExtraLarge: StoryObj<typeof Text> = {
  args: {
    tag: 'p',
    variation: 'body-extra-large',
    children: 'Body Extra Large',
  },
};

export const BodyMediumExtraLarge: StoryObj<typeof Text> = {
  args: {
    tag: 'p',
    variation: 'body-medium-extra-large',
    children: 'Body Medium Extra Large',
  },
};

export const BodyBoldExtraLarge: StoryObj<typeof Text> = {
  args: {
    tag: 'p',
    variation: 'body-bold-extra-large',
    children: 'Body Bold Extra Large',
  },
};

export const BodyLarge: StoryObj<typeof Text> = {
  args: {
    tag: 'p',
    variation: 'body-large',
    children: 'Body Large',
  },
};

export const BodyMediumLarge: StoryObj<typeof Text> = {
  args: {
    tag: 'p',
    variation: 'body-medium-large',
    children: 'Body Medium Large',
  },
};

export const BodyBoldLarge: StoryObj<typeof Text> = {
  args: {
    tag: 'p',
    variation: 'body-bold-large',
    children: 'Body Bold Large',
  },
};

export const BodyMedium: StoryObj<typeof Text> = {
  args: {
    tag: 'p',
    variation: 'body-medium',
    children: 'Body Medium',
  },
};

export const BodyMediumMedium: StoryObj<typeof Text> = {
  args: {
    tag: 'p',
    variation: 'body-medium-medium',
    children: 'Body Medium Medium',
  },
};

export const BodyBoldMedium: StoryObj<typeof Text> = {
  args: {
    tag: 'p',
    variation: 'body-bold-medium',
    children: 'Body Bold Medium',
  },
};

export const BodySmall: StoryObj<typeof Text> = {
  args: {
    tag: 'p',
    variation: 'body-small',
    children: 'Body Small',
  },
};

export const BodyMediumSmall: StoryObj<typeof Text> = {
  args: {
    tag: 'p',
    variation: 'body-medium-small',
    children: 'Body Medium Small',
  },
};

export const BodyBoldSmall: StoryObj<typeof Text> = {
  args: {
    tag: 'p',
    variation: 'body-bold-small',
    children: 'Body Bold Small',
  },
};

export const Decorative: StoryObj<typeof Text> = {
  args: {
    tag: 'p',
    variation: 'decorative',
    children: 'Decorative',
  },
};
