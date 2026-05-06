import React from 'react';
import { render } from '@testing-library/react';
import FormProgressBar from './FormProgressBar';
import { FormProgressBarProps } from './FormProgressBar.types';
import Icons from '../../foundation/Icons/Icons';
import Text from '../../foundation/Text/Text';

const mockProps: FormProgressBarProps = {
  pages: [
    {
      pageControl: (
        <a href="#">
          <Icons iconName="iconInfo" />
          <Text variation="body-medium-extra-large">Patient Details</Text>
        </a>
      ),
      stage: 'previous',
    },
    {
      pageControl: (
        <div>
          <Icons iconName="iconCreditCard" />
          <Text variation="body-bold-extra-large">Payment</Text>
        </div>
      ),
      stage: 'active',
    },
    {
      pageControl: (
        <div>
          <Icons iconName="iconCheckCircle" />
          <Text variation="body-medium-extra-large">Confirmation</Text>
        </div>
      ),
      stage: 'inactive',
    },
  ],
};

describe('FormProgressBar', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<FormProgressBar {...mockProps} />);
    expect(getByText('Patient Details')).toBeVisible();
  });
});
