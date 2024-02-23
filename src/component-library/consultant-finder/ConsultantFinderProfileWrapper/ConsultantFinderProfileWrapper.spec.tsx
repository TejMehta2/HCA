import React from 'react';
import { render } from '@testing-library/react';
import ConsultantFinderProfileWrapper from './ConsultantFinderProfileWrapper';
import { ConsultantFinderProfileWrapperProps } from './ConsultantFinderProfileWrapper.types';

const mockProps: ConsultantFinderProfileWrapperProps = {
  children: <p>Hello world</p>,
};

describe('ConsultantFinderProfileWrapper', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(
      <ConsultantFinderProfileWrapper {...mockProps} />
    );
    expect(getByText('Hello world')).toBeVisible();
  });
});
