import React from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Link as JssLink,
} from '@sitecore-jss/sitecore-jss-nextjs';

import CardDoctorLayout from '@component-library/site-components/CardDoctorLayout/CardDoctorLayout';
import CardDoctor from '@component-library/site-components/CardDoctor/CardDoctor';
import Text from '@component-library/foundation/Text/Text';
import { Theme, HeadingTag, HeadingSize } from 'src/types/params';
import { Doctor, DoctorRow } from './DoctorCards.types';

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
  apiData: Doctor;
}

type DoctorCardsProps = {
  params: {
    [key: string]: string;
    HeadingTag: HeadingTag;
    HeadingSize: HeadingSize;
    Theme: Theme;
  };
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
  console.log(props);
  if (!props.fields) {
    return <DoctorCardsDefaultComponent {...props} />;
  }

  const doctors = props.fields.apiData.rows;

  const getSpeciality = (doctor: DoctorRow) => {
    const keywords = doctor.keywords;

    const topSpecialty = keywords.filter(
      (item) => item.parentName === 'ABSTRACT_TOP_LEVEL_KEYWORD'
    );

    return topSpecialty[0].name;
  };

  return (
    <CardDoctorLayout
      title={
        <Text
          tag={props.params.HeadingTag}
          variation={props.params.HeadingSize || 'display-3'}
        >
          {props.fields.Title.value}
        </Text>
      }
      cta={
        <JssLink field={props.fields.CTALink}>
          {props?.fields?.CTALink.value.text && (
            <span
              dangerouslySetInnerHTML={{
                __html: props.fields.CTALink.value.text,
              }}
            ></span>
          )}
        </JssLink>
      }
      theme={props.params.Theme || 'A-HCA-Main-Turquoise'}
    >
      {doctors.map((doctor: DoctorRow, index: number) => (
        <CardDoctor
          key={index}
          image={
            <img
              src={doctor.images.logo}
              alt={`${doctor.title} ${doctor.firstName} ${doctor.lastName}`}
              width="91"
              height="91"
            />
          }
          title={
            <Text variation="display-5" tag="h3">
              <span>
                {doctor.title} {doctor.firstName} {doctor.lastName}
              </span>
            </Text>
          }
          department={<span>{getSpeciality(doctor)}</span>}
          cta={
            <JssLink field={props.fields.CTACard}>
              {props?.fields?.CTACard.value.text && (
                <span
                  dangerouslySetInnerHTML={{
                    __html: props.fields.CTACard.value.text,
                  }}
                ></span>
              )}
            </JssLink>
          }
        />
      ))}
    </CardDoctorLayout>
  );
};
