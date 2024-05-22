import React, { useState, useRef, FormEvent } from 'react';

import PaymentFormHeader from '@component-library/site-components/PaymentFormHeader/PaymentFormHeader';
import Icons from '@component-library/foundation/Icons/Icons';
import Text from '@component-library/foundation/Text/Text';
import TextLink from '@component-library/core-components/TextLink/TextLink';
import Themes from '@component-library/foundation/Themes/Themes';
import FormProgressBar from '@component-library/site-components/FormProgressBar/FormProgressBar';
import FormContainer from 'src/jss-abstractions/FormContainer/FormContainer';
import AddressFinder from '@component-library/core-components/AddressFinder/AddressFinder';
import Button from '@component-library/core-components/Button/Button';

import {
  ButtonTemplate,
  DropDownListTemplate,
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
import SelectField from '@component-library/core-components/form/basic/SelectField/SelectField';
import createSchema from './helpers/createSchema';
import Checkbox from '@component-library/core-components/form/basic/Checkbox/Checkbox';
import Checkboxes from '@component-library/core-components/Checkboxes/Checkboxes';
import MarketingPreferences from '@component-library/site-components/MarketingPreferences/MarketingPreferences';
import { RichText as JssRichText } from '@sitecore-jss/sitecore-jss-nextjs';
import RichText from '@component-library/core-components/RichText/RichText';
import DynamicTextField from './helpers/DynamicTextField';

export const Default = (props: PaymentFormProps): JSX.Element => {
  // Hooks
  const formRef = useRef<HTMLFormElement>(null);

  // State
  const [formErrors, setFormErrors] = useState(new Map<string, string>());
  const [hideBillingFields, setHideBillingFields] = useState(true);
  const [ukResident, setUkResident] = useState(true);

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

  const schemaObj = createSchema(fields, false);
  const conditionalSchemaObject = createSchema(fields, true);
  const additionalSchemaObj = hideBillingFields ? {} : conditionalSchemaObject;
  const schema = z.object({
    ...schemaObj,
    resident: z.string().min(1, 'Please select'),
    ...additionalSchemaObj,
  });

  const validateFormData = (name?: string) => {
    if (!formRef.current) return false;
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);
    try {
      schema.parse(data);
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
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const isValid = validateFormData();
    if (!isValid) {
      setTimeout(() => {
        // Delay to allow errors to render
        const firstError = document.querySelector('[class*="_error-message"]');
        firstError?.scrollIntoView({
          behavior: 'smooth',
        });
      }, 500);
      event.preventDefault();
    }
    return isValid;
  };
  const onBlur = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    if (target?.name) {
      validateFormData(target?.name);
    }
  };

  const getField = <T,>(name: string) => {
    return fields.find((field) => field.name === name) as T;
  };

  return (
    <>
      <PaymentFormHeader
        paymentsText="Secure Online Payments"
        contactText="Any questions?"
        phoneNumber={{
          icon: <Icons iconName="iconPhone" />,
          text: '03332 223 133',
          number: '03332223133',
        }}
        openingHours={{
          icon: <Icons iconName="iconClock" />,
          text: 'Mon-Fri 9am - 5:30pm',
        }}
        close={
          <TextLink>
            <a href="/">
              <span>Close</span>
              <Icons iconName="iconCross" />
            </a>
          </TextLink>
        }
      />
      <FormProgressBar
        pages={[
          {
            pageControl: (
              <div>
                <Icons iconName="iconInfo" />
                <Text variation="body-medium-extra-large">Patient Details</Text>
              </div>
            ),
            stage: 'active',
          },
          {
            pageControl: (
              <div>
                <Icons iconName="iconCreditCard" />
                <Text variation="body-bold-extra-large">Payment</Text>
              </div>
            ),
            stage: 'inactive',
          },
          {
            pageControl: (
              <div>
                <Icons iconName="iconCheckCircle" />
                <Text variation="body-medium-extra-large">Confirmation</Text>
              </div>
            ),
            stage: 'inactive',
          },
        ]}
      />

      <Themes theme="A-HCA-White">
        <form
          noValidate
          action={
            settings?.find((item) => item.name === 'SubmitAction')?.value
              .value || ''
          }
          ref={formRef}
          method={'GET'}
          onBlur={onBlur}
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

              <SelectField
                key={'title'}
                name={'title'}
                id={'title'}
                label={getField<DropDownListTemplate>('title').title.value}
                options={getField<DropDownListTemplate>(
                  'title'
                ).datasource.targetItem.children.results.map((result) => ({
                  text: result.displayName,
                  value: result.name,
                }))}
                error={formErrors?.get('title')}
                placeholder={'Please select'}
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

              <SelectField
                name="resident"
                id="resident"
                label="UK Resident"
                options={[{ text: 'Yes' }, { text: 'No' }]}
                error={formErrors?.get('resident')}
                placeholder="please select"
                onChange={(option) => setUkResident(option.text === 'Yes')}
                defaultValue={{ text: 'Yes' }}
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
                    <SelectField
                      name={'country'}
                      id={'country'}
                      label={
                        getField<DropDownListTemplate>('country').title.value
                      }
                      options={getField<DropDownListTemplate>(
                        'country'
                      ).datasource.targetItem.children.results.map(
                        (result) => ({
                          text: result.value.value,
                          value: result.key.value,
                        })
                      )}
                      error={formErrors?.get(
                        getField<DropDownListTemplate>('country').name
                      )}
                      placeholder={'Please select'}
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
                name="invoiceTotal"
              />

              <Checkbox
                label="Billing address is same as patient's address"
                name="billingDetailsSameAsPatientDetails"
                value="same"
                id="billingDetailsSameAsPatientDetails"
                checked={hideBillingFields}
                onChange={(event) => {
                  setHideBillingFields(event.target.checked);
                }}
              />

              {hideBillingFields || (
                <>
                  <SelectField
                    key={'billingTitle'}
                    name={'billingTitle'}
                    id={'billingTitle'}
                    label={
                      getField<DropDownListTemplate>('billingTitle').title.value
                    }
                    options={getField<DropDownListTemplate>(
                      'billingTitle'
                    ).datasource.targetItem.children.results.map((result) => ({
                      text: result.displayName,
                      value: result.name,
                    }))}
                    error={formErrors?.get(
                      getField<DropDownListTemplate>('billingTitle').name
                    )}
                    placeholder={'Please select'}
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

                        <SelectField
                          name={'billingCountry'}
                          id={'billingCountry'}
                          label={
                            getField<DropDownListTemplate>('billingCountry')
                              .title.value
                          }
                          options={getField<DropDownListTemplate>(
                            'billingCountry'
                          ).datasource.targetItem.children.results.map(
                            (result) => ({
                              text: result.value.value,
                              value: result.key.value,
                            })
                          )}
                          error={formErrors?.get(
                            getField<DropDownListTemplate>('billingCountry')
                              .name
                          )}
                          placeholder={'Please select'}
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
                        name={option.name}
                        value={option.value.value}
                        id={option.name}
                        required={false}
                      />
                    )),
                  ]}
                </Checkboxes>
              }
            />
            <div>
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
          </FormContainer>
        </form>
      </Themes>
    </>
  );
};
