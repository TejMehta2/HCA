import React from 'react';
import { render } from '@testing-library/react';
import SearchBar from './SearchBar';
import { SearchBarProps } from './SearchBar.types';

const mockProps: SearchBarProps = {
  placeholder: 'Hello world',
};

describe('SearchBar', () => {
  it('Renders children from props', async () => {
    const rendered = render(<SearchBar {...mockProps} />);
    rendered.getByPlaceholderText('Hello world');
  });
});
