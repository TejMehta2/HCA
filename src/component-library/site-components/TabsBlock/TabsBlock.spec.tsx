import React from 'react';
import { render } from '@testing-library/react';
import TabsBlock from './TabsBlock';
import { TabsBlockProps } from './TabsBlock.types';
import Text from '../../foundation/Text/Text';
import Image from 'next/image';

const mockProps: TabsBlockProps = {
  theme: 'L-HCA-Teal-5',
  title: (
    <Text tag="h2" variation="display-4">
      Our appointments & memberships
    </Text>
  ),
  tabsContent: [
    {
      tab: { icon: 'iconOneOff', label: 'One-off' },
      image: (
        <Image
          src="/placeholders/riverside-building-at-dusk.png"
          alt="riverside building at dusk"
          width="643"
          height="605"
        />
      ),
      title: (
        <Text tag="h3" variation="display-5">
          One-off appointments
        </Text>
      ),
      bodyCopy: (
        <Text tag="p" variation="body-large">
          Quis laboris proident sint amet id cillum do dolor in tempor est.
          Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
          laborum et culpa minim. Commodo ex laboris pariatur labore nostrud
          dolore ad sit occaecat. Qui ipsum in minim. Nostrud duis cupidatat
          sunt lorem ut.
        </Text>
      ),
    },
    {
      tab: { icon: 'iconFlexible', label: 'Flexi' },
      image: (
        <Image
          src="/placeholders/riverside-building-at-dusk.png"
          alt="riverside building at dusk"
          width="643"
          height="605"
        />
      ),
      title: (
        <Text tag="h3" variation="display-5">
          Flexi appointments
        </Text>
      ),
      bodyCopy: (
        <Text tag="p" variation="body-large">
          Quis laboris proident sint amet id cillum do dolor in tempor est.
          Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
          laborum et culpa minim. Commodo ex laboris pariatur labore nostrud
          dolore ad sit occaecat. Qui ipsum in minim. Nostrud duis cupidatat
          sunt lorem ut.
        </Text>
      ),
    },
    {
      tab: { icon: 'iconCalendar', label: 'Annual' },
      image: (
        <Image
          src="/placeholders/riverside-building-at-dusk.png"
          alt="riverside building at dusk"
          width="643"
          height="605"
        />
      ),
      title: (
        <Text tag="h3" variation="display-5">
          Annual appointments
        </Text>
      ),
      bodyCopy: (
        <Text tag="p" variation="body-large">
          Quis laboris proident sint amet id cillum do dolor in tempor est.
          Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
          laborum et culpa minim. Commodo ex laboris pariatur labore nostrud
          dolore ad sit occaecat. Qui ipsum in minim. Nostrud duis cupidatat
          sunt lorem ut.
        </Text>
      ),
    },
  ],
};

describe('TabsBlock', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<TabsBlock {...mockProps} />);
    expect(getByText('Our appointments & memberships')).toBeVisible();
  });
});
