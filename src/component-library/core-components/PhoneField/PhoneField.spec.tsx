import React from 'react';
import { render } from '@testing-library/react';
// eslint-disable-next-line
// @ts-ignore
import PhoneField from './PhoneField';
import { PhoneFieldProps } from './PhoneField.types';

const mockProps: PhoneFieldProps = {
  label: 'Field label',
  helpText: 'Helper text',
};

describe('PhoneField', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<PhoneField {...mockProps} />);
    expect(getByText('Field label')).toBeVisible();
  });
});
