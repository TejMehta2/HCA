import React from 'react';
import { render } from '@testing-library/react';
import PaymentFormHeader from './PaymentFormHeader';
import { PaymentFormHeaderProps } from './PaymentFormHeader.types';
import Icons from '../../foundation/Icons/Icons';

const mockProps: PaymentFormHeaderProps = {
  paymentsText: 'Secure Online Payments',
  contactText: 'Any questions?',
  phoneNumber: {
    icon: <Icons iconName="iconPhone" />,
    text: '03332 223 133',
    number: '03332223133',
  },
  openingHours: {
    icon: <Icons iconName="iconClock" />,
    text: 'Mon-Fri 9am - 5:30pm',
  },
};

describe('PaymentFormHeader', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<PaymentFormHeader {...mockProps} />);
    expect(getByText('Secure Online Payments')).toBeVisible();
  });
});
