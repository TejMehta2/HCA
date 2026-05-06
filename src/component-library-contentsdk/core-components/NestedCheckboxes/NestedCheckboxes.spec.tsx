import React from 'react';
import { render } from '@testing-library/react';
import NestedCheckboxes from './NestedCheckboxes';
import { NestedCheckboxesProps } from './NestedCheckboxes.types';

const mockProps: NestedCheckboxesProps = {
  items: [
    {
      mainCheckbox: {
        label: 'Main Checkbox',
        name: 'main checkbox',
        value: 'main-checkbox',
        id: 'main',
      },

      subItems: [
        {
          id: '1',
          label: 'Example 1',
          name: 'example',
          value: 'example-1',
        },
        {
          id: '2',
          label: 'Example 2',
          name: 'example',
          value: 'example-2',
        },
        {
          id: '3',
          label: 'Example 3',
          name: 'example',
          value: 'example-3',
        },
      ],
    },
  ],
};

describe('NestedCheckboxes', () => {
  it('Renders items from props', async () => {
    const { getByText } = render(<NestedCheckboxes {...mockProps} />);
    expect(getByText('Main Checkbox')).toBeVisible();
  });
});
