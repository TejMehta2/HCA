/* eslint-disable react/jsx-key */
import React from 'react';
import { render } from '@testing-library/react';
import FooterSmall from './FooterSmall';
import { FooterSmallProps } from './FooterSmall.types';
import Image from 'next/image';
import Text from '../../foundation/Text/Text';

const mockProps: FooterSmallProps = {
  theme: 'Palace-Red',
  logo: <Image src="/palace-gate-white.svg" alt="" width="209" height="34" />,
  ctas: [
    <a href="#">Privacy Policy</a>,
    <a href="#">Terms & Conditions</a>,
    <a href="#">Terms of business</a>,
  ],
  copyright: (
    <Text variation="body-small" tag="small">
      © Palace Gate Practice 2025. All rights reserved.
    </Text>
  ),
};

describe('FooterSmall', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<FooterSmall {...mockProps} />);
    expect(
      getByText('© Palace Gate Practice 2025. All rights reserved.')
    ).toBeVisible();
  });
});
