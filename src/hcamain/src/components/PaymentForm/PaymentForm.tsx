/* eslint-disable */
import React, { useState, useRef, FormEvent } from 'react';
import Text from '@component-library/foundation/Text/Text';
import Themes from '@component-library/foundation/Themes/Themes';
import FormContainer from 'src/jss-abstractions/FormContainer/FormContainer';
import AddressFinder from '@component-library/core-components/AddressFinder/AddressFinder';
import Button from '@component-library/core-components/Button/Button';
import ReCAPTCHA from 'react-google-recaptcha';
import Icons from '../../../../component-library/foundation/Icons/Icons';
import Container from '../../../../component-library/core-components/form/basic/Container/Container';
import styles from '../../../src/jss-abstractions/FormContainer/FormContainer.module.scss';

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
} from './PaymentForm.types';
import { z } from 'zod';
import PhoneField from '@component-library/core-components/form/basic/PhoneField/PhoneField';
import createSchema from './helpers/createSchema';
import Checkbox from '@component-library/core-components/form/basic/Checkbox/Checkbox';
import Checkboxes from '@component-library/core-components/Checkboxes/Checkboxes';
import MarketingPreferences from '@component-library/site-components/MarketingPreferences/MarketingPreferences';
import {
  RichText as JssRichText,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import RichText from '@component-library/core-components/RichText/RichText';
import DynamicTextField from './helpers/DynamicTextField';
import Header from './helpers/Header';
import { useRouter } from 'next/router';
import DynamicSelectField from './helpers/DynamicSelectField';

export const Default = (props: PaymentFormProps): JSX.Element => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string>('');
  const [errorRecaptcha, setErrorRecaptcha] = useState<string>('');
  const [recaptchaTouched, setRecaptchaTouched] = useState(false);
  const context = useSitecoreContext().sitecoreContext;
  const siteName = context?.site?.name;
  const itemPath = context?.itemPath;

  // Hooks
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  // State
  const [formErrors, setFormErrors] = useState(new Map<string, string>());
  const [hideBillingFields, setHideBillingFields] = useState(true);
  const [ukResident, setUkResident] = useState(true);
  const [serverMessages, setServerMessages] = useState<[]>([]);

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

  const partialSchemaObj = createSchema(fields, false); // All except billing fields
  const partialSchema = z.object(partialSchemaObj);
  const conditionalSchemaObject = createSchema(fields, true); // Just billing fields

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  // All fields
  const allSchema = z.object({
    ...partialSchemaObj,
    ...conditionalSchemaObject,
    ...(siteKey
      ? { Recaptcha: z.string().min(1, 'Please complete the reCAPTCHA verification') }
      : {})
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
    setRecaptchaTouched(true);

    // Get token from reCAPTCHA
    let token = recaptchaToken;

    if (siteKey && !token) {
      validateFormData();

      setFormErrors((prev) => {
        const next = new Map(prev);
        next.set('Recaptcha', 'Please complete the reCAPTCHA verification');
        return next;
      });
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

      interface PaymentAPIResponse {
        response: {
          success: boolean;
          redirectUrl: string;
          messages: string[];
        };
      }
      const result: PaymentAPIResponse = await response.json();

      if (result.response.success) {
        router.replace(result.response.redirectUrl);
      } else {
        const messages: any = result.response.messages || [];
        setServerMessages(messages);

        // Check if server says reCAPTCHA failed
        const recaptchaError = result.response?.messages?.find(
          (m: any) => m.key === 'Recaptcha'
        );

        if (recaptchaError) {
          // reset reCAPTCHA UI
          recaptchaRef.current?.reset();
          setRecaptchaToken('');
          setErrorRecaptcha(formErrors.get('Recaptcha') || 'reCAPTCHA validation failed');
          setRecaptchaTouched(true);

          // update form error state so it displays properly
          setFormErrors((prev) => {
            const next = new Map(prev);
            next.set('Recaptcha', formErrors.get('Recaptcha') || 'Please complete the reCAPTCHA verification');
            return next;
          });
        }
      }
    } catch (err) {
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

  return (
    <div className={styles.payment}>
      <Header />

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
              <Text variation={'body-large'} tag="span">
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
            }
          >
            <div>
              <Text variation={'heading-1'}>
                {getField<SectionTitleTemplate>('Patient details').title.value}
              </Text>

              <DynamicTextField
                getField={getField}
                formErrors={formErrors}
                name="invoiceNumber"
              />
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
              <DynamicSelectField
                getField={getField}
                formErrors={formErrors}
                name="isUKResident"
                onChange={(option) => setUkResident(option.text === 'Yes')}
              />

              <AddressFinder
                defaultStep={ukResident ? 'automatic' : 'manual'}
                findAddressEndpoint={
                  settings?.find((item) => item.name === 'FindAddressEndpoint')
                    ?.value.value || ''
                }
                splitAddressEndpoint={
                  settings?.find((item) => item.name === 'SplitAddressEndpoint')
                    ?.value.value || ''
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
            </div>

            <div>
              <Text variation={'heading-1'}>
                {getField<SectionTitleTemplate>('Contact details').title.value}
              </Text>
              <DynamicTextField
                getField={getField}
                formErrors={formErrors}
                name="email"
                type="email"
              />
              <PhoneField
                label={getField<InputTemplate>('telephone').title.value}
                name="telephone"
                error={formErrors.get('telephone')}
                helpText={
                  getField<InputTemplate>('telephone')?.helperText?.value
                }
              />
            </div>

            <div>
              {getField<SectionTitleTemplate>('Invoice amount').title.value && (
                <Text variation={'heading-1'}>
                  {getField<SectionTitleTemplate>('Invoice amount').title.value}
                </Text>
              )}

              <DynamicTextField
                getField={getField}
                formErrors={formErrors}
                name="totalInvoice"
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
                    getField<SectionTitleTemplate>('Communication preferences')
                      .title.value
                  }
                </Text>
              }
              bodyCopy={
                <RichText>
                  <JssRichText field={getField<TextTemplate>('consent').text} />
                </RichText>
              }
              preferences={
                <Checkboxes>
                  {[
                    getField<ListTemplate>(
                      'communicationMode'
                    ).datasource.targetItem.children.results.map((option) => (
                      <Checkbox
                        key={option.name}
                        label={option.displayName}
                        name={`${getField<ListTemplate>('communicationMode').name
                          }`}
                        value={option.name}
                        id={option.name}
                        required={false}
                      />
                    )),
                  ]}
                </Checkboxes>
              }
            />

            {
              siteKey &&
              <>
                <ReCAPTCHA
                  className={styles.recaptcha}
                  ref={recaptchaRef}
                  sitekey={siteKey || ''}
                  onChange={(value) => {
                    setRecaptchaToken(value || '');
                    setErrorRecaptcha('');         // clear custom error
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
                    setErrorRecaptcha('reCAPTCHA expired — please verify again'); // custom message
                    setRecaptchaTouched(true); // ensure error displays on expiry
                  }}
                />

                {recaptchaTouched && (!recaptchaToken || formErrors.get('Recaptcha') || errorRecaptcha) && (
                  <Container isErrorMsg={true}>
                    <Icons iconName="iconWarning" />
                    <Text variation="body-medium-medium">
                      {formErrors.get('Recaptcha') || errorRecaptcha || 'Please complete the reCAPTCHA verification'}
                    </Text>
                  </Container>
                )}

                <input name="Recaptcha" type="hidden" value={recaptchaToken} />
              </>
            }

            <div className={styles.button}>
              <Button size="large" variation="full">
                <button type={'submit'}>
                  {
                    (
                      page.children.results.find(
                        (item) => item.name === 'pay'
                      ) as ButtonTemplate
                    ).title.value
                  }
                </button>
              </Button>
            </div>
            {serverMessages.length > 0 && (
              <div className={styles.serverMessages}>
                {serverMessages.map((msg: any, index) => (
                  <Container key={index} isErrorMsg={true}>
                    <Icons iconName="iconWarning" />
                    <Text variation="body-medium-medium">
                      {msg?.value || 'An unknown error occurred'}
                    </Text>
                  </Container>
                ))}
              </div>
            )}

          </FormContainer>
        </form>
      </Themes>
    </div>
  );
};
