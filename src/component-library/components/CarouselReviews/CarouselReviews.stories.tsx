import React from 'react';
import CarouselReviews from './CarouselReviews';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof CarouselReviews> = {
  title: 'components/CarouselReviews',
  component: CarouselReviews,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof CarouselReviews> = {
  args: {
    theme: 'k',
    rating: 4.85,
    reviewCount: <span>13,500+ reviews</span>,
    children: [
      <Text key={1} tag="p" variation="body-extra-large">
        All the staff and services at The Wellington were exemplary. It was like
        being treated in a 6* hospital within a 4-5* star hotel. All my needs
        were immediately attended to. The team had the utmost patience and
        flexibility
      </Text>,
      <Text key={1} tag="p" variation="body-extra-large">
        2 All the staff and services at The Wellington were exemplary. It was
        like being treated in a 6* hospital within a 4-5* star hotel. All my
        needs were immediately attended to. The team had the utmost patience and
        flexibility
      </Text>,
    ],
  },
};
