import React from 'react';
import { render } from '@testing-library/react';
import SlotsCalendar from './SlotsCalendar';
import { SlotsCalendarProps } from './SlotsCalendar.types';

const mockProps: SlotsCalendarProps = {
  children: <p>Hello world</p>,
};

describe('SlotsCalendar', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<SlotsCalendar {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
