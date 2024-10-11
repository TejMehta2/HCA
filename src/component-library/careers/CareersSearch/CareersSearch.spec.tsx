import React from 'react';
import { render } from '@testing-library/react';
import CareersSearch from './CareersSearch';
import { CareersSearchProps } from './CareersSearch.types';

const mockProps: CareersSearchProps = {
  search: <p>Hello world</p>,
  filters: <p>Hello world</p>,
};

describe('CareersSearch', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<CareersSearch {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
