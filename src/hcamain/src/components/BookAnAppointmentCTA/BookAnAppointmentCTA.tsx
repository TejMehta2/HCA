import React from 'react';
import {
  Field,
  Text as JssText,
  LinkField,
  Link as JssLink,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';

type HCAIconFields = {
  fields: {
    SvgMarkup: Field<string>;
  };
};

type ModalContentFields = {
  fields: {
    Title: Field<string>;
    Text: Field<string>;
    PrimaryCTAIcon: HCAIconFields;
    PrimaryCTA: LinkField;
    SecondaryCTAIcon: HCAIconFields;
    SecondaryCTA: LinkField;
  };
};

interface Fields {
  CTAIcon: HCAIconFields;
  CTALink: LinkField;
  ModalContent: ModalContentFields[];
}

type BookAnAppointmentCTAProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const BookAnAppointmentCTADefaultComponent = (
  props: BookAnAppointmentCTAProps
): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">BookAnAppointmentCTA no datasource</span>
    </div>
  </div>
);

export const Default = (props: BookAnAppointmentCTAProps): JSX.Element => {
  const { t } = useI18n();
  if (!props.fields) {
    return <BookAnAppointmentCTADefaultComponent {...props} />;
  }
  return (
    <div className={`component ${props.params.styles}`}>
      <JssLink field={props.fields?.CTALink}>
        {props?.fields?.CTALink.value.text && (
          <span
            dangerouslySetInnerHTML={{
              __html: props.fields.CTAIcon?.fields.SvgMarkup.value,
            }}
          ></span>
        )}
      </JssLink>

      <ul>
        {props.fields.ModalContent.map((modalContent, index) => (
          <li key={index}>
            <JssText field={modalContent.fields.Title} />
            <br />
            <JssText field={modalContent.fields.Text} />
            <br />
            <JssLink field={modalContent.fields?.PrimaryCTA}>
              {modalContent.fields.PrimaryCTA.value.text && (
                <span
                  dangerouslySetInnerHTML={{
                    __html:
                      modalContent.fields.PrimaryCTAIcon?.fields.SvgMarkup
                        .value,
                  }}
                ></span>
              )}
            </JssLink>
            <br />
            <JssLink field={modalContent.fields?.SecondaryCTA}>
              {modalContent?.fields?.SecondaryCTA?.value.text && (
                <span
                  dangerouslySetInnerHTML={{
                    __html:
                      modalContent.fields.SecondaryCTAIcon?.fields?.SvgMarkup
                        .value,
                  }}
                ></span>
              )}
            </JssLink>
            <br />
          </li>
        ))}
      </ul>
      <p>Translated text: {t('close')}</p>
    </div>
  );
};
