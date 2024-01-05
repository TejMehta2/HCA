import React from 'react';
import {
  Field,
  ImageField,
  RichText,
  Text,
} from '@sitecore-jss/sitecore-jss-nextjs';

type HCAIconFields = {
  fields: {
    SvgMarkup: Field<string>;
  };
};

type AmenitiesFields = {
  fields: {
    Title: Field<string>;
    Icon: HCAIconFields;
  };
};

interface Fields {
  Title: Field<string>;
  Text: Field<string>;
  Image: ImageField;
  AmenitiesList: AmenitiesFields[];
}

type AmenitiesProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const AmenitiesDefaultComponent = (props: AmenitiesProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">
        Homepage Service Cards - no datasource
      </span>
    </div>
  </div>
);

export const Default = (props: AmenitiesProps): JSX.Element => {
  if (!props.fields) {
    return <AmenitiesDefaultComponent {...props} />;
  }
  return (
    <div className={`component ${props.params.styles}`}>
      <RichText field={props.fields.Title} />
      <ul>
        {props.fields.AmenitiesList.map((story, index) => (
          <li key={index}>
            <Text field={story.fields.Title} />
            <span
              dangerouslySetInnerHTML={{
                __html: story.fields.Icon.fields.SvgMarkup.value,
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
