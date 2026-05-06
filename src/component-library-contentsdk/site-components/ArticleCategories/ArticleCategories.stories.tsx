import React from 'react';
import ArticleCategories from './ArticleCategories';
import type { Meta, StoryObj } from '@storybook/react';
import Icons from '../../foundation/Icons/Icons';
import Text from '../../foundation/Text/Text';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ArticleCategories> = {
  title: 'site-components/ArticleCategories',
  component: ArticleCategories,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof ArticleCategories> = {
  args: {
    theme: 'H-HCA-Tangerine',
    title: (
      <Text variation="display-3" tag="h3">
        Article categories
      </Text>
    ),
    categories: [
      <a href="#" key={1}>
        <Icons iconName="iconFilterCircle" />
        <span>General Health</span>
      </a>,
      <a href="#" key={2}>
        <Icons iconName="iconFilterCircle" />
        <span>Cardiac Care</span>
      </a>,
      <a href="#" key={3}>
        <Icons iconName="iconFilterCircle" />
        <span>Cancer Care</span>
      </a>,
      <a href="#" key={4}>
        <Icons iconName="iconFilterCircle" />
        <span>Orthopaedic Care</span>
      </a>,
      <a href="#" key={5}>
        <Icons iconName="iconFilterCircle" />
        <span>Woman&apos;s Health</span>
      </a>,
      <a href="#" key={6}>
        <Icons iconName="iconFilterCircle" />
        <span>Men&apos;s Health</span>
      </a>,
      <a href="#" key={7}>
        <Icons iconName="iconFilterCircle" />
        <span>Paediatrics</span>
      </a>,
      <a href="#" key={8}>
        <Icons iconName="iconFilterCircle" />
        <span>Clinical neurosciences</span>
      </a>,
      <a href="#" key={9}>
        <Icons iconName="iconFilterCircle" />
        <span>Consultant Q&A</span>
      </a>,
    ],
  },
};
