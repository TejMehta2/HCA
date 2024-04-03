import React from 'react';
import { render } from '@testing-library/react';
import FormBuilder from './FormBuilder';
import { FormBuilderProps } from './FormBuilder.types';
import FormBuilderExample from './FormBuilderExample';

const mockProps: FormBuilderProps = {
  children: <FormBuilderExample />,
};

describe('FormBuilder', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<FormBuilder {...mockProps} />);
    expect(getByText('Please enter your details')).toBeVisible();
  });
});
