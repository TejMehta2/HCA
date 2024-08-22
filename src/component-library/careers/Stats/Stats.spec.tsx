import React from 'react';
import { render } from '@testing-library/react';
import Stats from './Stats';
import { StatsProps } from './Stats.types';

const mockProps: StatsProps = {
  children: <p>Hello world</p>,
};

describe('Stats', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<Stats {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
