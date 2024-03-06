import React from 'react';
import { render } from '@testing-library/react';
import SearchResultArticle from './SearchResultArticle';
import { SearchResultArticleProps } from './SearchResultArticle.types';
import Image from 'next/image';
import Text from '../../foundation/Text/Text';
import Icons from '../../foundation/Icons/Icons';

const mockProps: SearchResultArticleProps = {
  image: (
    <Image
      src="/placeholders/couple-on-bench.jpeg"
      alt="couple on bench"
      width="140"
      height="140"
    />
  ),
  title: <Text variation="heading-1">Private Colonoscopy London</Text>,
  copy: (
    <Text variation="body-large">
      You could be referred by your GP or physician for a colonoscopy if you
      have had blood in your stool or noticed any changes in your bowel habits.
      It is an effective diagnostic procedure that allows our consultant to
      examine your bowel in detail. You might have a colonoscopy as part of a
      biopsy...
    </Text>
  ),
  ctas: {
    link: <button>Learn more</button>,
    email: (
      <button>
        <Icons iconName="iconEmail"></Icons>Email us
      </button>
    ),
  },
};

describe('SearchResultArticle', () => {
  it('Renders title from props', async () => {
    const { getByText } = render(<SearchResultArticle {...mockProps} />);
    expect(getByText('Private Colonoscopy London')).toBeVisible();
  });
});
