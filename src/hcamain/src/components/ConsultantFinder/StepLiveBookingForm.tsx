/* eslint-disable @typescript-eslint/no-explicit-any */
// Template finder component

import React, { useEffect, useState, useContext } from 'react';
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
import LiveBookingForm from '@component-library/consultant-finder/LiveBookingForm/LiveBookingForm';
import AppointmentSummary from '@component-library/consultant-finder/AppointmentSummary/AppointmentSummary';
import { ConsultantFinderContext } from '../../context/consultantFinderContext';
import ErrorMessage from '@component-library/consultant-finder/CF-forms/ErrorMessage/ErrorMessage';
import Textarea from '@component-library/consultant-finder/CF-forms/Textarea/Textarea';
import RadioButton from '@component-library/consultant-finder/CF-forms/RadioButton/RadioButton';
import TextField from '@component-library/consultant-finder/CF-forms/TextField/TextField';

interface Fields {
  HCALogo: ImageField | undefined;
  CurrentStep: any;
  Steps: any;
  TitleText: Field<string>;
  CardImage: ImageField;
  StartLink: LinkField;
  NextLink: LinkField;
  BackLink: LinkField;
  LiveBookingFormUserOptions: object[];
  LiveBookingFormAboutAppointmentOptions: object[];
  LiveBookingFormPreviouslyBeenWithHCAOptions: object[];
  LiveBookingFormGpreferralOptions: object[];
  LiveBookingFormGpreferralSubHeadline: Field<string>;
  LiveBookingFormPatientAuthorisationCodeLabel: Field<string>;
  LiveBookingFormInsuranceNumberLabel: Field<string>;
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
  const { selectedLocationName, selectedDate, selectedTime } = useContext(
    ConsultantFinderContext
  );
  console.log('step booking form', props.fields);

  const schema = z
    .object({
      user: z.string().trim().min(1, { message: 'Required' }),
      payment: z.string(),
      insuranceProvider: z.string(),
      insurancePolicyNumber: z.string(),
      insuranceAuthorisationCode: z.string().optional(),
      reasonForAppointment: z.string().trim().min(1, { message: 'Required' }),
      gpreferral: z.string().min(1, { message: 'Required' }),
      previouslyBeenWithHCA: z.string().min(1, { message: 'Required' }),
      patientCode: z.string().optional(),
    })
    .refine(
      // refine helps to do more complex logic to validation like conditional validation
      // it can return false which then will go into the required field from refine
      // true will be valid so wont get there
      (data) => {
        if (data.user === 'patient') {
          if (data.payment !== '') {
            return true;
          } else {
            return false;
          }
        }
        return true;
      },
      {
        message: 'required refine',
        path: ['payment'],
      }
    )
    .refine(
      (data) => {
        if (data.user === 'insurer' || data.payment === 'insurance') {
          if (data.insuranceProvider !== '') {
            return true;
          } else {
            return false;
          }
        }
        return true;
      },
      {
        message: 'insurance required',
        path: ['insuranceProvider'],
      }
    )
    .refine(
      (data) => {
        if (data.user === 'insurer' || data.payment === 'insurance') {
          if (data.insurancePolicyNumber !== '') {
            return true;
          } else {
            return false;
          }
        }
        return true;
      },
      {
        message: 'insurance required',
        path: ['insurancePolicyNumber'],
      }
    );

