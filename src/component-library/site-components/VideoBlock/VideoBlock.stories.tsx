import React from 'react';
import VideoBlock from './VideoBlock';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';
import TextButton from '../../core-components/TextButton/TextButton';
import AdvancedBlockHeader from '../../components/AdvancedBlockHeader/AdvancedBlockHeader';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import Image from 'next/image';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof VideoBlock> = {
  title: 'site-components/VideoBlock',
  component: VideoBlock,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof VideoBlock> = {
  args: {
    header: (
      <AdvancedBlockHeader
        paddingSize={'none'}
        subtitle={<Text variation={'subheading-1'}>Meta Title</Text>}
        title={<Text variation={'display-2'}>Video Block</Text>}
        body={
          <Text variation={'body-large'}>
            Quis ut irure non mollit. Ipsum esse mollit sunt nulla. Ipsum non
            cillum mollit officia tempor in ad non consequat esse. Sunt culpa
            adipisicing eiusmod ullamco eu esse laborum deserunt et officia
            reprehenderit.
          </Text>
        }
        ctas={
          <>
            <Button size={'small'} variation={'full'}>
              <a href="#">
                <span>
                  Learn more about <strong>self-pay</strong>
                </span>
              </a>
            </Button>
            <TextButton>
              <a href="#">
                <span>
                  Access care with <strong>insurance</strong>
                </span>
              </a>
            </TextButton>
          </>
        }
      />
    ),

    video: (
      <VideoPlayer
        videoUrl="https://www.youtube.com/embed/M7lc1UVf-VE"
        overlayImage={
          <Image
            src="/placeholders/london.jpg"
            alt="london skyline"
            width="1120"
            height="631"
          />
        }
      ></VideoPlayer>
    ),
  },
};

export const SideBySide: StoryObj<typeof VideoBlock> = {
  args: {
    ...Default.args,
    variation: 'side-by-side',

    video: (
      <VideoPlayer
        videoUrl="https://www.youtube.com/embed/M7lc1UVf-VE"
        overlayImage={
          <Image
            src="/placeholders/london.jpg"
            alt="london skyline"
            width="1120"
            height="631"
          />
        }
      ></VideoPlayer>
    ),
  },
};
