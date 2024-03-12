import React from 'react';
import { render } from '@testing-library/react';
import ConsultantListHeader from './ConsultantListHeader';
import { ConsultantListHeaderProps } from './ConsultantListHeader.types';

const mockProps: ConsultantListHeaderProps = {
  children: <p>Hello world</p>,
};

describe('ConsultantListHeader', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<ConsultantListHeader {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
