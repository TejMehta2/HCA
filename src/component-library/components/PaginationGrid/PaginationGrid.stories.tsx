import React from 'react';
import PaginationGrid from './PaginationGrid';
import type { Meta, StoryObj } from '@storybook/react';
import CardContent from '../CardContent/CardContent';
import Text from '../../foundation/Text/Text';
import Image from 'next/image';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof PaginationGrid> = {
  title: 'components/PaginationGrid',
  component: PaginationGrid,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

const MOCK_DATA: JSX.Element[] = [];
for (let i = 0; i < 24; i++) {
  MOCK_DATA.push(
    <CardContent
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

const itemsPerPage = 6;
const totalItems = MOCK_DATA.length;
const pageCount = Math.ceil(totalItems / itemsPerPage);

const getPageContent = (page: number) => {
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  return MOCK_DATA.slice(indexOfFirstItem, indexOfLastItem);
};

export const Default: StoryObj<typeof PaginationGrid> = {
  args: {
    theme: 'f',
    data: getPageContent(1),
    pageCount: pageCount,
    getPageContent: getPageContent,
  },
};
