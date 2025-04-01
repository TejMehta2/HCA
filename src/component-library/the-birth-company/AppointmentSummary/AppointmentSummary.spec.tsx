import React from 'react';
import { render } from '@testing-library/react';
import AppointmentSummary from './AppointmentSummary';
import { AppointmentSummaryProps } from './AppointmentSummary.types';

const mockProps: AppointmentSummaryProps = {
  title: 'Appointment summary',
  locationTitle: 'Location',
  location: 'London',
  appointmentTitle: 'Appointment',
  appointment: 'With Sonographer',
  dateTitle: 'Date & time',
  date: 'Friday 04 Nov at 10:30am (30 min)',
  priceTitle: 'Price to pay',
  price: '£340',
};

describe('AppointmentSummary', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<AppointmentSummary {...mockProps} />);
    expect(getByText('Appointment summary')).toBeVisible();
  });
});
