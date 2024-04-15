import React from 'react';
import { render } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';
import { ErrorMessageProps } from './ErrorMessage.types';
import Text from '../../foundation/Text/Text';

const mockProps: ErrorMessageProps = {
  children: (
    <>
      <Text tag="h2" variation="display-4">
        No location results found.
      </Text>
      <Text tag="p" variation="body-extra-large">
        Please try another search
      </Text>
    </>
  ),
};

describe('ErrorMessage', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<ErrorMessage {...mockProps} />);
    expect(getByText('No location results found.')).toBeVisible();
  });
});
