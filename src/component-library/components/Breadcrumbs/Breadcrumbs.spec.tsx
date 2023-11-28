import React from 'react';
import { render } from '@testing-library/react';
import Breadcrumbs from './Breadcrumbs';
import { BreadcrumbsProps } from './Breadcrumbs.types';

const mockProps: BreadcrumbsProps = {
  children: <p>Hello world</p>,
};

describe('Breadcrumbs', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<Breadcrumbs {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
