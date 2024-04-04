import React from 'react';

import YextResultCardAskAQuestion from './YextResultCardAskAQuestion';
// import { CardProps } from '@yext/search-ui-react';

import Icons from '../../foundation/Icons/Icons';
import Text from '../../foundation/Text/Text';
import TextField from '../../core-components/TextField/TextField';
import Checkbox from '../../core-components/Checkbox/Checkbox';
import Button from '../../core-components/Button/Button';
import Textarea from '../../core-components/Textarea/Textarea';

// TODO - replace these props with Yext type generated interfaced
// https://hitchhikers.yext.com/docs/search/search-result-typing/?target=using-generated-types-in-your-project
interface YextResultCardAskAQuestion {}

const YextResultCardArticlesAdaptor =
  () // props: CardProps<YextResultCardAskAQuestion>
  : JSX.Element => {
    // const {} = props;
    // TODO - unpack props to replace these static values once Yext type generation is available
    const title = 'Ask a question';
    const subtitle =
      'Can&apos;t find what you&apos;re looking for? Ask a question below.';
    const description =
      ' Enter your question and contact information, and we&apos;ll get back to you with a response shortly.';

    const questionField = {
      id: 'question',
      label: 'Question',
      required: true,
      helperText: 'Optional helper text',
      errorMessage: 'This field is required',
    };

    const nameField = {
      id: 'name',
      label: 'Name',
      required: true,
      errorMessage: 'This field is required',
    };

    const emailField = {
      id: 'email',
      label: 'Email',
      required: true,
      errorMessage: 'This field is required',
    };

    const consentField = {
      id: 'consent',
      label: (
        <span>
          By submitting my email address, I consent to being contacted via email
          at the address provided. <a href="#">Learn more here.</a>
        </span>
      ),
      name: 'example',
      value: 'example',
    };

    const submitText = 'Submit';

    return (
      <YextResultCardAskAQuestion
        title={
          <>
            <div>
              <Icons iconName="iconQuestion" />
              <Text variation="heading-2">{title}</Text>
            </div>
          </>
        }
        titleDescription={
          <>
            <Text>{subtitle}</Text>
          </>
        }
      >
        <form>
          <Text variation="body-extra-large">{description}</Text>

          <Textarea
            id={questionField.id}
            label={questionField.label}
            required={questionField.required}
            helperText={questionField.helperText}
            errorMessage={questionField.errorMessage}
          />
          <TextField
            id={nameField.id}
            label={nameField.label}
            required={nameField.required}
            errorMessage={nameField.errorMessage}
          />
          <TextField
            id={emailField.id}
            label={emailField.label}
            required={emailField.required}
            errorMessage={emailField.errorMessage}
          />
          <Checkbox
            id={consentField.id}
            label={consentField.label}
            name={consentField.name}
            value={consentField.value}
          ></Checkbox>
          <Button variation="full" size="large" contentVariation="card">
            <button type="submit">{submitText}</button>
          </Button>
        </form>
      </YextResultCardAskAQuestion>
    );
  };

export default YextResultCardArticlesAdaptor;
