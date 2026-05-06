import React from 'react';
import { render } from '@testing-library/react';
import StickyCTA from './StickyCTA';
import { StickyCTAProps } from './StickyCTA.types';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';

const mockProps: StickyCTAProps = {
  cta: (
    <Button size="large" variation="full">
      <button>Book an appointment</button>
    </Button>
  ),
  children: (
    <Text tag="h2" variation="heading-1">
      Start your journey now...
    </Text>
  ),
};

describe('StickyCTA', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<StickyCTA {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
