import React from 'react';
import { render } from '@testing-library/react';
import Accordion from './Accordion';
import { AccordionProps } from './Accordion.types';

const mockProps: AccordionProps = {
  children: <p>Hello world</p>,
};

describe('Accordion', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<Accordion {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
