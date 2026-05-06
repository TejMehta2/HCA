import React from 'react';
import { render } from '@testing-library/react';
import CarouselContent from './CarouselContent';
import { CarouselContentProps } from './CarouselContent.types';
import Image from 'next/image';
import Text from '../../foundation/Text/Text';

const mockProps: CarouselContentProps = {
  theme: 'A-HCA-White',
  slides: [
    {
      title: (
        <Text tag="h2" variation="display-2">
          How to plan your visit
        </Text>
      ),
      body: (
        <Text tag="p" variation="body-large">
          Quis laboris proident sint amet id cillum do dolor in tempor est.
          Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
          laborum et culpa minim. Commodo ex laboris pariatur labore nostrud
          dolore ad sit occaecat. Qui ipsum in minim. Nostrud duis cupidatat
          sunt lorem ut.
        </Text>
      ),
      image: (
        <Image
          src="/placeholders/carousel-content.jpg"
          alt="two children playing"
          width="643"
          height="605"
        />
      ),
    },
  ],
};

describe('CarouselContent', () => {
  it('Renders slide from props', async () => {
    const { getByText } = render(<CarouselContent {...mockProps} />);
    expect(getByText('How to plan your visit')).toBeVisible();
  });
});
