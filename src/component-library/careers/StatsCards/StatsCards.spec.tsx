import React from 'react';
import { render } from '@testing-library/react';
import StatsCards from './StatsCards';
import { StatsCardsProps } from './StatsCards.types';

const mockProps: StatsCardsProps = {
  children: <p>Hello world</p>,
};

describe('StatsCards', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<StatsCards {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
