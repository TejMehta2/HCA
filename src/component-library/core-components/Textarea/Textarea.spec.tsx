import React from 'react';
import { render } from '@testing-library/react';
import Textarea from './Textarea';
import { TextareaProps } from './Textarea.types';

const mockProps: TextareaProps = {
  children: <p>Hello world</p>,
};

describe('Textarea', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<Textarea {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
