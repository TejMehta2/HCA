import React from 'react';
import {
  Field,
  Text as JssText,
  ComponentRendering,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Title: Field<string>;
  Text: Field<string>;
}

type ModalContentProps = {
  params: { [key: string]: string };
  rendering: ComponentRendering;
  fields: Fields;
};

const ModalContentDefaultComponent = (
  props: ModalContentProps
): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">ModalContent no datasource</span>
    </div>
  </div>
);

export const Default = (props: ModalContentProps): JSX.Element => {
  const phKey = `cta-buttons-${props.params.DynamicPlaceholderId}`;
  if (!props.fields) {
    return <ModalContentDefaultComponent {...props} />;
  }
  return (
    <div className={`component ${props.params.styles}`}>
      <JssText field={props.fields.Title} />
      <br />
      <JssText field={props.fields.Text} />
      <br />
      <Placeholder name={phKey} rendering={props.rendering} />
    </div>
  );
};
