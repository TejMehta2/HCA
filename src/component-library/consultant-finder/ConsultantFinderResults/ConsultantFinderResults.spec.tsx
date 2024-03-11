import React from 'react';
import { render } from '@testing-library/react';
import ConsultantFinderResults from './ConsultantFinderResults';
import { ConsultantFinderResultsProps } from './ConsultantFinderResults.types';

const mockProps: ConsultantFinderResultsProps = {
  children: <p>Hello world</p>,
};

describe('ConsultantFinderResults', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<ConsultantFinderResults {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
