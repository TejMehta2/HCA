import React from 'react';
import { render } from '@testing-library/react';
import AccordionsBlock from './AccordionsBlock';
import { AccordionsBlockProps } from './AccordionsBlock.types';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';
import TextButton from '../../core-components/TextButton/TextButton';

const mockProps: AccordionsBlockProps = {
  theme: 'K-HCA-Fern-20',
  subtitle: (
    <Text tag="h3" variation="subheading-1">
      Meta title
    </Text>
  ),
  header: (
    <Text tag="h2" variation="display-3">
      Accordion Block
    </Text>
  ),
  body: (
    <Text tag="p" variation="body-large">
      Quis ut irure non mollit. Ipsum esse mollit sunt nulla. Ipsum non cillum
      mollit officia tempor in ad non consequat esse. Sunt culpa adipisicing
      eiusmod ullamco eu esse laborum deserunt et officia reprehenderit. Aliquip
      laboris duis ex labore veniam labore do nostrud minim labore eiusmod
      voluptate sit commodo officia. Commodo tempor tempor magna deserunt sunt
      dolore dolore.
    </Text>
  ),
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
    {
      title: 'What are the payment options for hip pain treatment at HCA?',
      children: (
        <p>
          Eiusmod irure nostrud culpa veniam nisi incididunt nostrud commodo
          deserunt anim quis cupidatat irure duis. Eu voluptate pariatur non.
          Elit dolore consequat veniam et. Eiusmod consectetur sit dolor laborum
          excepteur laborum quis.
        </p>
      ),
    },
    {
      title: 'What should I prepare for my hip pain appointment?',
      children: (
        <p>
          Eiusmod irure nostrud culpa veniam nisi incididunt nostrud commodo
          deserunt anim quis cupidatat irure duis. Eu voluptate pariatur non.
          Elit dolore consequat veniam et. Eiusmod consectetur sit dolor laborum
          excepteur laborum quis.
        </p>
      ),
    },
    {
      title: 'Do you offer hip pain rehabilitation and support?',
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

  ctas: (
    <>
      <Button variation="full" size="large">
        <a href="#">
          <span>
            Click <strong>me</strong>
          </span>
        </a>
      </Button>
      <TextButton>
        <a href="#">
          <span>
            Click <strong>me</strong>
          </span>
        </a>
      </TextButton>
    </>
  ),
};

describe('AccordionsBlock', () => {
  it('Renders content from props', async () => {
    const { getByText } = render(<AccordionsBlock {...mockProps} />);
    expect(getByText('Accordion Block')).toBeVisible();
  });
});
