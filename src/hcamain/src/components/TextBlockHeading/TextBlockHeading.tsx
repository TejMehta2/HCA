import React from 'react';
import {
  Field,
  Text as JssText,
  useSitecoreContext
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';

interface Fields {
  Heading?: Field<string>;
  Title?: Field<string>;
}

type TextBlockHeadingProps = {
  params?: Params;
  fields?: Fields;
};

const TextBlockHeadingDefaultComponent = (
  props: TextBlockHeadingProps
): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
          Text Block Heading please click to select datasource
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

export const Default = (props: TextBlockHeadingProps): JSX.Element => {
  if (!props.fields) {
    return <TextBlockHeadingDefaultComponent {...props} />;
  }
  return (
    <div className={`component ${props.params?.styles}`}>
      <JssText field={props.fields?.Heading} />
      <br />
      <JssText field={props.fields?.Title} />
      <br />
    </div>
  );
};
