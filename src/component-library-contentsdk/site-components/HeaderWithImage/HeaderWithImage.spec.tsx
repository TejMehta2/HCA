import React from 'react';
import { render } from '@testing-library/react';
import HeaderWithImage from './HeaderWithImage';
import { HeaderWithImageProps } from './HeaderWithImage.types';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';
import Icons from '../../foundation/Icons/Icons';
import Image from 'next/image';

const mockProps: HeaderWithImageProps = {
  title: (
    <Text variation="display-1" tag="h2">
      Departments
    </Text>
  ),
  copy: (
    <Text variation="body-large" tag="p">
      Quis laboris proident sint amet id cillum do dolor in tempor est.
      Exercitation aute sint tempor eu ut aliquip commodo enim nulla et laborum
      et culpa minim. Commodo ex laboris pariatur labore nostrud dolore.
    </Text>
  ),
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
      src="/placeholders/lab-technician.jpeg"
      alt="lab technician"
      width="1024"
      height="683"
    />
  ),
  theme: 'F-HCA-Fern',
};

describe('HeaderWithImage', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<HeaderWithImage {...mockProps} />);
    expect(getByText('Departments')).toBeVisible();
  });
});
