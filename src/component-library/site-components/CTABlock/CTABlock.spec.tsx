import React from 'react';
import { render } from '@testing-library/react';
import CTABlock from './CTABlock';
import { CTABlockProps } from './CTABlock.types';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';
import TextButton from '../../core-components/TextButton/TextButton';

const mockProps: CTABlockProps = {
  theme: 'D-HCA-Teal',
  subheader: (
    <Text tag="p" variation="subheading-1">
      meta title
    </Text>
  ),
  header: (
    <Text tag="h2" variation="display-3">
      Call-to-action block
    </Text>
  ),
  children: (
    <Text tag="p" variation="body-large">
      Quis ut irure non mollit. Ipsum esse mollit sunt nulla. Ipsum non cillum
      mollit officia tempor in ad non consequat esse. Sunt culpa adipisicing
      eiusmod ullamco eu esse laborum deserunt et officia reprehenderit. Aliquip
      laboris duis ex labore veniam labore do nostrud minim labore eiusmod
      voluptate sit commodo officia. Commodo tempor tempor magna deserunt sunt
      dolore dolore.
    </Text>
  ),
  ctas: (
    <>
      <Button size="large" variation="full">
        <a href="#">
          <span>
            Click <strong>me</strong>
          </span>
        </a>
      </Button>
      <Button size="large" variation="outline">
        <a href="#">
          <span>
            Click <strong>me</strong>
          </span>
        </a>
      </Button>
      <TextButton>
        <a href="#">
          <span>
            Text <strong>button</strong>
          </span>
        </a>
      </TextButton>
    </>
  ),
};

describe('CTABlock', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<CTABlock {...mockProps} />);
    expect(getByText('meta title')).toBeVisible();
    expect(getByText('Call-to-action block')).toBeVisible();
  });
});
