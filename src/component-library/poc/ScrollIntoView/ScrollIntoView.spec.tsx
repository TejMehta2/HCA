import React from 'react';
import { render } from '@testing-library/react';
import ScrollIntoView from './ScrollIntoView';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

describe('ScrollIntoView', () => {
  it('Renders component', async () => {
    mockAllIsIntersecting(true);
    const { getByText } = render(<ScrollIntoView />);
    expect(getByText('Committed to your care')).toBeVisible();
  });
});
