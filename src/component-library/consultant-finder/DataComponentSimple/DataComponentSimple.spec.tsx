import React from 'react';
import { render } from '@testing-library/react';
import DataComponentSimple from './DataComponentSimple';
import { DataComponentSimpleProps } from './DataComponentSimple.types';

const mockProps: DataComponentSimpleProps = {
  children: <p>Hello world</p>,
};

describe('DataComponentSimple', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<DataComponentSimple {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
