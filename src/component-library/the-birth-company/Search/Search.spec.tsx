import React from 'react';
import { render } from '@testing-library/react';
import Search from './Search';
import SearchProps from './Search.types';

const mockProps: SearchProps = {
  placeholder: 'Type in a scan or test...',
  dropdownColumn1Label: 'Gynaecological scans',
  dropdownColumn2Label: 'Pregnancy scans',
  dropdownColumn1List: [
    {
      title: 'Fertility',
      scans: [
        {
          id: '1',
          name: 'Hip Replacement',
          extras: [
            {
              duration: '10',
              id: 'targetItem0',
              price: '60',
              name: 'Blood Test',
            },
            {
              duration: '10',
              id: 'targetItem1',
              price: '60',
              name: 'Blood Test',
            },
          ],
        },
      ],
    },
    {
      title: 'Gynaecology',
      scans: [
        {
          id: '2',
          name: 'Hip Replacement',
          extras: [
            {
              duration: '10',
              id: 'targetItem0',
              price: '60',
              name: 'Blood Test',
            },
            {
              duration: '10',
              id: 'targetItem1',
              price: '60',
              name: 'Blood Test',
            },
          ],
        },
      ],
    },
  ],
  dropdownColumn2List: [
    {
      scans: [
        {
          id: '1',
          name: 'Anatomy Scan',
          extras: [
            {
              duration: '10',
              id: 'targetItem0',
              price: '60',
              name: 'Blood Test',
            },
            {
              duration: '10',
              id: 'targetItem1',
              price: '60',
              name: 'Blood Test',
            },
          ],
        },
      ],
    },
  ],
};

describe('Search', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<Search {...mockProps} />);
    expect(getByText('Type in a scan or test...')).toBeVisible();
  });
});
