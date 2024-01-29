import React from 'react';
import SearchWrapper from './SearchWrapper';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import PaginationGrid from '../../components/PaginationGrid/PaginationGrid';
import Image from 'next/image';
import Tags from '../../core-components/Tags/Tags';
import CardBlog from '../../components/CardBlog/CardBlog';
import HeaderPlain from '../HeaderPlain/HeaderPlain';
import SearchBar from '../../components/SearchBar/SearchBar';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof SearchWrapper> = {
  title: 'site-components/SearchWrapper',
  component: SearchWrapper,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

const MOCK_DATA: JSX.Element[] = [];
for (let i = 0; i < 24; i++) {
  MOCK_DATA.push(
    <CardBlog key={i}>
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
    </CardBlog>
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

export const Default: StoryObj<typeof SearchWrapper> = {
  args: {
    header: (
      <HeaderPlain
        subheading={<Text variation={'subheading-1'}>our HCA blog</Text>}
        heading={
          <Text variation={'display-2'}>News & articles about healthcare </Text>
        }
        search={<SearchBar placeholder="" />}
        theme={'F-HCA-White'}
      >
        <Text variation="body-large">
          Quis laboris proident sint amet id cillum do dolor in tempor est.
          Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
          laborum et culpa minim. Commodo ex laboris pariatur labore nostrud
          dolore.
        </Text>
      </HeaderPlain>
    ),

    searchDetail: (
      <Text tag="h2" variation="heading-1">
        45 articles including ‘Cardiac care’
      </Text>
    ),
    showing: (
      <Text tag="p" variation="body-medium">
        Showing 1-12
      </Text>
    ),
    children: (
      <PaginationGrid
        theme="F-HCA-White"
        data={getPageContent(1)}
        pageCount={pageCount}
        getPageContent={getPageContent}
      />
    ),
  },
};
