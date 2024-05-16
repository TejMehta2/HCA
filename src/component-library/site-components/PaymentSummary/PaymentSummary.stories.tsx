import React from 'react';
import PaymentSummary from './PaymentSummary';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';
import Icons from '../../foundation/Icons/Icons';
import ConfirmationSummary from '../../components/ConfirmationSummary/ConfirmationSummary';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof PaymentSummary> = {
  title: 'site-components/PaymentSummary',
  component: PaymentSummary,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;

const printHandler = () => {
  window.print();
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof PaymentSummary> = {
  args: {
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
        <button onClick={printHandler}>
          <Icons iconName="iconPrint" />
          Print confirmation
        </button>
      </Button>
    ),
  },
};
