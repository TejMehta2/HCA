import React from 'react';
import { render } from '@testing-library/react';
import HeaderLocation from './HeaderLocation';
import { HeaderLocationProps } from './HeaderLocation.types';
import Text from '../../foundation/Text/Text';
import Icons from '../../foundation/Icons/Icons';
import TextButton from '../../core-components/TextButton/TextButton';
import Image from 'next/image';
import Button from '../../core-components/Button/Button';

const mockProps: HeaderLocationProps = {
  title: <Text>The Wellington Hospital</Text>,
  address: {
    icon: <Icons iconName="iconPin"></Icons>,
    text: (
      <Text variation="body-large" tag="span">
        Wellington Place St John&apos;s Wood London NW8 9LE
      </Text>
    ),
    link: (
      <TextButton>
        <a href="#">Get Directions</a>
      </TextButton>
    ),
  },
  ctas: (
    <>
      <Button size="large" variation="full">
        <a href="#">
          <Icons iconName="iconStethoscope" />
          <span>
            Find a <strong>Consultant</strong>
          </span>
        </a>
      </Button>
      <Button size="large" variation="outline">
        <a href="#">
          <Icons iconName="iconPhone" />
          <span>
            Call us <strong>today</strong>
          </span>
        </a>
      </Button>
    </>
  ),
  image: (
    <Image
      src="/placeholders/the-wellington-hospital.png"
      alt="lab technician"
      width="1024"
      height="683"
    />
  ),
  theme: 'E-HCA-Cerulean',
};

describe('HeaderLocation', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<HeaderLocation {...mockProps} />);
    expect(getByText('The Wellington Hospital')).toBeVisible();
  });
});
