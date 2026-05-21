'use client'
import { type JSX } from 'react';
import { ComponentWithContextProps } from 'lib/component-props';

import { Field, Text as JssText } from '@sitecore-content-sdk/nextjs';
import { Contact } from '@component-library/components/ModalCallUs/ModalCallUs.types';
import { ContactUnitFields } from 'src/jss-abstractions/OpeningHoursTextFormatting/OpeningHours.types';
import { OpeningHours } from 'src/jss-abstractions/OpeningHoursTextFormatting/OpeningHours';
import Params from 'src/types/params';
import NeedHelp from '@component-library/consultant-finder/NeedHelp/NeedHelp';
import Themes from '@component-library/foundation/Themes/Themes';

interface Fields {
  data?: {
    item?: {
      title?: { jsonValue?: Field<string> };
      contactUnit?: {
        contactUnitList?: ContactUnitFields[];
      };
    };
  };
}

type ContactDetailsBoxProps = ComponentWithContextProps & {
  params?: Params;
  fields?: Fields;
};

const ContactDetailsBoxDefaultComponent = (
  props: ContactDetailsBoxProps
): JSX.Element => {
  const isExperienceEditor = props.page.mode.isEditing;

  return !isExperienceEditor ? (
    <></>
  ) : (
    <div className={`component ${props.params?.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">
          Contact Details Box Component. Please click to select datasource.
        </span>
      </div>
    </div>
  );
};

export const Default = (props: ContactDetailsBoxProps): JSX.Element => {
  if (!props.fields) {
    return <ContactDetailsBoxDefaultComponent {...props} />;
  }

  const contacts: Contact[] = [];
  props.fields?.data?.item?.contactUnit?.contactUnitList?.map((contactUnit) => {
    const title = contactUnit?.contactUnitName;
    const phone = contactUnit?.telephoneNumber?.telephoneNumberList.map(
      (telephoneNumber) => {
        return {
          text: telephoneNumber?.phoneNumber?.value,
          number: telephoneNumber?.internationPhoneNumber?.value,
        };
      }
    );

    const availabilityString = OpeningHours(contactUnit, 'linebreaks') || [];

    contacts.push({
      title: <JssText field={title} />,
      phone: phone?.[0],
      availability: availabilityString.length ? (
        <>{availabilityString}</>
      ) : undefined,
    });
  });

  if (contacts.length < 1) {
    return <ContactDetailsBoxDefaultComponent {...props} />;
  }

  const contact = contacts[0];

  return (
    <Themes theme={props.params?.Theme || 'A-HCA-White'}>
      <NeedHelp
        headline={
          props.fields?.data?.item?.title?.jsonValue?.value || 'Need help?'
        }
        subheadline={contact?.title || ''}
        workingHoursHeadline={contact?.availability ? 'Opening hours' : ''}
        workingHours={contact?.availability || ''}
        phoneNumber={contact.phone?.text || ''}
        workingHoursTime={''}
      />
    </Themes>
  );
};
