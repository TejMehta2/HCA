import React from 'react';
import { render } from '@testing-library/react';
import HeaderText from './HeaderText';
import { HeaderTextProps } from './HeaderText.types';
import Button from '../../core-components/Button/Button';
import Text from '../../foundation/Text/Text';

const mockProps: HeaderTextProps = {
  subtitle: <Text variation={'subheading-1'}>Uh oh</Text>,
  title: <Text variation={'display-2'}>Page not found.</Text>,
  description: (
    <Text variation={'body-large'}>
      Quis ut irure non mollit. Ipsum esse mollit sunt nulla. Ipsum non cillum
      mollit officia tempor in ad non consequat esse. Sunt culpa adipisicing
      eiusmod ullamco eu esse laborum deserunt et officia reprehenderit.{' '}
    </Text>
  ),
  cta: (
    <Button size={'large'} variation={'full'}>
      <a href="/">
        <span>
          Go <strong>back</strong>
        </span>
      </a>
    </Button>
  ),
};

describe('HeaderText', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<HeaderText {...mockProps} />);
    expect(getByText('Uh oh')).toBeVisible();
  });
});
