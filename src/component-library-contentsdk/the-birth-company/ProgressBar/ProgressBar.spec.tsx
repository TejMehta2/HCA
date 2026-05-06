import React from 'react';
import { render } from '@testing-library/react';
import ProgressBar from './ProgressBar';
import { ProgressBarProps } from './ProgressBar.types';

const dummySteps = [
  {
    id: 'a376afaa-c05d-435b-9bd3-5957ec011c6c',
    url: '/booking/data/progressbarsteps/steplocation_selected',
    name: 'StepLocation_Selected',
    displayName: 'StepLocation_Selected',
    fields: {
      Link: {
        value: {
          class: '',
          id: '{7B1A36FD-8597-4118-91F6-880438CE616D}',
          querystring: '',
          anchor: '',
          target: '|Custom',
          title: '',
          linktype: 'internal',
          text: '',
          url: '/HCA/HCA-Main/Home/Booking/Location',
          href: '/booking/location',
        },
      },
      Order: {
        value: 1,
      },
      Selected: {
        value: true,
      },
      StepText: {
        value: 'Location',
      },
    },
  },
];

const mockProps: ProgressBarProps = {
  currentPage: '1',
  steps: dummySteps,
};

describe('ProgressBar', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<ProgressBar {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
