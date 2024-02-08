import React from 'react';
import HeaderWithImage from './HeaderWithImage';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';
import Icons from '../../foundation/Icons/Icons';
import Image from 'next/image';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof HeaderWithImage> = {
  title: 'site-components/HeaderWithImage',
  component: HeaderWithImage,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
  argTypes: {
    title: {
      control: false,
      table: {
        disable: true,
      },
    },
    copy: {
      control: false,
      table: {
        disable: true,
      },
    },
    ctas: {
      control: false,
      table: {
        disable: true,
      },
    },
    image: {
      control: false,
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof HeaderWithImage> = {
  args: {
    title: (
      <Text variation="display-1" tag="h2">
        Services lines
      </Text>
    ),
    copy: (
      <Text variation="body-large" tag="p">
        Quis laboris proident sint amet id cillum do dolor in tempor est.
        Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
        laborum et culpa minim. Commodo ex laboris pariatur labore nostrud
        dolore.
      </Text>
    ),
    ctas: (
      <>
        <Button size="large" theme="full" contentVariation="full-width">
          <a href="#">
            <Icons iconName="iconStethoscope" />
            <span>
              Find a <strong>Consultant</strong>
            </span>
          </a>
        </Button>
        <Button size="large" theme="outline" contentVariation="full-width">
          <a href="#">
            <Icons iconName="iconPhone" />
            <span>
              Call us <strong>today</strong>
            </span>
          </a>
        </Button>
      </>
    ),
    image: (
      <Image
        src="/placeholders/lab-technician.jpeg"
        alt="lab technician"
        width="1024"
        height="683"
      />
    ),
    theme: 'B-HCA-Green',
  },
};
