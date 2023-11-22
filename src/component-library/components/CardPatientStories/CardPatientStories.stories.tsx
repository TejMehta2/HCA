import React from 'react';
import Image from 'next/image';
import CardPatientStories from './CardPatientStories';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof CardPatientStories> = {
  title: 'components/CardPatientStories',
  component: CardPatientStories,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof CardPatientStories> = {
  args: {
    image: (
      <Image
        src="/side-scrolling-placeholder.png"
        alt="baby crying"
        width="456"
        height="253"
      />
    ),
    title: <span>Every new birth tells its own story</span>,
    bodyCopy: (
      <span>
        Quis laboris proident sint amet id cillum do dolor in tempor est
        exercitation aute sint tempor eu ut.
      </span>
    ),
    link: (
      <a href="#">
        <span>
          Read the <strong>Story</strong>
        </span>
      </a>
    ),
  },
};
