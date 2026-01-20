/* eslint-disable react/jsx-key */
import React from 'react';
import FooterSmall from './FooterSmall';
import Image from 'next/image';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof FooterSmall> = {
  title: 'site-components/FooterSmall',
  component: FooterSmall,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof FooterSmall> = {
  args: {
    theme: 'Palace-Red',
    logo: <Image src="/palace-gate-white.svg" alt="" width="209" height="34" />,
    ctas: [
      <a href="#">Privacy Policy</a>,
      <a href="#">Terms & Conditions</a>,
      <a href="#">Terms of business</a>,
    ],
    copyright: (
      <Text variation="body-small" tag="small">
        © Palace Gate Practice 2025. All rights reserved.
      </Text>
    ),
  },
};
