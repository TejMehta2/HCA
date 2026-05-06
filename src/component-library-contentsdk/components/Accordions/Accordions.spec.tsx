import React from 'react';
import { render } from '@testing-library/react';
import Accordions from './Accordions';
import { AccordionsProps } from './Accordions.types';

const mockProps: AccordionsProps = {
  accordions: [
    {
      title:
        'How long will I have to wait to book a shoulder pain appointment?',
      children: <p>Eiusmod irure nostrud culpa</p>,
    },
    {
      title: 'How long will I have to wait to book a hip pain appointment?',
      children: (
        <p>
          Eu voluptate pariatur non. Elit dolore consequat veniam et. Eiusmod
          consectetur sit dolor laborum excepteur laborum quis.
        </p>
      ),
    },
    {
      title: 'How long will I have to wait to book a hip pain appointment?',
      children: (
        <p>
          Eu voluptate pariatur non. Elit dolore consequat veniam et. Eiusmod
          consectetur sit dolor laborum excepteur laborum quis.
        </p>
      ),
    },
    {
      title: 'How long will I have to wait to book a hip pain appointment?',
      children: (
        <p>
          Eu voluptate pariatur non. Elit dolore consequat veniam et. Eiusmod
          consectetur sit dolor laborum excepteur laborum quis.
        </p>
      ),
    },
  ],
};

describe('Accordions', () => {
  it('Renders accordion from props', async () => {
    const { getByText } = render(<Accordions {...mockProps} />);
    expect(
      getByText(
        'How long will I have to wait to book a shoulder pain appointment?'
      )
    ).toBeVisible();
  });
});
