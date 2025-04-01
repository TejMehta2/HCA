import React from 'react';
import { render } from '@testing-library/react';
import StatsCards from './StatsCards';
import { StatsCardsProps } from './StatsCards.types';
import Text from '../../foundation/Text/Text';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const mockProps: StatsCardsProps = {
  theme: 'K-HCA-Fern-20',
  header: (
    <Text tag="h2" variation="display-2">
      Let our numbers speak for themselves.
    </Text>
  ),
  bodyCopy: (
    <Text tag="p" variation="body-large">
      Life with us means taking pride in your team and delivering the highest
      quality care. We&apos;ll support your ongoing learning in an environment
      that features advanced equipment and practices, one of the best
      colleague-to-patient ratios in the UK and varied, interesting work. As
      part of HCA US, one of the nation&apos;s leading providers of healthcare
      services, we can also promise that you&apos;ll learn from experts in every
      department and that your opportunities will be endless. With us,
      you&apos;ll be empowered to achieve more in your career, and more for our
      patients.
    </Text>
  ),
  stats: [
    { stat: '26', text: 'operating theatres' },
    { stat: '125', text: 'critical care (ITU) beds' },
    { stat: '888', text: 'registered beds' },
    { stat: '26k', text: 'inpatients' },
    { stat: '64k', text: 'day cases' },
  ],
};

describe('StatsCards', () => {
  it('Renders children from props', async () => {
    mockAllIsIntersecting(true);
    const { getByText } = render(<StatsCards {...mockProps} />);
    expect(getByText('Let our numbers speak for themselves.')).toBeVisible();
  });
});
