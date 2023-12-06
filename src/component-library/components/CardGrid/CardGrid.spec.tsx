import React from 'react';
import { render } from '@testing-library/react';
import CardGrid from './CardGrid';
import { CardGridProps } from './CardGrid.types';

const mockProps: CardGridProps = {
  children: <p>Hello world</p>,
};

describe('CardGrid', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<CardGrid {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
