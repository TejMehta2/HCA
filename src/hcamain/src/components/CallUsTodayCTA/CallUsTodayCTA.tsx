import React from 'react';
import {
  Field,
  Text as JssText,
  LinkField,
  Link as JssLink,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';

type HCAIconFields = {
  svgMarkup: Field<string>;
};

interface TelephoneNumberFields {
  phoneNumberLabel: { value: string };
  phoneNumber: { value: string };
  internationPhoneNumber: { value: string };
}

interface DayOfWeekFields {
  dayName: { value: string };
}

interface OpeningHoursSpecificationFields {
  dayOfWeek: {
    dayOfWeekList: DayOfWeekFields[];
  };
  opens: { value: string };
  closes: { value: string };
  validFrom: { value: string };
  validThrough: { value: string };
}

interface OpeningHoursFields {
  children: {
    results: OpeningHoursSpecificationFields[];
  };
}

interface ContactUnitFields {
  contactUnitName: { value: string };
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
      cTAIcon: {
        Icon: HCAIconFields;
      };
      cTALink: { jsonValue: LinkField };
      contactUnit: {
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
        <span className="is-empty-hint">CallUsTodayCTA no datasource</span>
      </div>
    </div>
  );
};

export const Default = (props: CallUsTodayCTAProps): JSX.Element => {
  const { t } = useI18n();
  if (!props.fields) {
    return <CallUsTodayCTADefaultComponent {...props} />;
  }
  return (
    <div className={`component ${props.params.styles}`}>
      <JssLink field={props.fields.data.item?.cTALink}>
        {props.fields.data.item?.cTAIcon?.Icon.svgMarkup && (
          <span
            dangerouslySetInnerHTML={{
              __html: props.fields.data.item?.cTAIcon?.Icon?.svgMarkup?.value,
            }}
          ></span>
        )}
      </JssLink>
      <br />
      <ul>
        {props.fields.data.item.contactUnit.contactUnitList.map(
          (contactUnit, index) => (
            <li key={index}>
              <JssText field={contactUnit.contactUnitName} />
              <br />
              <ul>
                {contactUnit.telephoneNumber.telephoneNumberList.map(
                  (telephoneNumber, index) => (
                    <li key={index}>
                      <JssText field={telephoneNumber.phoneNumberLabel} />
                      <br />
                      <JssText field={telephoneNumber.phoneNumber} />
                      <br />
                      <JssText
                        field={telephoneNumber.internationPhoneNumber}
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
                                  <JssText field={day.dayName} />
                                </li>
                              )
                            )}
                          </ul>
                          <br />
                          <JssText field={openingHours.opens} />
                          <br />
                          <JssText field={openingHours.closes} />
                          <br />
                          <JssText field={openingHours.validFrom} />
                          <br />
                          <JssText field={openingHours.validThrough} />
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
      <p>Text: {t('close')}</p>
    </div>
  );
};
