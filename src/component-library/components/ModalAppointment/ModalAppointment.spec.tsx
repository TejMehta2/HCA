import React from 'react';
import { render } from '@testing-library/react';
import ModalAppointment from './ModalAppointment';
import { ModalAppointmentProps } from './ModalAppointment.types';
import Button from '../../core-components/Button/Button';
import Icons from '../../foundation/Icons/Icons';
import Text from '../../foundation/Text/Text';

export const mockProps: ModalAppointmentProps = {
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
      <Button size={'large'} variation={'full'}>
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
      <Button size={'large'} variation={'full'}>
        <a href="#">
          <Icons iconName={'iconMobile'} />
          <span>
            Download our <strong>GP App</strong>
          </span>
        </a>
      </Button>
      <Button size={'large'} variation={'outline'}>
        <a href="#">
          <span>
            View all <strong>GP services</strong>
          </span>
        </a>
      </Button>
    </>
  ),
};

jest.mock('next-localization', () => ({
  useI18n: () => {
    return {
      t: (str: string) => str,
    };
  },
}));

describe('ModalAppointment', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<ModalAppointment {...mockProps} />);
    expect(getByText('Need a specialist?')).toBeVisible();
    expect(getByText('Download our')).toBeVisible();
    expect(getByText('View all')).toBeVisible();
    expect(getByText('Find a')).toBeVisible();
  });
});
