import React from 'react';
import ScrollTransition from './ScrollTransition';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import HeaderPlain from '../../site-components/HeaderPlain/HeaderPlain';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ScrollTransition> = {
  title: 'POC/ScrollTransition',
  component: ScrollTransition,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof ScrollTransition> = {
  args: {
    children: (
      <>
        <HeaderPlain
          theme="H-HCA-Green-20"
          subheading={<Text tag="h3">Optional meta title</Text>}
          heading={<Text tag="h1">News & articles about healthcare</Text>}
        >
          <p>
            Quis laboris proident sint amet id cillum do dolor in tempor est.
            Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
            laborum et culpa minim. Commodo ex laboris pariatur labore nostrud
            dolore.
          </p>
        </HeaderPlain>

        <HeaderPlain
          theme="D-HCA-Light-Orange"
          subheading={<Text tag="h3">Optional meta title</Text>}
          heading={<Text tag="h1">News & articles about healthcare</Text>}
        >
          <p>
            Quis laboris proident sint amet id cillum do dolor in tempor est.
            Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
            laborum et culpa minim. Commodo ex laboris pariatur labore nostrud
            dolore.
          </p>
        </HeaderPlain>

        <HeaderPlain
          theme="H-HCA-Green-20"
          subheading={<Text tag="h3">Optional meta title</Text>}
          heading={<Text tag="h1">News & articles about healthcare</Text>}
        >
          <p>
            Quis laboris proident sint amet id cillum do dolor in tempor est.
            Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
            laborum et culpa minim. Commodo ex laboris pariatur labore nostrud
            dolore.
          </p>
        </HeaderPlain>

        <HeaderPlain
          theme="L-HCA-Coral-60"
          subheading={<Text tag="h3">Optional meta title</Text>}
          heading={<Text tag="h1">News & articles about healthcare</Text>}
        >
          <p>
            Quis laboris proident sint amet id cillum do dolor in tempor est.
            Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
            laborum et culpa minim. Commodo ex laboris pariatur labore nostrud
            dolore.
          </p>
        </HeaderPlain>
      </>
    ),
  },
};
