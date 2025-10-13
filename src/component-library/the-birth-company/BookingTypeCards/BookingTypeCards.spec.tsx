import React from 'react';
import { render } from '@testing-library/react';
import BookingTypeCards from './BookingTypeCards';
import { BookingTypeCardsProps } from './BookingTypeCards.types';
import Button from '../../core-components/Button/Button';
import Icons from '../../foundation/Icons/Icons';
import Text from '../../foundation/Text/Text';
import TextButton from '../../core-components/TextButton/TextButton';

const cards = [
  {
    title: <span>Consultant obstetrician</span>,
    copy: (
      <span>
        Text explaining what that appointment would involve and why choose a
        consultant obstetrician.
      </span>
    ),
    cta: (
      <Button size="small" variation="full">
        <a href="#">
          <span>
            <Icons iconName="iconCalendar" />
          </span>
          <span>Find a consultant</span>
        </a>
      </Button>
    ),
  },
  {
    title: <span>Sonographer</span>,
    copy: (
      <span>
        Text explaining what that appointment would involve and why choose a
        consultant obstetrician.
      </span>
    ),
    cta: (
      <Button size="small" variation="full">
        <a href="#">
          <span>
            <Icons iconName="iconCalendar" />
          </span>
          <span>Book a scan</span>
        </a>
      </Button>
    ),
  },
  {
    title: <span>Consultant gynaecologists</span>,
    copy: (
      <span>
        Text explaining what that appointment would involve and why choose a
        consultant obstetrician.
      </span>
    ),
    cta: (
      <Button size="small" variation="full">
        <a href="#">
          <span>
            <Icons iconName="iconCalendar" />
          </span>
          <span>Find a consultant</span>
        </a>
      </Button>
    ),
  },
  {
    title: <span>Midwife</span>,
    copy: (
      <span>
        Text explaining what that appointment would involve and why choose a
        consultant obstetrician.
      </span>
    ),
    cta: (
      <>
        <Text variation="body-bold-small" tag="p">
          Call to book below:
        </Text>
        <TextButton>
          <a href="#">
            <Icons iconName="iconPhone" />
            Hale: 020 3131 5978
          </a>
        </TextButton>
      </>
    ),
  },
  {
    title: <span>Consultant</span>,
    copy: (
      <span>
        Text explaining what that appointment would involve and why choose a
        consultant obstetrician.
      </span>
    ),
    cta: (
      <Button size="small" variation="full">
        <a href="#">
          <span>
            <Icons iconName="iconCalendar" />
          </span>
          <span>Book a scan</span>
        </a>
      </Button>
    ),
  },
];

const mockProps: BookingTypeCardsProps = {
  cards: cards,
};

describe('BookingTypeCards', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<BookingTypeCards {...mockProps} />);
    expect(getByText('Consultant obstetrician')).toBeVisible();
  });
});
