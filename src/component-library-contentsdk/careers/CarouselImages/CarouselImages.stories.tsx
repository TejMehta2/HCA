import React from 'react';
import CarouselImages from './CarouselImages';
import type { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof CarouselImages> = {
  title: 'careers/CarouselImages',
  component: CarouselImages,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

const images = [
  <Image
    key={0}
    src="/placeholders/linda.jpg"
    alt="a nurse"
    width="643"
    height="605"
  />,
  <Image
    key={1}
    src="/placeholders/masonry-1.jpg"
    alt="masonry 1"
    width="643"
    height="605"
  />,
  <Image
    key={2}
    src="/placeholders/masonry-2.jpg"
    alt="masonry 2"
    width="643"
    height="605"
  />,
  <Image
    key={3}
    src="/placeholders/masonry-3.jpg"
    alt="masonry 3"
    width="643"
    height="605"
  />,
];

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof CarouselImages> = {
  args: {
    images: images,
  },
};

export const EqualSize: StoryObj<typeof CarouselImages> = {
  args: {
    contentVariation: 'equalSize',
    images: images,
  },
};
