import React from 'react';
import CardService from './CardService';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import Image from 'next/image';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof CardService> = {
  title: 'components/CardService',
  component: CardService,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof CardService> = {
  args: {
    children: (
      <>
        <Image
          src="/placeholders/children-playing.jpg"
          alt="two children playing"
          width="643"
          height="605"
        />
        <Text variation="display-6">Cardiac Care</Text>
      </>
    ),
    link: <a href="#">Learn More</a>,
  },
};
