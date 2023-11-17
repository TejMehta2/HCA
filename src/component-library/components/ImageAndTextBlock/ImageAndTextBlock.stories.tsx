import React from 'react';
import ImageAndTextBlock from './ImageAndTextBlock';
import type { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';
import TextButton from '../../core-components/TextButton/TextButton';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ImageAndTextBlock> = {
  title: 'components/ImageAndTextBlock',
  component: ImageAndTextBlock,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Short: StoryObj<typeof ImageAndTextBlock> = {
  args: {
    length: 'short',
    image: (
      <Image
        src="/image-and-text-component-placeholder.jpg"
        alt="two children playing"
        width="643"
        height="605"
      />
    ),

    header: (
      <Text tag="h2" variation="display-2">
        New to private healthcare?
      </Text>
    ),
    children: (
      <>
        <Text tag="p" variation="body-large">
          Quis laboris proident sint amet id cillum do dolor in tempor est.
          Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
          laborum et culpa minim. Commodo ex laboris pariatur labore nostrud
          dolore ad sit occaecat. Qui ipsum in minim. Nostrud duis cupidatat
          sunt lorem ut.
        </Text>
      </>
    ),

    subheader: (
      <Text tag="h3" variation="subheading-1">
        payment plans
      </Text>
    ),
    ctas: {
      button1: (
        <Button size="large" theme="full-dark">
          <button>
            <span>
              Learn more about <strong>self-pay</strong>
            </span>
          </button>
        </Button>
      ),
      button2: {
        button: (
          <Button size="large" theme="outline-dark">
            <button>
              <span>
                Access care with <strong>insurance</strong>
              </span>
            </button>
          </Button>
        ),
        text: (
          <TextButton>
            <button>
              <span>
                Access care with <strong>insurance</strong>
              </span>
            </button>
          </TextButton>
        ),
      },
    },
  },
};

export const Long: StoryObj<typeof ImageAndTextBlock> = {
  args: {
    imageAlignment: 'right',
    length: 'long',
    image: (
      <Image
        src="/image-and-text-component-placeholder.jpg"
        alt="two children playing"
        width="643"
        height="605"
      />
    ),

    header: (
      <Text tag="h2" variation="display-2">
        New to private healthcare?
      </Text>
    ),
    children: (
      <>
        <Text tag="p" variation="body-large">
          Quis ut irure non mollit. Ipsum esse mollit sunt nulla. Ipsum non
          cillum mollit officia tempor in ad non consequat esse. Sunt culpa
          adipisicing eiusmod ullamco eu esse laborum deserunt et officia
          reprehenderit. Aliquip laboris duis ex labore veniam labore do nostrud
          minim labore eiusmod voluptate sit commodo officia. Commodo tempor
          tempor magna deserunt sunt dolore dolore. dolore.
        </Text>
        <Text tag="p" variation="body-large">
          Quis ut irure non mollit. Ipsum esse mollit sunt nulla. Ipsum non
          cillum mollit officia tempor in ad non consequat esse. Sunt culpa
          adipisicing eiusmod ullamco eu esse laborum deserunt et officia
          reprehenderit. Aliquip laboris duis ex labore veniam labore do nostrud
          minim labore eiusmod voluptate sit commodo officia. Commodo tempor
          tempor magna deserunt sunt dolore dolore.
        </Text>
      </>
    ),

    subheader: (
      <Text tag="h3" variation="subheading-1">
        payment plans
      </Text>
    ),
    ctas: {
      button1: (
        <Button size="large" theme="full-dark">
          <button>
            <span>
              Learn more about <strong>self-pay</strong>
            </span>
          </button>
        </Button>
      ),
      button2: {
        button: (
          <Button size="large" theme="outline-dark">
            <button>
              <span>
                Access care with <strong>insurance</strong>
              </span>
            </button>
          </Button>
        ),
        text: (
          <TextButton>
            <button>
              <span>
                Access care with <strong>insurance</strong>
              </span>
            </button>
          </TextButton>
        ),
      },
    },
  },
};
