/* eslint-disable @typescript-eslint/no-explicit-any */
// Template finder component

import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
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
import SelectField from '@component-library/consultant-finder/CF-forms/SelectField/SelectField';
import Checkbox from '@component-library/consultant-finder/CF-forms/Checkbox/Checkbox';
import axios from 'axios';

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
  LiveBookingFormPreviouslyBeenWithHCALabel: Field<string>;
  LiveBookingFormPreviouslyBeenWithHCAOptions: object[];
  LiveBookingFormGpreferralOptions: object[];
  LiveBookingFormGpreferralSubHeadline: Field<string>;
  LiveBookingFormPatientAuthorisationCodeLabel: Field<string>;
  LiveBookingFormInsuranceNumberLabel: Field<string>;
  LiveBookingFormHeadline: Field<string>;
  LiveBookingFormSubHeadline: Field<string>;
  LiveBookingFormXNumberHeadline: Field<string>;
  LiveBookingFormXNumberLabel: Field<string>;
  LiveBookingFormDetailsHeadline: Field<string>;
  LiveBookingFormFirstNameLabel: Field<string>;
  LiveBookingFormLastNameLabel: Field<string>;
  LiveBookingFormEmailLabel: Field<string>;
  LiveBookingFormTitleLabel: Field<string>;
  LiveBookingFormTitleOptions: object[];
  LiveBookingFormGenderLabel: Field<string>;
  LiveBookingFormGenderOptions: object[];
  LiveBookingFormDateOfBirthLabel: Field<string>;
  LiveBookingFormAddressHeadline: Field<string>;
  LiveBookingFormPhoneLabel: Field<string>;
  LiveBookingFormAddress1Label: Field<string>;
  LiveBookingFormAddress1Placeholder: Field<string>;
  LiveBookingFormAddress2Label: Field<string>;
  LiveBookingFormAddress2Placeholder: Field<string>;
  LiveBookingFormPostcodeLabel: Field<string>;
  LiveBookingFormTowncityLabel: Field<string>;
  LiveBookingFormTowncityPlaceholder: Field<string>;
  LiveBookingFormCountryLabel: Field<string>;
  LiveBookingFormCountryPlaceholder: Field<string>;
  LiveBookingFormInsuranceLabel: Field<string>;
  LiveBookingFormRepresentativeHeadline: Field<string>;
  LiveBookingFormMarketingPreferencesFieldsEmailLabel: Field<string>;
  LiveBookingFormMarketingPreferencesFieldsPhoneLabel: Field<string>;
  LiveBookingFormMarketingPreferencesFieldsPostLabel: Field<string>;
  LiveBookingFormMarketingPreferencesFieldsSmsLabel: Field<string>;
  LiveBookingFormRepresentativeContactDetailsLabel: Field<string>;
  LiveBookingFormRepresentativeRelationToPatientLabel: Field<string>;
  LiveBookingFormRepresentativeRelationToPatientPlaceholder: Field<string>;
  LiveBookingFormRepresentativeTitleOptions: object[];
  LiveBookingFormRepresentativeTitleLabel: Field<string>;
  LiveBookingFormRepresentativeFirstNameLabel: Field<string>;
  LiveBookingFormRepresentativeFirstNamePlaceholder: Field<string>;
  LiveBookingFormRepresentativeLastNameLabel: Field<string>;
  LiveBookingFormRepresentativeLastNamePlaceholder: Field<string>;
  LiveBookingFormRepresentativePhoneLabel: Field<string>;
  LiveBookingFormRepresentativePhonePlaceholder: Field<string>;
  LiveBookingFormRepresentativeEmailLabel: Field<string>;
  LiveBookingFormRepresentativeEmailPlaceholder: Field<string>;
  API_C2_ReserveConsultantSlot_BaseURL: Field<string>;
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
      title: z.string().trim().min(1, { message: 'Required' }),
      firstName: z.string().trim().min(1, { message: 'Required' }),
      lastName: z.string().trim().min(1, { message: 'Required' }),
      email: z
        .string()
        .min(1, { message: 'Required' })
        .email('This is not a valid email.'),
      phone: z.string().trim().min(1, { message: 'Required' }),
      gender: z.string().trim().min(1, { message: 'Required' }),
      dateOfBirth: z.string().trim().min(1, { message: 'Required' }),
      address1: z.string().trim().min(1, { message: 'Required' }),
      address2: z.string().optional(),
      postcode: z.string().trim().min(1, { message: 'Required' }),
      towncity: z.string().trim().min(1, { message: 'Required' }),
      country: z.string().trim().min(1, { message: 'Required' }),
      contactDetails: z.boolean().optional(),
      marketingPreferenceEmail: z.boolean().optional(),
      marketingPreferencePhone: z.boolean().optional(),
      marketingPreferenceSMS: z.boolean().optional(),
      marketingPreferencePost: z.boolean().optional(),
      representativeRelationToPatient: z.string(),
      representativeTitle: z.string(),
      representativeFirstName: z.string(),
      representativeLastName: z.string(),
      representativeEmail: z.string().max(0).or(z.string().email()),
      representativePhone: z.string(),
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
        message: 'Required',
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
        message: 'Required',
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
        message: 'Required',
        path: ['insurancePolicyNumber'],
      }
    )
    .refine(
      (data) => {
        if (data.contactDetails === true) {
          if (data.representativeRelationToPatient !== '') {
            return true;
          } else {
            return false;
          }
        }
        return true;
      },
      {
        message: 'Required',
        path: ['representativeRelationToPatient'],
      }
    )
    .refine(
      (data) => {
        if (data.contactDetails === true) {
          if (data.representativeTitle !== '') {
            return true;
          } else {
            return false;
          }
        }
        return true;
      },
      {
        message: 'Required',
        path: ['representativeTitle'],
      }
    )
    .refine(
      (data) => {
        if (data.contactDetails === true) {
          if (data.representativeFirstName !== '') {
            return true;
          } else {
            return false;
          }
        }
        return true;
      },
      {
        message: 'Required',
        path: ['representativeFirstName'],
      }
    )
    .refine(
      (data) => {
        if (data.contactDetails === true) {
          if (data.representativeLastName !== '') {
            return true;
          } else {
            return false;
          }
        }
        return true;
      },
      {
        message: 'Required',
        path: ['representativeLastName'],
      }
    )
    .refine(
      (data) => {
        if (data.contactDetails === true) {
          if (data.representativeEmail !== '') {
            return true;
          } else {
            return false;
          }
        }
        return true;
      },
      {
        message: 'Required',
        path: ['representativeEmail'],
      }
    )
    .refine(
      (data) => {
        if (data.contactDetails === true) {
          if (data.representativePhone !== '') {
            return true;
          } else {
            return false;
          }
        }
        return true;
      },
      {
        message: 'Required',
        path: ['representativePhone'],
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
      title: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      gender: '',
      dateOfBirth: '',
      address1: '',
      address2: '',
      postcode: '',
      towncity: '',
      country: '',
      contactDetails: false,
      marketingPreferenceEmail: false,
      marketingPreferencePhone: false,
      marketingPreferenceSMS: false,
      marketingPreferencePost: false,
      representativeRelationToPatient: '',
      representativeTitle: '',
      representativeFirstName: '',
      representativeLastName: '',
      representativeEmail: '',
      representativePhone: '',
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
    clearErrors,
  } = form;
  console.log('isSubmitting', isSubmitting);

  const onSubmit = (data: any) => {
    console.log('data', data);
    postData(data);

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

  const postData = (data: any) => {
    const dataToPost = {
      dateFrom: '2023-08-29T10:30:00',
      isFollowOnAppointment: 'true',
      HCAConsultantId: '4113571',
      FacilityId: 'COCWB',
      selectedSpeciality: 'Hip Replacement',
      reasonForAppointment: 'tests',
      demographics: {
        previouslyBeenWithHCA: true, // true
        patientCode: data.patientCode,
        title: data.title,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
        email: data.email,
        phone: data.phone,
        address1: data.address1,
        address2: data.address2,
        towncity: data.towncity,
        postcode: data.postcode,
        country: data.country,
        marketingPreferenceEmail: false,
        marketingPreferencePhone: false,
        marketingPreferenceSMS: false,
        marketingPreferencePost: false,
        selectedSpeciality: 'Hip Replacement',
        datesCannotDo: '',
        representativeTitle: 'Ms',
        representativeFirstName: 'ZZZTestFirstRep',
        representativeLastName: 'ZZZTestLastRep',
        representativeRelation: 'Sister',
        representativeEmail: 'joan@krs.com',
        representativePhone: '07765777666',
        bookingBy: 'Insurance Company',
        paidBy: 'Joe James II',
        insuranceProvider: 'AXA',
        insurancePolicyNumber: '234234',
        insuranceAuthorisationCode: '23432',
        gpreferral: true, //true
      },
    };

    const URL = props?.fields?.API_C2_ReserveConsultantSlot_BaseURL?.value;
    console.log('form data', JSON.stringify(dataToPost, null, 2));

    const dataToSent: any = JSON.stringify(dataToPost);

    const config = {
      method: 'post',
      url: URL,
      headers: {
        'Content-Type': 'application/json',
      },
      data: dataToSent,
    };


    axios(config)
      .then(function (response) {
        // handle successful response with status code 200
        console.log(response);
        console.log(JSON.stringify(response.data));
        console.log(`HCAReservationId: ${response?.data?.HCAReservationId}`);
        // disable modal with confirmed appointment in case user navigates back to avoid conflict
        // go to thank you page
      })
      .catch(function (error) {
        // handle error with status code other than 200
        console.log(error);
        // The if statement checks whether the error object has a response property, which indicates that an HTTP response was received
        if (error.response) {
          console.log('error.response.status', error.response.status);
          console.log('error.response.data', error.response.data);
        } else {
          console.log('error.message', error.message);
        }
      });
  };

  const watchFormChanges = watch();

  const router = useRouter();
  const [slug, setSlug] = useState<string>('');
  const [gmcNumber, setGmcNumber] = useState<number | null>(null);
  const [insurersLDB, setInsurersLDB] = useState<object[]>([]);
  const [errorData, setErrorData] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const getConsultantData = (slug: string) => {
    axios
      .get(`https://api.doctify.com/api/hca/specialists/${slug}`)
      .then((resp) => {
        console.log(resp?.data?.insurers);
        setErrorData(false);
        setLoadingData(false);
        setInsurersLDB(resp?.data?.insurers || []);
      })
      .catch((error) => {
        setErrorData(true);
        setLoadingData(false);
        console.log(error);
      });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    if (!router.isReady) {
      return;
    }

    // get slug from URL
    const slugURL = router?.query?.slug || null;
    if (slugURL) {
      setSlug(slugURL.toString());
      getConsultantData(slugURL.toString());
    }
    // get gmc number from URL
    const gmcNumber = router?.query?.gmcNumber || null;
    setGmcNumber(Number(gmcNumber));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  useEffect(() => {
    console.log('user', watchFormChanges.user);
    console.log('payment', watchFormChanges.payment);
    // remove values from hidden fields if not used anymore
    if (watchFormChanges.user === 'insurer') {
      setValue('payment', '');
      setValue('contactDetails', false);
      if (errors?.representativeRelationToPatient) {
        clearErrors('representativeRelationToPatient');
      }
      if (errors?.representativeTitle) {
        clearErrors('representativeTitle');
      }
      if (errors?.representativeFirstName) {
        clearErrors('representativeFirstName');
      }
      if (errors?.representativeLastName) {
        clearErrors('representativeLastName');
      }
      if (errors?.representativeEmail) {
        clearErrors('representativeEmail');
      }
      if (errors?.representativePhone) {
        clearErrors('representativePhone');
      }
    }
    if (watchFormChanges.payment === 'self-pay') {
      setValue('insuranceProvider', '');
      setValue('insurancePolicyNumber', '');
      setValue('insuranceAuthorisationCode', '');
    }
    if (watchFormChanges.previouslyBeenWithHCA === 'no') {
      setValue('patientCode', '');
    }
    if (watchFormChanges.contactDetails === false) {
      setValue('representativeRelationToPatient', '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    watchFormChanges.user,
    watchFormChanges.payment,
    watchFormChanges.previouslyBeenWithHCA,
    watchFormChanges.contactDetails,
  ]);

  if (props.fields) {
    return (
      <div
        className={`component promo ${props.params.styles}`}
        id={id ? id : undefined}
      >
        {router.isReady && (
          <>
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
                  {props?.fields?.LiveBookingFormHeadline?.value ||
                    'Your details'}
                </Text>
                <Text tag="p" variation="body-medium-large">
                  {props?.fields?.LiveBookingFormSubHeadline?.value ||
                    'All fields are required unless specified as optional.'}
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
                        {props?.fields
                          ?.LiveBookingFormAboutAppointmentOptions &&
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
                          <ErrorMessage
                            errorMessage={errors?.payment?.message}
                          />
                        )}
                      </>
                    )}

                    {/* Payment fields mandatory/visible if payment is insurance or user is insurer */}
                    {(watchFormChanges.user === 'insurer' ||
                      watchFormChanges.payment === 'insurance') && (
                      <>
                        {!loadingData &&
                          !errorData &&
                          insurersLDB.length > 0 && (
                            <SelectField
                              id={'insuranceProvider'}
                              name={'insuranceProvider'}
                              label={
                                props?.fields?.LiveBookingFormInsuranceLabel
                                  ?.value || 'Insurance company'
                              }
                              addDefaultValue={true}
                              defaultValueLabel={'Please select'}
                              required={true}
                              isError={errors?.insuranceProvider ? true : false}
                              errorMessage={errors?.insuranceProvider?.message}
                              options={insurersLDB.map((insurer: any) => (
                                <option key={insurer.id} value={insurer.name}>
                                  {insurer.name}
                                </option>
                              ))}
                              register={register}
                            />
                          )}
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
                          errorMessage={
                            errors?.insuranceAuthorisationCode?.message
                          }
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
                    <Text tag="h2" variation="body-medium-large">
                      {props?.fields?.LiveBookingFormGpreferralSubHeadline
                        ?.value ||
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
                      <ErrorMessage
                        errorMessage={errors?.gpreferral?.message}
                      />
                    )}
                    {/* About the patient */}
                    <Text tag="h2" variation="heading-1">
                      About the patient
                    </Text>
                    {props?.fields
                      ?.LiveBookingFormPreviouslyBeenWithHCAOptions && (
                      <SelectField
                        id={'previouslyBeenWithHCA'}
                        name={'previouslyBeenWithHCA'}
                        label={
                          props?.fields
                            ?.LiveBookingFormPreviouslyBeenWithHCALabel
                            ?.value ||
                          'Has the Patient previously been with HCA?'
                        }
                        required={true}
                        isError={errors?.previouslyBeenWithHCA ? true : false}
                        errorMessage={errors?.previouslyBeenWithHCA?.message}
                        options={props?.fields?.LiveBookingFormPreviouslyBeenWithHCAOptions.map(
                          (option: any) => (
                            <option
                              key={option.id}
                              value={option?.fields?.Value?.value}
                            >
                              {option?.fields?.Label?.value}
                            </option>
                          )
                        )}
                        register={register}
                      />
                    )}
                    {watchFormChanges.previouslyBeenWithHCA === 'Yes' && (
                      <>
                        <Text tag="h2" variation="body-medium-large">
                          {props?.fields?.LiveBookingFormXNumberHeadline
                            ?.value || 'Do you have the Patients X-number?'}
                        </Text>
                        <TextField
                          id={'patientCode'}
                          label={
                            props?.fields?.LiveBookingFormXNumberLabel?.value ||
                            'What is the reason for this appointment?'
                          }
                          name={'patientCode'}
                          required={false}
                          register={register}
                          setValue={setValue}
                          isError={errors?.patientCode ? true : false}
                          errorMessage={errors?.patientCode?.message}
                        />
                      </>
                    )}
                    {/* Patient details */}
                    <Text tag="h2" variation="heading-1">
                      {props?.fields?.LiveBookingFormDetailsHeadline?.value ||
                        'Patients details'}
                    </Text>
                    {/* select title */}
                    <SelectField
                      id={'title'}
                      name={'title'}
                      label={
                        props?.fields?.LiveBookingFormTitleLabel?.value ||
                        'Title'
                      }
                      required={true}
                      isError={errors?.title ? true : false}
                      errorMessage={errors?.title?.message}
                      options={props?.fields?.LiveBookingFormTitleOptions.map(
                        (option: any) => (
                          <option
                            key={option.id}
                            value={option?.fields?.Value?.value}
                          >
                            {option?.fields?.Label?.value}
                          </option>
                        )
                      )}
                      register={register}
                    />
                    <TextField
                      id={'firstName'}
                      label={
                        props?.fields?.LiveBookingFormFirstNameLabel?.value ||
                        'First Name'
                      }
                      name={'firstName'}
                      required={true}
                      register={register}
                      setValue={setValue}
                      isError={errors?.firstName ? true : false}
                      errorMessage={errors?.firstName?.message}
                    />
                    <TextField
                      id={'lastName'}
                      label={
                        props?.fields?.LiveBookingFormLastNameLabel?.value ||
                        'Last Name'
                      }
                      name={'lastName'}
                      required={true}
                      register={register}
                      setValue={setValue}
                      isError={errors?.lastName ? true : false}
                      errorMessage={errors?.lastName?.message}
                    />
                    <TextField
                      id={'email'}
                      label={
                        props?.fields?.LiveBookingFormEmailLabel?.value ||
                        'email'
                      }
                      name={'email'}
                      type={'email'}
                      required={true}
                      register={register}
                      setValue={setValue}
                      isError={errors?.email ? true : false}
                      errorMessage={errors?.email?.message}
                    />
                    <TextField
                      id={'phone'}
                      label={
                        props?.fields?.LiveBookingFormPhoneLabel?.value ||
                        'phone'
                      }
                      name={'phone'}
                      required={true}
                      register={register}
                      setValue={setValue}
                      isError={errors?.phone ? true : false}
                      errorMessage={errors?.phone?.message}
                    />
                    {/* select gender */}
                    <SelectField
                      id={'gender'}
                      name={'gender'}
                      label={
                        props?.fields?.LiveBookingFormGenderLabel?.value ||
                        'Gender'
                      }
                      required={true}
                      isError={errors?.gender ? true : false}
                      errorMessage={errors?.gender?.message}
                      options={props?.fields?.LiveBookingFormGenderOptions.map(
                        (option: any) => (
                          <option
                            key={option.id}
                            value={option?.fields?.Value?.value}
                          >
                            {option?.fields?.Label?.value}
                          </option>
                        )
                      )}
                      register={register}
                    />
                    <TextField
                      id={'dateOfBirth'}
                      label={
                        props?.fields?.LiveBookingFormDateOfBirthLabel?.value ||
                        'date of birth'
                      }
                      name={'dateOfBirth'}
                      type={'date'}
                      required={true}
                      register={register}
                      setValue={setValue}
                      isError={errors?.dateOfBirth ? true : false}
                      errorMessage={errors?.dateOfBirth?.message}
                    />
                    {/* Patient address */}
                    <Text tag="h2" variation="heading-1">
                      {props?.fields?.LiveBookingFormAddressHeadline?.value ||
                        'Patients address'}
                    </Text>
                    <TextField
                      id={'address1'}
                      label={
                        props?.fields?.LiveBookingFormAddress1Label?.value ||
                        'Address Line 1'
                      }
                      name={'address1'}
                      required={true}
                      register={register}
                      setValue={setValue}
                      isError={errors?.address1 ? true : false}
                      errorMessage={errors?.address1?.message}
                    />
                    <TextField
                      id={'address2'}
                      label={
                        props?.fields?.LiveBookingFormAddress2Label?.value ||
                        'Address Line 2'
                      }
                      name={'address2'}
                      required={false}
                      register={register}
                      setValue={setValue}
                      isError={errors?.address2 ? true : false}
                      errorMessage={errors?.address2?.message}
                    />
                    <TextField
                      id={'postcode'}
                      label={
                        props?.fields?.LiveBookingFormPostcodeLabel?.value ||
                        'Postcode'
                      }
                      name={'postcode'}
                      required={true}
                      register={register}
                      setValue={setValue}
                      isError={errors?.postcode ? true : false}
                      errorMessage={errors?.postcode?.message}
                    />
                    <TextField
                      id={'towncity'}
                      label={
                        props?.fields?.LiveBookingFormTowncityLabel?.value ||
                        'Town / City'
                      }
                      name={'towncity'}
                      required={true}
                      register={register}
                      setValue={setValue}
                      isError={errors?.towncity ? true : false}
                      errorMessage={errors?.towncity?.message}
                    />
                    <TextField
                      id={'country'}
                      label={
                        props?.fields?.LiveBookingFormCountryLabel?.value ||
                        'Country'
                      }
                      name={'country'}
                      required={true}
                      register={register}
                      setValue={setValue}
                      isError={errors?.country ? true : false}
                      errorMessage={errors?.country?.message}
                    />
                    {/* Additional details */}
                    <Text tag="h2" variation="heading-1">
                      {props?.fields?.LiveBookingFormRepresentativeHeadline
                        ?.value || 'Additional details'}
                    </Text>
                    {watchFormChanges.user !== 'insurer' && (
                      <Checkbox
                        label={
                          props?.fields
                            ?.LiveBookingFormRepresentativeContactDetailsLabel
                            ?.value || ''
                        }
                        name={'contactDetails'}
                        id={'contactDetails'}
                        register={register}
                      />
                    )}
                    {(watchFormChanges.contactDetails ||
                      watchFormChanges.user === 'insurer') && (
                      <>
                        {watchFormChanges.user !== 'insurer' && (
                          <TextField
                            id={'representativeRelationToPatient'}
                            label={
                              props?.fields
                                ?.LiveBookingFormRepresentativeRelationToPatientLabel
                                ?.value || 'Relation to the patient'
                            }
                            name={'representativeRelationToPatient'}
                            // placeholder={
                            //   props?.fields
                            //     ?.LiveBookingFormRepresentativeRelationToPatientPlaceholder
                            //     ?.value || ''
                            // }
                            required={
                              watchFormChanges.user === 'insurer' ? false : true
                            }
                            register={register}
                            setValue={setValue}
                            isError={
                              errors?.representativeRelationToPatient
                                ? true
                                : false
                            }
                            errorMessage={
                              errors?.representativeRelationToPatient?.message
                            }
                          />
                        )}
                        <SelectField
                          id={'representativeTitle'}
                          name={'representativeTitle'}
                          label={
                            props?.fields
                              ?.LiveBookingFormRepresentativeTitleLabel
                              ?.value || 'Title'
                          }
                          required={
                            watchFormChanges.user === 'insurer' ? false : true
                          }
                          isError={errors?.representativeTitle ? true : false}
                          errorMessage={errors?.representativeTitle?.message}
                          options={props?.fields?.LiveBookingFormRepresentativeTitleOptions.map(
                            (option: any) => (
                              <option
                                key={option.id}
                                value={option?.fields?.Value?.value}
                              >
                                {option?.fields?.Label?.value}
                              </option>
                            )
                          )}
                          register={register}
                        />
                        <TextField
                          id={'representativeFirstName'}
                          label={
                            props?.fields
                              ?.LiveBookingFormRepresentativeFirstNameLabel
                              ?.value || 'First Name'
                          }
                          name={'representativeFirstName'}
                          // placeholder={
                          //   props?.fields
                          //     ?.LiveBookingFormRepresentativeFirstNamePlaceholder
                          //     ?.value || ''
                          // }
                          required={
                            watchFormChanges.user === 'insurer' ? false : true
                          }
                          register={register}
                          setValue={setValue}
                          isError={
                            errors?.representativeFirstName ? true : false
                          }
                          errorMessage={
                            errors?.representativeFirstName?.message
                          }
                        />
                        <TextField
                          id={'representativeLastName'}
                          label={
                            props?.fields
                              ?.LiveBookingFormRepresentativeLastNameLabel
                              ?.value || 'Last Name'
                          }
                          name={'representativeLastName'}
                          // placeholder={
                          //   props?.fields
                          //     ?.LiveBookingFormRepresentativeLastNamePlaceholder
                          //     ?.value || ''
                          // }
                          required={
                            watchFormChanges.user === 'insurer' ? false : true
                          }
                          register={register}
                          setValue={setValue}
                          isError={
                            errors?.representativeLastName ? true : false
                          }
                          errorMessage={errors?.representativeLastName?.message}
                        />
                        <TextField
                          id={'representativeEmail'}
                          label={
                            props?.fields
                              ?.LiveBookingFormRepresentativeEmailLabel
                              ?.value || 'Email'
                          }
                          name={'representativeEmail'}
                          type={'email'}
                          // placeholder={
                          //   props?.fields
                          //     ?.LiveBookingFormRepresentativeEmailPlaceholder
                          //     ?.value || ''
                          // }
                          required={
                            watchFormChanges.user === 'insurer' ? false : true
                          }
                          register={register}
                          setValue={setValue}
                          isError={errors?.representativeEmail ? true : false}
                          errorMessage={errors?.representativeEmail?.message}
                        />
                        <TextField
                          id={'representativePhone'}
                          label={
                            props?.fields
                              ?.LiveBookingFormRepresentativePhoneLabel
                              ?.value || 'Phone'
                          }
                          name={'representativePhone'}
                          // placeholder={
                          //   props?.fields
                          //     ?.LiveBookingFormRepresentativePhonePlaceholder
                          //     ?.value || ''
                          // }
                          required={
                            watchFormChanges.user === 'insurer' ? false : true
                          }
                          register={register}
                          setValue={setValue}
                          isError={errors?.representativePhone ? true : false}
                          errorMessage={errors?.representativePhone?.message}
                        />
                      </>
                    )}

                    {/* Marketing preferences */}
                    <Checkbox
                      label={
                        props?.fields
                          ?.LiveBookingFormMarketingPreferencesFieldsEmailLabel
                          ?.value || ''
                      }
                      name={'marketingPreferenceEmail'}
                      id={'marketingPreferenceEmail'}
                      register={register}
                    />
                    <Checkbox
                      label={
                        props?.fields
                          ?.LiveBookingFormMarketingPreferencesFieldsPhoneLabel
                          ?.value || ''
                      }
                      name={'marketingPreferencePhone'}
                      id={'marketingPreferencePhone'}
                      register={register}
                    />
                    <Checkbox
                      label={
                        props?.fields
                          ?.LiveBookingFormMarketingPreferencesFieldsSmsLabel
                          ?.value || ''
                      }
                      name={'marketingPreferenceSMS'}
                      id={'marketingPreferenceSMS'}
                      register={register}
                    />
                    <Checkbox
                      label={
                        props?.fields
                          ?.LiveBookingFormMarketingPreferencesFieldsPostLabel
                          ?.value || ''
                      }
                      name={'marketingPreferencePost'}
                      id={'marketingPreferencePost'}
                      register={register}
                    />
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
          </>
        )}
      </div>
    );
  }

  return <StepDefaultComponent {...props} />;
};
