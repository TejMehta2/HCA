import React from 'react';
import CTABlock from './CTABlock';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';
import TextButton from '../../core-components/TextButton/TextButton';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof CTABlock> = {
  title: 'site-components/CTABlock',
  component: CTABlock,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof CTABlock> = {
  args: {
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
        eiusmod ullamco eu esse laborum deserunt et officia reprehenderit.
        Aliquip laboris duis ex labore veniam labore do nostrud minim labore
        eiusmod voluptate sit commodo officia. Commodo tempor tempor magna
        deserunt sunt dolore dolore.
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
  },
};

export const Wrapping: StoryObj<typeof CTABlock> = {
  args: {
    ...Default.args,
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
              Click{' '}
              <strong>me me me me me me me me me me me me me me me me</strong>
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
  },
};
