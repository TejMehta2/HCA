import React from 'react';
import { render } from '@testing-library/react';
import ConsultantCard from './ConsultantCard';
import { ConsultantCardProps } from './ConsultantCard.types';

const mockProps: ConsultantCardProps = {
  children: <p>Hello world</p>,
};

describe('ConsultantCard', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<ConsultantCard {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
