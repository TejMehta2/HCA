import React from 'react';
import { render } from '@testing-library/react';
import SearchBar from './SearchBar';
import { SearchBarProps } from './SearchBar.types';

const mockProps: SearchBarProps = {
  placeholder: 'Cardiac Care',
};

describe('SearchBar', () => {
  it('Renders placeholder from props', async () => {
    const { getByText } = render(<SearchBar {...mockProps} />);
    expect(getByText('Cardiac Care')).toBeVisible();
  });
});
