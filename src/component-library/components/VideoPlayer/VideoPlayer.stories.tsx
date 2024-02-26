import React from 'react';
import VideoPlayer from './VideoPlayer';
import type { Meta, StoryObj } from '@storybook/react';

import Image from 'next/image';
import Themes from '../../foundation/Themes/Themes';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof VideoPlayer> = {
  title: 'components/VideoPlayer',
  component: VideoPlayer,
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
export const Default: StoryObj<typeof VideoPlayer> = {
  args: {
    videoUrl: 'https://www.youtube.com/embed/M7lc1UVf-VE',
    overlayImage: (
      <Image
        src="/placeholders/london.jpg"
        alt="london skyline"
        width="1120"
        height="631"
      />
    ),
  },
};

export const Vimeo: StoryObj<typeof VideoPlayer> = {
  args: {
    videoUrl: 'https://player.vimeo.com/video/76979871',
    overlayImage: (
      <Image
        src="/placeholders/london.jpg"
        alt="london skyline"
        width="1120"
        height="631"
      />
    ),
  },
};
