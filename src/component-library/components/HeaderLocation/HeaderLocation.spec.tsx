import React from 'react';
import { render } from '@testing-library/react';
import HeaderLocation from './HeaderLocation';
import { HeaderLocationProps } from './HeaderLocation.types';

const mockProps: HeaderLocationProps = {
  children: <p>Hello world</p>,
};

describe('HeaderLocation', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<HeaderLocation {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
