import React from 'react';
import { render } from '@testing-library/react';
import Button from './Button';
import { ButtonProps } from './Button.types';

const mockProps: ButtonProps = {
  children: 'Button',
  size: 'large',
  variation: 'full-dark',
};

describe('Button', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<Button {...mockProps} />);
    expect(getByText('Button')).toBeVisible();
  });
});
