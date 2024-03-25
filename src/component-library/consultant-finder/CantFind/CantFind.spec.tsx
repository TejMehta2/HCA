import React from 'react';
import { render } from '@testing-library/react';
import CantFind from './CantFind';
import { CantFindProps } from './CantFind.types';

const mockProps: CantFindProps = {
  children: <p>Hello world</p>,
};

describe('CantFind', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<CantFind {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
