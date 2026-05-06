import React from 'react';
import CardBlogBlock from './CardBlogBlock';
import type { Meta, StoryObj } from '@storybook/react';
import CardBlog from '../../components/CardBlog/CardBlog';
import Text from '../../foundation/Text/Text';
import Tags from '../../core-components/Tags/Tags';
import Button from '../../core-components/Button/Button';
import Image from 'next/image';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof CardBlogBlock> = {
  title: 'site-components/CardBlogBlock',
  component: CardBlogBlock,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
  argTypes: {
    title: {
      control: false,
      table: {
        disable: true,
      },
    },
    children: {
      control: false,
      table: {
        disable: true,
      },
    },
    cta: {
      control: false,
      table: {
        disable: true,
      },
    },
  },
};

const cardFeature = (
  <CardBlog variation={'feature'}>
    <Image
      src="/placeholders/children-playing.jpg"
      alt="two children playing"
      width="643"
      height="605"
    />
    <time dateTime="Sept 7, 2023">Sept 7, 2023</time>
    <Text tag="h3" variation={'display-5'}>
      <a href="#">HCA UK launches rapid response referral service</a>
    </Text>
    <Text variation={'body-large'}>
      There are over 1400 at The Portland, each year. Hear new mums sharing
      theirs
    </Text>
    <Tags>
      <a href="#">Announcement</a>
    </Tags>
  </CardBlog>
);

const cardStandard = (
  <CardBlog>
    <time dateTime="Sept 7, 2023">Sept 7, 2023</time>
    <Text tag="h3" variation={'heading-2'}>
      <a href="#">
        The Harley Street Clinic retain CQC &apos;Outstanding&apos; rating
      </a>
    </Text>
    <Tags>
      <a href="#">Announcement</a>
    </Tags>
  </CardBlog>
);

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof CardBlogBlock> = {
  args: {
    title: (
      <Text variation={'display-5'}>
        <span>From the blog</span>
      </Text>
    ),
    children: (
      <>
        {cardFeature}
        {cardStandard}
        {cardStandard}
        {cardStandard}
        {cardStandard}
      </>
    ),
    cta: (
      <Button size={'large'} variation={'full'}>
        <a href="#">
          Visit our <strong>blog</strong>
        </a>
      </Button>
    ),
  },
};
