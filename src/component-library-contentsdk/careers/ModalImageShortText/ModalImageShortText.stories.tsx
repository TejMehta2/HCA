import React from 'react';
import ModalImageShortText from './ModalImageShortText';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import Image from 'next/image';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ModalImageShortText> = {
  title: 'careers/ModalImageShortText',
  component: ModalImageShortText,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof ModalImageShortText> = {
  args: {
    defaultOpen: true,
    image: (
      <Image
        src="/placeholders/linda.jpg"
        alt="linda"
        width="858"
        height="763"
      />
    ),
    subheader: (
      <Text variation={'subheading-1'}>staff nurse (return to practice)</Text>
    ),
    header: <Text variation={'display-2'}>All about Linda</Text>,
    copy: (
      <Text tag="div" variation={'body-large'}>
        “This has been a brilliant place to refresh my skills because
        there&apos;s such a diverse range of advanced care. The high standards
        are inspiring - every day, I want to improve.
        <br></br>
        <br></br>HCA UK aren&apos;t just employing me during the &apos;Return to
        Practice&apos; programme, they&apos;re also covering the fees. As soon
        as I get my Nursing and Midwifery Council (NMC) PIN, I&apos;ll be able
        to start as a permanent staff nurse.
        <br></br>
        <br></br>
        The incredible support is the main reason I&apos;d encourage people to
        apply.”
      </Text>
    ),
  },
};
