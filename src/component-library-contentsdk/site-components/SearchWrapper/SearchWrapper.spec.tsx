import React, { type JSX } from 'react';
import { render } from '@testing-library/react';
import SearchWrapper from './SearchWrapper';
import { SearchWrapperProps } from './SearchWrapper.types';

import Text from '../../foundation/Text/Text';
import Image from 'next/image';
import Tags from '../../core-components/Tags/Tags';
import CardBlog from '../../components/CardBlog/CardBlog';
import CardGrid from '../CardGrid/CardGrid';
import Pagination from '../../core-components/Pagination/Pagination';

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

const mockProps: SearchWrapperProps = {
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
    <>
      <CardGrid>{getPageContent(1)}</CardGrid>
      <Pagination pageCount={pageCount} callback={console.log} />
    </>
  ),
};

describe('SearchWrapper', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<SearchWrapper {...mockProps} />);
    expect(getByText('Showing 1-12')).toBeVisible();
  });
});
