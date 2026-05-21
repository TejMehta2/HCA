/* eslint-disable @typescript-eslint/no-explicit-any */
// Template finder component

'use client';

import { type JSX, Suspense } from 'react';
import React, { useEffect, useState, useRef, useContext } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useForm, FieldErrors } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
import { formatDateDMY } from '@component-library/utility-functions/index';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';

import {
  RichText as JssRichText,
  ImageField,
  Field,
  LinkField,
} from '@sitecore-content-sdk/nextjs';

import Button from '@component-library/core-components/Button/Button';
import Text from '@component-library/foundation/Text/Text';
import LiveBookingForm from '@component-library/consultant-finder/LiveBookingForm/LiveBookingForm';
import ErrorMessage from '@component-library/consultant-finder/CF-forms/ErrorMessage/ErrorMessage';
import Textarea from '@component-library/consultant-finder/CF-forms/Textarea/Textarea';
import TextField from '@component-library/consultant-finder/CF-forms/TextField/TextField';
import SelectField from '@component-library/consultant-finder/CF-forms/SelectField/SelectField';
import Checkbox from '@component-library/consultant-finder/CF-forms/Checkbox/Checkbox';
import Container from '@component-library/foundation/Containers/Container';
import MarketingPreferences from '@component-library/consultant-finder/MarketingPreferences/MarketingPreferences';
import NeedHelp from '@component-library/consultant-finder/NeedHelp/NeedHelp';
import CFAside from '@component-library/consultant-finder/CFAside/CFAside';
import Breadcrumbs from '@component-library/site-components/Breadcrumbs/Breadcrumbs';
import Modals from '@component-library/components/Modals/Modals';
import TextLink from '@component-library/core-components/TextLink/TextLink';
import Icons from '@component-library/foundation/Icons/Icons';
import TextButton from '@component-library/core-components/TextButton/TextButton';
import EnquireNowBtns from '@component-library/consultant-finder/EnquireNowBtns/EnquireNowBtns';
import { ConsultantFinderContext } from '@component-library/context/consultantFinderContext';

