import React from 'react';
import { render } from '@testing-library/react';
import ModalCallUs from './ModalCallUs';
import { ModalCallUsProps } from './ModalCallUs.types';

const mockProps: ModalCallUsProps = {
  defaultOpen: true,
  contacts: [
    {
      title: <span>General enquiries & Appointments</span>,
      phone: { text: '020 3131 5978', number: '+4420 3131 5978' },
      availability: <span>Monday to Friday 8am - 6pm</span>,
    },
    {
      title: <span>media & Press</span>,
      phone: { text: '020 3131 5978', number: '+4420 3131 5978' },
      availability: <span>Monday to Friday 8am - 6pm</span>,
    },
    {
      title: <span>feedback & Complaints</span>,
      phone: { text: '020 3131 5978', number: '+4420 3131 5978' },
      availability: <span>Monday to Friday 8am - 6pm</span>,
    },
    {
      title: <span>customer service</span>,
      phone: { text: '020 3131 5978', number: '+4420 3131 5978' },
      availability: <span>Monday to Friday 8am - 6pm</span>,
    },
  ],
};

jest.mock('next-localization', () => ({
  useI18n: () => {
    return {
      t: (str: string) => str,
    };
  },
}));

describe('ModalCallUs', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<ModalCallUs {...mockProps} />);
    expect(getByText('General enquiries & Appointments')).toBeVisible();
    expect(getByText('media & Press')).toBeVisible();
    expect(getByText('feedback & Complaints')).toBeVisible();
    expect(getByText('customer service')).toBeVisible();
  });
});
