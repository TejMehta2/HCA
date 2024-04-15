import React from 'react';
import { render } from '@testing-library/react';
import TextBlockHeader from './TextBlockHeader';
import { TextBlockHeaderProps } from './TextBlockHeader.types';
import Text from '../../foundation/Text/Text';

const mockProps: TextBlockHeaderProps = {
  children: (
    <>
      <Text variation={'subheading-1'}>Payment plans</Text>
      <Text variation={'display-2'}>New to private healthcare?</Text>
    </>
  ),
};

describe('TextBlockHeader', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<TextBlockHeader {...mockProps} />);
    expect(getByText('Hello world')).toBeVisible();
  });
});
