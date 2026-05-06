import React from 'react';
import { render } from '@testing-library/react';
import CareersHompageHero from './CareersHompageHero';
import { CareersHompageHeroProps } from './CareersHompageHero.types';
import Image from 'next/image';
import Text from '../../foundation/Text/Text';

const mockProps: CareersHompageHeroProps = {
  title: (
    <Text tag="h1" variation="display-1">
      Exceptional people. Delivering exceptional care.
    </Text>
  ),
  children: <p>Searchbar</p>,
  image: (
    <Image
      src="/placeholders/couple-on-bench.jpeg"
      alt="an old couple sitting on a bench having a nice time"
      width={1460}
      height={1460}
    />
  ),
};

describe('CareersHompageHero', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<CareersHompageHero {...mockProps} />);
    expect(
      getByText('Exceptional people. Delivering exceptional care.')
    ).toBeVisible();
  });
});
