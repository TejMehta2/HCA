import React from 'react';
import { render } from '@testing-library/react';
import Checkboxes from './Checkboxes';
import { CheckboxesProps } from './Checkboxes.types';

const mockProps: CheckboxesProps = {
  children: <p>Hello world</p>,
};

describe('Checkboxes', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<Checkboxes {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
