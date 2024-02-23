import React from 'react';
import { render } from '@testing-library/react';
import TextField from './TextField';
import { TextFieldProps } from './TextField.types';

const mockProps: TextFieldProps = {
  id: 'input1',
  label: 'Email Address',
  type: 'email',
  required: true,
  pattern: '^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$',
  errorMessage: 'Error message',
};

describe('TextField', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<TextField {...mockProps} />);
    expect(getByText('Email Address')).toBeVisible();
  });
});
