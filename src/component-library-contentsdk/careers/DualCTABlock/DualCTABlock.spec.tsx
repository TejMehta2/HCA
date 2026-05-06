import React from 'react';
import { render } from '@testing-library/react';
import DualCTABlock from './DualCTABlock';
import { DualCTABlockProps } from './DualCTABlock.types';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';
import Icons from '../../foundation/Icons/Icons';
import TextBlock from '../../site-components/TextBlock/TextBlock';

const mockProps: DualCTABlockProps = {
  theme: 'A-HCA-White',
  content: [
    <div key={0}>
      <TextBlock
        title={
          <Text tag="h3" variation="display-2">
            Stay ahead of the game
          </Text>
        }
        subheading={
          <Text tag="p" variation="subheading-1">
            Register for job alerts
          </Text>
        }
        text={
          <Text tag="p" variation="body-large">
            We&apos;re always looking for talented people. <br />
            Make sure you never miss one of our new opportunities
          </Text>
        }
        ctas={
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
        }
      />
      <TextBlock
        title={
          <Text tag="h3" variation="display-2">
            Take the first step towards your goal
          </Text>
        }
        subheading={
          <Text tag="p" variation="subheading-1">
            Express your interest
          </Text>
        }
        text={
          <Text tag="p" variation="body-large">
            We can help find a job that suits you. Submit your CV and we&apos;ll
            match it with suitable roles when they become available and contact
            you directly.
          </Text>
        }
        ctas={
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
        }
      />
    </div>,
  ],
};

describe('DualCTABlock', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<DualCTABlock {...mockProps} />);
    expect(getByText('Stay ahead of the game')).toBeVisible();
  });
});
