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
      id: '1',
      serviceName: { value: 'Hip Replacement' },
      extras: {
        targetItems: {
          0: {
            duration: { value: '10' },
            id: 'targetItem0',
            price: { value: '60' },
            serviceExtraName: { value: 'Blood Test' },
          },
          1: {
            duration: { value: '10' },
            id: 'targetItem1',
            price: { value: '60' },
            serviceExtraName: { value: 'Blood Test' },
          },
        },
      },
    },
    {
      id: '2',
      serviceName: { value: 'Hip Replacement' },
      extras: {
        targetItems: {
          0: {
            duration: { value: '10' },
            id: 'targetItem0',
            price: { value: '60' },
            serviceExtraName: { value: 'Blood Test' },
          },
          1: {
            duration: { value: '10' },
            id: 'targetItem1',
            price: { value: '60' },
            serviceExtraName: { value: 'Blood Test' },
          },
        },
      },
    },
  ],
  dropdownColumn2List: [
    {
      id: '1',
      serviceName: { value: 'Anatomy Scan' },
      extras: {
        targetItems: {
          0: {
            duration: { value: '10' },
            id: 'targetItem0',
            price: { value: '60' },
            serviceExtraName: { value: 'Blood Test' },
          },
          1: {
            duration: { value: '10' },
            id: 'targetItem1',
            price: { value: '60' },
            serviceExtraName: { value: 'Blood Test' },
          },
        },
      },
    },
  ],
};

describe('Search', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<Search {...mockProps} />);
    expect(getByText('Type in a scan or test...')).toBeVisible();
  });
});
