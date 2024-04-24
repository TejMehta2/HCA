import React from 'react';
import LogoBlock from './LogoBlock';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';
import TextButton from '../../core-components/TextButton/TextButton';
import AdvancedBlockHeader from '../../components/AdvancedBlockHeader/AdvancedBlockHeader';
import Image from 'next/image';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof LogoBlock> = {
  title: 'site-components/LogoBlock',
  component: LogoBlock,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

const logo = (
  <Image src="/placeholders/hca-logo.svg" alt="" width="131" height="56" />
);
export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof LogoBlock> = {
  args: {
    header: (
      <AdvancedBlockHeader
        subtitle={<Text variation={'subheading-1'}>Sub title</Text>}
        title={<Text variation={'display-2'}>Logo Block</Text>}
        body={
          <Text variation={'body-large'}>
            Quis laboris proident sint amet id cillum do dolor in tempor est.
            Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
            laborum et culpa minim. Commodo ex laboris pariatur labore nostrud
            dolore ad sit occaecat. Qui ipsum in minim. Nostrud duis cupidatat
            sunt lorem ut.
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
    logos: [logo, logo, logo, logo, logo, logo, logo, logo, logo],
  },
};

export const OptionalProps: StoryObj<typeof LogoBlock> = {
  args: {
    header: (
      <AdvancedBlockHeader
        subtitle={<Text variation={'subheading-1'}>Sub title</Text>}
        title={<Text variation={'display-2'}>Logo Block</Text>}
      />
    ),
    logos: Default.args?.logos,
  },
};

export const ThreeColumnStandard: StoryObj<typeof LogoBlock> = {
  args: {
    ...Default.args,
    columns: 3,
  },
};

export const SideBySide: StoryObj<typeof LogoBlock> = {
  args: {
    ...Default.args,
    logos: [logo, logo, logo, logo, logo, logo],
    variation: 'side-by-side',
    theme: 'D-HCA-Teal',
  },
};
