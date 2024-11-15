import React from 'react';
import { render } from '@testing-library/react';
import QuoteBlockCenter from './QuoteBlockCenter';
import { QuoteBlockCenterProps } from './QuoteBlockCenter.types';

const mockProps: QuoteBlockCenterProps = {
  children: <p>Hello world</p>,
};

describe('QuoteBlockCenter', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<QuoteBlockCenter {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
