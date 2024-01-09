import React from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Text,
  RichText,
  Link,
  Image,
} from '@sitecore-jss/sitecore-jss-nextjs';

type HCAIconFields = {
  fields: {
    SvgMarkup: Field<string>;
  };
};

type PracticeFields = {
  fields: {
    Title: Field<string>;
    Description: Field<string>;
    Image: ImageField;
    DoctifyPractice: Field<string>;
  };
};

type ServiceFields = {
  fields: {
    Title: Field<string>;
    Description: Field<string>;
    Image: ImageField;
    DoctifyKeywordId: Field<string>;
  };
};

type FiltersFields = {
  fields: {
    Filter: Field<string>;
  };
};

interface Fields {
  Title: Field<string>;
  NumberOfCards: Field<string>;
  CTACard: LinkField;
  CTAIcon: HCAIconFields;
  CTALink: LinkField;
  Practice: PracticeFields[];
  Service: ServiceFields[];
  CustomFilters: FiltersFields[];
}

type DoctorCardsProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const DoctorCardsDefaultComponent = (props: DoctorCardsProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">CTA</span>
    </div>
  </div>
);

export const Default = (props: DoctorCardsProps): JSX.Element => {
  if (!props.fields) {
    return <DoctorCardsDefaultComponent {...props} />;
  }
  return (
    <div className={`component ${props.params.styles}`}>
      <Text field={props.fields.Title} />
      <br />
      <Text field={props.fields.NumberOfCards} />
      <br />
      <Link field={props.fields.CTACard}></Link>
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
        <b>Practice</b>
      </span>
      <br />
      <ul>
        {props.fields.Practice.map((practice, index) => (
          <li key={index}>
            <Text field={practice.fields.Title} />
            <br />
            <RichText tag="span" field={practice.fields.Description} />
            <br />
            <Image field={practice.fields.Image} />
            <br />
            <Text field={practice.fields.DoctifyPractice} />
          </li>
        ))}
      </ul>
      <br />
      <span>
        <b>Service</b>
      </span>
      <br />
      <ul>
        {props.fields.Service.map((service, index) => (
          <li key={index}>
            <Text field={service.fields.Title} />
            <br />
            <RichText tag="span" field={service.fields.Description} />
            <br />
            <Image field={service.fields.Image} />
            <br />
            <Text field={service.fields.DoctifyKeywordId} />
          </li>
        ))}
      </ul>
      <br />
      <span>
        <b>CustomFilters</b>
      </span>
      <br />
      <ul>
        {props.fields.CustomFilters.map((customFilters, index) => (
          <li key={index}>
            <Text field={customFilters.fields.Filter} />
          </li>
        ))}
      </ul>
    </div>
  );
};
