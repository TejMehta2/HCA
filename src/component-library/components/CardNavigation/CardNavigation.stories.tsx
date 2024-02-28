import React from 'react';
import CardNavigation from './CardNavigation';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import Themes from '../../foundation/Themes/Themes';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof CardNavigation> = {
  title: 'components/CardNavigation',
  component: CardNavigation,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const FeaturedService: StoryObj<typeof CardNavigation> = {
  args: {
    title: (
      <Text tag="p" variation="heading-2">
        Featured Scan
      </Text>
    ),
    body: (
      <Text tag="p" variation="body-medium">
        Ea et ea voluptate culpa laborum qui. Enim eiusmod qui ullamco aute
        anim.
      </Text>
    ),
    cta: (
      <a href="#">
        <span>
          Learn <strong>more</strong>
        </span>
      </a>
    ),
    date: <time dateTime="Sept 7, 2023">Sept 7, 2023</time>,
    tag: <a href="#">Blog</a>,
  },
  decorators: [
    (Story) => (
      <Themes theme="B-HCA-Navy-Blue">
        <div style={{ background: 'var(--background)', padding: '1rem' }}>
          <Story />
        </div>
      </Themes>
    ),
  ],
};

export const FeaturedBlog: StoryObj<typeof CardNavigation> = {
  args: {
    date: <time dateTime="Sept 7, 2023">Sept 7, 2023</time>,
    title: (
      <Text tag="p" variation="heading-2">
        <a href="#">Test or scan related blog article</a>
      </Text>
    ),
    body: (
      <Text tag="p" variation="body-medium">
        Ea et ea voluptate culpa laborum qui. Enim eiusmod qui ullamco aute
        anim.
      </Text>
    ),
    cta: (
      <a href="#">
        <span>
          Learn <strong>more</strong>
        </span>
      </a>
    ),
    tag: <a href="#">Blog</a>,
  },
  decorators: [
    (Story) => (
      <Themes theme="B-HCA-Navy-Blue">
        <div style={{ background: 'var(--background)', padding: '1rem' }}>
          <Story />
        </div>
      </Themes>
    ),
  ],
};
