import React from 'react';
import { render } from '@testing-library/react';
import AccordionGroup from './AccordionGroup';
import { AccordionGroupProps } from './AccordionGroup.types';

const mockProps: AccordionGroupProps = {
  children: <p>Hello world</p>,
};

describe('AccordionGroup', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<AccordionGroup {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
