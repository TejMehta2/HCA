import React from 'react';
import {
  Field,
  Text as JssText,
  RichText,
  Image,
  ComponentRendering,
  Placeholder,
  ImageFieldValue,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';

type HCAIconFields = {
  fields?: {
    SvgMarkup?: Field<string>;
  };
};

interface Fields {
  TabIcon?: HCAIconFields;
  TabText?: Field<string>;
  Title?: Field<string>;
  Text?: Field<string>;
  Image?: ImageFieldValue;
}

type TabProps = {
  params?: Params;
  rendering?: ComponentRendering;
  fields?: Fields;
};

const TabDefaultComponent = (props: TabProps): JSX.Element => (
  <div className={`component ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Tab no datasource</span>
    </div>
  </div>
);

export const Default = (props: TabProps): JSX.Element => {
  const phKey = `cta-buttons-${props.params?.DynamicPlaceholderId}`;
  if (!props.fields) {
    return <TabDefaultComponent {...props} />;
  }
  return (
    <div className={`component ${props.params?.styles}`}>
      {props?.fields?.TabIcon && (
        <span
          dangerouslySetInnerHTML={{
            __html: props?.fields?.TabIcon?.fields?.SvgMarkup?.value || '',
          }}
        />
      )}
      <br />
      <JssText field={props.fields?.TabText} />
      <br />
      <JssText field={props.fields?.Title} />
      <br />
      <Image field={props.fields?.Image} />
      <br />
      <RichText tag="span" field={props.fields?.Text} />
      <br />
      {props.rendering && (
        <Placeholder name={phKey} rendering={props.rendering} />
      )}
    </div>
  );
};
