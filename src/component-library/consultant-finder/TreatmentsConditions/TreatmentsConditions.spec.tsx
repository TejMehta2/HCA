import React from 'react';
import { render } from '@testing-library/react';
import TreatmentsConditions from './TreatmentsConditions';
import { TreatmentsConditionsProps } from './TreatmentsConditions.types';

const mockProps: TreatmentsConditionsProps = {
  children: <p>Hello world</p>,
};

describe('TreatmentsConditions', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<TreatmentsConditions {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
