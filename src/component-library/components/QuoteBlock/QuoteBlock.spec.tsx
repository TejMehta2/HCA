import React from 'react';
import { render } from '@testing-library/react';
import QuoteBlock from './QuoteBlock';
import { QuoteBlockProps } from './QuoteBlock.types';

const mockProps: QuoteBlockProps = {
  children: <span>Hello World</span>,
};

describe('QuoteBlock', () => {
  it('Renders children', async () => {
    const { getByText } = render(<QuoteBlock {...mockProps} />);
    expect(getByText('Hello World')).toBeVisible();
  });
});
