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
import CardGrid from '@component-library/site-components/CardGrid/CardGrid';
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
              <>
                <JssText field={location?.city} />,
              </>
            )}
            {location?.street?.value && (
              <>
                <JssText field={location?.street} />,
              </>
            )}
            {location?.postCode?.value && (
              <>
                <JssText field={location?.postCode} />,
              </>
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
            <a href="#">
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

  return (
    <CardBlock
      theme={props.params?.Theme || 'A-HCA-White'}
      header={
        <AdvancedBlockHeader
          contentVariation="half-width"
          title={
            <Text variation={'display-5'} tag="h3">
              Blog Card Block
            </Text>
          }
          body={
            <Text variation={'body-large'}>
              Quis laboris proident sint amet id cillum do dolor in tempor est.
              Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
              laborum
            </Text>
          }
          paddingSize="small"
        ></AdvancedBlockHeader>
      }
      variation="3-columns"
      cta={<a href="#">View all hip pain locations</a>}
    >
      <>{MapCards(props)}</>
    </CardBlock>

    // <div className={`component ${props.params?.styles}`}>
    //   <JssText field={props.fields?.data?.item?.heading?.jsonValue} />
    //   <br />
    //   <JssText field={props.fields?.data?.item?.title?.jsonValue} />
    //   <br />
    //   <JssText field={props.fields?.data?.item?.text?.jsonValue} />
    //   <br />
    //   <a href={props.fields?.data?.item?.cTALink?.jsonValue?.value.href}>
    //     {props.fields?.data?.item?.cTAIcon?.Icon?.svgMarkup && (
    //       <span
    //         dangerouslySetInnerHTML={{
    //           __html: props.fields?.data?.item?.cTAIcon?.Icon?.svgMarkup.value,
    //         }}
    //       />
    //     )}
    //   </a>
    //   <br />
    //   <span>Locations:</span>
    //   <br />
    //   <ul>
    //     {props.fields?.data?.item?.locations?.LocationsList?.map(
    //       (location, index) => (
    //         <li key={index}>
    //           <JssText field={location?.title} />
    //           <br />
    //           <JssImage field={location?.image?.jsonValue} />
    //           <br />
    //           <JssText field={location?.city} />
    //           <br />
    //           <JssText field={location?.street} />
    //           <br />
    //           <JssText field={location?.postCode} />
    //           <br />
    //           <JssText field={location?.getDirections} />
    //           <br />
    //         </li>
    //       )
    //     )}
    //   </ul>
    //   <br />
    //   <span>Filter Options:</span>
    //   <br />
    //   <ul>
    //     {props.fields?.data?.item?.filterOptions?.filterOptionsList?.map(
    //       (filterOption, index) => (
    //         <li key={index}>
    //           <JssText field={filterOption?.displayName} />
    //           <br />
    //           <JssText field={filterOption?.filter} />
    //           <br />
    //           <span>{filterOption?.filterValue?.value}</span>
    //           <br />
    //         </li>
    //       )
    //     )}
    //   </ul>
    //   <br />
    //   <JssText field={props.fields?.data?.item?.cTAText?.jsonValue} />
    //   <br />
    //   <JssText field={props.fields?.data?.item?.getDirectionsText?.jsonValue} />
    //   <br />
    //   <span>Page ID: </span> <span>{props.fields?.data?.contextItem?.id}</span>
    //   <br />
    // </div>
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
          tag={props.params?.HeadingTag || 'h2'}
          variation={props.params?.HeadingSize || 'display-4'}
        >
          {props.fields?.data?.item?.title?.jsonValue?.value}
        </Text>
      }
      // link={link}
    >
      {MapCards(props)}
    </CarouselCards>
  );
};
