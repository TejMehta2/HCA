import React from 'react';
import ServiceCards from './ServiceCards';
import type { Meta, StoryObj } from '@storybook/react';

import CardService from '../../components/CardService/CardService';
import Text from '../../foundation/Text/Text';
import Image from 'next/image';
import Icons from '../../foundation/Icons/Icons';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ServiceCards> = {
  title: 'site-components/ServiceCards',
  component: ServiceCards,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof ServiceCards> = {
  args: {
    title: <Text variation="display-2">Exceptional care you can trust</Text>,
    subtitle: <Text variation="subheading-1">our service lines</Text>,
    bodyText: (
      <Text>
        Quis laboris proident sint amet id cillum do dolor in tempor est.
        Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
        laborum et culpa minim. Commodo ex laboris pariatur labore nostrud
        dolore.
      </Text>
    ),
    cta: (
      <a href="#">
        <Icons iconName="iconSearch"></Icons>{' '}
        <span>
          Search all <strong>service lines</strong>
        </span>
      </a>
    ),
    children: [
      <>
        <CardService link={<a href="#">Learn More</a>}>
          <Image
            src="/placeholders/children-playing.jpg"
            alt="two children playing"
            width="643"
            height="605"
          />
          <Text variation="display-6">Cardiac Care 1</Text>
        </CardService>

        <CardService link={<a href="#">Learn More</a>}>
          <Image
            src="/placeholders/children-playing.jpg"
            alt="two children playing"
            width="643"
            height="605"
          />
          <Text variation="display-6">Cardiac Care 2</Text>
        </CardService>

        <CardService link={<a href="#">Learn More</a>}>
          <Image
            src="/placeholders/children-playing.jpg"
            alt="two children playing"
            width="643"
            height="605"
          />
          <Text variation="display-6">Cardiac Care 3</Text>
        </CardService>

        <CardService link={<a href="#">Learn More</a>}>
          <Image
            src="/placeholders/children-playing.jpg"
            alt="two children playing"
            width="643"
            height="605"
          />
          <Text variation="display-6">Cardiac Care 4</Text>
        </CardService>

        <CardService link={<a href="#">Learn More</a>}>
          <Image
            src="/placeholders/children-playing.jpg"
            alt="two children playing"
            width="643"
            height="605"
          />
          <Text variation="display-6">Cardiac Care 5</Text>
        </CardService>
      </>,
    ],
  },
};
