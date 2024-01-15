import React from 'react';
import {
  Field,
  LinkField,
  ImageField,
  Text,
  RichText,
  Image,
  Link,
} from '@sitecore-jss/sitecore-jss-nextjs';

type HCAIconFields = {
  fields: {
    SvgMarkup: Field<string>;
  };
};

interface DoctifyLogoFields {
  fields: {
    Text: Field<string>;
    Logo: ImageField;
  };
}

interface CountersFields {
  fields: {
    Number: Field<string>;
    Text: Field<string>;
  };
}

interface CQCStatusFields {
  fields: {
    Title: Field<string>;
    Icon: Field<string>;
    Logo: ImageField;
    ReportLink: LinkField;
  };
}

interface DoctifyReviewsFields {
  fields: {
    Stars: Field<string>;
    Reviews: Field<string>;
    DoctifyLogo: DoctifyLogoFields;
    Link: LinkField;
  };
}

interface Fields {
  Title: Field<string>;
  Text: Field<string>;
  Image: ImageField;
  CTAIcon: HCAIconFields;
  CTALink: LinkField;
  Counters: CountersFields[];
  CQCStatus: CQCStatusFields;
  DoctifyReviews: DoctifyReviewsFields;
}

type IntroBlockProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const IntroBlockDefaultComponent = (props: IntroBlockProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Intro Block no datasource</span>
    </div>
  </div>
);

export const Default = (props: IntroBlockProps): JSX.Element => {
  if (!props.fields) {
    return <IntroBlockDefaultComponent {...props} />;
  }
  return (
    <div className={`component ${props.params.styles}`}>
      <Text field={props.fields.Title} />
      <RichText field={props.fields.Text} />
      <Image field={props.fields.Image} />
      <br />
      <span>
        <b>Counters</b>
      </span>
      <br />
      <ul>
        {props.fields.Counters.map((counters, index) => (
          <li key={index}>
            <Text field={counters.fields.Text} />
            <br />
            <Text field={counters.fields.Number} />
          </li>
        ))}
      </ul>
      <br />
      {props?.fields?.CTAIcon && (
        <span
          dangerouslySetInnerHTML={{
            __html: props.fields.CTAIcon.fields.SvgMarkup.value,
          }}
        />
      )}
      <Link field={props.fields.CTALink}></Link>
      <br />
      <span>
        <b>CQCStatus</b>
      </span>
      <br />
      <Text field={props.fields.CQCStatus.fields.Title} />
      <br />
      <Text field={props.fields.CQCStatus.fields.Icon} />
      <br />
      <Image field={props.fields.CQCStatus.fields.Logo} />
      <br />
      <Link field={props.fields.CQCStatus.fields.ReportLink}></Link>
      <br />
      <span>
        <b>DoctifyReviews</b>
      </span>
      <br />
      <Text field={props.fields.DoctifyReviews.fields.Reviews} />
      <br />
      <Text field={props.fields.DoctifyReviews.fields.Stars} />
      <br />
      <Text
        field={props.fields.DoctifyReviews.fields.DoctifyLogo.fields.Text}
      />
      <br />
      <Image
        field={props.fields.DoctifyReviews.fields.DoctifyLogo.fields.Logo}
      />
      <br />
      <Link field={props.fields.DoctifyReviews.fields.Link}></Link>
    </div>
  );
};
