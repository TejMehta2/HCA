import React from 'react';
import { render } from '@testing-library/react';
import SelectLocation from './SelectLocation';
import { SelectLocationProps } from './SelectLocation.types';

const mockProps: SelectLocationProps = {
  children: <p>Hello world</p>,
};

describe('SelectLocation', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<SelectLocation {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
