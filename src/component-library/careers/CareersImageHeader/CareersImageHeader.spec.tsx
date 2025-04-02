import React from 'react';
import Image from 'next/image';
import { render } from '@testing-library/react';
import CareersImageHeader from './CareersImageHeader';
import { CareersImageHeaderProps } from './CareersImageHeader.types';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';
import Icons from '../../foundation/Icons/Icons';

const mockProps: CareersImageHeaderProps = {
  subtitle: <Text variation="subheading-1">Our roles</Text>,
  title: <Text variation="display-1">Quality care takes diverse people</Text>,
  bodyCopy: (
    <Text variation="body-large">
      From physicians to physiotherapists, all of our colleagues play a part in
      delivering excellence for our patients.
    </Text>
  ),
  cta: (
    <Button size="large" variation="full">
      <a href="#">
        <Icons iconName="iconSearch" />
        <span>
          Search <strong>roles</strong>
        </span>
      </a>
    </Button>
  ),
  image: (
    <Image
      src="/placeholders/quality-care.jpg"
      alt="quality care"
      width="1512"
      height="814"
    />
  ),
};

describe('CareersImageHeader', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<CareersImageHeader {...mockProps} />);
    expect(getByText('Quality care takes diverse people')).toBeVisible();
  });
});
