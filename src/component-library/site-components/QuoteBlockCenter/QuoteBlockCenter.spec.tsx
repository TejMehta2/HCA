import React from 'react';
import { render } from '@testing-library/react';
import QuoteBlockCenter from './QuoteBlockCenter';
import { QuoteBlockCenterProps } from './QuoteBlockCenter.types';

const mockProps: QuoteBlockCenterProps = {
  children: <p>children</p>,
  author: {
    name: <p>author</p>,
    image: <p>image</p>,
    tag: <p>tag</p>,
  },
  alignment: 'center',
};

describe('QuoteBlockCenter', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<QuoteBlockCenter {...mockProps} />);
    expect(getByText('children')).toBeVisible();
    expect(getByText('author')).toBeVisible();
    expect(getByText('image')).toBeVisible();
    expect(getByText('tag')).toBeVisible();
  });
});
