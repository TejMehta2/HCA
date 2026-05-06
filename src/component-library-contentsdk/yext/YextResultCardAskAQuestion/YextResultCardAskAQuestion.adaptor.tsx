import React, { useEffect, useRef, useState, type JSX } from 'react';

import YextResultCardAskAQuestion from './YextResultCardAskAQuestion';

import Icons from '../../foundation/Icons/Icons';
import Text from '../../foundation/Text/Text';
import TextField from '../../core-components/TextField/TextField';
import Checkbox from '../../core-components/Checkbox/Checkbox';
import Button from '../../core-components/Button/Button';
import Textarea from '../../core-components/Textarea/Textarea';
import { useSearchState } from '@yext/search-headless-react';
import { headlessConfig } from '../YextProvider/YextProvider';
import styles from './YextResultCardAskAQuestion.module.scss';

interface YextResultCardAskAQuestion {}

const YextResultCardArticlesAdaptor = (): JSX.Element => {
  const formRef = useRef<HTMLFormElement>(null);
  const formTitleRef = useRef<HTMLElement>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formFromTop, setFormFromTop] = useState(0);

  interface Error {
    code: number;
    message: string;
  }
  const [errors, setErrors] = useState<Error[]>([]);
  const mostRecentSearch = useSearchState(
    (state) => state.query.mostRecentSearch
  );

  useEffect(() => {
    if (formRef) {
      const formRect = formTitleRef?.current?.getBoundingClientRect();

      if (formRect) {
        setFormFromTop(formRect.top);
      }
    }
  }, [formTitleRef]);

  return (
    <YextResultCardAskAQuestion
      title={
        <>
          <span ref={formTitleRef}></span>
          <Icons iconName="iconQuestion" />
          <Text variation="heading-2">Ask a question</Text>
        </>
      }
      titleDescription={
        <Text>
          Can&apos;t find what you&apos;re looking for? Ask a question below.
        </Text>
      }
    >
      {success ? (
        <Text variation={'body-bold-extra-large'}>
          Thank you for your question!
        </Text>
      ) : (
        <form
          method={'POST'}
          ref={formRef}
          onSubmit={async (event) => {
            event.preventDefault();
            const form = formRef.current;
            if (!form) return;
            if (loading) return;
            setLoading(true);
            const { method, action } = form;
            const formData = new FormData(form);
            const response = await fetch(action, {
              method,
              body: JSON.stringify({
                email: formData.get('email'),
                entityId: formData.get('entityId'),
                name: formData.get('name'),
                questionLanguage: formData.get('questionLanguage'),
                questionText: formData.get('questionText'),
                site: formData.get('site'),
              }),
              headers: new Headers({ 'Content-Type': 'application/json' }),
            });
            const data = await response.json();

            const errors =
              data.meta.errors?.map((error: Error) => ({
                ...error,
                message:
                  error.code === 22
                    ? 'Invalid email address. Please review your entry and try submitting your question again.'
                    : error.message,
              })) || [];
            if (errors.length) {
              setErrors(errors);
              setLoading(false);
            } else {
              setLoading(false);
              setSuccess(true);
            }

            window.scroll({
              top: formFromTop,
              left: 0,
              behavior: 'smooth',
            });

            // TODO handle BE validation errors / success
          }}
          action={`https://liveapi.yext.com/v2/accounts/me/createQuestion?v=20220511&api_key=${headlessConfig.apiKey}&sessionTrackingEnabled=false&jsLibVersion=v1.14.3`}
        >
          <Text variation="body-extra-large">
            Enter your question and contact information, and we&apos;ll get back
            to you with a response shortly.
          </Text>
          <input type="hidden" name={'entityId'} value={'org-1'} />
          <input type="hidden" name={'questionLanguage'} value={'en_GB'} />
          <input type="hidden" name={'site'} value={'FIRSTPARTY'} />
          <Textarea
            id={'questionText'}
            label={'Question'}
            name={'questionText'}
            required={true}
            errorMessage={'This field is required'}
            defaultValue={mostRecentSearch}
          />
          <TextField
            id={'name'}
            name={'name'}
            label={'Name'}
            required={true}
            errorMessage={'This field is required'}
          />
          <TextField
            id={'email'}
            name={'email'}
            label={'Email'}
            required={true}
            errorMessage={'Please enter a valid email address.'}
          />
          <Checkbox
            id={'privacyPolicy'}
            label={
              <span>
                By submitting my email address, I consent to being contacted via
                email at the address provided.{' '}
                <a href="https://www.hcahealthcare.co.uk/legal/privacy-policy">
                  Learn more here.
                </a>
              </span>
            }
            name={'privacyPolicy'}
            required={true}
            errorMessage={
              'You must agree to the privacy policy to submit a question.'
            }
          />
          <div className={styles.error}>
            {errors?.map((error, index) => (
              <Text key={index}>{error.message}</Text>
            ))}
          </div>

          <Button variation="full" size="large" contentVariation="card">
            <button disabled={loading} type="submit">
              Submit
            </button>
          </Button>
        </form>
      )}
    </YextResultCardAskAQuestion>
  );
};

export default YextResultCardArticlesAdaptor;
