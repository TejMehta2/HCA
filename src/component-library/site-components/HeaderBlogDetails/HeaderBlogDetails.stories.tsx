import React from 'react';
import HeaderBlogDetails from './HeaderBlogDetails';
import type { Meta, StoryObj } from '@storybook/react';
import Tags from '../../core-components/Tags/Tags';
import Text from '../../foundation/Text/Text';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof HeaderBlogDetails> = {
  title: 'site-components/HeaderBlogDetails',
  component: HeaderBlogDetails,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof HeaderBlogDetails> = {
  args: {
    theme: 'F-HCA-White',
    tag: (
      <Tags contentVariation="quote">
        <a href="#">Announcement</a>
      </Tags>
    ),
    date: <time dateTime="Sept 7, 2023">Sept 7, 2023</time>,
    title: (
      <Text tag="h1" variation="display-1">
        The Harley Street Clinic retain CQC &apos;Outstanding&apos; rating
      </Text>
    ),
    bodyCopy: (
      <Text tag="p" variation="body-large">
        London Bridge Hospital, part of HCA Healthcare UK, has once again been
        rated as &apos;Outstanding&apos; by the Care Quality Commission (CQC),
        following a recent inspection. London Bridge Hospital has held its
        Outstanding rating since 2016.
      </Text>
    ),
  },
};
