import React from 'react';
import { render } from '@testing-library/react';
import RadioButton from './RadioButton';
import { RadioButtonProps } from './RadioButton.types';

const mockProps: RadioButtonProps = {
  label: 'Hello world',
  name: 'test',
  value: 'test',
};

describe('RadioButton', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<RadioButton {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
