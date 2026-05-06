import React from 'react';
import { render } from '@testing-library/react';
import TextField from './TextField';
import { TextFieldProps } from './TextField.types';

const mockProps: TextFieldProps = {
  label: 'Email Address',
  type: 'email',
  error: 'Error message',
};

describe('TextField', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<TextField {...mockProps} />);
    expect(getByText('Email Address')).toBeVisible();
  });
});
