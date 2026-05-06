import React from 'react';
import { render } from '@testing-library/react';
import SearchContainer from './SearchContainer';
import { SearchContainerProps } from './SearchContainer.types';

const mockProps: SearchContainerProps = {
  children: <p>Hello world</p>,
};

describe('SearchContainer', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<SearchContainer {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
