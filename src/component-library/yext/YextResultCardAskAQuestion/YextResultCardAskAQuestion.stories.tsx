import React from 'react';
import YextResultCardAskAQuestion from './YextResultCardAskAQuestion';
import type { Meta, StoryObj } from '@storybook/react';
import Icons from '../../foundation/Icons/Icons';
import Text from '../../foundation/Text/Text';
import Themes from '../../foundation/Themes/Themes';
import TextField from '../../core-components/TextField/TextField';
import Checkbox from '../../core-components/Checkbox/Checkbox';
import Button from '../../core-components/Button/Button';
import Textarea from '../../core-components/Textarea/Textarea';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof YextResultCardAskAQuestion> = {
  title: 'yext/YextResultCardAskAQuestion',
  component: YextResultCardAskAQuestion,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <Themes theme={'A-HCA-White'}>
        <Story />
      </Themes>
    ),
  ],
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof YextResultCardAskAQuestion> = {
  args: {
    title: (
      <>
        <Icons iconName="iconQuestion" />
        <Text variation="heading-2">Ask a question</Text>
      </>
    ),
    titleDescription: (
      <>
        <Text>
          Can&apos;t find what you&apos;re looking for? Ask a question below.
        </Text>
      </>
    ),
    children: (
      <>
        <form>
          <Text variation="body-extra-large">
            Enter your question and contact information, and we&apos;ll get back
            to you with a response shortly.
          </Text>

          <Textarea
            id="question"
            label="Question"
            required={true}
            helperText="Optional helper text"
            errorMessage="This field is required"
          />
          <TextField
            id="name"
            label="Name"
            required={true}
            errorMessage="This field is required"
          />
          <TextField
            id="email"
            label="Email"
            required={true}
            errorMessage="This field is required"
          />
          <Checkbox
            id="consent"
            label={
              <span>
                By submitting my email address, I consent to being contacted via
                email at the address provided. <a href="#">Learn more here.</a>
              </span>
            }
            name="example"
            value="example"
          ></Checkbox>
          <Button variation="full" size="large" contentVariation="card">
            <button type="submit">Submit</button>
          </Button>
        </form>
      </>
    ),
  },
};
