import React from 'react';
import { render } from '@testing-library/react';
import TickList from './TickList';
import { TickListProps } from './TickList.types';

const mockProps: TickListProps = {
  children: <p>Hello world</p>,
};

describe('TickList', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<TickList {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
