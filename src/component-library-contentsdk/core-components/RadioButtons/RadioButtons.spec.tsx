import React from 'react';
import { render } from '@testing-library/react';
import RadioButtons from './RadioButtons';
import { RadioButtonsProps } from './RadioButtons.types';
import RadioButton from '../RadioButton/RadioButton';

const mockProps: RadioButtonsProps = {
  children: [
    <RadioButton key="1" label="example A" name="test" value="test1" />,
    <RadioButton key="2" label="example B" name="test" value="test2" />,
    <RadioButton key="3" label="example C" name="test" value="test3" />,
  ],
};

describe('RadioButtons', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<RadioButtons {...mockProps} />);
    expect(getByText('example A')).toBeVisible();
  });
});
