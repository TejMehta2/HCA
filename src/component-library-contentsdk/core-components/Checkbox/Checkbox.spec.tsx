import React from 'react';
import { render } from '@testing-library/react';
import Checkbox from './Checkbox';
import { CheckboxProps } from './Checkbox.types';

const mockProps: CheckboxProps = {
  label: 'Checkbox',
  id: '1',
  name: 'example',
  value: 'example',
};

describe('Checkbox', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<Checkbox {...mockProps} />);
    expect(getByText('Checkbox')).toBeVisible();
  });
});
