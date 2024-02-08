import React from 'react';
import { Field } from '@sitecore-jss/sitecore-jss-nextjs';

interface TelephoneNumberFields {
  PhoneNumberLabel: Field<string>;
  InternationPhoneNumber: Field<string>;
}

interface ContactUnitFields {
  ContactUnitName: Field<string>;
  TelephoneNumber: TelephoneNumberFields[];
}

interface Fields {
  ContactUnit: ContactUnitFields[];
}

type CallUsTodayCTAProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const CallUsTodayCTADefaultComponent = (
  props: CallUsTodayCTAProps
): JSX.Element => {
  return (
    <div className={`component ${props.params.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">Header with text</span>
      </div>
    </div>
  );
};

export const Default = (props: CallUsTodayCTAProps): JSX.Element => {
  if (!props.fields) {
    return <CallUsTodayCTADefaultComponent {...props} />;
  }
  return (
    <div className={`component ${props.params.styles}`}>
      {/* <Text field={props.fields.ContactUnit} />
      <br />
      <Text field={props.fields.Title} />
      <br />
      <RichText field={props.fields.Text} /> */}
      <br />
    </div>
  );
};
