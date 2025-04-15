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
    subtitle: (
      <Text variation="subheading-1" tag="p">
        HCA UK CAREERS
      </Text>
    ),
    title: (
      <Text variation="display-3" tag="h1">
        Together we <i>thrive</i>
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
