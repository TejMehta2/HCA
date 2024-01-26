import React from 'react';
import { render } from '@testing-library/react';
import SearchWrapper from './SearchWrapper';
import { SearchWrapperProps } from './SearchWrapper.types';

const mockProps: SearchWrapperProps = {
  children: <p>Hello world</p>,
};

describe('SearchWrapper', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<SearchWrapper {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
