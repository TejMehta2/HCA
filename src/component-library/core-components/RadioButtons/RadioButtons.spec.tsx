import React from 'react';
import { render } from '@testing-library/react';
import RadioButtons from './RadioButtons';
import { RadioButtonsProps } from './RadioButtons.types';

const mockProps: RadioButtonsProps = {
  children: <p>Hello world</p>,
};

describe('RadioButtons', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<RadioButtons {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
