/* eslint-disable */
'use client';

import { type JSX, Suspense } from 'react';
import React, { useState, useRef, FormEvent, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Text from '@component-library/foundation/Text/Text';
import Themes from '@component-library/foundation/Themes/Themes';
import FormContainer from 'src/jss-abstractions/FormContainer/FormContainer';
import AddressFinder from '@component-library/core-components/AddressFinder/AddressFinder';
import Button from '@component-library/core-components/Button/Button';
import Icons from '@component-library/foundation/Icons/Icons';
import styles from '../../../../src/jss-abstractions/FormContainer/FormContainer.module.scss';

import {
  ButtonTemplate,
  DropDownListOption,
  FieldTemplate,
  InputTemplate,
  ListTemplate,
  PaymentFormProps,
  SectionTemplate,
  SectionTitleTemplate,
  TextTemplate,
} from '../../Page Content/PaymentForm/PaymentForm.types';
import { z } from 'zod';
import PhoneField from '@component-library/core-components/form/basic/PhoneField/PhoneField';
import createSchema from '../../Page Content/PaymentForm/helpers/createSchema';
import Checkbox from '@component-library/core-components/form/basic/Checkbox/Checkbox';
import Checkboxes from '@component-library/core-components/Checkboxes/Checkboxes';
import MarketingPreferences from '@component-library/site-components/MarketingPreferences/MarketingPreferences';
import {
  AppPlaceholder,
  RichText as JssRichText,
} from '@sitecore-content-sdk/nextjs';
import type { ComponentMap } from '@sitecore-content-sdk/nextjs';
import RichText from '@component-library/core-components/RichText/RichText';
import DynamicTextField from '../../Page Content/PaymentForm/helpers/DynamicTextField';
import axios from 'axios';
import DynamicSelectField from '../../Page Content/PaymentForm/helpers/DynamicSelectField';
import CFAside from '@component-library/consultant-finder/CFAside/CFAside';
import AppointmentSummary from '@component-library/the-birth-company/AppointmentSummary/AppointmentSummary';
import DynamicTextArea from '../../Page Content/PaymentForm/helpers/DynamicTextArea';
import LoaderCF from '@component-library/consultant-finder/LoaderCF/LoaderCF';
import PlaceHolderWrapper from 'src/jss-abstractions/PlaceholderWrapper/PlaceholderWrapper';
import HeaderText from '@component-library/site-components/HeaderText/HeaderText';
import ErrorMessage from '@component-library/consultant-finder/CF-forms/ErrorMessage/ErrorMessage';
import ReCAPTCHA from 'react-google-recaptcha';
import Container from '@component-library/core-components/form/basic/Container/Container';
import { ComponentWithContextProps } from 'lib/component-props';

export interface TbcBookingDetailsProps
  extends PaymentFormProps,
    ComponentWithContextProps {
  params: { [key: string]: string };
  componentMap?: ComponentMap;
}

interface AppointmentDetailFields {
  location: string;
  scanName: string;
  appointmentType: string;
  slot: string;
  duration: string;
  price: string;
  extras: string[];
  slotId: string;
  serviceVariantId: string;
  extrasIds: string;
  formVariant: string;
}

interface PaymentAPIResponseMessage {
  key: string;
  value: string;
}
interface PaymentAPIResponse {
  response: {
    success: boolean;
    redirectUrl: string;
    messages: PaymentAPIResponseMessage[];
  };
}

const DefaultContent = (props: TbcBookingDetailsProps): JSX.Element => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string>('');
  const [errorRecaptcha, setErrorRecaptcha] = useState<string>('');
  const [recaptchaTouched, setRecaptchaTouched] = useState(false);
  const phKey = `booking-step-aside-${props.params?.DynamicPlaceholderId}`;
  const siteName = props.page.siteName;
  const itemPath = props.page.layout.sitecore.context.itemPath;

  // Hooks
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  // State
  const [formErrors, setFormErrors] = useState(new Map<string, string>());
  const [hideBillingFields, setHideBillingFields] = useState(true);
  const [ukResident, setUkResident] = useState(true);
  const [loading, seLoading] = useState(true);
  const [error, setError] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [submissionErrors, setSubmissionErrors] = useState<
    PaymentAPIResponseMessage[]
  >([]);
  const [appointmentDetails, setAppointmentDetails] =
    useState<AppointmentDetailFields>();

  const searchParams = useSearchParams();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    const paramScanId = searchParams.get('scanId');
    const paramExtras = searchParams.getAll('extraId');
    const paramLocationId = searchParams.get('locationId');
    const paramTypeId = searchParams.get('typeId');
    const paramSlotId = searchParams.get('slotId');

    const extras = paramExtras.map((extra) => `&extraId=${extra}`).join('');

    //  if any required params are missing redirect back to the start of the journey
    if (!paramScanId || !paramLocationId || !paramSlotId || !paramTypeId) {
      router.push('/booking/location');
    }

    const requestURL = `${process.env.NEXT_PUBLIC_INTEGRATION_LAYER_PROXY_PATH}/tbcbooking/details?scanid=${paramScanId}&locationid=${paramLocationId}&typeid=${paramTypeId}&slotid=${paramSlotId}${extras}`;

    axios
      .get(requestURL)
      .then((res) => {
        seLoading(false);
        setError(false);
        setAppointmentDetails(res?.data || {});
      })
      .catch((error) => {
        setError(error.message || true);
        // console.log('error', error);
      });
  }, [router, searchParams]);

  const formatDate = (dateString: string) => {
    if (!dateString) return;

    const date = new Date(dateString);

    // Format options for the date
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long', // Full weekday name (e.g., 'Friday')
      day: '2-digit', // Day of the month (e.g., '04')
      month: 'short', // Short month name (e.g., 'Nov')
      hour: '2-digit', // Hour in 2 digits (e.g., '10')
      minute: '2-digit', // Minute in 2 digits (e.g., '30')
      hour12: true, // Use 12-hour clock (with am/pm)
    };

    // Get formatted date
    const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(
      date
    );

    const [datePart, timePart] = formattedDate.replace(' at', ',').split(', ');

    if (!datePart || !timePart) return;

    return `${datePart} at ${timePart.replace(/\s/g, '')}`;
  };

  const page = props.fields.data.item.pages.results[0];
  const settings = props.fields.data.item.settings.results[0].children.results;
  const sections = page.children.results.filter((item) =>
    ['Section'].includes(item.template.name)
  );
  const fields: FieldTemplate[] = [];
  sections.forEach((section: SectionTemplate) => {
    section.children.results.forEach((field) => {
      fields.push(field);
    });
  });

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const partialSchemaObj = createSchema(fields, false); // All except billing fields
  const partialSchema = z.object(partialSchemaObj);
  const conditionalSchemaObject = createSchema(fields, true); // Just billing fields

  // All fields
  const allSchema = z.object({
    ...partialSchemaObj,
    ...conditionalSchemaObject,
    ...(siteKey
      ? {
        Recaptcha: z
          .string()
          .min(1, 'Please complete the reCAPTCHA verification'),
      }
      : {}),
  });

  const validateFormData = (name?: string) => {
    if (!formRef.current) return false;
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);
    try {
      if (formData.get('sameAsPatientDetail') === 'true') {
        partialSchema.parse(data);
      } else {
        allSchema.parse(data);
      }

      setFormErrors(new Map());
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const existingErrors = new Map(formErrors.entries());
        name && existingErrors.delete(name);
        const reducerInitialMap = name ? existingErrors : new Map();
        const errorMap = error.errors.reduce((map, error) => {
          const key = error.path[0] as string;
          if (name?.length && key !== name) return map; // name doesn't match
          if (map.get(key)) return map; // field already has an error
          map.set(key, error.message); // set the error
          return map;
        }, reducerInitialMap);
        errorMap && setFormErrors(errorMap);
      }
    }
    return false;
  };

  //  by default billing address fields are hidden and values assumed to be the same as prior address fields
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFormSubmitting(true);

    setRecaptchaTouched(true);

    // Get token from reCAPTCHA
    const token = recaptchaToken;

    if (siteKey && !token) {
      validateFormData();

      setFormErrors((prev) => {
        const next = new Map(prev);
        next.set('Recaptcha', 'Please complete the reCAPTCHA verification');
        return next;
      });
      setFormSubmitting(false);
      return;
    }

    const isValid = validateFormData();
    if (!isValid) {
      setTimeout(() => {
        // Delay to allow errors to render
        const firstError = document.querySelector('[class*="_error-message"]');
        firstError?.scrollIntoView({
          behavior: 'smooth',
        });
      }, 500);

      setFormSubmitting(false);
      return;
    }

    try {
      if (!formRef?.current) return;

      const action =
        settings?.find((item) => item.name === 'SubmitAction')?.value.value ||
        '';

      const formData = new FormData(formRef?.current);
      const response = await fetch(
        `${action}?site=${siteName}&itemPath=${itemPath}`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const result: PaymentAPIResponse = await response.json();

      if (result.response.success) {
        router.replace(result.response.redirectUrl);
      } else {
        setSubmissionErrors(result.response.messages);

        // Check if server says reCAPTCHA failed
        const recaptchaError = result.response?.messages?.find(
          (m: PaymentAPIResponseMessage) => m.key === 'Recaptcha'
        );

        if (recaptchaError) {
          // reset reCAPTCHA UI
          recaptchaRef.current?.reset();
          setRecaptchaToken('');
          setErrorRecaptcha(
            formErrors.get('Recaptcha') || 'reCAPTCHA validation failed'
          );
          setRecaptchaTouched(true);

          // update form error state so it displays properly
          setFormErrors((prev) => {
            const next = new Map(prev);
            next.set(
              'Recaptcha',
              formErrors.get('Recaptcha') ||
              'Please complete the reCAPTCHA verification'
            );
            setFormSubmitting(false);
            return next;
          });
        }
      }

      setFormSubmitting(false);
    } catch (err) {
      setFormSubmitting(false);
      process.env.NODE_ENV === 'development' && console.log(err);
    }

    return;
  };

  const onBlur = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;

    if (target?.name && !['radio', 'checkbox'].includes(target.type)) {
      validateFormData(target?.name);
    }
  };

  const onChange = (event: FormEvent<HTMLFormElement>) => {
    const target = event.target as HTMLInputElement;

    if (['radio', 'checkbox'].includes(target.type)) {
      validateFormData(target?.name);
    }
  };

  const getField = <T,>(name: string) => {
    return fields.find((field) => field.name === name) as T;
  };

  if (error) {
    const previousPageSearchParams = new URLSearchParams(
      searchParams.toString()
    );
    previousPageSearchParams.delete('slotId');

    return (
      <HeaderText
        fullHeight={false}
        title={
          <Text variation={'display-3'} tag={'h2'}>
            {error || 'Something went wrong'}
          </Text>
        }
        error={
          <Text>
            Please return to the calendar page and select the appointment time
            again
          </Text>
        }
        cta={
          <Button size="large" variation="full">
            <Link href={`/booking/slot?${previousPageSearchParams}`}>
              <Icons iconName="iconArrowSmallLeft" />
              <span>{'Return to Calendar'}</span>
            </Link>
          </Button>
        }
      />
    );
  }

  return (
    <Themes theme="A-HCA-White">
      <form
        noValidate
        ref={formRef}
        method={'GET'}
        onBlur={onBlur}
        onChange={onChange}
        onSubmit={onSubmit}
      >
        <FormContainer
          heading={
            <Text variation={'display-4'} tag="h1">
              {
                (
                  page.children.results.find(
                    (item) => item.template.name === 'SectionTitle'
                  ) as SectionTitleTemplate
                )?.title.value
              }
            </Text>
          }
          copy={
            <>
              <Text variation={'body-extra-large'} tag="span">
                <RichText>
                  <JssRichText
                    field={
                      (
                        page.children.results.find(
                          (item) => item.template.name === 'Text'
                        ) as TextTemplate
                      ).text
                    }
                  />
                </RichText>
              </Text>

              {!loading && !error && appointmentDetails ? (
                <AppointmentSummary
                  isMobile={true}
                  title={'Appointment summary'}
                  locationTitle={'Location'}
                  location={appointmentDetails.location}
                  scanTitle={'Scan'}
                  scan={`${appointmentDetails.scanName} ${appointmentDetails.extras.length
                    ? '(' + appointmentDetails.extras.join(', ') + ')'
                    : ''
                    }`}
                  appointmentTitle={'Appointment'}
                  appointment={appointmentDetails.appointmentType}
                  dateTitle={'Date & time'}
                  date={`${formatDate(appointmentDetails.slot)} (${appointmentDetails.duration
                    })`}
                  priceTitle={`Price to pay`}
                  price={appointmentDetails.price}
                />
              ) : undefined}
            </>
          }
          aside={
            <CFAside>
              <>
                {loading && <LoaderCF />}
                {!loading && !error && appointmentDetails ? (
                  <AppointmentSummary
                    title={'Appointment summary'}
                    locationTitle={'Location'}
                    location={appointmentDetails.location}
                    scanTitle={'Scan'}
                    scan={`${appointmentDetails.scanName} ${appointmentDetails.extras.length
                      ? '(' + appointmentDetails.extras.join(', ') + ')'
                      : ''
                      }`}
                    appointmentTitle={'Appointment'}
                    appointment={appointmentDetails.appointmentType}
                    dateTitle={'Date & time'}
                    date={`${formatDate(appointmentDetails.slot)} (${appointmentDetails.duration
                      })`}
                    priceTitle={`Price to pay`}
                    price={appointmentDetails.price}
                  />
                ) : undefined}

                {props.rendering && props.componentMap && (
                  <PlaceHolderWrapper>
                    <AppPlaceholder
                      name={phKey}
                      rendering={props.rendering}
                      page={props.page}
                      componentMap={props.componentMap}
                    />
                  </PlaceHolderWrapper>
                )}
              </>
            </CFAside>
          }
        >
          {loading && <LoaderCF />}
          {!loading && !error && appointmentDetails?.formVariant ? (
            <>
              <div>
                <Text variation={'heading-1'}>
                  {
                    getField<SectionTitleTemplate>('About the pregnancy').title
                      .value
                  }
                </Text>

                <DynamicTextField
                  getField={getField}
                  formErrors={formErrors}
                  name="lastMenstrualPeriod"
                  type="date"
                />

                {appointmentDetails?.formVariant === 'pregnancy' && (
                  <DynamicTextField
                    getField={getField}
                    formErrors={formErrors}
                    name="estimatedDueDate"
                    type="date"
                  />
                )}

                <DynamicSelectField
                  getField={getField}
                  formErrors={formErrors}
                  name="hadAnUltrasoundScan"
                />

                {appointmentDetails?.formVariant === 'pregnancy' && (
                  <DynamicSelectField
                    getField={getField}
                    formErrors={formErrors}
                    name="hadAPositivePregnancyTest"
                  />
                )}

                <DynamicTextArea
                  getField={getField}
                  formErrors={formErrors}
                  name="pregnancyComments"
                />
              </div>

              <div>
                <Text variation={'heading-1'}>
                  {
                    getField<SectionTitleTemplate>('Patient details').title
                      .value
                  }
                </Text>

                <DynamicSelectField
                  getField={getField}
                  formErrors={formErrors}
                  name="title"
                />

                <DynamicTextField
                  getField={getField}
                  formErrors={formErrors}
                  name="firstName"
                />

                <DynamicTextField
                  getField={getField}
                  formErrors={formErrors}
                  name="lastName"
                />

                <DynamicTextField
                  getField={getField}
                  formErrors={formErrors}
                  name="dateOfBirth"
                  type="date"
                />

                <DynamicSelectField
                  getField={getField}
                  formErrors={formErrors}
                  name="ethnicity"
                />

                <DynamicSelectField
                  getField={getField}
                  formErrors={formErrors}
                  name="returningPatient"
                />
              </div>

              <div>
                <Text variation={'body-bold-extra-large'}>
                  {
                    getField<SectionTitleTemplate>('Contact details').title
                      .value
                  }
                </Text>

                <PhoneField
                  label={getField<InputTemplate>('telephone').title.value}
                  name="telephone"
                  error={formErrors.get('telephone')}
                  helpText={
                    getField<InputTemplate>('telephone')?.helperText?.value
                  }
                />

                <DynamicTextField
                  getField={getField}
                  formErrors={formErrors}
                  name="email"
                  type="email"
                />

                <DynamicSelectField
                  getField={getField}
                  formErrors={formErrors}
                  name="isUKResident"
                  onChange={(option) => setUkResident(option.text === 'Yes')}
                />

                <AddressFinder
                  defaultStep={ukResident ? 'automatic' : 'manual'}
                  findAddressEndpoint={
                    settings?.find(
                      (item) => item.name === 'FindAddressEndpoint'
                    )?.value.value || ''
                  }
                  splitAddressEndpoint={
                    settings?.find(
                      (item) => item.name === 'SplitAddressEndpoint'
                    )?.value.value || ''
                  }
                  error={
                    formErrors.get('addressLine1') ||
                    formErrors.get('addressLine2') ||
                    formErrors.get('city') ||
                    formErrors.get('postcode')
                  }
                  render={(splitAddressResponse) => (
                    <>
                      <DynamicTextField
                        getField={getField}
                        formErrors={formErrors}
                        name={'addressLine1'}
                        defaultValue={splitAddressResponse?.address1 || ''}
                      />
                      <DynamicTextField
                        getField={getField}
                        formErrors={formErrors}
                        name={'addressLine2'}
                        defaultValue={splitAddressResponse?.address2 || ''}
                      />
                      <DynamicTextField
                        getField={getField}
                        formErrors={formErrors}
                        name={'city'}
                        defaultValue={splitAddressResponse?.town || ''}
                      />
                      <DynamicTextField
                        getField={getField}
                        formErrors={formErrors}
                        name={'postcode'}
                        defaultValue={splitAddressResponse?.postcode || ''}
                      />
                      <DynamicSelectField
                        getField={getField}
                        formErrors={formErrors}
                        name="country"
                        optionMapper={(result: DropDownListOption) => ({
                          text: result.value.value,
                          value: result.key.value,
                        })}
                      />
                    </>
                  )}
                />

                <Checkbox
                  label={
                    getField<InputTemplate>('sameAsPatientDetail')?.title?.value
                  }
                  name="sameAsPatientDetail"
                  value="true"
                  id="sameAsPatientDetail"
                  checked={hideBillingFields}
                  onChange={(event) => {
                    setHideBillingFields(event.target.checked);
                  }}
                />

                {hideBillingFields || (
                  <>
                    <DynamicSelectField
                      getField={getField}
                      formErrors={formErrors}
                      name="billingTitle"
                    />
                    <DynamicTextField
                      getField={getField}
                      formErrors={formErrors}
                      name="billingFirstName"
                    />
                    <DynamicTextField
                      getField={getField}
                      formErrors={formErrors}
                      name="billingLastName"
                    />
                    <AddressFinder
                      findAddressEndpoint={
                        settings?.find(
                          (item) => item.name === 'FindAddressEndpoint'
                        )?.value.value || ''
                      }
                      splitAddressEndpoint={
                        settings?.find(
                          (item) => item.name === 'SplitAddressEndpoint'
                        )?.value.value || ''
                      }
                      error={
                        formErrors.get('billingAddressLine1') ||
                        formErrors.get('billingAddressLine2') ||
                        formErrors.get('billingCity') ||
                        formErrors.get('billingPostcode') ||
                        formErrors.get('billingCountry')
                      }
                      render={(splitAddressResponse) => (
                        <>
                          <DynamicTextField
                            getField={getField}
                            formErrors={formErrors}
                            name={'billingAddressLine1'}
                            defaultValue={splitAddressResponse?.address1 || ''}
                          />
                          <DynamicTextField
                            getField={getField}
                            formErrors={formErrors}
                            name={'billingAddressLine2'}
                            defaultValue={splitAddressResponse?.address2 || ''}
                          />
                          <DynamicTextField
                            getField={getField}
                            formErrors={formErrors}
                            name={'billingCity'}
                            defaultValue={splitAddressResponse?.town || ''}
                          />
                          <DynamicTextField
                            getField={getField}
                            formErrors={formErrors}
                            name={'billingPostcode'}
                            defaultValue={splitAddressResponse?.postcode || ''}
                          />
                          <DynamicSelectField
                            getField={getField}
                            formErrors={formErrors}
                            name="billingCountry"
                            optionMapper={(result: DropDownListOption) => ({
                              text: result.value.value,
                              value: result.key.value,
                            })}
                          />
                        </>
                      )}
                    />
                  </>
                )}
              </div>

              <MarketingPreferences
                title={
                  <Text variation={'body-bold-extra-large'}>
                    {
                      getField<SectionTitleTemplate>(
                        'Communication preferences'
                      ).title.value
                    }
                  </Text>
                }
                preferences={
                  <Checkboxes>
                    {[
                      <Checkbox
                        key={getField<ListTemplate>('privacyPolicy').name}
                        label={
                          <span
                            dangerouslySetInnerHTML={{
                              __html:
                                getField<ListTemplate>('privacyPolicy').title
                                  .value,
                            }}
                          ></span>
                        }
                        name={`${getField<ListTemplate>('privacyPolicy').name}`}
                        value={getField<ListTemplate>('privacyPolicy').name}
                        id={getField<ListTemplate>('privacyPolicy').name}
                        required={
                          !!getField<ListTemplate>('privacyPolicy').validators
                            .targetItems.length
                        }
                        errorMessage={
                          getField<ListTemplate>('privacyPolicy').validators
                            .targetItems[0].message.value
                        }
                      />,
                      <Checkbox
                        key={
                          getField<ListTemplate>('attendanceConfirmation').name
                        }
                        label={
                          <span
                            dangerouslySetInnerHTML={{
                              __html: getField<ListTemplate>(
                                'attendanceConfirmation'
                              ).title.value,
                            }}
                          ></span>
                        }
                        name={`${getField<ListTemplate>('attendanceConfirmation').name
                          }`}
                        value={
                          getField<ListTemplate>('attendanceConfirmation').name
                        }
                        id={
                          getField<ListTemplate>('attendanceConfirmation').name
                        }
                        required={
                          !!getField<ListTemplate>('attendanceConfirmation')
                            .validators.targetItems.length
                        }
                        errorMessage={
                          getField<ListTemplate>('attendanceConfirmation')
                            .validators.targetItems[0].message.value
                        }
                      />,
                    ]}
                  </Checkboxes>
                }
              />

              <input
                type="hidden"
                name="slotId"
                value={appointmentDetails?.slotId || ''}
              />
              <input
                type="hidden"
                name="serviceVariantId"
                value={appointmentDetails?.serviceVariantId || ''}
              />
              <input
                type="hidden"
                name="extrasIds"
                value={appointmentDetails?.extrasIds || ''}
              />

              {siteKey && (
                <>
                  <ReCAPTCHA
                    className={styles.recaptcha}
                    ref={recaptchaRef}
                    sitekey={siteKey || ''}
                    onChange={(value) => {
                      setRecaptchaToken(value || '');
                      setErrorRecaptcha(''); // clear custom error
                      setFormErrors((prev) => {
                        const next = new Map(prev);
                        next.delete('Recaptcha');
                        return next;
                      });
                    }}
                    onErrored={() => {
                      console.error('payment form reCAPTCHA onErrored');
                      setErrorRecaptcha('Something went wrong with reCAPTCHA');
                    }}
                    onExpired={() => {
                      setRecaptchaToken('');
                      setErrorRecaptcha(
                        'reCAPTCHA expired — please verify again'
                      ); // custom message
                      setRecaptchaTouched(true); // ensure error displays on expiry
                    }}
                  />

                  {recaptchaTouched &&
                    (!recaptchaToken ||
                      formErrors.get('Recaptcha') ||
                      errorRecaptcha) && (
                      <Container isErrorMsg={true}>
                        <Icons iconName="iconWarning" />
                        <Text variation="body-medium-medium">
                          {formErrors.get('Recaptcha') ||
                            errorRecaptcha ||
                            'Please complete the reCAPTCHA verification'}
                        </Text>
                      </Container>
                    )}

                  <input
                    name="Recaptcha"
                    type="hidden"
                    value={recaptchaToken}
                  />
                </>
              )}

              {submissionErrors.length > 0 && (
                <div>
                  {submissionErrors.map((submissionError, index) => (
                    <ErrorMessage
                      key={index}
                      errorMessage={submissionError.value}
                    />
                  ))}
                </div>
              )}

              <div>
                <Button size="large" variation="full">
                  <button type={'submit'} disabled={formSubmitting}>
                    {formSubmitting ? (
                      <LoaderCF />
                    ) : (
                      (
                        page.children.results.find(
                          (item) => item.name === 'pay'
                        ) as ButtonTemplate
                      ).title.value
                    )}
                  </button>
                </Button>
              </div>
            </>
          ) : undefined}
        </FormContainer>
      </form>
    </Themes>
  );
};

export const Default = (props: TbcBookingDetailsProps): JSX.Element => (
  <Suspense fallback={null}>
    <DefaultContent {...props} />
  </Suspense>
);
