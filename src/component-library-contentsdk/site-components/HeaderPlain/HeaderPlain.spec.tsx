import React from 'react';
import { render } from '@testing-library/react';
import HeaderPlain from './HeaderPlain';
import { HeaderPlainProps } from './HeaderPlain.types';
import Text from '../../foundation/Text/Text';

const mockProps: HeaderPlainProps = {
  metatitle: <Text tag="h3">Optional meta title</Text>,
  heading: <Text tag="h1">News & articles about healthcare</Text>,
  description: (
    <p>
      Quis laboris proident sint amet id cillum do dolor in tempor est.
      Exercitation aute sint tempor eu ut aliquip commodo enim nulla et laborum
      et culpa minim. Commodo ex laboris pariatur labore nostrud dolore.
    </p>
  ),
};

describe('HeaderPlain', () => {
  it('Renders heading from props', async () => {
    const { getByText } = render(<HeaderPlain {...mockProps} />);
    expect(getByText('News & articles about healthcare')).toBeVisible();
  });
});
