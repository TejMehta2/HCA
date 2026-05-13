import React from 'react';
import { render } from '@testing-library/react';
import HeaderProfile from './HeaderProfile';
import { HeaderProfileProps } from './HeaderProfile.types';
import Image from 'next/image';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';
import Icons from '../../foundation/Icons/Icons';

const mockProps: HeaderProfileProps = {
  theme: 'Palace-Beige',
  image: (
    <Image
      src="/placeholders/quote-block-author-full.png"
      alt="Dr May Abboudi"
      width="214"
      height="214"
    />
  ),
  title: (
    <Text variation="display-2" tag="h1">
      Dr May Abboudi
    </Text>
  ),
  department: (
    <Text variation="subheading-1" tag="p">
      General Practice (GP)
    </Text>
  ),
  ctas: (
    <Button size="large" variation="full" contentVariation="full-width">
      <a href="#">
        <Icons iconName="iconPhone" />
        <span>
          Call us to <strong>book an appointment</strong>
        </span>
      </a>
    </Button>
  ),
};

describe('HeaderProfile', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<HeaderProfile {...mockProps} />);
    expect(getByText('Dr May Abboudi')).toBeVisible();
  });
});
