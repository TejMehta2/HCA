import React from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Text as JssText,
  RichText as JssRichText,
  Link as JssLink,
  Image as JssImage,
} from '@sitecore-jss/sitecore-jss-nextjs';

import CardDoctorLayout from '@component-library/site-components/CardDoctorLayout/CardDoctorLayout';
import CardDoctor from '@component-library/site-components/CardDoctor/CardDoctor';
import Text from '@component-library/foundation/Text/Text';

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
  //apiData: TODO
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
  console.log(props);
  if (!props.fields) {
    return <DoctorCardsDefaultComponent {...props} />;
  }

  const doctors = props.fields.apiData.rows;

  const getSpeciality = (doctor) => {
    const keywords = doctor.keywords;

    const topSpecialty = keywords.filter(
      (item) => item.parentName === 'ABSTRACT_TOP_LEVEL_KEYWORD'
    );

    return topSpecialty[0].name;
  };

  return (
    <CardDoctorLayout
      title={
        //  TO - needs variation from sitecore
        <Text variation="display-3" tag={props.params.HeadingTag}>
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
      //  TODO - needs theme to come from sitecore
      theme="A-HCA-Main-Turquoise"
    >
      {doctors.map((doctor, index) => (
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
              {doctor.title} {doctor.firstName} {doctor.lastName}
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
