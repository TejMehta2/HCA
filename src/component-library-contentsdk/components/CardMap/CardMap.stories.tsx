import React from 'react';
import Image from 'next/image';
import CardMap from './CardMap';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import Icons from '../../foundation/Icons/Icons';
import Themes from '../../foundation/Themes/Themes';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof CardMap> = {
  title: 'components/CardMap',
  component: CardMap,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },

  decorators: [
    (Story) => (
      <Themes theme={'A-HCA-White'}>
        <Story />
      </Themes>
    ),
  ],
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof CardMap> = {
  args: {
    image: (
      <Image
        src="/placeholders/location-card.jpg"
        alt="a building"
        width="358"
        height="176"
      />
    ),
    title: (
      <Text tag="h3" variation="heading-1">
        The Harley Street Clinic
      </Text>
    ),
    address: (
      <Text tag="h3" variation="body-large">
        35 Weymouth Street W1G 8BJ London
      </Text>
    ),
    distance: (
      <Text tag="h3" variation="body-bold-small">
        0.12 miles from your location
      </Text>
    ),
    ctas: {
      button1: (
        <a href="#">
          <span>
            Learn <strong>more</strong>
          </span>
        </a>
      ),
      button2: (
        <a href="#">
          <span>
            Get <strong>directions</strong>
          </span>
        </a>
      ),
    },
  },
};

export const NoImage: StoryObj<typeof CardMap> = {
  args: {
    title: (
      <Text tag="h3" variation="heading-1">
        The Harley Street Clinic
      </Text>
    ),
    address: (
      <Text tag="h3" variation="body-large">
        35 Weymouth Street W1G 8BJ London
      </Text>
    ),
    distance: (
      <Text tag="p" variation="body-bold-small">
        0.12 miles from your location
      </Text>
    ),
    ctas: {
      button1: (
        <a href="#">
          <span>
            Learn <strong>more</strong>
          </span>
        </a>
      ),
      button2: (
        <a href="#">
          <span>
            Get <strong>directions</strong>
          </span>
        </a>
      ),
    },
  },
};

export const NoDistance: StoryObj<typeof CardMap> = {
  args: {
    title: (
      <Text tag="h3" variation="heading-1">
        The Harley Street Clinic
      </Text>
    ),
    address: (
      <Text tag="p" variation="body-large">
        35 Weymouth Street W1G 8BJ London
      </Text>
    ),
    ctas: {
      button1: (
        <a href="#">
          <span>
            Learn <strong>more</strong>
          </span>
        </a>
      ),
      button2: (
        <a href="#">
          <span>
            Get <strong>directions</strong>
          </span>
        </a>
      ),
    },
  },
};

export const OnMap: StoryObj<typeof CardMap> = {
  args: {
    title: (
      <Text tag="h3" variation="heading-2">
        The Harley Street Clinic
      </Text>
    ),
    address: (
      <Text tag="p" variation="body-large">
        35 Weymouth Street W1G 8BJ London
      </Text>
    ),
    ctas: {
      button1: (
        <a href="#">
          <span>
            Learn <strong>more</strong>
          </span>
        </a>
      ),
      button2: (
        <a href="#">
          <span>
            Get <strong>directions</strong>
          </span>
        </a>
      ),
      close: (
        <button onClick={() => alert('close map popup')}>
          <span>Close</span>
          <Icons iconName="iconCross" />
        </button>
      ),
    },
  },
};
