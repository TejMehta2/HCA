import React from 'react';
import {
  Field,
  LinkField,
  ImageField,
  Text,
  Image,
  Link,
} from '@sitecore-jss/sitecore-jss-nextjs';

type CQSStatusFields = {
  fields: {
    Title: Field<string>;
    Icon: Field<string>;
    Logo: ImageField;
  };
};

interface Fields {
  Status: CQSStatusFields;
  ReportLink: LinkField;
}

type CQCRatingProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const CQCRatingDefaultComponent = (props: CQCRatingProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">CQC Rating no datasource</span>
    </div>
  </div>
);

export const Default = (props: CQCRatingProps): JSX.Element => {
  if (!props.fields) {
    return <CQCRatingDefaultComponent {...props} />;
  }
  return (
    <div className={`component ${props.params.styles}`}>
      <span>
        <b>CQC</b>
      </span>
      <br />
      <Link field={props.fields.ReportLink}></Link>
      <br />
      <span>
        <b>CQC Status</b>
      </span>
      <br />
      <Text field={props.fields.Status.fields.Title} />
      <br />
      <Text field={props.fields.Status.fields.Icon} />
      <br />
      <Image field={props.fields.Status.fields.Logo} />
      <br />
    </div>
  );
};
