/* eslint-disable @typescript-eslint/no-explicit-any */
// Template finder component

import React, { useEffect } from 'react';
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
  console.log('step booking form', props.fields);

  const schema = z.object({
    username: z.string().trim().min(1, { message: 'Required' }),
    email: z.string().email('Email format is not valid'),
  });

  const form = useForm({
    // you can also submit default values
    defaultValues: {
      username: 'Alina test',
      email: '',
    },
    resolver: zodResolver(schema),
  });
  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
  } = form;
  const {
    errors,
    touchedFields,
    dirtyFields,
    isDirty,
    isValid,
    isSubmitting,
    isSubmitSuccessful,
  } = formState;

  console.log(
    'isDirty:',
    isDirty,
    'isSubmitting:',
    isSubmitting,
    'isSubmitSuccessful:',
    isSubmitSuccessful
  );
  // console.log(errors);

  const onSubmit = (data: any) => {
    console.log('data', data);
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
  // // using watch fallback to create side effects
  // useEffect(() => {
  //   const subscription = watch((value) => {
  //     // we will get updated values of forms elements
  //     console.log('value from watch', value);
  //   });
  //   return () => subscription.unsubscribe();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [watchFormChanges]);

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
            <button type="button" onClick={handleGetValues}>
              Get values
            </button>
            <button type="button" onClick={habdleSetFieldValue}>
              Change field value
            </button>
            <br></br>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              {...register('username', {
                required: { value: true, message: 'Username is required' },
              })}
            />
            <p>{errors.username?.message}</p>
            <br></br>
            {/* Display error message */}
            <label htmlFor="email">Email</label>
            <input type="email" id="email" {...register('email')} />
            {/* Display error message */}
            <p>{errors.email?.message}</p>
            <br></br>
            <button
              disabled={!isDirty || !isValid || isSubmitting}
              type="submit"
            >
              {isSubmitting ? 'Submitting' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <StepDefaultComponent {...props} />;
};
