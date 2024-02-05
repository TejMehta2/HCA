import React from 'react';
import { render } from '@testing-library/react';
import CardDoctor from './CardDoctor';
import { CardDoctorProps } from './CardDoctor.types';

const mockProps: CardDoctorProps = {
  image: <></>,
  title: <h3>John Smith</h3>,
  department: <span>Orthopaedics</span>,
  cta: (
    <a href="#">
      View <strong>profile</strong>
    </a>
  ),
};

describe('CardDoctor', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<CardDoctor {...mockProps} />);
    expect(getByText('John Smith')).toBeVisible();
    expect(getByText('Orthopaedics')).toBeVisible();
    expect(getByText('profile')).toBeVisible();
  });
});
