import React from 'react';
import {
  Field,
  Text as JssText,
  Image as JssImage,
  ImageField,
  RichText,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface TelephoneNumberFields {
  phoneNumberLabel: { jsonValue: Field<string> };
  phoneNumber: { jsonValue: Field<string> };
  internationPhoneNumber: { jsonValue: Field<string> };
}

interface DayOfWeekFields {
  dayName: { jsonValue: Field<string> };
}

interface OpeningHoursSpecificationFields {
  dayOfWeek: {
    dayOfWeekList: DayOfWeekFields[];
  };
  opens: { jsonValue: Field<string> };
  closes: { jsonValue: Field<string> };
  validFrom: { jsonValue: Field<string> };
  validThrough: { jsonValue: Field<string> };
}

interface OpeningHoursFields {
  children: {
    results: OpeningHoursSpecificationFields[];
  };
}

interface ContactUnitFields {
  contactUnitName: { jsonValue: Field<string> };
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
              <JssText field={contactUnit.contactUnitName.jsonValue} />
              <br />
              <ul>
                {contactUnit.telephoneNumber.telephoneNumberList.map(
                  (telephoneNumber, index) => (
                    <li key={index}>
                      <JssText
                        field={telephoneNumber.phoneNumberLabel.jsonValue}
                      />
                      <br />
                      <JssText field={telephoneNumber.phoneNumber.jsonValue} />
                      <br />
                      <JssText
                        field={telephoneNumber.internationPhoneNumber.jsonValue}
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
                                  <JssText field={day.dayName.jsonValue} />
                                </li>
                              )
                            )}
                          </ul>
                          <br />
                          <JssText field={openingHours.opens.jsonValue} />
                          <br />
                          <JssText field={openingHours.closes.jsonValue} />
                          <br />
                          <JssText field={openingHours.validFrom.jsonValue} />
                          <br />
                          <JssText
                            field={openingHours.validThrough.jsonValue}
                          />
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
