import React from 'react';
import BookingTypeCards from './BookingTypeCards';
import type { Meta, StoryObj } from '@storybook/react';
import Button from '../../core-components/Button/Button';
import Icons from '../../foundation/Icons/Icons';
import Text from '../../foundation/Text/Text';
import TextButton from '../../core-components/TextButton/TextButton';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof BookingTypeCards> = {
  title: 'the-birth-company/BookingTypeCards',
  component: BookingTypeCards,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

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

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof BookingTypeCards> = {
  args: {
    cards: cards,
  },
};
