import React from 'react';
import {
  Field,
  LinkField,
  Link as JssLink,
  ComponentRendering,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';

type HCAIconFields = {
  fields: {
    SvgMarkup: Field<string>;
  };
};

interface Fields {
  CTAIcon: HCAIconFields;
  CTALink: LinkField;
}

type BookAnAppointmentCTAProps = {
  params: { [key: string]: string };
  rendering: ComponentRendering;
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
  const phKey = `book-an-appointment-cta-${props.params.DynamicPlaceholderId}`;
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
              __html: props.fields.CTAIcon?.fields.SvgMarkup,
            }}
          ></span>
        )}
      </JssLink>
      <Placeholder name={phKey} rendering={props.rendering} />
      <p>Translated text: {t('close')}</p>
    </div>
  );
};
