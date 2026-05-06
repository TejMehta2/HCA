import React from 'react';
import { render } from '@testing-library/react';
import YextResultCardAskAQuestion from './YextResultCardAskAQuestion';
import { YextResultCardAskAQuestionProps } from './YextResultCardAskAQuestion.types';
import Icons from '../../foundation/Icons/Icons';
import Text from '../../foundation/Text/Text';
import TextField from '../../core-components/TextField/TextField';
import Checkbox from '../../core-components/Checkbox/Checkbox';
import Button from '../../core-components/Button/Button';
import Textarea from '../../core-components/Textarea/Textarea';

const mockProps: YextResultCardAskAQuestionProps = {
  title: (
    <>
      <div>
        <Icons iconName="iconQuestion" />
        <Text variation="heading-2">Ask a question</Text>
      </div>
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
};

describe('YextResultCardAskAQuestion', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<YextResultCardAskAQuestion {...mockProps} />);
    expect(getByText('Ask a question')).toBeVisible();
  });
});
