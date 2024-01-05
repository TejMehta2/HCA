import React from 'react';
import { render } from '@testing-library/react';
import Breadcrumbs from './Breadcrumbs';
import { BreadcrumbsProps } from './Breadcrumbs.types';

const mockProps: BreadcrumbsProps = {
  children: [
    <a href="#" key={1}>
      First Breadcrumb
    </a>,
    <a href="#" key={2}>
      Second Breadcrumb
    </a>,
    <a href="#" key={3}>
      Third Breadcrumb
    </a>,
    <span key={4}>Current Page</span>,
  ],
};

describe('Breadcrumbs', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<Breadcrumbs {...mockProps} />);
    expect(getByText('Current Page')).toBeVisible();
  });
});
