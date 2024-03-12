import React from 'react';
import { render } from '@testing-library/react';
import Textarea from './Textarea';
import { TextareaProps } from './Textarea.types';

const mockProps: TextareaProps = {
  id: 'question',
  label: 'Question',
  required: true,
  helperText: 'Optional helper text',
  errorMessage: 'This field is required',
};

describe('Textarea', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<Textarea {...mockProps} />);
    expect(getByText('Question')).toBeVisible();
  });
});
