import React from 'react';
import { render } from '@testing-library/react';
import CardBlogBlock from './CardBlogBlock';
import { CardBlogBlockProps } from './CardBlogBlock.types';
import CardBlog from '../../components/CardBlog/CardBlog';
import Tags from '../../core-components/Tags/Tags';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';
import Image from 'next/image';

const cardFeature = (
  <CardBlog variation={'feature'}>
    <Image
      src="/placeholders/children-playing.jpg"
      alt="two children playing"
      width="643"
      height="605"
    />
    <time dateTime="Sept 7, 2023">Sept 7, 2023</time>
    <Text tag="h3" variation={'display-5'}>
      <a href="#">HCA UK launches rapid response referral service</a>
    </Text>
    <Text variation={'body-large'}>
      There are over 1400 at The Portland, each year. Hear new mums sharing
      theirs
    </Text>
    <Tags>
      <a href="#">Announcement</a>
    </Tags>
  </CardBlog>
);

const cardStandard = (
  <CardBlog>
    <time dateTime="Sept 7, 2023">Sept 7, 2023</time>
    <Text tag="h3" variation={'heading-2'}>
      <a href="#">
        The Harley Street Clinic retain CQC &apos;Outstanding&apos; rating
      </a>
    </Text>
    <Tags>
      <a href="#">Announcement</a>
    </Tags>
  </CardBlog>
);

const mockProps: CardBlogBlockProps = {
  theme: 'K-HCA-Fern-20',
  title: (
    <Text variation={'display-5'}>
      <span>From the blog</span>
    </Text>
  ),
  children: (
    <>
      {cardFeature}
      {cardStandard}
      {cardStandard}
      {cardStandard}
      {cardStandard}
    </>
  ),
  cta: (
    <Button size={'large'} variation={'full'}>
      <a href="#">
        Visit our <strong>blog</strong>
      </a>
    </Button>
  ),
};

describe('CardBlogBlock', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<CardBlogBlock {...mockProps} />);
    expect(
      getByText('HCA UK launches rapid response referral service')
    ).toBeVisible();
  });
});