  const form = useForm({
    // you can also submit default values
    defaultValues: {
      user: '',
      payment: '',
      insuranceProvider: '',
      insurancePolicyNumber: '',
      insuranceAuthorisationCode: '',
      reasonForAppointment: '',
      gpreferral: '',
      previouslyBeenWithHCA: '',
      patientCode: '',
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
    // setValue('username', '');
  };

  const watchFormChanges = watch();

  useEffect(() => {
    console.log('user', watchFormChanges.user);
    console.log('payment', watchFormChanges.payment);
    // remove values from hidden fields if not used anymore
    if (watchFormChanges.user === 'insurer') {
      setValue('payment', '');
    }
    if (watchFormChanges.payment === 'self-pay') {
      setValue('insuranceProvider', '');
      setValue('insurancePolicyNumber', '');
      setValue('insuranceAuthorisationCode', '');
    }
    if (watchFormChanges.previouslyBeenWithHCA === 'no') {
      setValue('patientCode', '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    watchFormChanges.user,
    watchFormChanges.payment,
    watchFormChanges.previouslyBeenWithHCA,
  ]);

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

        <LiveBookingForm>
          {/* debugger for form */}
          {/* https://www.npmjs.com/package/@hookform/devtools */}
          <DevTool control={control} placement="top-right" />
          <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
            <Text tag="h1" variation="display-4">
              Your details
            </Text>
            <Text tag="p" variation="body-medium-large">
              All fields are required unless specified as optional.
            </Text>
            {/* About you */}
            <Text tag="h2" variation="heading-1">
              About you
            </Text>
            {props?.fields?.LiveBookingFormUserOptions &&
              props?.fields?.LiveBookingFormUserOptions.map((item: any) => (
                <RadioButton
                  key={item.id}
                  label={item?.fields?.Label?.value || ''}
                  name={'user'}
                  value={item?.fields?.Value?.value}
                  register={register}
                />
              ))}
            {errors?.user && (
              <ErrorMessage errorMessage={errors?.user?.message} />
            )}
            <br></br>
            <br></br>

            {watchFormChanges.user !== '' && (
              <div>
                {/* About appointment */}
                <Text tag="h2" variation="heading-1">
                  About the appointment
                </Text>
                {/* Show payment option radio if user is patient */}
                {/* Payment */}
                {watchFormChanges.user === 'patient' && (
                  <>
                    {props?.fields?.LiveBookingFormAboutAppointmentOptions &&
                      props?.fields?.LiveBookingFormAboutAppointmentOptions.map(
                        (item: any) => (
                          <RadioButton
                            key={item.id}
                            label={item?.fields?.Label?.value || ''}
                            name={'payment'}
                            value={item?.fields?.Value?.value}
                            register={register}
                          />
                        )
                      )}
                    {errors?.payment && (
                      <ErrorMessage errorMessage={errors?.payment?.message} />
                    )}
                  </>
                )}

                {/* Payment fields mandatory/visible if payment is insurance or user is insurer */}
                {(watchFormChanges.user === 'insurer' ||
                  watchFormChanges.payment === 'insurance') && (
                  <>
                    <select
                      id="insuranceProvider"
                      {...register('insuranceProvider')}
                    >
                      <option value="">Please select insurer</option>
                      <option value="Axa">Axa</option>
                    </select>
                    <br></br>
                    <p>{errors.insuranceProvider?.message}</p>
                    <br></br>
                    <TextField
                      id={'insurancePolicyNumber'}
                      label={
                        props?.fields?.LiveBookingFormInsuranceNumberLabel
                          ?.value || ''
                      }
                      name={'insurancePolicyNumber'}
                      required={true}
                      register={register}
                      setValue={setValue}
                      isError={errors?.insurancePolicyNumber ? true : false}
                      errorMessage={errors?.insurancePolicyNumber?.message}
                    />
                    <br></br>
                    <TextField
                      id={'insuranceAuthorisationCode'}
                      label={
                        props?.fields
                          ?.LiveBookingFormPatientAuthorisationCodeLabel
                          ?.value || ''
                      }
                      name={'insuranceAuthorisationCode'}
                      required={false}
                      register={register}
                      setValue={setValue}
                      isError={
                        errors?.insuranceAuthorisationCode ? true : false
                      }
                      errorMessage={errors?.insuranceAuthorisationCode?.message}
                    />
                  </>
                )}

                {/* Reason for appointment */}
                <Textarea
                  id={'reasonForAppointment'}
                  name={'reasonForAppointment'}
                  label={'What is the reason for this appointment?'}
                  required={true}
                  register={register}
                  isError={errors?.reasonForAppointment ? true : false}
                  errorMessage={errors?.reasonForAppointment?.message}
                ></Textarea>
                <br></br>
                <br></br>

                <Text tag="h2" variation="body-medium-large">
                  {props?.fields?.LiveBookingFormGpreferralSubHeadline?.value ||
                    'Has the patient received a referral from their GP ?'}
                </Text>
                {props?.fields?.LiveBookingFormGpreferralOptions &&
                  props?.fields?.LiveBookingFormGpreferralOptions.map(
                    (item: any) => (
                      <RadioButton
                        key={item.id}
                        label={item?.fields?.Label?.value || ''}
                        name={'gpreferral'}
                        value={item?.fields?.Value?.value}
                        register={register}
                      />
                    )
                  )}
                {errors?.gpreferral && (
                  <ErrorMessage errorMessage={errors?.gpreferral?.message} />
                )}
                <br></br>
                <br></br>
                {/* About the patient */}
                <Text tag="h2" variation="heading-1">
                  About the patient
                </Text>
                <br></br>
                <label htmlFor="previouslyBeenWithHCA">
                  Has the Patient previously been with HCA?
                </label>
                <br></br>
                <select
                  id="previouslyBeenWithHCA"
                  {...register('previouslyBeenWithHCA')}
                >
                  {props?.fields?.LiveBookingFormPreviouslyBeenWithHCAOptions &&
                    props?.fields?.LiveBookingFormPreviouslyBeenWithHCAOptions.map(
                      (item: any) => (
                        <option
                          key={item.id}
                          value={item?.fields?.Value?.value}
                        >
                          {item?.fields?.Label?.value || ''}
                        </option>
                      )
                    )}
                </select>
                <br></br>
                <p>{errors.previouslyBeenWithHCA?.message}</p>
                <br></br>
                {watchFormChanges.previouslyBeenWithHCA === 'Yes' && (
                  <>
                    <br></br>
                    <Text tag="h2" variation="body-medium-large">
                      Do you have the Patient's X-number?
                    </Text>
                    <label htmlFor="patientCode">X number (Optional)</label>
                    <br></br>
                    <input
                      type="text"
                      id="patientCode"
                      {...register('patientCode')}
                    />
                    <br></br>
                    <p>{errors.patientCode?.message}</p>
                    <br></br>
                  </>
                )}
                <br></br>
                <Button size={'small'} variation={'full-dark'}>
                  <button disabled={!isDirty || isSubmitting} type="submit">
                    {isSubmitting ? 'Submitting' : 'Submit'}
                  </button>
                </Button>
              </div>
            )}
          </form>
          <AppointmentSummary
            title={'Appointment summary'}
            consultantTitle={'Consultant'}
            consultantText={'Name'}
            locationTitle={'Location'}
            locationText={selectedLocationName}
            dateTitle={'Date & time'}
            dateText={`${selectedDate} at ${selectedTime}`}
          />
        </LiveBookingForm>
      </div>
    );
  }

  return <StepDefaultComponent {...props} />;
};
