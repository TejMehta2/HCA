import React from 'react';
import { render } from '@testing-library/react';
import QuoteBlock from './QuoteBlock';
import { QuoteBlockProps } from './QuoteBlock.types';
import Image from 'next/image';

const mockProps: QuoteBlockProps = {
  children: 'Hello World',
  author: {
    name: 'John Smith',
    image: (
      <Image
        src="/placeholders/quote-block-author.png"
        alt="author of quote"
        width="70"
        height="70"
      />
    ),
    tag: <a href="#">Orthopaedics Consultant</a>,
  },
};

describe('QuoteBlock', () => {
  it('Renders author name from props', async () => {
    const { getByText } = render(<QuoteBlock {...mockProps} />);
    expect(getByText('John Smith')).toBeVisible();
  });
});
