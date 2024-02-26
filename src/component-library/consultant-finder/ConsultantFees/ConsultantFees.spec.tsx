import React from 'react';
import { render } from '@testing-library/react';
import ConsultantFees from './ConsultantFees';
import { ConsultantFeesProps } from './ConsultantFees.types';

const mockProps: ConsultantFeesProps = {
  children: <p>Hello world</p>,
};

describe('ConsultantFees', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<ConsultantFees {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
