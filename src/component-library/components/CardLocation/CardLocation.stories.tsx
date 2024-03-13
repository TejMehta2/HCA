import React from 'react';
import CardLocation from './CardLocation';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import Themes from '../../foundation/Themes/Themes';
import Icons from '../../foundation/Icons/Icons';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof CardLocation> = {
  title: 'components/CardLocation',
  component: CardLocation,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof CardLocation> = {
  args: {
    quantity: (
      <Text tag="p" variation="display-1">
        72
      </Text>
    ),
    title: (
      <Text tag="p" variation="heading-2">
        Locations across the UK
      </Text>
    ),
    subtitle: (
      <Text tag="p" variation={'subheading-2'}>
        Scroll down to explore
      </Text>
    ),
    icon: <Icons iconName={'iconArrowDown'} />,
  },
  decorators: [
    (Story) => (
      <Themes theme={'B-HCA-Navy-Blue'}>
        <Story />
      </Themes>
    ),
  ],
};

export const Location: StoryObj<typeof CardLocation> = {
  args: {
    quantity: (
      <Text tag="p" variation="display-1">
        64
      </Text>
    ),
    title: (
      <Text tag="p" variation="heading-2">
        Locations across London
      </Text>
    ),
    cta: (
      <a href="#">
        <span>
          View <strong>all</strong>
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
