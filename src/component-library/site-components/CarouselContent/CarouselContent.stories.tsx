import React from 'react';
import CarouselContent from './CarouselContent';
import type { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';
import Text from '../../foundation/Text/Text';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof CarouselContent> = {
  title: 'site-components/CarouselContent',
  component: CarouselContent,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof CarouselContent> = {
  args: {
    theme: 'A-HCA-White',
    slides: [
      {
        title: (
          <Text tag="h2" variation="display-2">
            How to plan your visit
          </Text>
        ),
        body: (
          <Text tag="p" variation="body-large">
            Quis laboris proident sint amet id cillum do dolor in tempor est.
            Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
            laborum et culpa minim. Commodo ex laboris pariatur labore nostrud
            dolore ad sit occaecat. Qui ipsum in minim. Nostrud duis cupidatat
            sunt lorem ut.
          </Text>
        ),
        image: (
          <Image
            src="/placeholders/carousel-content.jpg"
            alt="two children playing"
            width="643"
            height="605"
          />
        ),
      },
      {
        title: (
          <Text tag="h2" variation="display-2">
            How to plan your visit
          </Text>
        ),
        body: (
          <Text tag="p" variation="body-large">
            Quis laboris proident sint amet id cillum do dolor in tempor est.
            Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
            laborum et culpa minim. Commodo ex laboris pariatur labore nostrud
            dolore ad sit occaecat. Qui ipsum in minim. Nostrud duis cupidatat
            sunt lorem ut.
          </Text>
        ),
        image: (
          <Image
            src="/placeholders/carousel-content-2.png"
            alt="two children playing"
            width="643"
            height="605"
          />
        ),
      },
    ],
  },
};
