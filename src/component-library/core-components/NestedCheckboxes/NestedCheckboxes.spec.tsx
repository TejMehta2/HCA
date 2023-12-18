import React from 'react';
import { render } from '@testing-library/react';
import NestedCheckboxes from './NestedCheckboxes';
import { NestedCheckboxesProps } from './NestedCheckboxes.types';

const mockProps: NestedCheckboxesProps = {
  children: <p>Hello world</p>,
};

describe('NestedCheckboxes', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<NestedCheckboxes {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
