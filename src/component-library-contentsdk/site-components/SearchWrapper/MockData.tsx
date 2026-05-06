import React, { type JSX } from 'react';
import Text from '../../foundation/Text/Text';
import Image from 'next/image';
import Tags from '../../core-components/Tags/Tags';
import CardBlog from '../../components/CardBlog/CardBlog';
import CardContent from '../../components/CardContent/CardContent';
import CardMap from '../../components/CardMap/CardMap';

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

const LOCATIONS_MOCK_DATA: JSX.Element[] = [];
for (let i = 0; i < 24; i++) {
  LOCATIONS_MOCK_DATA.push(
    <CardMap
      image={
        <Image
          src="/placeholders/the-wellington-hospital.png"
          alt="two children playing"
          width="643"
          height="605"
        />
      }
      title={
        <Text tag="h3" variation="heading-2">
          London Bridge Hospital
        </Text>
      }
      address={
        <Text tag="p" variation="body-large">
          35 Weymouth Street W1G 8BJ London
        </Text>
      }
      ctas={{
        button1: (
          <a href="#">
            <span>
              Learn <strong>more</strong>
            </span>
          </a>
        ),
        button2: (
          <a href="#">
            <span>
              Get <strong>directions</strong>
            </span>
          </a>
        ),
      }}
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
export const LOCATIONS_MOCK_VALUES = setMockValues(LOCATIONS_MOCK_DATA);
