/* eslint-disable */
import React from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Text as JssText,
  ComponentRendering,
  Placeholder,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import PlaceHolderWrapper from 'src/jss-abstractions/PlaceholderWrapper/PlaceholderWrapper';
import { CQSStatusFields } from 'components/CQCRating/CQCRating.types';
import { DoctifyReviewsFields } from 'components/Doctify/Doctify.types';
import { Default as Doctify } from '../Doctify/Doctify';
import { Default as CQCRating } from '../CQCRating/CQCRating';
import { ContactUnitFields } from 'src/jss-abstractions/OpeningHoursTextFormatting/OpeningHours.types';
import Params from 'src/types/params';
import HeaderLocation from '@component-library/site-components/HeaderLocation/HeaderLocation';
import Text from '@component-library/foundation/Text/Text';
import TextButton from '@component-library/core-components/TextButton/TextButton';
import Icons from '@component-library/foundation/Icons/Icons';
import { OpeningHours } from 'src/jss-abstractions/OpeningHoursTextFormatting/OpeningHours';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';

interface CQCFields {
  fields?: {
    Title?: Field<string>;
    Text?: Field<string>;
    ReportLink?: LinkField;
    Status?: CQSStatusFields;
  };
}

interface Fields {
  data?: {
    contextItem?: {
      title?: { jsonValue?: Field<string> };
      image?: { jsonValue?: ImageField };
      city?: { jsonValue?: Field<string> };
      addressLine1?: { jsonValue?: Field<string> };
      addressLine2?: { jsonValue?: Field<string> };
      postCode?: { jsonValue?: Field<string> };
      getDirections?: { jsonValue?: Field<string> };
      doctifyReviews?: DoctifyReviewsFields;
      cQCRating?: CQCFields;
      contactUnits?: {
        contactUnitList?: ContactUnitFields[];
      };
    };
  };
}

export type HeroLocationDetailsProps = {
  params?: Params;
  rendering?: ComponentRendering;
  fields?: Fields;
};

const HeroLocationDetailsDefaultComponent = (
  props: HeroLocationDetailsProps
): JSX.Element => (
  <div className={`component ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">HeroLocationDetails no datasource</span>
    </div>
  </div>
);

export const Default = (props: HeroLocationDetailsProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;

  const phKey = `cta-buttons-${props.params?.DynamicPlaceholderId}`;
  if (!props.fields) {
    return <HeroLocationDetailsDefaultComponent {...props} />;
  }

  let availabilityString;
  // Compute opening hours only if children.results is not empty
  props.fields?.data?.contextItem?.contactUnits?.contactUnitList?.forEach(
    (contactUnit: ContactUnitFields) => {
      // only compute if children.results exists and not empty
      if (
        contactUnit.children?.results &&
        contactUnit.children.results.length > 0
      ) {
        const hours = OpeningHours(contactUnit, 'linebreaks');
        if (hours) {
          availabilityString = hours;
        }
      }
    }
  );

  return (
    <HeaderLocation
      title={
        <Text
          variation={props.params?.HeadingSize || 'display-3'}
          tag={props.params?.HeadingTag || 'h1'}
        >
          <JssText field={props.fields?.data?.contextItem?.title?.jsonValue} />
        </Text>
      }
      doctify={
        props.fields?.data?.contextItem?.doctifyReviews?.fields ? (
          <Doctify
            alignment="left"
            params={props.params}
            key={2}
            fields={{
              Reviews: props.fields?.data?.contextItem?.doctifyReviews,
            }}
          />
        ) : undefined
      }
      address={{
        icon: <Icons iconName="iconPin"></Icons>,
        text: (
          <Text variation="body-large" tag="span">
            {(props.fields?.data?.contextItem?.addressLine1?.jsonValue?.value ||
              isExperienceEditor) && (
                <>
                  <JssText
                    field={
                      props.fields?.data?.contextItem?.addressLine1?.jsonValue
                    }
                  />
                  <br />
                </>
              )}

            {(props.fields?.data?.contextItem?.addressLine2?.jsonValue?.value ||
              isExperienceEditor) && (
                <>
                  <JssText
                    field={
                      props.fields?.data?.contextItem?.addressLine2?.jsonValue
                    }
                  />
                  <br />
                </>
              )}

            {(props.fields?.data?.contextItem?.city?.jsonValue?.value ||
              isExperienceEditor) && (
                <>
                  <JssText
                    field={props.fields?.data?.contextItem?.city?.jsonValue}
                  />
                  <br />
                </>
              )}

            {(props.fields?.data?.contextItem?.postCode?.jsonValue?.value ||
              isExperienceEditor) && (
                <>
                  <JssText
                    field={props.fields?.data?.contextItem?.postCode?.jsonValue}
                  />
                </>
              )}
          </Text>
        ),

        link: (
          <TextButton>
            {props.fields?.data?.contextItem?.getDirections?.jsonValue
              ?.value ? (
              <a
                href={
                  props.fields?.data?.contextItem?.getDirections?.jsonValue
                    .value
                }
              >
                Get Directions
              </a>
            ) : undefined}
          </TextButton>
        ),
      }}
      open={
        availabilityString
          ? {
            icon: <Icons iconName="iconClock"></Icons>,
            text: (
              <Text variation="body-large" tag="span">
                {availabilityString}
              </Text>
            ),
          }
          : undefined
      }
      ctas={
        props.rendering && (
          <PlaceHolderWrapper>
            <Placeholder name={phKey} rendering={props.rendering} />
          </PlaceHolderWrapper>
        )
      }
      image={
        <NextJssImage
          field={props.fields?.data?.contextItem?.image?.jsonValue}
          next={{
            fill: true,
            sizes: '100vw',
            loading: 'eager',
            priority: true,
          }}
        />
      }
      theme={props.params?.Theme || 'A-HCA-White'}
      cqc={
        props.fields?.data?.contextItem?.cQCRating?.fields ? (
          <CQCRating
            length="short"
            {...props.fields?.data?.contextItem?.cQCRating}
          />
        ) : undefined
      }
    ></HeaderLocation>
  );
};
