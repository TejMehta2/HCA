import React from 'react';
import { render } from '@testing-library/react';
import Breadcrumbs from './Breadcrumbs';
import { BreadcrumbsProps } from './Breadcrumbs.types';

const mockProps: BreadcrumbsProps = {
  children: [
    <a href="#" key={1}>
      Services & Treatments
    </a>,
    <a href="#" key={2}>
      Services & Treatments
    </a>,
    <a href="#" key={3}>
      Services & Treatments
    </a>,
    <span key={4}>Service Lines</span>,
  ],
};

describe('Breadcrumbs', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<Breadcrumbs {...mockProps} />);
    expect(getByText('Services & Treatments')).toBeVisible();
  });
});
