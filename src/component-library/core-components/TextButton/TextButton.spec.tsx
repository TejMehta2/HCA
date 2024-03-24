import React from 'react';
import { render } from '@testing-library/react';
import TextButton from './TextButton';
import { TextButtonProps } from './TextButton.types';

const mockProps: TextButtonProps = {
  children: <p>Hello world</p>,
};

describe('TextButton', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<TextButton {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
