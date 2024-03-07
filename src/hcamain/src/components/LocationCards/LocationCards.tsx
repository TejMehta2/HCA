import React from 'react';
import {
  Field,
  ImageField,
  Text as JssText,
  Image as JssImage,
  RichText as JssRichText,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';
import CardMap from '@component-library/components/CardMap/CardMap';
import Text from '@component-library/foundation/Text/Text';
import CarouselCards from '@component-library/site-components/CarouselCards/CarouselCards';
import CardBlock from '@component-library/site-components/CardBlock/CardBlock';
import AdvancedBlockHeader from '@component-library/components/AdvancedBlockHeader/AdvancedBlockHeader';

type CTAIconFields = {
  svgMarkup?: Field<string>;
};

type FilterOptionFields = {
  displayName?: { value?: string };
  filter?: { value?: string };
  filterValue?: { value?: string };
};

type LocationsFields = {
  title?: { value?: string };
  image?: { jsonValue?: ImageField };
  city?: { value?: string };
  street?: { value?: string };
  postCode?: { value?: string };
  getDirections?: { value?: string };
  url: { path?: string };
};

interface Fields {
  data?: {
    item?: {
      heading?: { jsonValue?: Field<string> };
      title?: { jsonValue?: Field<string> };
      text?: { jsonValue?: Field<string> };
      cTAIcon?: {
        Icon?: CTAIconFields;
      };
      cTALink?: { jsonValue?: LinkField };
      locations?: {
        LocationsList?: LocationsFields[];
      };
      filterOptions?: {
        filterOptionsList?: FilterOptionFields[];
      };
      cTAText?: { jsonValue?: Field<string> };
      getDirectionsText?: { jsonValue?: Field<string> };
    };
    contextItem?: {
      id?: string;
    };
  };
}

type LocationCardsProps = {
  params?: Params;
  fields?: Fields;
};

const LocationCardsDefaultComponent = (
  props: LocationCardsProps
): JSX.Element => (
  <div className={`component ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">LocationCards no datasource</span>
    </div>
  </div>
);

const MapCards = (props: LocationCardsProps) => {
  return props.fields?.data?.item?.locations?.LocationsList?.map(
    (location, index) => (
      <CardMap
        key={index}
        title={
          <Text variation="heading-1" tag="h4">
            <JssText field={location?.title} />
          </Text>
        }
        address={
          <>
            {location?.city?.value && (
              <Text variation={'body-large'} tag="span">
                <JssText field={location?.city} />
                &nbsp;
              </Text>
            )}
            {location?.street?.value && (
              <Text variation={'body-large'} tag="span">
                <JssText field={location?.street} />
                &nbsp;
              </Text>
            )}
            {location?.postCode?.value && (
              <Text variation={'body-large'} tag="span">
                <JssText field={location?.postCode} />
              </Text>
            )}
          </>
        }
        image={<JssImage field={location?.image?.jsonValue} />}
        ctas={{
          button1: (
            <a href={location?.url?.path}>
              <JssRichText
                field={props?.fields?.data?.item?.cTAText?.jsonValue}
              />
            </a>
          ),
          button2: (
            <a href={location?.getDirections?.value}>
              <span>
                <JssText
                  field={
                    props?.fields?.data?.item?.getDirectionsText?.jsonValue
                  }
                />
              </span>
            </a>
          ),
        }}
      />
    )
  );
};

export const Grid = (props: LocationCardsProps): JSX.Element => {
  if (!props.fields) {
    return <LocationCardsDefaultComponent {...props} />;
  }

  console.log(props);

  return (
    <CardBlock
      theme={props.params?.Theme || 'A-HCA-White'}
      header={
        <AdvancedBlockHeader
          contentVariation="half-width"
          title={
            <Text
              tag={props.params?.HeadingTag || 'h3'}
              variation={props.params?.HeadingSize || 'display-5'}
            >
              {props.fields?.data?.item?.title?.jsonValue?.value}
            </Text>
          }
          body={
            <Text variation={'body-large'}>
              <JssText field={props.fields.data?.item?.text?.jsonValue} />
            </Text>
          }
          paddingSize="small"
        ></AdvancedBlockHeader>
      }
      variation="3-columns"
      cta={
        <a href={props.fields?.data?.item?.cTALink?.jsonValue?.value.href}>
          View all hip pain locations
        </a>
      }
    >
      <>{MapCards(props)}</>
    </CardBlock>
  );
};

export const Slider = (props: LocationCardsProps): JSX.Element => {
  if (!props.fields) {
    return <LocationCardsDefaultComponent {...props} />;
  }

  return (
    <CarouselCards
      theme={props.params?.Theme || 'A-HCA-White'}
      title={
        <Text
          tag={props.params?.HeadingTag || 'h3'}
          variation={props.params?.HeadingSize || 'display-5'}
        >
          {props.fields?.data?.item?.title?.jsonValue?.value}
        </Text>
      }
      bodyCopy={
        <Text variation={'body-large'}>
          <JssText field={props.fields.data?.item?.text?.jsonValue} />
        </Text>
      }
      link={
        <a href={props.fields?.data?.item?.cTALink?.jsonValue?.value.href}>
          View all hip pain locations
        </a>
      }
    >
      {MapCards(props)}
    </CarouselCards>
  );
};
