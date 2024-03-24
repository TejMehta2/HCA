import React from 'react';
import { render } from '@testing-library/react';
import Accordions from '../Accordions/Accordions';
import { AccordionsProps } from '../Accordions/Accordions.types';

const mockProps: AccordionsProps = {
  accordions: [
    {
      title: 'How long will I have to wait to book a hip pain appointment?',
      children: (
        <p>
          Eiusmod irure nostrud culpa veniam nisi incididunt nostrud commodo
          deserunt anim quis cupidatat irure duis. Eu voluptate pariatur non.
          Elit dolore consequat veniam et. Eiusmod consectetur sit dolor laborum
          excepteur laborum quis.
        </p>
      ),
    },
  ],
};

describe('Accordions', () => {
  it('Renders accordion from props', async () => {
    const { getByText } = render(<Accordions {...mockProps} />);
    expect(
      getByText('How long will I have to wait to book a hip pain appointment?')
    ).toBeVisible();
  });
});
