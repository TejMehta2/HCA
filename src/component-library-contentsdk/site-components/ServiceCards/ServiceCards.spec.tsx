import React from 'react';
import { render } from '@testing-library/react';
import ServiceCards from './ServiceCards';
import { ServiceCardsProps } from './ServiceCards.types';
import Text from '../../foundation/Text/Text';
import CardService from '../../components/CardService/CardService';
import Image from 'next/image';

const mockProps: ServiceCardsProps = {
  children: [
    <React.Fragment key={1}>
      <CardService link={<a href="#">Learn More</a>}>
        <Image
          src="/placeholders/children-playing.jpg"
          alt="two children playing"
          width="643"
          height="605"
        />
        <Text variation="display-6">Cardiac Care 1</Text>
      </CardService>

      <CardService link={<a href="#">Learn More</a>}>
        <Image
          src="/placeholders/children-playing.jpg"
          alt="two children playing"
          width="643"
          height="605"
        />
        <Text variation="display-6">Cardiac Care 2</Text>
      </CardService>

      <CardService link={<a href="#">Learn More</a>}>
        <Image
          src="/placeholders/children-playing.jpg"
          alt="two children playing"
          width="643"
          height="605"
        />
        <Text variation="display-6">Cardiac Care 3</Text>
      </CardService>

      <CardService link={<a href="#">Learn More</a>}>
        <Image
          src="/placeholders/children-playing.jpg"
          alt="two children playing"
          width="643"
          height="605"
        />
        <Text variation="display-6">Cardiac Care 4</Text>
      </CardService>

      <CardService link={<a href="#">Learn More</a>}>
        <Image
          src="/placeholders/children-playing.jpg"
          alt="two children playing"
          width="643"
          height="605"
        />
        <Text variation="display-6">Cardiac Care 5</Text>
      </CardService>
    </React.Fragment>,
  ],
  title: <Text variation="display-2">Exceptional care you can trust</Text>,
  subtitle: <Text variation="subheading-1">our departments</Text>,
  bodyText: (
    <Text>
      Quis laboris proident sint amet id cillum do dolor in tempor est.
      Exercitation aute sint tempor eu ut aliquip commodo enim nulla et laborum
      et culpa minim. Commodo ex laboris pariatur labore nostrud dolore.
    </Text>
  ),
};

describe('ServiceCards', () => {
  it('Renders title from props', async () => {
    const { getByText } = render(<ServiceCards {...mockProps} />);
    expect(getByText('Exceptional care you can trust')).toBeVisible();
  });
});

describe('ServiceCards', () => {
  it('Renders subtitle from props', async () => {
    const { getByText } = render(<ServiceCards {...mockProps} />);
    expect(getByText('our departments')).toBeVisible();
  });
});
