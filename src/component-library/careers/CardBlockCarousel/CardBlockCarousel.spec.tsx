import React from 'react';
import { render } from '@testing-library/react';
import CardBlockCarousel from './CardBlockCarousel';
import { CardBlockCarouselProps } from './CardBlockCarousel.types';
import Text from '../../foundation/Text/Text';
import Image from 'next/image';
import Icons from '../../foundation/Icons/Icons';

const mockProps: CardBlockCarouselProps = {
  subtitle: (
    <Text tag="p" variation="subheading-1">
      Our benefits
    </Text>
  ),
  title: (
    <Text tag="h2" variation="display-2">
      Focused on creating a brilliant place to work
    </Text>
  ),
  bodyText: (
    <Text tag="p" variation="body-medium">
      Delivering quality patient care and innovative treatments is achieved
      through diverse people working in diverse roles, which means there&apos;s
      a good chance we&apos;ll have an opportunity to suit you.
    </Text>
  ),
  cards: [
    {
      image: (
        <Image
          src="/placeholders/london.jpg"
          alt="london"
          width="456"
          height="253"
        />
      ),
      icon: <Icons iconName="iconCreditCard48" />,
      title: 'Private healthcare for your whole family',
      bodyText: (
        <Text tag="p" variation="body-medium">
          Your holidays are important to you. That&apos;s why we&apos;ll sign
          you up to the &apos;Beneflex&apos; site where you can buy up to 10
          days extra annual leave.
        </Text>
      ),
    },
    {
      icon: <Icons iconName="iconFrame48" />,
      title: 'Season ticket loan',
      bodyText: (
        <Text tag="p" variation="body-medium">
          You can start your pension as soon as you join us. Which means with
          us, you can look out for your future from day one.
        </Text>
      ),
    },
  ],
};

describe('CardBlockCarousel', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<CardBlockCarousel {...mockProps} />);
    expect(
      getByText('Focused on creating a brilliant place to work')
    ).toBeVisible();
  });
});
