import React from 'react';
import ModalAppointment from './ModalAppointment';
import type { Meta, StoryObj } from '@storybook/react';
import Button from '../../core-components/Button/Button';
import Icons from '../../foundation/Icons/Icons';
import Text from '../../foundation/Text/Text';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

const meta: Meta<typeof ModalAppointment> = {
  title: 'components/ModalAppointment',
  component: ModalAppointment,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof ModalAppointment> = {
  args: {
    defaultOpen: true,
    title1: (
      <Text variation={'display-4'} tag="h2">
        Need a specialist?
      </Text>
    ),
    copy1: (
      <Text variation={'body-large'}>
        Quis laboris proident sint amet id cillum do dolor in tempor est.
        Exercitation aute sint tempor eu ut aliquip commodo.
      </Text>
    ),
    cta1: (
      <>
        <Button size={'large'} theme={'full'}>
          <a href="#">
            <Icons iconName={'iconStethoscope'} />
            <span>
              Find a <strong>consultant</strong>
            </span>
          </a>
        </Button>
      </>
    ),
    title2: (
      <Text variation={'display-4'} tag="h2">
        GP Services
      </Text>
    ),
    copy2: (
      <Text variation={'body-large'}>
        Quis laboris proident sint amet id cillum do dolor in tempor est.
        Exercitation aute sint tempor eu ut aliquip commodo.
      </Text>
    ),
    cta2: (
      <>
        <Button size={'large'} theme={'full'}>
          <a href="#">
            <Icons iconName={'iconMobile'} />
            <span>
              Download our <strong>GP App</strong>
            </span>
          </a>
        </Button>
        <Button size={'large'} theme={'outline'}>
          <a href="#">
            <span>
              View all <strong>GP services</strong>
            </span>
          </a>
        </Button>
      </>
    ),
  },
};
