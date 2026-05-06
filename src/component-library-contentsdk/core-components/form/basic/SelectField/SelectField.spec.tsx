import React from 'react';
import { render } from '@testing-library/react';
import SelectField from './SelectField';
import { SelectFieldProps } from './SelectField.types';

const mockProps: SelectFieldProps = {
  id: 'select1',
  name: 'select1',
  label: 'Select field label',
  placeholder: 'Please select',
  options: [
    {
      text: 'Option 1',
    },
    {
      text: 'Option 2',
    },
    {
      text: 'Option 3',
    },
  ],
};

describe('SelectField', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<SelectField {...mockProps} />);
    expect(getByText('Select field label')).toBeVisible();
  });
});
