import React from 'react';
import { render } from '@testing-library/react';
import FormBuilder from './FormBuilder';
import { FormBuilderProps } from './FormBuilder.types';

const mockProps: FormBuilderProps = {
  children: <p>Hello world</p>,
};

describe('FormBuilder', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<FormBuilder {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
