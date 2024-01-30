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

type FilterOptionsFields = {
  fields: {
    Header: Field<string>;
    Filters: Field<string>;
  };
};

type SortOptionsFields = {
  fields: {
    Filter: Field<string>;
  };
};

interface Fields {
  Heading: Field<string>;
  Title: Field<string>;
  Text: Field<string>;
  SearchPlaceholder: Field<string>;
  FilterOptionsIcon: HCAIconFields;
  FilterOptionsText: Field<string>;
  FilterOptions: FilterOptionsFields[];
  SortOptionsIcon: HCAIconFields;
  SortOptionsText: Field<string>;
  SortOptions: SortOptionsFields[];
  SearchResultsText: Field<string>;
  ResultsPerPage: Field<string>;
}

type TabProps = {
  params: { [key: string]: string };
  rendering: ComponentRendering;
  fields: Fields;
};

const TabDefaultComponent = (props: TabProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Tab no datasource</span>
    </div>
  </div>
);

export const Default = (props: TabProps): JSX.Element => {
  const phKey = `cta-buttons-${props.params.DynamicPlaceholderId}`;
  const { t } = useI18n();
  if (!props.fields) {
    return <TabDefaultComponent {...props} />;
  }
  return (
    <div className={`component ${props.params.styles}`}>
      {props?.fields?.TabIcon && (
        <span
          dangerouslySetInnerHTML={{
            __html: props?.fields?.TabIcon.fields.SvgMarkup.value,
          }}
        />
      )}
      <br />
      <JssText field={props.fields.TabText} />
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
