import React from 'react';
import CardBlog from './CardBlog';
import type { Meta, StoryObj } from '@storybook/react';
import Themes from '../../foundation/Themes/Themes';
import { ThemesProps } from '../../foundation/Themes/Themes.types';

import Text from '../../foundation/Text/Text';
import Tags from '../../core-components/Tags/Tags';
import Image from 'next/image';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof CardBlog> = {
  title: 'components/CardBlog',
  component: CardBlog,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof CardBlog> = {
  args: {
    children: (
      <>
        <time dateTime="Sept 7, 2023">Sept 7, 2023</time>
        <Text tag="h3" variation="heading-2">
          <a href="#">
            The Harley Street Clinic retain CQC &apos;Outstanding&apos; rating
          </a>
        </Text>

        <Tags>
          <a href="#">Announcement</a>
        </Tags>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <Themes theme="D-HCA-Teal">
        <div style={{ background: 'var(--background)', padding: '1rem' }}>
          <Story />
        </div>
      </Themes>
    ),
  ],
};

export const DefaultWithBodyCopy: StoryObj<typeof CardBlog> = {
  args: {
    children: (
      <>
        <time dateTime="Sept 7, 2023">Sept 7, 2023</time>
        <Text tag="h3" variation="heading-2">
          <a href="#">
            The Harley Street Clinic retain CQC &apos;Outstanding&apos; rating
          </a>
        </Text>
        <Text variation="body-large">
          There are over 1400 at The Portland, each year. Hear new mums sharing
          theirs
        </Text>
        <Tags>
          <a href="#">Announcement</a>
        </Tags>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <Themes theme="D-HCA-Teal">
        <div style={{ background: 'var(--background)', padding: '1rem' }}>
          <Story />
        </div>
      </Themes>
    ),
  ],
};

export const Featured: StoryObj<typeof CardBlog> = {
  args: {
    variation: 'feature',
    children: (
      <>
        <Image
          src="/placeholders/children-playing.jpg"
          alt="two children playing"
          width="643"
          height="605"
        />
        <time dateTime="Sept 7, 2023">Sept 7, 2023</time>
        <Text tag="h3" variation="display-5">
          <a href="#">
            The Harley Street Clinic retain CQC &apos;Outstanding&apos; rating
          </a>
        </Text>
        <Text variation="body-large">
          There are over 1400 at The Portland, each year. Hear new mums sharing
          theirs
        </Text>
        <Tags>
          <a href="#">Announcement</a>
        </Tags>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <Themes theme="D-HCA-Teal">
        <div style={{ background: 'var(--background)', padding: '1rem' }}>
          <Story />
        </div>
      </Themes>
    ),
  ],
};

export const WithImage: StoryObj<typeof CardBlog> = {
  args: {
    children: (
      <>
        <Image
          src="/placeholders/children-playing.jpg"
          alt="two children playing"
          width="643"
          height="605"
        />
        <time dateTime="Sept 7, 2023">Sept 7, 2023</time>
        <Text tag="h3" variation="heading-2">
          <a href="#">
            The Harley Street Clinic retain CQC &apos;Outstanding&apos; rating
          </a>
        </Text>
        <Text variation="body-large">
          There are over 1400 at The Portland, each year. Hear new mums sharing
          theirs
        </Text>
        <Tags>
          <a href="#">Announcement</a>
        </Tags>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <Themes theme="D-HCA-Teal">
        <div style={{ background: 'var(--background)', padding: '1rem' }}>
          <Story />
        </div>
      </Themes>
    ),
  ],
};

const themes: ThemesProps['theme'][] = [
  'A-HCA-White',
  'B-HCA-Navy-Blue',
  'C-HCA-Denim',
  'D-HCA-Teal',
  'E-HCA-Cerulean',
  'F-HCA-Fern',
  'G-HCA-Orange',
  'H-HCA-Tangerine',
  'I-HCA-Goldenrod',
  'J-HCA-Tangerine-20',
  'K-HCA-Fern-20',
  'L-HCA-Teal-5',
  'M-HCA-Goldenrod-20',
  'N-HCA-Denim-5',
];
export const Themed: StoryObj<typeof CardBlog> = {
  args: {
    children: (
      <>
        <time dateTime="Sept 7, 2023">Sept 7, 2023</time>
        <Text variation="heading-2" tag="h3">
          <a href="#">
            The Harley Street Clinic retain CQC &apos;Outstanding&apos; rating
          </a>
        </Text>
        <Text variation="body-large">
          There are over 1400 at The Portland, each year. Hear new mums sharing
          theirs
        </Text>
        <Tags>
          <a href="#">Announcement</a>
        </Tags>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
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
