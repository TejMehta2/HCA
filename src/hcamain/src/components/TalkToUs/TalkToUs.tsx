import React from 'react';
import {
  Field,
  Text as JssText,
  Image as JssImage,
  ImageField,
  RichText,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface TelephoneNumberFields {
  phoneNumberLabel: { value: Field<string> };
  phoneNumber: { value: Field<string> };
  internationPhoneNumber: { value: Field<string> };
}

interface DayOfWeekFields {
  dayName: { value: Field<string> };
}

interface OpeningHoursSpecificationFields {
  dayOfWeek: {
    dayOfWeekList: DayOfWeekFields[];
  };
  opens: { value: Field<string> };
  closes: { value: Field<string> };
  validFrom: { value: Field<string> };
  validThrough: { value: Field<string> };
}

interface OpeningHoursFields {
  children: {
    results: OpeningHoursSpecificationFields[];
  };
}

interface ContactUnitFields {
  contactUnitName: { value: Field<string> };
  telephoneNumber: {
    telephoneNumberList: TelephoneNumberFields[];
  };
  children: {
    results: OpeningHoursFields[];
  };
}

interface Fields {
  data: {
    item: {
      heading: { jsonValue: Field<string> };
      title: { jsonValue: Field<string> };
      text: { jsonValue: Field<string> };
      image: { jsonValue: ImageField };
      contactUnits: {
        contactUnitList: ContactUnitFields[];
      };
    };
  };
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
      <JssText field={props.fields.data.item.heading.jsonValue} />
      <br />
      <JssText field={props.fields.data.item.title.jsonValue} />
      <br />
      <RichText field={props.fields.data.item.text.jsonValue} />
      <br />
      <JssImage field={props.fields.data.item.image.jsonValue} />
      <br />
      <ul>
        {props.fields.data.item.contactUnits.contactUnitList.map(
          (contactUnit, index) => (
            <li key={index}>
              <JssText field={contactUnit.contactUnitName.value} />
              <br />
              <ul>
                {contactUnit.telephoneNumber.telephoneNumberList.map(
                  (telephoneNumber, index) => (
                    <li key={index}>
                      <JssText field={telephoneNumber.phoneNumberLabel.value} />
                      <br />
                      <JssText field={telephoneNumber.phoneNumber.value} />
                      <br />
                      <JssText
                        field={telephoneNumber.internationPhoneNumber.value}
                      />
                    </li>
                  )
                )}
              </ul>
              <br />
              <span>Opening Hours</span>
              <br />
              <ul>
                {contactUnit.children.results.map((children, index) => (
                  <li key={index}>
                    <ul>
                      {children.children.results.map((openingHours, index) => (
                        <li key={index}>
                          <ul>
                            {openingHours.dayOfWeek.dayOfWeekList.map(
                              (day, index) => (
                                <li key={index}>
                                  <JssText field={day.dayName.value} />
                                </li>
                              )
                            )}
                          </ul>
                          <br />
                          <JssText field={openingHours.opens.value} />
                          <br />
                          <JssText field={openingHours.closes.value} />
                          <br />
                          <JssText field={openingHours.validFrom.value} />
                          <br />
                          <JssText field={openingHours.validThrough.value} />
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
          )
        )}
      </ul>
    </div>
  );
};
