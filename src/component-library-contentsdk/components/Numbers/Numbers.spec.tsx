import React from 'react';
import { render } from '@testing-library/react';
import Numbers from './Numbers';
import { NumbersProps } from './Numbers.types';

const mockProps: NumbersProps = {
  number: <span>5</span>,
  size: 'large',
};

describe('Numbers', () => {
  it('Renders number from props', async () => {
    const { getByText } = render(<Numbers {...mockProps} />);
    expect(getByText('5')).toBeVisible();
  });
});
