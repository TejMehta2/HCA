import React from 'react';
import { render } from '@testing-library/react';
import PaymentSummary from './PaymentSummary';
import { PaymentSummaryProps } from './PaymentSummary.types';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';
import ConfirmationSummary from '../../components/ConfirmationSummary/ConfirmationSummary';
import Icons from '../../foundation/Icons/Icons';

const mockProps: PaymentSummaryProps = {
  heading: (
    <Text variation="display-4" tag="h1">
      Your payment is complete
    </Text>
  ),
  bodyText: (
    <Text variation="body-large" tag="div">
      <p>Thank you, your invoice payment has been succesful.</p>
    </Text>
  ),

  summary: (
    <ConfirmationSummary
      title="Payment summary"
      optionalItems={[
        { title: 'AmountPaid', text: '£2' },
        { title: 'Invoice reference', text: '1234' },
        { title: 'Payment date', text: '08 May 2024' },
        { title: 'Payment type', text: 'Visa' },
        { title: 'Status', text: 'Succesful' },
        { title: 'Transaction ID', text: 'wfkh7462i7t6figryf' },
      ]}
    />
  ),
  cta: (
    <Button variation="full-dark" size="large">
      <button>
        <Icons iconName="iconPrint" />
        Print confirmation
      </button>
    </Button>
  ),
};

describe('PaymentSummary', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<PaymentSummary {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
