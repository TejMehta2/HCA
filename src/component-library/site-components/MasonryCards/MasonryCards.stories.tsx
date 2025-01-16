import React from 'react';
import MasonryCards, { MasonryCard } from './MasonryCards';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import TextButton from '../../core-components/TextButton/TextButton';
import Image from 'next/image';
import Themes from '../../foundation/Themes/Themes';
import Button from '../../core-components/Button/Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof MasonryCards> = {
  title: 'site-components/MasonryCards',
  component: MasonryCards,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof MasonryCards> = {
  args: {
    subtitle: <Text variation="subheading-1">making you comfortable</Text>,
    title: <Text variation="display-2">Your stay at HCA UK</Text>,
    children: (
      <>
        <MasonryCard
          columns={6}
          rows={2}
          image={
            <Image
              src="/placeholders/masonry-1.jpg"
              alt=""
              width={4096}
              height={3072}
            />
          }
          title={
            <Text variation="display-3">
              Discover our world class facilities
            </Text>
          }
          copy={
            <Text variation="body-large">
              Your time with us is about more than expert treatment and
              state-of-the-art facilities. From beautiful rooms to luxurious
              bathrooms you’ll find spaces to relax and recuperate in your own
              time and at your own pace.
            </Text>
          }
          cta={
            <TextButton theme="light">
              <a href="#">
                <span>Take a virtual tour</span>
              </a>
            </TextButton>
          }
        />
        <MasonryCard
          columns={6}
          rows={1}
          image={
            <Image
              src="/placeholders/masonry-2.jpg"
              alt=""
              width={4096}
              height={2160}
            />
          }
          title={<Text variation="display-6">Pioneering treatments</Text>}
          cta={
            <TextButton theme="light">
              <a href="#">
                <span>Learn more</span>
              </a>
            </TextButton>
          }
        />
        <MasonryCard
          columns={3}
          rows={1}
          image={
            <Image
              src="/placeholders/masonry-3.jpg"
              alt=""
              width={4096}
              height={2730}
            />
          }
          title={<Text variation="display-6">Luxurious rooms</Text>}
          cta={
            <TextButton theme="light">
              <a href="#">
                <span>Learn more</span>
              </a>
            </TextButton>
          }
        />
        <MasonryCard
          columns={3}
          rows={1}
          image={
            <Image
              src="/placeholders/masonry-4.jpg"
              alt=""
              width={4096}
              height={2731}
            />
          }
          title={<Text variation="display-6">Seasonal menus</Text>}
          cta={
            <TextButton theme="light">
              <a href="#">
                <span>Learn more</span>
              </a>
            </TextButton>
          }
        />
      </>
    ),
  },
  decorators: [
    (Story) => (
      <Themes theme="L-HCA-Teal-5">
        <Story />
      </Themes>
    ),
  ],
};

export const WithCta: StoryObj<typeof MasonryCards> = {
  args: {
    ...Default.args,
    cta: (
      <Button variation="full" size="large">
        <a href="#">Find out more</a>
      </Button>
    ),
  },
  decorators: [
    (Story) => (
      <Themes theme="L-HCA-Teal-5">
        <Story />
      </Themes>
    ),
  ],
};
