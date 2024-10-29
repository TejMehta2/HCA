import React from 'react';
import VideoHero from './VideoHero';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import Image from 'next/image';
import Themes from '../../foundation/Themes/Themes';
import { Default as CareersSearchDefault } from '../CareersSearch/CareersSearch.stories';
import CareersSearch from '../CareersSearch/CareersSearch';
import { CareersSearchProps } from '../CareersSearch/CareersSearch.types';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof VideoHero> = {
  title: 'careers/VideoHero',
  component: VideoHero,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <Themes theme="B-HCA-Navy-Blue">
        <Story />
      </Themes>
    ),
  ],
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof VideoHero> = {
  args: {
    title: (
      <Text variation="display-1" tag="h2">
        Departments
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
    children: (
      <>
        <CareersSearch {...(CareersSearchDefault.args as CareersSearchProps)} />
      </>
    ),
    image: (
      <Image
        src="/placeholders/smiling-doctor.png"
        alt="lab technician"
        width="1024"
        height="683"
      />
    ),
    videoSrc: 'https://player.vimeo.com/video/76979871',
  },
};
