import React, { useRef } from 'react';
import {
  Field,
  Text as JssText,
  LinkField,
  RichText as JssRichText,
} from '@sitecore-jss/sitecore-jss-nextjs';

import ModalCallUs from '@component-library/components/ModalCallUs/ModalCallUs';
import Button from '@component-library/core-components/Button/Button';
import { Contact } from '@component-library/components/ModalCallUs/ModalCallUs.types';
import { ContactUnitFields } from 'src/jss-abstractions/OpeningHoursTextFormatting/OpeningHours.types';
import { OpeningHours } from 'src/jss-abstractions/OpeningHoursTextFormatting/OpeningHours';

type HCAIconFields = {
  svgMarkup: Field<string>;
};

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
  const dialogRef = useRef<HTMLDialogElement>(null);

  if (!props.fields) {
    return <CallUsTodayCTADefaultComponent {...props} />;
  }

  const contacts: Contact[] = [];
  props.fields.data.item.contactUnit.contactUnitList.map((contactUnit) => {
    const title = contactUnit.contactUnitName;
    const phone = contactUnit.telephoneNumber.telephoneNumberList.map(
      (telephoneNumber) => {
        return {
          text: telephoneNumber.phoneNumber.value,
          number: telephoneNumber.internationPhoneNumber.value,
        };
      }
    );

    const availabilityString = OpeningHours(contactUnit);

    contacts.push({
      title: <JssText field={title} />,
      phone: phone[0],
      availability: <span>{availabilityString}</span>,
    });
  });

  return (
    <>
      <Button size="large" variation="outline">
        <button onClick={() => dialogRef?.current?.showModal()}>
          {props.fields.data.item?.cTALink.jsonValue.value.text && (
            <>
              {props.fields.data.item?.cTAIcon?.Icon.svgMarkup && (
                <span
                  dangerouslySetInnerHTML={{
                    __html:
                      props.fields.data.item?.cTAIcon?.Icon.svgMarkup.value,
                  }}
                ></span>
              )}
              <JssRichText
                field={{
                  value: props.fields.data.item?.cTALink.jsonValue.value.text,
                }}
              />
            </>
          )}
        </button>
      </Button>

      <ModalCallUs ref={dialogRef} contacts={contacts} />
    </>
  );
};
