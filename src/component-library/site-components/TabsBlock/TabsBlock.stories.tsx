import React from 'react';
import TabsBlock from './TabsBlock';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import Image from 'next/image';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof TabsBlock> = {
  title: 'site-components/TabsBlock',
  component: TabsBlock,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Default: StoryObj<typeof TabsBlock> = {
  args: {
    theme: 'L-HCA-Teal-5',
    title: (
      <Text tag="h2" variation="display-4">
        Our appointments & memberships
      </Text>
    ),
    tabsContent: [
      {
        tab: { icon: 'iconOneOff', label: 'One-off' },
        image: (
          <Image
            src="/placeholders/riverside-building-at-dusk.png"
            alt="riverside building at dusk"
            width="643"
            height="605"
          />
        ),
        title: (
          <Text tag="h3" variation="display-5">
            One-off appointments
          </Text>
        ),
        bodyCopy: (
          <Text tag="p" variation="body-large">
            Quis laboris proident sint amet id cillum do dolor in tempor est.
            Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
            laborum et culpa minim. Commodo ex laboris pariatur labore nostrud
            dolore ad sit occaecat. Qui ipsum in minim. Nostrud duis cupidatat
            sunt lorem ut.
          </Text>
        ),
      },
      {
        tab: { icon: 'iconFlexible', label: 'Flexi' },
        image: (
          <Image
            src="/placeholders/riverside-building-at-dusk.png"
            alt="riverside building at dusk"
            width="643"
            height="605"
          />
        ),
        title: (
          <Text tag="h3" variation="display-5">
            Flexi appointments
          </Text>
        ),
        bodyCopy: (
          <Text tag="p" variation="body-large">
            Quis laboris proident sint amet id cillum do dolor in tempor est.
            Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
            laborum et culpa minim. Commodo ex laboris pariatur labore nostrud
            dolore ad sit occaecat. Qui ipsum in minim. Nostrud duis cupidatat
            sunt lorem ut.
          </Text>
        ),
      },
      {
        tab: { icon: 'iconCalendar', label: 'Annual' },
        image: (
          <Image
            src="/placeholders/riverside-building-at-dusk.png"
            alt="riverside building at dusk"
            width="643"
            height="605"
          />
        ),
        title: (
          <Text tag="h3" variation="display-5">
            Annual appointments
          </Text>
        ),
        bodyCopy: (
          <Text tag="p" variation="body-large">
            Quis laboris proident sint amet id cillum do dolor in tempor est.
            Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
            laborum et culpa minim. Commodo ex laboris pariatur labore nostrud
            dolore ad sit occaecat. Qui ipsum in minim. Nostrud duis cupidatat
            sunt lorem ut.
          </Text>
        ),
      },
    ],
  },
};
