import React from 'react';
import {
  Field,
  ImageField,
  Placeholder,
  ComponentRendering,
  Text,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { Theme, HeadingTag, HeadingSize } from 'src/types/params';
import { ButtonProps } from '@component-library/core-components/Button/Button.types';

interface LogosFields {
  Logo: ImageField;
  Link: { path: string };
}

interface Fields {
  Heading: Field<string>;
  Title: Field<string>;
  Logos: {
    LogosList: LogosFields[];
  };
}

type LogoBlogProps = {
  params: {
    [key: string]: string;
    Theme: Theme;
    HeadingTag: HeadingTag;
    HeadingSize: HeadingSize;
    styles: string;
  };
  rendering: ComponentRendering;
  fields: Fields;
};

const LogoBlogDefaultComponent = (props: LogoBlogProps): JSX.Element => {
  return (
    <div className={`component ${props.params.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">Component with logos and links</span>
      </div>
    </div>
  );
};

export const Default = (props: LogoBlogProps): JSX.Element => {
  const phKey = `cta-buttons-${props.params.DynamicPlaceholderId}`;
  if (!props.fields) {
    return <LogoBlogDefaultComponent {...props} />;
  }
  const buttonSize: ButtonProps['size'] = 'large'; // Explicit type here to provide type safety

  return (
    <div className={`component ${props.params.styles}`}>
      <Text field={props.fields.Heading} />
      <br />
      <Text field={props.fields.Title} />
      <br />
      <Placeholder name={phKey} rendering={props.rendering} size={buttonSize} />
    </div>
  );
};
