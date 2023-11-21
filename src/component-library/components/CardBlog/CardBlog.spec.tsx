import React from 'react';
import { render } from '@testing-library/react';
import CardBlog from './CardBlog';
import { CardBlogProps } from './CardBlog.types';

const mockProps: CardBlogProps = {
  children: <p>Hello world</p>,
};

describe('CardBlog', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<CardBlog {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
