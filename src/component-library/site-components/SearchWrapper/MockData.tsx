import React from 'react';
import Text from '../../foundation/Text/Text';
import Image from 'next/image';
import Tags from '../../core-components/Tags/Tags';
import CardBlog from '../../components/CardBlog/CardBlog';
import CardContent from '../../components/CardContent/CardContent';

const BLOG_MOCK_DATA: JSX.Element[] = [];
for (let i = 0; i < 24; i++) {
  BLOG_MOCK_DATA.push(
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

const SERVICE_LINES_MOCK_DATA: JSX.Element[] = [];
for (let i = 0; i < 24; i++) {
  SERVICE_LINES_MOCK_DATA.push(
    <CardContent
      key={i}
      title={
        <Text variation="heading-1" tag="h4">
          {'Abdominal hysterectomy'}
        </Text>
      }
      bodyCopy={
        <Text variation="body-large" tag="p">
          Nisi ullamco eiusmod veniam eiusmod sit est labore elit anim veniam
          dolor.
        </Text>
      }
      link={
        <a href="#">
          <span>Learn more</span>
        </a>
      }
    />
  );
}

const setMockValues = (MOCK_DATA: JSX.Element[]) => {
  const itemsPerPage = 12;
  const totalItems = MOCK_DATA.length;
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const getPageContent = (page: number) => {
    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return MOCK_DATA.slice(indexOfFirstItem, indexOfLastItem);
  };

  return {
    firstPageContent: getPageContent(1),
    pageCount: pageCount,
    pageContent: getPageContent,
  };
};

export const BLOG_MOCK_VALUES = setMockValues(BLOG_MOCK_DATA);
export const SERVICE_LINES_MOCK_VALUES = setMockValues(SERVICE_LINES_MOCK_DATA);
