import React from 'react';
import { render } from '@testing-library/react';
import CardBlock from './CardBlock';
import CardBlog from '../../components/CardBlog/CardBlog';
import Text from '../../foundation/Text/Text';
import Tags from '../../core-components/Tags/Tags';
import { CardBlockProps } from './CardBlock.types';
import Button from '../../core-components/Button/Button';
import TextButton from '../../core-components/TextButton/TextButton';
import AdvancedBlockHeader from '../../components/AdvancedBlockHeader/AdvancedBlockHeader';

const mockProps: CardBlockProps = {
  theme: 'A-HCA-White',
  variation: '3-columns',
  header: (
    <AdvancedBlockHeader
      subtitle={
        <Text variation={'subheading-1'} tag="h2">
          Meta title
        </Text>
      }
      title={
        <Text variation={'display-2'} tag="h2">
          Blog Card Block
        </Text>
      }
      body={
        <Text variation={'body-large'} tag="p">
          Quis ut irure non mollit. Ipsum esse mollit sunt nulla. Ipsum non
          cillum mollit officia tempor in ad non consequat esse. Sunt culpa
          adipisicing eiusmod ullamco eu esse laborum deserunt et officia
          reprehenderit. Aliquip laboris duis ex labore veniam labore do nostrud
          minim labore eiusmod voluptate sit commodo officia. Commodo tempor
          tempor magna deserunt sunt dolore dolore.
        </Text>
      }
      ctas={
        <>
          <Button size={'large'} variation={'full'}>
            <a href="#">
              Learn more about <strong>self-pay</strong>
            </a>
          </Button>
          <TextButton>
            <a href="#">
              Access care with <strong>insurance</strong>
            </a>
          </TextButton>
        </>
      }
    />
  ),

  children: (
    <>
      <CardBlog>
        <time dateTime="Sept 7, 2023">Sept 7, 2023</time>
        <Text variation="heading-2" tag="h3">
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
    </>
  ),
};

describe('CardBlock', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<CardBlock {...mockProps} />);
    expect(getByText('Meta title')).toBeVisible();
    expect(getByText('Blog Card Block')).toBeVisible();
  });
});
