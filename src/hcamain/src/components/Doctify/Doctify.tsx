import React from 'react';
import {
  Field,
  LinkField,
  ImageField,
  Text,
  Image,
  Link,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface DoctifyLogoFields {
  fields: {
    Text: Field<string>;
    Logo: ImageField;
  };
}

interface DoctifyReviewsFields {
  fields: {
    Stars: Field<string>;
    Reviews: Field<string>;
    DoctifyLogoLight: DoctifyLogoFields;
    DoctifyLogoDark: DoctifyLogoFields;
    Link: LinkField;
  };
}

interface Fields {
  Reviews: DoctifyReviewsFields;
}

type DoctifyProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const DoctifyDefaultComponent = (props: DoctifyProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Doctify no datasource</span>
    </div>
  </div>
);

export const Default = (props: DoctifyProps): JSX.Element => {
  if (!props.fields) {
    return <DoctifyDefaultComponent {...props} />;
  }
  return (
    <div className={`component ${props.params.styles}`}>
      <span>
        <b>DoctifyReviews</b>
      </span>
      <br />
      <Text field={props.fields.Reviews.fields.Reviews} />
      <br />
      <Text field={props.fields.Reviews.fields.Stars} />
      <br />
      <Text field={props.fields.Reviews.fields.DoctifyLogoLight?.fields.Text} />
      <br />
      <Image field={props.fields.Reviews.fields.DoctifyLogoLight?.fields.Logo} />
      <br />
      <Text field={props.fields.Reviews.fields.DoctifyLogoDark?.fields.Text} />
      <br />
      <Image field={props.fields.Reviews.fields.DoctifyLogoDark?.fields.Logo} />
      <br />
      <Link field={props.fields.Reviews.fields.Link}></Link>
    </div>
  );
};
