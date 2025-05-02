import React from 'react';
import { render } from '@testing-library/react';
import DualCTABlock from './DualCTABlock';
import { DualCTABlockProps } from './DualCTABlock.types';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';
import Icons from '../../foundation/Icons/Icons';

const mockProps: DualCTABlockProps = {
  theme: 'A-HCA-White',
  content: [
    {
      subheader: (
        <Text tag="p" variation="subheading-1">
          Register for job alerts
        </Text>
      ),
      header: (
        <Text tag="h3" variation="display-2">
          Stay ahead of the game
        </Text>
      ),
      bodyCopy: (
        <Text tag="p" variation="body-large">
          We&apos;re always looking for talented people. <br />
          Make sure you never miss one of our new opportunities
        </Text>
      ),
      cta: (
        <>
          <Button size="large" variation="full">
            <a href="#">
              <Icons iconName="iconEmail" />
              <span>
                Register <strong>your interest</strong>
              </span>
            </a>
          </Button>
        </>
      ),
    },
    {
      subheader: (
        <Text tag="p" variation="subheading-1">
          Express your interest
        </Text>
      ),
      header: (
        <Text tag="h3" variation="display-2">
          Take the first step towards your goal
        </Text>
      ),
      bodyCopy: (
        <Text tag="p" variation="body-large">
          We can help find a job that suits you. Submit your CV and we&apos;ll
          match it with suitable roles when they become available and contact
          you directly.
        </Text>
      ),
      cta: (
        <>
          <Button size="large" variation="full">
            <a href="#">
              <Icons iconName="iconArrowSmallUp" />
              <span>
                Submit <strong>your CV</strong>
              </span>
            </a>
          </Button>
        </>
      ),
    },
  ],
};

describe('DualCTABlock', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<DualCTABlock {...mockProps} />);
    expect(getByText('Stay ahead of the game')).toBeVisible();
  });
});
