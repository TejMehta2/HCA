import React from 'react';
import { render } from '@testing-library/react';
import Tooltips from './Tooltips';
import { TooltipsProps } from './Tooltips.types';

const mockProps: TooltipsProps = {
  children: <p>Hello world</p>,
};

describe('Tooltips', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<Tooltips {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
