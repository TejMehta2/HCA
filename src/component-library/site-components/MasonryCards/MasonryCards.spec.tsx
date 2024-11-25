import React from 'react';
import { render } from '@testing-library/react';
import MasonryCards from './MasonryCards';
import { MasonryCardsProps } from './MasonryCards.types';

const mockProps: MasonryCardsProps = {
  children: <p>Hello world</p>,
};

describe('MasonryCards', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<MasonryCards {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
