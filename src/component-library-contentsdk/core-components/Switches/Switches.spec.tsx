import React from 'react';
import { render } from '@testing-library/react';
import Switches from './Switches';
import { SwitchesProps } from './Switches.types';

const mockProps: SwitchesProps = {
  label: 'Hello world',
};

describe('Switches', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<Switches {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
