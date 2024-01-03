import React from 'react';
import { render } from '@testing-library/react';
import Checkboxes from './Checkboxes';
import { CheckboxesProps } from './Checkboxes.types';
import Checkbox from '../Checkbox/Checkbox';

const mockProps: CheckboxesProps = {
  children: (
    <>
      <Checkbox label="Example 1" name="example" value={1} id="example-1" />
      <Checkbox label="Example 2" name="example" value={2} id="example-2" />
      <Checkbox label="Example 3" name="example" value={3} id="example-3" />
    </>
  ),
};

describe('Checkboxes', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<Checkboxes {...mockProps} />);
    expect(getByText('Example 3')).toBeVisible();
  });
});