interface Fields {
  EnquireFormMarketingPreferencesFieldsEmailLabel: Field<string>;
  EnquireFormMarketingPreferencesFieldsPhoneLabel: Field<string>;
  EnquireFormMarketingPreferencesFieldsSmsLabel: Field<string>;
  EnquireFormMarketingPreferencesFieldsPostLabel: Field<string>;
  EnquireFormContactBoxHeadline: Field<string>;
  EnquireFormContactBoxPhone0Label: Field<string>;
  EnquireFormContactBoxOpeningHoursLabel: Field<string>;
  EnquireFormContactBoxOpeningHoursDays: Field<string>;
  EnquireFormContactBoxOpeningHoursTime: Field<string>;
  EnquireFormContactBoxPhone0Phone: Field<string>;
  BackFromAdvSearchLink: LinkField;
  BackFromFindByConsultantLink: LinkField;
  TitleText: Field<string>;
  CardImage: ImageField;
  StartLink: LinkField;
  NextLink: LinkField;
  BackLink: LinkField;
  EnquireFormHeadline: Field<string>;
  EnquireFormPracticeLabel: Field<string>;
  EnquireFormSectionsHeadlinesAppointment: Field<string>;
  EnquireFormDateOptions: object[];
  EnquireFormTimeOptions: object[];
  API_HCA_EnquireBookingForm_RecapchaKey: Field<string>;
  EnquireFormSectionsHeadlinesPrevPatient: Field<string>;
  EnquireFormPrevClientOptions: object[];
  EnquireFormSectionsHeadlinesPatientDetails: Field<string>;
  EnquireFormTitleLabel: Field<string>;
  EnquireFormTitleOptions: object[];
  EnquireFormFirstNameLabel: Field<string>;
  EnquireFormLastNameLabel: Field<string>;
  EnquireFormSectionsHeadlinesFurtherInfo: Field<string>;
  EnquireFormGenderLabel: Field<string>;
  EnquireFormGenderOptions: object[];
  EnquireFormDateOfBirthLabel: Field<string>;
  EnquireFormSectionsHeadlinesContactDetails: Field<string>;
  EnquireFormEmailLabel: Field<string>;
  EnquireFormPhoneLabel: Field<string>;
  EnquireFormSectionsHeadlinesPayment: Field<string>;
  EnquireFormInfoTextPayment: Field<string>;
  EnquireFormInsuranceSelfPayOption: Field<string>;
  EnquireFormInsuranceLabel: Field<string>;
  EnquireFormInsuranceNumberLabel: Field<string>;
  EnquireFormSectionsHeadlinesReasonVisit: Field<string>;
  EnquireFormReasonVisitPlaceholder: Field<string>;
  EnquireFormMarketingPreferencesHeadline: Field<string>;
  API_HCA_EnquireBookingForm_BaseURL: Field<string>;
  API_HCA_EnquireBookingForm_ErrorSubmittingText: Field<string>;
  EnquireFormBreadcrumbsCurrentPage: Field<string>;
  EnquireFormBreadcrumbsHome: Field<string>;
  EnquireFormBreadcrumbsProfilePageLink: any;
  EnquireFormInfoTextSubmit: Field<string>;
  EnquireFormBtnsSubmit: Field<string>;
  API_HCA_EnquireBookingForm_LoadingMsg: Field<string>;
  EnquireFormMarketingPreferencesText: Field<string>;
  EnquireFormBtnsClear: Field<string>;
  BreadcrumbHomePage: LinkField;
  API_HCA_EnquireBookingForm_UtilizeCRM: Field<boolean>;
  API_HCA_EnquireBookingForm_UtilizeDatabase: Field<boolean>;
  API_C2_BookingEnquiry_BaseURL: Field<string>;
  API_C2_BookingEnquiry_NoResultsMsg: Field<string>;
  API_C2_BookingEnquiry_LoadingMsg: Field<string>;
  API_C2_BookingEnquiry_Header: Field<string>;
  API_C2_BookingEnquiry_RecapchaKey: Field<string>;
  AllowAlternateConsultantLabel: Field<string>;
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

const DefaultContent = (props: StepProps): JSX.Element => {
  //console.log(props.fields);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [slug, setSlug] = useState<string>('');
  const [reviewsTotal, setReviewsTotal] = useState<number | null>(null);
  const [insurers, setInsurers] = useState<object[]>([]);
  const [errorData, setErrorData] = useState<boolean>(false);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [consultantName, setConsulantName] = useState('');
  const [practices, setPractices] = useState<object[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [specialty, setTopSpecialty] = useState<string>('');
  const [additionalErrorText, setAdditionalErrorText] = useState<string>('');
  const formId =
  typeof self !== 'undefined' && self.crypto?.randomUUID
    ? self.crypto.randomUUID()
    : Date.now().toString();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const {
    setSelectedLocationName,
    setConsultantMainSpecialty,
    setConsultantName,
    setConsultantReviews,
    setFinderFormPayor,
    setFinderFormPrevious,
    setCompletedFormId,
  } = useContext(ConsultantFinderContext);

  const schema = z
    .object({
      practice: z.string(),
      dateAppointment: z.string().trim().min(1, { message: 'Required' }),
      timeAppointment: z.string().trim().min(1, { message: 'Required' }),
      previousPatient: z.string().trim().min(1, { message: 'Required' }),
      title: z.string().trim().min(1, { message: 'Required' }),
      firstName: z.string().trim().min(1, { message: 'Required' }),
      lastName: z.string().trim().min(1, { message: 'Required' }),
      gender: z.string().trim().min(1, { message: 'Required' }),
      date: z.string().trim().min(1, { message: 'Required' }),
      userEmail: z
        .string()
        .min(1, { message: 'Required' })
        .email('This is not a valid email.'),
      userPhone: z
        .string()
        .trim()
        .min(1, { message: 'Required' })
        .refine((val) => /^\d+$/.test(val), {
          message: 'Invalid phone number',
        }),
      insurance: z.string().trim().min(1, { message: 'Required' }),
      insuranceNumber: z.string().optional(),
      reasonVisit: z.string().trim().min(1, { message: 'Required' }),
      email: z.boolean().optional(),
      sms: z.boolean().optional(),
      phone: z.boolean().optional(),
      post: z.boolean().optional(),
      recaptcha: z.string().min(1, { message: 'Required' }),
      allowAlternateConsultant: z.boolean(),
    })
    .refine(
      (data) => {
        if (practices.length === 0) {
          return true;
        } else {
          if (data.practice !== '') {
            return true;
          } else {
            return false;
          }
        }
      },
      {
        message: 'Required',
        path: ['practice'],
      }
    );

  const form = useForm({
    // you can also submit default values
    defaultValues: {
      practice: '',
      dateAppointment: '',
      timeAppointment: '',
      previousPatient: '',
      title: '',
      firstName: '',
      lastName: '',
      gender: '',
      date: '',
      userEmail: '',
      userPhone: '',
      insurance: 'I pay for myself',
      insuranceNumber: '',
      reasonVisit: '',
      email: false,
      sms: false,
      phone: false,
      post: false,
      recaptcha: '',
      allowAlternateConsultant: true,
    },
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const {
    reset,
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    clearErrors,
  } = form;
  // console.log('isSubmitting', isSubmitting);

  const postData = (data: any) => {
    setIsSubmitting(true);
    const dataToSend = { ...data };
    dataToSend.dateOfBirthFormatted = formatDateDMY(data.date);
    dataToSend.consultantName = consultantName;
    dataToSend.consultantTopSpecialty = specialty;
    dataToSend.hiddenFormInstance = formId;

    // console.log(JSON.stringify(dataToSend, null, 2));
    const URL =
      props?.fields?.API_HCA_EnquireBookingForm_BaseURL?.value ||
      'https:/api/formAPI/PostMakeBookingEnquiry';

    // console.log('dataToSend', dataToSend);
    axios
      .post(URL, dataToSend)
      .then((resp) => {
        //console.log(resp);
        // console.log("done ok");
        // if from was submitted then redirect to thank you page
        if (resp?.data?.errorCode > 0) {
          setAdditionalErrorText(
            `error code: ${resp?.data?.errorCode} ${resp?.data?.errorText}`
          );
          dialogRef?.current?.showModal();
        } else if (resp?.data?.success == false) {
          // structured response from underlying service
          setAdditionalErrorText(`${resp?.data?.html}`);
          dialogRef?.current?.showModal();
        } else {
          // for HWPD-3463 gtm
          setConsultantReviews(reviewsTotal ? reviewsTotal.toString() : '0');
          setSelectedLocationName(data.practice);
          setConsultantMainSpecialty(specialty);
          setConsultantName(consultantName);
          setFinderFormPayor(dataToSend.insurance);
          setCompletedFormId(dataToSend.hiddenFormInstance);
          setFinderFormPrevious(data.previousPatient);
          router.push(
            `${
              props?.fields?.NextLink?.value?.href ||
              '/finder/step-enquire-form-confirmation'
            }`
          );
        }
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.log(error);
        setIsSubmitting(false);
        dialogRef?.current?.showModal();
        // console.log("NOT done!");
      });
  };

  const postToCRM = (data: any) => {
    setIsSubmitting(true);
    const dataToSend = { ...data };
    dataToSend.dateOfBirthFormatted = formatDateDMY(data.date);
    dataToSend.consultantName = consultantName;
    dataToSend.consultantTopSpecialty = specialty;
    dataToSend.hiddenFormInstance = formId;

    //console.log(JSON.stringify(dataToSend, null, 2));
    const c2_BookingEnquiry_BaseURL =
      props?.fields?.API_C2_BookingEnquiry_BaseURL?.value;
    //console.log('c2_BookingEnquiry_BaseURL', c2_BookingEnquiry_BaseURL);

    const URL = c2_BookingEnquiry_BaseURL;
    // console.log('dataToSend', dataToSend);
    axios
      .post(URL, dataToSend)
      .then((resp) => {
        //console.log(resp);
        // console.log("done ok");
        // if from was submitted then redirect to thank you page
        if (resp?.data?.errorCode > 0) {
          setAdditionalErrorText(
            `error code: ${resp?.data?.errorCode} ${resp?.data?.errorText}`
          );
          dialogRef?.current?.showModal();
        } else if (resp?.data?.success == false) {
          // structured response from underlying service
          setAdditionalErrorText(`${resp?.data?.html}`);
          dialogRef?.current?.showModal();
        } else {
          // for HWPD-3463 gtm
          setConsultantReviews(reviewsTotal ? reviewsTotal.toString() : '0');
          setSelectedLocationName(data.practice);
          setConsultantMainSpecialty(specialty);
          setConsultantName(consultantName);
          setFinderFormPayor(dataToSend.insurance);
          setCompletedFormId(dataToSend.hiddenFormInstance);
          setFinderFormPrevious(data.previousPatient);
          router.push(
            `${
              props?.fields?.NextLink?.value?.href ||
              '/finder/step-enquire-form-confirmation'
            }`
          );
        }
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.log(error);
        setIsSubmitting(false);
        dialogRef?.current?.showModal();
        // console.log("NOT done!");
      });
  };

  const onSubmit = (data: any) => {
    // console.log('data', data);
    //https://hcauk-digital.atlassian.net/browse/HED-1815
    const sendToCRM =
      props?.fields?.API_HCA_EnquireBookingForm_UtilizeCRM?.value;
    if (sendToCRM) {
      postToCRM(data);
    }
    const sendToDatabase =
      props?.fields?.API_HCA_EnquireBookingForm_UtilizeDatabase?.value;
    if (sendToDatabase) {
      postData(data);
    }
  };

  const onError = (errors: FieldErrors) => {
    console.log('errors on submit', errors);
  };

  const getConsultantData = (slug: string) => {
    axios
      .get(`https://api.doctify.com/api/hca/specialists/${slug}`)
      .then((resp) => {
        // console.log(resp?.data);
        setErrorData(false);
        setLoadingData(false);
        setInsurers(resp?.data?.insurers || []);
        setPractices(resp?.data?.practices || []);
        setConsulantName(
          `${resp?.data?.title} ${resp?.data?.firstName} ${resp?.data?.lastName}`
        );
        // top specialty
        const topSpecialty = resp?.data?.keywords?.filter(
          (item: any) => item.parentName === 'ABSTRACT_TOP_LEVEL_KEYWORD'
        );
        setTopSpecialty(topSpecialty[0]?.name || '');
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

    // get slug from URL
    const slugURL = searchParams.get('slug');
    if (slugURL) {
      setSlug(slugURL.toString());
      getConsultantData(slugURL.toString());
    }

    // get reviews total number from URL
    const reviewsTotal = searchParams.get('reviewsTotal');
    setReviewsTotal(Number(reviewsTotal));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  if (props.fields) {
    return (
      <>
        {errorData && (
          <Text tag="p" variation="display-4">
            {'There was an error, please try again later.'}
          </Text>
        )}
        {!loadingData && !errorData && (
          <>
            <Breadcrumbs
              backCta={{
                text: 'Consultant Finder',
                link: `${
                  props?.fields?.BreadcrumbHomePage?.value?.href ||
                  '/finder/step-intro'
                }`,
              }}
            >
              <TextLink>
                <a href="/">
                  <Icons iconName="iconHome"></Icons>
                  <span className="sr-only">
                    {props?.fields?.EnquireFormBreadcrumbsHome?.value || 'Home'}
                  </span>
                </a>
              </TextLink>
              <TextLink>
                <Link
                  href={`${
                    props?.fields?.BreadcrumbHomePage?.value?.href ||
                    '/finder/step-intro'
                  }`}
                >
                  {'Consultant Finder'}
                </Link>
              </TextLink>
              <TextLink>
                <Link
                  href={`${
                    props?.fields?.EnquireFormBreadcrumbsProfilePageLink?.value
                      ?.href &&
                    props?.fields?.EnquireFormBreadcrumbsProfilePageLink?.value?.href.replace(
                      /,-w-,/g,
                      ''
                    )
                  }${slug}`}
                >
                  {consultantName}
                </Link>
              </TextLink>
              <span>
                {props?.fields?.EnquireFormBreadcrumbsCurrentPage?.value ||
                  'Enquire Now'}
              </span>
            </Breadcrumbs>
            <LiveBookingForm>
              <Modals ref={dialogRef}>
                <Container
                  marginBottom="spacing-8"
                  marginTop="spacing-8"
                  marginLeft="spacing-4"
                  marginRight="spacing-4"
                >
                  <Text tag="p" variation="heading-1">
                    {props?.fields
                      ?.API_HCA_EnquireBookingForm_ErrorSubmittingText?.value ||
                      'Error submitting the form, please retry later'}
                  </Text>
                  <Text tag="p" variation="body-medium-extra-large">
                    {additionalErrorText}
                  </Text>
                </Container>
              </Modals>
              {/* debugger for form */}
              {/* https://www.npmjs.com/package/@hookform/devtools */}
              <DevTool control={control} placement="top-right" />
              <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
                <Container marginBottom="spacing-6" marginTop="spacing-4">
                  <Text tag="h1" variation="display-4">
                    {props?.fields?.TitleText?.value || 'Enquire Form'}
                  </Text>
                  <Text tag="h2" variation="body-medium-extra-large">
                    {`${props?.fields?.EnquireFormHeadline?.value} ${consultantName}`}
                  </Text>
                </Container>
                <Container marginBottom="spacing-6" marginTop="spacing-4">
                  <Checkbox
                    label={
                      props?.fields?.AllowAlternateConsultantLabel?.value ||
                      'I am happy booking with an alternate consultant if my selected consultant is not available'
                    }
                    name={'allowAlternateConsultant'}
                    id={'allowAlternateConsultant'}
                    register={register}
                    // defaultChecked={true}
                  />
                </Container>
                {practices.length > 0 && (
                  <Container marginBottom="spacing-6" marginTop="spacing-4">
                    <SelectField
                      id={'practice'}
                      name={'practice'}
                      label={
                        props?.fields?.EnquireFormPracticeLabel?.value ||
                        'Select a practice'
                      }
                      addDefaultValue={true}
                      defaultValueLabel={'Select a practice'}
                      required={true}
                      isError={errors?.practice ? true : false}
                      errorMessage={errors?.practice?.message}
                      options={practices.map((practice: any) => (
                        <option key={practice.id} value={practice.name}>
                          {practice.name}
                        </option>
                      ))}
                      register={register}
                    />
                  </Container>
                )}
                <Container marginBottom="spacing-6" marginTop="spacing-4">
                  <SelectField
                    id={'dateAppointment'}
                    name={'dateAppointment'}
                    label={
                      props?.fields?.EnquireFormSectionsHeadlinesAppointment
                        ?.value || 'When would you like your appointment to be?'
                    }
                    addDefaultValue={false}
                    // defaultValueLabel={'Select a date'}
                    required={true}
                    isError={errors?.dateAppointment ? true : false}
                    errorMessage={errors?.dateAppointment?.message}
                    options={props?.fields?.EnquireFormDateOptions.map(
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
                  <SelectField
                    id={'timeAppointment'}
                    name={'timeAppointment'}
                    label={''}
                    addDefaultValue={false}
                    // defaultValueLabel={'Select a date'}
                    required={true}
                    isError={errors?.timeAppointment ? true : false}
                    errorMessage={errors?.timeAppointment?.message}
                    options={props?.fields?.EnquireFormTimeOptions.map(
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
                </Container>
                <Container marginBottom="spacing-6" marginTop="spacing-4">
                  <SelectField
                    id={'previousPatient'}
                    name={'previousPatient'}
                    label={
                      props?.fields?.EnquireFormSectionsHeadlinesPrevPatient
                        ?.value || 'Have you previously been to HCA UK?'
                    }
                    addDefaultValue={false}
                    // defaultValueLabel={'Select a date'}
                    required={true}
                    isError={errors?.previousPatient ? true : false}
                    errorMessage={errors?.previousPatient?.message}
                    options={props?.fields?.EnquireFormPrevClientOptions.map(
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
                </Container>
                <Container marginBottom="spacing-6" marginTop="spacing-4">
                  <Text tag="h2" variation="heading-1">
                    {props?.fields?.EnquireFormSectionsHeadlinesPatientDetails
                      ?.value || 'Your details'}
                  </Text>
                  <SelectField
                    id={'title'}
                    name={'title'}
                    label={
                      props?.fields?.EnquireFormTitleLabel?.value || 'Title'
                    }
                    required={true}
                    isError={errors?.title ? true : false}
                    errorMessage={errors?.title?.message}
                    options={props?.fields?.EnquireFormTitleOptions.map(
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
                      props?.fields?.EnquireFormFirstNameLabel?.value ||
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
                      props?.fields?.EnquireFormLastNameLabel?.value ||
                      'Last Name'
                    }
                    name={'lastName'}
                    required={true}
                    register={register}
                    setValue={setValue}
                    isError={errors?.lastName ? true : false}
                    errorMessage={errors?.lastName?.message}
                  />
                </Container>
                <Container marginBottom="spacing-6" marginTop="spacing-4">
                  <Text tag="h2" variation="heading-1">
                    {props?.fields?.EnquireFormSectionsHeadlinesFurtherInfo
                      ?.value || 'Further information'}
                  </Text>
                  <SelectField
                    id={'gender'}
                    name={'gender'}
                    label={
                      props?.fields?.EnquireFormGenderLabel?.value || 'Gender'
                    }
                    required={true}
                    isError={errors?.gender ? true : false}
                    errorMessage={errors?.gender?.message}
                    options={props?.fields?.EnquireFormGenderOptions.map(
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
                    id={'date'}
                    label={
                      props?.fields?.EnquireFormDateOfBirthLabel?.value ||
                      'date of birth'
                    }
                    name={'date'}
                    type={'date'}
                    required={true}
                    register={register}
                    setValue={setValue}
                    isError={errors?.date ? true : false}
                    errorMessage={errors?.date?.message}
                  />
                </Container>
                <Container marginBottom="spacing-6" marginTop="spacing-4">
                  <Text tag="h2" variation="heading-1">
                    {props?.fields?.EnquireFormSectionsHeadlinesContactDetails
                      ?.value || 'Contact details'}
                  </Text>
                  <TextField
                    id={'userEmail'}
                    label={
                      props?.fields?.EnquireFormEmailLabel?.value || 'email'
                    }
                    name={'userEmail'}
                    type={'email'}
                    required={true}
                    register={register}
                    setValue={setValue}
                    isError={errors?.userEmail ? true : false}
                    errorMessage={errors?.userEmail?.message}
                  />
                  <TextField
                    id={'userPhone'}
                    label={
                      props?.fields?.EnquireFormPhoneLabel?.value || 'phone'
                    }
                    name={'userPhone'}
                    required={true}
                    register={register}
                    setValue={setValue}
                    isError={errors?.userPhone ? true : false}
                    errorMessage={errors?.userPhone?.message}
                  />
                </Container>
                <Container marginBottom="spacing-6" marginTop="spacing-4">
                  <Text tag="h2" variation="heading-1">
                    {props?.fields?.EnquireFormSectionsHeadlinesPayment
                      ?.value || 'Payment'}
                  </Text>
                  <Text tag="p" variation="body-extra-large">
                    {props?.fields?.EnquireFormInfoTextPayment?.value ||
                      'We only need these details in order to get you to the right person'}
                  </Text>
                  {insurers.length > 0 && (
                    <Container marginBottom="spacing-6" marginTop="spacing-4">
                      <SelectField
                        id={'insurance'}
                        name={'insurance'}
                        label={
                          props?.fields?.EnquireFormInsuranceLabel?.value ||
                          'InsuranceS'
                        }
                        addDefaultValue={true}
                        defaultValueLabel={
                          props.fields.EnquireFormInsuranceSelfPayOption
                            .value || 'I pay for myself'
                        }
                        defaultValue={
                          props.fields.EnquireFormInsuranceSelfPayOption
                            .value || 'I pay for myself'
                        }
                        required={true}
                        isError={errors?.insurance ? true : false}
                        errorMessage={errors?.insurance?.message}
                        options={insurers.map((insurance: any) => (
                          <option key={insurance.id} value={insurance.name}>
                            {insurance.name}
                          </option>
                        ))}
                        register={register}
                      />
                      <TextField
                        id={'insuranceNumber'}
                        label={
                          props?.fields?.EnquireFormInsuranceNumberLabel
                            ?.value || 'Insurance number'
                        }
                        name={'insuranceNumber'}
                        required={false}
                        register={register}
                        setValue={setValue}
                        isError={errors?.insuranceNumber ? true : false}
                        errorMessage={errors?.insuranceNumber?.message}
                      />
                    </Container>
                  )}
                </Container>
                <Container marginBottom="spacing-6" marginTop="spacing-4">
                  <Text tag="h2" variation="heading-1">
                    {props?.fields?.EnquireFormSectionsHeadlinesReasonVisit
                      ?.value || 'Reason for visit'}
                  </Text>
                  <Textarea
                    id={'reasonVisit'}
                    name={'reasonVisit'}
                    label={
                      props?.fields?.EnquireFormReasonVisitPlaceholder?.value ||
                      'Let us know what you would like to discuss in your consultation'
                    }
                    required={true}
                    register={register}
                    isError={errors?.reasonVisit ? true : false}
                    errorMessage={errors?.reasonVisit?.message}
                  ></Textarea>
                </Container>
                <MarketingPreferences
                  headline={
                    props?.fields?.EnquireFormMarketingPreferencesHeadline
                      ?.value
                  }
                  text={
                    <JssRichText
                      field={props?.fields?.EnquireFormMarketingPreferencesText}
                    />
                  }
                >
                  <Checkbox
                    label={
                      props?.fields
                        ?.EnquireFormMarketingPreferencesFieldsEmailLabel
                        ?.value || 'Email'
                    }
                    name={'email'}
                    id={'email'}
                    register={register}
                  />
                  <Checkbox
                    label={
                      props?.fields
                        ?.EnquireFormMarketingPreferencesFieldsPhoneLabel
                        ?.value || 'Phone'
                    }
                    name={'phone'}
                    id={'phone'}
                    register={register}
                  />
                  <Checkbox
                    label={
                      props?.fields
                        ?.EnquireFormMarketingPreferencesFieldsSmsLabel
                        ?.value || 'SMS'
                    }
                    name={'sms'}
                    id={'sms'}
                    register={register}
                  />
                  <Checkbox
                    label={
                      props?.fields
                        ?.EnquireFormMarketingPreferencesFieldsPostLabel
                        ?.value || 'Post'
                    }
                    name={'post'}
                    id={'post'}
                    register={register}
                  />
                </MarketingPreferences>
                <Container marginBottom="spacing-6">
                  <ReCAPTCHA
                    sitekey={
                      props?.fields?.API_HCA_EnquireBookingForm_RecapchaKey
                        ?.value || '6Lcbh1IiAAAAAPIprpy5uCDJj3gtCGmOU5AVNhzM'
                    }
                    onChange={(value) => {
                      setValue('recaptcha', value || '');
                      if (errors?.recaptcha) {
                        clearErrors('recaptcha');
                      }
                    }}
                  />
                  <input {...register('recaptcha')} type="hidden" />
                  {errors?.recaptcha && (
                    <ErrorMessage errorMessage={errors?.recaptcha?.message} />
                  )}
                </Container>
                <EnquireNowBtns>
                  <Container marginRight="spacing-6">
                    <Button size={'small'} variation={'full-dark'}>
                      <button disabled={!isDirty || isSubmitting} type="submit">
                        {isSubmitting
                          ? `${
                              props?.fields
                                ?.API_HCA_EnquireBookingForm_LoadingMsg
                                ?.value || 'Submitting'
                            }`
                          : `${
                              props?.fields?.EnquireFormBtnsSubmit?.value ||
                              'Submit'
                            }`}
                      </button>
                    </Button>
                  </Container>
                  <TextButton theme="dark">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        reset();
                        clearErrors();
                      }}
                    >
                      {props?.fields?.EnquireFormBtnsClear?.value || 'Clear'}
                    </button>
                  </TextButton>
                </EnquireNowBtns>
                <Container marginBottom="spacing-8" marginTop="spacing-8">
                  <Text tag="p" variation="body-medium-extra-large">
                    {`${
                      props?.fields?.EnquireFormInfoTextSubmit?.value ||
                      'Once you have submitted your enquiry, you will receive a reply within 1 working day.'
                    }`}
                  </Text>
                </Container>
              </form>
              <CFAside>
                <NeedHelp
                  headline={
                    props?.fields?.EnquireFormContactBoxHeadline?.value ||
                    'Need help?'
                  }
                  subheadline={
                    props?.fields?.EnquireFormContactBoxPhone0Label?.value ||
                    'General enquiries'
                  }
                  workingHoursHeadline={
                    props?.fields?.EnquireFormContactBoxOpeningHoursLabel
                      ?.value || 'Opening hours'
                  }
                  workingHours={
                    props?.fields?.EnquireFormContactBoxOpeningHoursDays
                      ?.value || 'Mon – Fri'
                  }
                  workingHoursTime={
                    props?.fields?.EnquireFormContactBoxOpeningHoursTime
                      ?.value || '8am – 6pm'
                  }
                  phoneNumber={
                    props?.fields?.EnquireFormContactBoxPhone0Phone?.value ||
                    '020 3797 7236'
                  }
                />
              </CFAside>
            </LiveBookingForm>
          </>
        )}
      </>
    );
  }

  return <StepDefaultComponent {...props} />;
};

export const Default = (props: StepProps): JSX.Element => (
  <Suspense fallback={null}>
    <DefaultContent {...props} />
  </Suspense>
);
