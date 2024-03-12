import React from 'react';
import YextResultCardArticles from './YextResultCardArticles';
import type { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';
import Themes from '../../foundation/Themes/Themes';
import Text from '../../foundation/Text/Text';
import Icons from '../../foundation/Icons/Icons';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof YextResultCardArticles> = {
  title: 'yext/YextResultCardArticles',
  component: YextResultCardArticles,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
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
export const Default: StoryObj<typeof YextResultCardArticles> = {
  args: {
    image: (
      <Image
        src="/placeholders/couple-on-bench.jpeg"
        alt="couple on bench"
        width="140"
        height="140"
      />
    ),
    title: <Text variation="heading-1">Private Colonoscopy London</Text>,
    copy: (
      <Text variation="body-large">
        You could be referred by your GP or physician for a colonoscopy if you
        have had blood in your stool or noticed any changes in your bowel
        habits. It is an effective diagnostic procedure that allows our
        consultant to examine your bowel in detail. You might have a colonoscopy
        as part of a biopsy...
      </Text>
    ),
    ctas: {
      button: <button>Learn more</button>,
      textButton: (
        <button>
          <Icons iconName="iconEmail"></Icons>Email us
        </button>
      ),
    },
  },
};

export const WithoutEmail: StoryObj<typeof YextResultCardArticles> = {
  args: {
    image: (
      <Image
        src="/placeholders/couple-on-bench.jpeg"
        alt="couple on bench"
        width="140"
        height="140"
      />
    ),
    title: (
      <Text variation="heading-1">
        HCA Healthcare UK invests £7m in new fleet of state-of- the art da Vinci
        Xi robots
      </Text>
    ),
    copy: (
      <Text variation="body-large">
        The announcement today includes the investment in the da Vinci&#39;s
        minimally invasive robotic capability at HCA Healthcare UK&#39;s The
        Lister Hospital for the first time. HCA Healthcare UK has invested in
        four new da Vinci Xi robots, confirming its status...
      </Text>
    ),
    ctas: {
      button: <button>Read more</button>,
    },
  },
};
