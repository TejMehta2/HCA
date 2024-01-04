import React from 'react';
import { render } from '@testing-library/react';
import CQCBlock from './CQCBlock';
import { CQCBlockProps } from './CQCBlock.types';
import Icons from '../../foundation/Icons/Icons';
import Image from 'next/image';

const mockProps: CQCBlockProps = {
  logo: {
    dark: (
      <Image
        src="/cqc-white.png"
        alt="cqc logo white"
        width="120"
        height="37"
      />
    ),
    light: (
      <Image
        src="/cqc-color.png"
        alt="cqc logo color"
        width="120"
        height="37"
      />
    ),
  },
  icon: <Icons iconName="iconCheckCircle"></Icons>,
  rating: 'Outstanding',
  link: <a href="#"></a>,
};

describe('CQCBlock', () => {
  it('Renders CQC logo', async () => {
    const { getByAltText } = render(<CQCBlock {...mockProps} />);
    const image = getByAltText('cqc logo white');
    expect(image).toHaveAttribute('src');
  });
});
