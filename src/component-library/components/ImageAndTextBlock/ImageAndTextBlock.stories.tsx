import React from 'react';
import ImageAndTextBlock from './ImageAndTextBlock';
import type { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ImageAndTextBlock> = {
  title: 'components/ImageAndTextBlock',
  component: ImageAndTextBlock,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof ImageAndTextBlock> = {
  args: {
    image: (
      <Image
        //src="/static/images/image-and-text-component-placeholder.jpg"
        src="https://placedog.net/500"
        alt="two children playing"
        width="643"
        height="605"
      />
    ),
    children: (
      <>
        <Text tag="h3" variation="subheading-1">
          New to private healthcare?
        </Text>
        <Text tag="h2" variation="display-2">
          New to private healthcare?
        </Text>
        <Text tag="p" variation="body-large">
          Quis laboris proident sint amet id cillum do dolor in tempor est.
          Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
          laborum et culpa minim. Commodo ex laboris pariatur labore nostrud
          dolore ad sit occaecat. Qui ipsum in minim. Nostrud duis cupidatat
          sunt lorem ut.
        </Text>
        <Button size="large" theme="full-dark">
          <button>Learn more about self-pay</button>
        </Button>
        <Button size="large" theme="outline-dark">
          <button>Access care with insurance</button>
        </Button>
      </>
    ),
  },
};
