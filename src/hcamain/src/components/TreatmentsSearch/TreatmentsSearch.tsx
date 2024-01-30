import React from 'react';
import {
  Field,
  Text as JssText,
  RichText,
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
  TreatmentsSearchIcon: HCAIconFields;
  TreatmentsSearchText: Field<string>;
  Title: Field<string>;
  Text: Field<string>;
}

type TreatmentsSearchProps = {
  params: { [key: string]: string };
  rendering: ComponentRendering;
  fields: Fields;
};

const TreatmentsSearchDefaultComponent = (props: TreatmentsSearchProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">TreatmentsSearch no datasource</span>
    </div>
  </div>
);

export const Default = (props: TreatmentsSearchProps): JSX.Element => {
  const phKey = `cta-buttons-${props.params.DynamicPlaceholderId}`;
  const { t } = useI18n();
  if (!props.fields) {
    return <TreatmentsSearchDefaultComponent {...props} />;
  }
  return (
    <div className={`component ${props.params.styles}`}>
      {props?.fields?.TreatmentsSearchIcon && (
        <span
          dangerouslySetInnerHTML={{
            __html: props?.fields?.TreatmentsSearchIcon.fields.SvgMarkup.value,
          }}
        />
      )}
      <br />
      <JssText field={props.fields.TreatmentsSearchText} />
      <br />
      <JssText field={props.fields.Title} />
      <br />
      <RichText tag="span" field={props.fields.Text} />
      <br />
      <p>Text: {t('Close')}</p>
      <p>Text: {t('ShowMore')}</p>
      <p>Text: {t('Showing')}</p>
      <p>Text: {t('ClearAll')}</p>
      <Placeholder name={phKey} rendering={props.rendering} />
    </div>
  );
};
