/* eslint-disable @typescript-eslint/no-explicit-any */
// Template finder component

import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';

import {
  Image as JssImage,
  Link as JssLink,
  RichText as JssRichText,
  ImageField,
  Field,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Button from '@component-library/core-components/Button/Button';
import Text from '@component-library/foundation/Text/Text';
import HeaderLDB from '@component-library/consultant-finder/HeaderLDB/HeaderLDB';
import ProgressBar from '@component-library/consultant-finder/ProgressBar/ProgressBar';

interface Fields {
  HCALogo: ImageField | ImageFieldValue | undefined;
  CurrentStep: any;
  Steps: any;
  TitleText: Field<string>;
  CardImage: ImageField;
  StartLink: LinkField;
  NextLink: LinkField;
  BackLink: LinkField;
}

type StepProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const StepDefaultComponent = (props: StepProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Consultant Finder Step</span>
    </div>
  </div>
);

export const Default = (props: StepProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  // console.log('step booking form', props.fields);
  const [count, setCount] = useState(0);

  const schema = z
    .object({
      username: z.optional(z.string()),
      email: z.string().email('Email format is not valid'),
      user: z.string().trim().min(1, { message: 'Required' }),
      test: z.string(),
      question: z.string().trim().min(1, { message: 'Required' }),
    })
    .refine(
      (data) => {
        if (data.user === 'patient') {
          if (data.test !== '') {
            return true;
          } else {
            return false;
          }
        }
        return true;
      },
      {
        message: 'required',
        path: ['test'],
      }
    );

  const form = useForm({
    // you can also submit default values
    defaultValues: {
      username: 'Alina test',
      email: '',
      user: '',
      test: '',
      question: '',
    },
    resolver: zodResolver(schema),
  });
  const {
    register,
    control,
    handleSubmit,
    formState: {
      errors,
      touchedFields,
      dirtyFields,
      isDirty,
      isValid,
      isSubmitting,
      isSubmitSuccessful,
    },
    watch,
    getValues,
    setValue,
    setError,
  } = form;
  console.log('isSubmitting', isSubmitting);

  const onSubmit = (data: any) => {
    console.log('data', data);

    return new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 1000);
    });
  };

  const onError = (errors: FieldErrors) => {
    console.log('errors on submit', errors);
  };

  const handleGetValues = () => {
    console.log('get Values', getValues());
  };

  const habdleSetFieldValue = () => {
    // setValue('username', '', {
    //   shouldValidate: false,
    // });

    setValue('username', '');
  };

  const watchFormChanges = watch();

  const userValue = watch('user');
  // remove value from hidden field
  useEffect(() => {
    console.log('user', userValue);
    if (userValue === 'insurer') {
      setValue('test', '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userValue]);

  if (props.fields) {
    return (
      <div
        className={`component promo ${props.params.styles}`}
        id={id ? id : undefined}
      >
        <HeaderLDB
          logo={<JssImage field={props?.fields?.HCALogo} />}
          progress={
            <ProgressBar
              currentPage={props?.fields?.CurrentStep?.value}
              steps={props?.fields?.Steps}
              slug={''}
              gmcNumber={0}
            ></ProgressBar>
          }
        ></HeaderLDB>
        <div className="component-content">
          {/* debugger for form */}
          {/* https://www.npmjs.com/package/@hookform/devtools */}
          <DevTool control={control} placement="top-right" />
          <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
            <div>
              <h1>Is submitting: {isSubmitting ? 'yes' : 'no'}</h1>
            </div>
            <button type="button" onClick={handleGetValues}>
              Get values
            </button>
            <button type="button" onClick={habdleSetFieldValue}>
              Change field value
            </button>
            <br></br>
            <br></br>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" {...register('username')} />
            <br></br>
            <p>{errors.username?.message}</p>
            <br></br>
            <br></br>
            <label htmlFor="patient">Patient</label>
            <input
              type="radio"
              id="patient"
              value="patient"
              {...register('user')}
            />
            <br></br>
            <label htmlFor="insurer">Insurer</label>
            <input
              type="radio"
              id="insurer"
              value="insurer"
              {...register('user')}
            />
            <br></br>
            <p>{errors.user?.message}</p>
            <br></br>
            <br></br>
            {/* <label htmlFor="test">Enter something</label>
            <input
              type="text"
              id="test"
              {...(register('test'), { disabled: watch('user') === 'insurer' })}
            /> */}

            {watchFormChanges.user === 'patient' && (
              <div>
                {/* Your div content */}
                <p>Patient</p>
                <br></br>
                <label htmlFor="test">Enter something</label>
                <input type="text" id="test" {...register('test')} />
                <p>{errors.test?.message}</p>
                <br></br>
                <br></br>
              </div>
            )}
            {/* <input
              type="text"
              id="name"
              {...register('username', {
                required: { value: true, message: 'Username is required' },
              })}
            /> */}

            {/* Display error message */}
            <label htmlFor="email">Email</label>
            <input type="email" id="email" {...register('email')} />
            {/* Display error message */}
            <p>{errors.email?.message}</p>
            <br></br>

            <textarea
              id={id}
              {...register('question', {
                onChange: (e) => {
                  setCount(e.target.value.length);
                },
              })}
              maxLength={300}
            />
            <span>
              {count} / {300}
            </span>
            <p>{errors.question?.message}</p>
            <br></br>
            <br></br>

            <button disabled={!isDirty || isSubmitting} type="submit">
              {isSubmitting ? 'Submitting' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <StepDefaultComponent {...props} />;
};
