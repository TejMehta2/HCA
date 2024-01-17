import React from 'react';
import { render } from '@testing-library/react';
import AccordionsBlock from './AccordionsBlock';
import { AccordionsBlockProps } from './AccordionsBlock.types';
import Text from '../../foundation/Text/Text';

const mockProps: AccordionsBlockProps = {
  header: (
    <Text tag="h3" variation="display-3">
      Hip Pain FAQ
    </Text>
  ),
  AccordionsBlock: [
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

  cta: <button>View all AccordionsBlock</button>,
};

describe('AccordionsBlock', () => {
  it('Renders accordion from props', async () => {
    const { getByText } = render(<AccordionsBlock {...mockProps} />);
    expect(
      getByText(
        'How long will I have to wait to book a shoulder pain appointment?'
      )
    ).toBeVisible();
  });
});
