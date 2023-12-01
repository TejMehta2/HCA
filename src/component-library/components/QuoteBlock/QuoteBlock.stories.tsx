import React from 'react';
import QuoteBlock from './QuoteBlock';
import type { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';
import Themes from '../../foundation/Themes/Themes';
import { ThemesProps } from '../../foundation/Themes/Themes.types';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof QuoteBlock> = {
  title: 'components/QuoteBlock',
  component: QuoteBlock,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },

  decorators: [
    (Story) => (
      <Themes theme={'a'}>
        <Story />
      </Themes>
    ),
  ],
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

const themes: ThemesProps['theme'][] = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
];

export const Default: StoryObj<typeof QuoteBlock> = {
  args: {
    children:
      'The personal savings allowance enables most people to earn interest tax-free across various savings options.',
    author: {
      name: 'John Smith',
      image: (
        <Image
          src="/placeholders/quote-block-author.png"
          alt="author of quote"
          width="70"
          height="70"
        />
      ),
      tag: <a href="#">Orthopaedics Consultant</a>,
    },
  },

  decorators: [
    (Story) => (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, 1fr)',
        }}
      >
        {themes.map((theme, index) => (
          <Themes key={index} theme={theme}>
            <div style={{ background: 'var(--background)', padding: '1rem' }}>
              <Story />
            </div>
          </Themes>
        ))}
      </div>
    ),
  ],
};
