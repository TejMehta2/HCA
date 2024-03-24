import React from 'react';
import { render } from '@testing-library/react';
import HomepageHero from './HomepageHero';
import { HomepageHeroProps } from './HomepageHero.types';
import Text from '../../foundation/Text/Text';
import SearchBar from '../../components/SearchBar/SearchBar';
import Button from '../../core-components/Button/Button';
import Icons from '../../foundation/Icons/Icons';
import Image from 'next/image';

const mockProps: HomepageHeroProps = {
  theme: 'H-HCA-Tangerine',
  title: (
    <Text tag="h1" variation="display-1">
      Extraordinary Healthcare
    </Text>
  ),
  search: <SearchBar placeholder="How can we help you?" />,
  ctaTitle: (
    <Text tag="h2" variation="subheading-1">
      Get Started
    </Text>
  ),
  ctas: (
    <>
      <Button size="large" variation="full">
        <a href="#">
          <span>
            Book an <strong>appointment</strong>
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
      src="/placeholders/couple-on-bench.jpeg"
      alt="an old couple sitting on a bench having a nice time"
      width={1460}
      height={1460}
    />
  ),
};

describe('HomepageHero', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<HomepageHero {...mockProps} />);
    expect(getByText('Extraordinary Healthcare')).toBeVisible();
  });
});
