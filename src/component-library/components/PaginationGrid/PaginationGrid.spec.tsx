import React from 'react';
import { render } from '@testing-library/react';
import PaginationGrid from './PaginationGrid';
import { PaginationGridProps } from './PaginationGrid.types';
import CardContent from '../CardContent/CardContent';
import Text from '../../foundation/Text/Text';
import Image from 'next/image';

const data: JSX.Element[] = [];
for (let i = 0; i < 24; i++) {
  data.push(
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

const itemsPerPage = 2;
const totalItems = data.length;
const pageCount = Math.ceil(totalItems / itemsPerPage);

/* Mock callback function for fetching data (Will be API on sitecore integration) */
const getPageContent = (page: number) => {
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  return data.slice(indexOfFirstItem, indexOfLastItem);
};

const mockProps: PaginationGridProps = {
  theme: 'f',
  pageCount: pageCount,
  data: getPageContent(1),
  getPageContent: (newPage: number) => {
    return getPageContent(newPage);
  },
};

describe('PaginationGrid', () => {
  it('Renders content from props', async () => {
    const { getByText } = render(<PaginationGrid {...mockProps} />);
    expect(getByText('1Cardiac care')).toBeVisible();
  });
});
