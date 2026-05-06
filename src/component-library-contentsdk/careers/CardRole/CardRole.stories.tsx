import React from 'react';
import CardRole from './CardRole';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';
import Icons from '../../foundation/Icons/Icons';
import Image from 'next/image';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof CardRole> = {
  title: 'careers/CardRole',
  component: CardRole,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof CardRole> = {
  args: {
    image: (
      <Image
        src="/placeholders/children-playing.jpg"
        alt="two children playing"
        width="643"
        height="605"
      />
    ),
    icon: <Icons iconName="iconHospital48" />,
    title: (
      <Text variation="heading-2" tag="h4">
        Nursing & Front Line Clinical Services
      </Text>
    ),
    cta: (
      <Button size="small" variation="full">
        <a href="#">
          <span>
            <Icons iconName="iconArrowSmallRight" />
          </span>
        </a>
      </Button>
    ),
  },
};
