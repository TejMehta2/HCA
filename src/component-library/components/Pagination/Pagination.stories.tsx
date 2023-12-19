import React from 'react';
import Pagination from './Pagination';
import type { Meta, StoryObj } from '@storybook/react';
import CardPatientStories from '../CardPatientStories/CardPatientStories';
import Image from 'next/image';
import Text from '../../foundation/Text/Text';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Pagination> = {
  title: 'components/Pagination',
  component: Pagination,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

const data = [];
for (let i = 0; i < 24; i++) {
  data.push(
    <CardPatientStories
      key={i}
      title={
        <Text variation="heading-1" tag="h4">
          {(i + 1).toString() + 'Cardiac care'}
        </Text>
      }
      bodyCopy={
        <Text variation="body-large" tag="p">
          There are over 1400 at The Portland, each year. Hear new mums sharing
          theirs
        </Text>
      }
      image={
        <Image
          src="/placeholders/multicard.jpg"
          alt="baby crying"
          width="363"
          height="243"
        />
      }
      link={
        <a href="#">
          <span>
            Read the <strong>Story</strong>
          </span>
        </a>
      }
    />
  );
}

export const Default: StoryObj<typeof Pagination> = {
  args: {
    theme: 'f',
    itemsPerPage: 6,
    currentPage: 1,
    data: data,
  },
};
