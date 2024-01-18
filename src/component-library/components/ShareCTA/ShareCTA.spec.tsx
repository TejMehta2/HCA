import React from 'react';
import { render } from '@testing-library/react';
import ShareCTA from './ShareCTA';
import { ShareCTAProps } from './ShareCTA.types';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';
import Icons from '../../foundation/Icons/Icons';

const mockProps: ShareCTAProps = {
  shareData: {
    url: 'https://hca-digital-dev-hca-main.hcatest.co.uk/',
    title: 'Test',
    text: 'Test text',
  },

  shareCtaText: (
    <span>
      Share <strong>cost information</strong>
    </span>
  ),

  heading: (
    <Text tag="h2" variation="display-2">
      Share this cost
    </Text>
  ),

  subheading: (
    <Text tag="p" variation="subheading-1">
      Hip Surgery - £5,000
    </Text>
  ),

  children: (
    <Button size="large" theme="square-outline">
      <a
        href={`mailto:?subject=${encodeURI('Hip Surgery')}&body=${encodeURI(
          'Quis laboris proident sint amet id cillum do dolor in tempor est https://hca-digital-dev-hca-main.hcatest.co.uk/'
        )}`}
        title="Share by Email"
      >
        <Icons iconName="iconEmail"></Icons>
        <span>Email</span>
      </a>
    </Button>
  ),
};

describe('ShareCTA', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<ShareCTA {...mockProps} />);
    expect(getByText('Share')).toBeVisible();
  });
});
