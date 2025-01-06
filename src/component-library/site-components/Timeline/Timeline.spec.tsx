import React from 'react';
import { render } from '@testing-library/react';
import Timeline from './Timeline';
import { TimelineProps } from './Timeline.types';

const mockProps: TimelineProps = {
  subheading: <p>subheading</p>,
  heading: <p>heading</p>,
  copy: <p>copy</p>,
  children: <p>children</p>,
};

describe('Timeline', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<Timeline {...mockProps} />);
    expect(getByText('subheading')).toBeVisible();
    expect(getByText('heading')).toBeVisible();
    expect(getByText('copy')).toBeVisible();
    expect(getByText('children')).toBeVisible();
  });
});
