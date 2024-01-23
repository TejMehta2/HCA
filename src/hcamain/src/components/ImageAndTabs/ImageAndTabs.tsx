import React from 'react';
import {
  Field,
  Text,
  RichText,
  Image,
  ImageFieldValue,
} from '@sitecore-jss/sitecore-jss-nextjs';

type HCAIconFields = {
  fields: {
    SvgMarkup: Field<string>;
  };
};

interface TabsFields {
  fields: {
    TabIcon: HCAIconFields;
    TabText: Field<string>;
    Title: Field<string>;
    Text: Field<string>;
  };
}

interface Fields {
  Title: Field<string>;
  Image: ImageFieldValue;
  Tabs: TabsFields[];
}

type ImageAndTabsProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const ImageAndTabsDefaultComponent = (
  props: ImageAndTabsProps
): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Tab no datasource</span>
    </div>
  </div>
);

export const Default = (props: ImageAndTabsProps): JSX.Element => {
  if (!props.fields) {
    return <ImageAndTabsDefaultComponent {...props} />;
  }
  return (
    <div className={`component ${props.params.styles}`}>
      <Text field={props.fields.Title} />
      <br />
      <Image field={props.fields.Image} />
      <br />
      <ul>
        {props.fields.Tabs.map((tab, index) => (
          <li key={index}>
            {tab?.fields?.TabIcon && (
              <span
                dangerouslySetInnerHTML={{
                  __html: tab?.fields?.TabIcon.fields.SvgMarkup.value,
                }}
              />
            )}
            <br />
            <Text field={tab.fields.TabText} />
            <br />
            <Text field={tab.fields.Title} />
            <br />
            <RichText tag="span" field={tab.fields.Text} />
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};
