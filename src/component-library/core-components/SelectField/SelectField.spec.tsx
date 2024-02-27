import React from 'react';
import { render } from '@testing-library/react';
import SelectField from './SelectField';
import { SelectFieldProps } from './SelectField.types';

const mockProps: SelectFieldProps = {
  children: <p>Hello world</p>,
};

describe('SelectField', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<SelectField {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
