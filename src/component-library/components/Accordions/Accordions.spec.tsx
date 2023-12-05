import React from 'react';
import { render } from '@testing-library/react';
import Accordions from './Accordions';
import { AccordionsProps } from './Accordions.types';

const mockProps: AccordionsProps = {
  children: <p>Hello world</p>,
};

describe('Accordions', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<Accordions {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
