import React, { useRef } from 'react';
import {
  Field,
  Text as JssText,
  RichText as JssRichText,
} from '@sitecore-jss/sitecore-jss-nextjs';

import ModalCallUs from '@component-library/components/ModalCallUs/ModalCallUs';
import Button from '@component-library/core-components/Button/Button';
import { Contact } from '@component-library/components/ModalCallUs/ModalCallUs.types';
import { ContactUnitFields } from 'src/jss-abstractions/OpeningHoursTextFormatting/OpeningHours.types';
import { OpeningHours } from 'src/jss-abstractions/OpeningHoursTextFormatting/OpeningHours';
import Params from 'src/types/params';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { ButtonVariationUnionTypes } from 'temp/component-library/core-components/Button/Button.types';

type HCAIconFields = {
  svgMarkup?: Field<string>;
};

interface Fields {
  data?: {
    item?: {
      cTAIcon?: {
        Icon?: HCAIconFields;
      };
      cTAText?: { jsonValue?: Field<string> };
      contactUnit?: {
        contactUnitList?: ContactUnitFields[];
      };
    };
  };
}

type CallUsTodayCTAProps = {
  params?: Params & {
    BtnVariant?: string;
  };
  fields?: Fields;
};

const CallUsTodayCTADefaultComponent = (
  props: CallUsTodayCTAProps
): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;

  return !isExperienceEditor ? (
    <></>
  ) : (
    <div className={`component ${props.params?.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">
          Call Us Component. Please click to select datasource.
        </span>
      </div>
    </div>
  );
};

interface DefaultProps extends CallUsTodayCTAProps {
  contentVariation: 'EqualSizeNumbers';
}

export const Default = (props: DefaultProps): JSX.Element => {
  const { contentVariation } = props;
  const dialogRef = useRef<HTMLDialogElement>(null);

  if (!props.fields) {
    return <CallUsTodayCTADefaultComponent {...props} />;
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

  const btnvariant = props.params?.BtnVariant || 'outline';

  return (
    <>
      <Button
        size="large"
        variation={btnvariant.toLocaleLowerCase() as ButtonVariationUnionTypes}
      >
        <button onClick={() => dialogRef?.current?.showModal()}>
          {props.fields?.data?.item?.cTAText?.jsonValue && (
            <>
              {props.fields?.data?.item?.cTAIcon?.Icon?.svgMarkup && (
                <span
                  dangerouslySetInnerHTML={{
                    __html:
                      props.fields?.data?.item?.cTAIcon?.Icon?.svgMarkup
                        ?.value || '',
                  }}
                ></span>
              )}
              <JssRichText
                field={props.fields?.data?.item?.cTAText?.jsonValue}
              />
            </>
          )}
        </button>
      </Button>

      <ModalCallUs
        ref={dialogRef}
        contacts={contacts}
        contentVariation={contentVariation}
      />
    </>
  );
};

export const EqualSizeNumbers = (props: CallUsTodayCTAProps): JSX.Element => {
  if (!props.fields) {
    return <CallUsTodayCTADefaultComponent {...props} />;
  }
  return <Default {...props} contentVariation={'EqualSizeNumbers'} />;
};
