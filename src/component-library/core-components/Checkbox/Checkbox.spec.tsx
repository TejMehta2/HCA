import React from 'react';
import { render } from '@testing-library/react';
import Checkbox from './Checkbox';
import { CheckboxProps } from './Checkbox.types';

const mockProps: CheckboxProps = {
  children: <p>Hello world</p>,
};

describe('Checkbox', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<Checkbox {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
