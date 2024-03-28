import React from 'react';
import { render } from '@testing-library/react';
import PhoneField from './PhoneField';
import { PhoneFieldProps } from './PhoneField.types';

const mockProps: PhoneFieldProps = {
  children: <p>Hello world</p>,
};

describe('PhoneField', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<PhoneField {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
