import React from 'react';
import { render, screen } from '@testing-library/react';
import CarouselImages from './CarouselImages';
import { CarouselImagesProps } from './CarouselImages.types';
import Image from 'next/image';

const mockProps: CarouselImagesProps = {
  images: [
    <Image
      key={0}
      src="/placeholders/linda.jpg"
      alt="a nurse"
      width="643"
      height="605"
    />,
  ],
};

describe('CarouselImages', () => {
  test('CarouselImages must have src and alt"', () => {
    render(<CarouselImages {...mockProps} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute(
      'src',
      '/_next/image?url=%2Fplaceholders%2Flinda.jpg&w=1920&q=75'
    );
    expect(image).toHaveAttribute('alt', 'a nurse');
  });
});
