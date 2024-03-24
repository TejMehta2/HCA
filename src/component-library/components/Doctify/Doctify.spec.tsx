import React from 'react';
import { render } from '@testing-library/react';
import Doctify from './Doctify';
import { DoctifyProps } from './Doctify.types';
import Image from 'next/image';

const mockProps: DoctifyProps = {
  link: <a href="#"></a>,
  rating: 4,
  reviews: '13,500 +',
  logo: {
    dark: (
      <Image
        src="/doctify-dark.png"
        alt="doctify logo dark"
        width="83"
        height="21"
      />
    ),
    light: (
      <Image
        src="/doctify-light.png"
        alt="doctify logo light"
        width="83"
        height="21"
      />
    ),
  },
};

describe('Doctify', () => {
  it('Renders CQC logo', async () => {
    const { getByAltText } = render(<Doctify {...mockProps} />);
    const image = getByAltText('doctify logo dark');
    expect(image).toHaveAttribute('src');
  });
});
