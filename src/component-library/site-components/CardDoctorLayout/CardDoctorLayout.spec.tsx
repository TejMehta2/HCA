import React from 'react';
import { render } from '@testing-library/react';
import CardDoctorLayout from './CardDoctorLayout';
import { CardDoctorLayoutProps } from './CardDoctorLayout.types';
import CardDoctor from '../CardDoctor/CardDoctor';

const mockProps: CardDoctorLayoutProps = {
  title: <span>Hip pain consultants</span>,
  children: [
    <CardDoctor
      key={0}
      image={<></>}
      title={<h3>John Smith</h3>}
      department={<span>Orthopaedics</span>}
      cta={
        <a href="#">
          View <strong>profile</strong>
        </a>
      }
    />,
    <CardDoctor
      key={1}
      image={<></>}
      title={<h3>John Smith</h3>}
      department={<span>Orthopaedics</span>}
      cta={
        <a href="#">
          View <strong>profile</strong>
        </a>
      }
    />,
    <CardDoctor
      key={2}
      image={<></>}
      title={<h3>John Smith</h3>}
      department={<span>Orthopaedics</span>}
      cta={
        <a href="#">
          View <strong>profile</strong>
        </a>
      }
    />,
    <CardDoctor
      key={3}
      image={<></>}
      title={<h3>John Smith</h3>}
      department={<span>Orthopaedics</span>}
      cta={
        <a href="#">
          View <strong>profile</strong>
        </a>
      }
    />,
  ],
  cta: (
    <a href="#">
      View all <strong>hip pain consultants</strong>
    </a>
  ),
  theme: 'D-HCA-Teal',
};

describe('CardDoctorLayout', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<CardDoctorLayout {...mockProps} />);
    expect(getByText('Hip pain consultants')).toBeVisible();
  });
});
