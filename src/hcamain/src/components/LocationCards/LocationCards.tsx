import React from 'react';
import {
  Field,
  ImageField,
  Text as JssText,
  Image as JSSImage,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';

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

export const Grid = (props: LocationCardsProps): JSX.Element => {
  if (!props.fields) {
    return <LocationCardsDefaultComponent {...props} />;
  }
  return (
    <div className={`component ${props.params?.styles}`}>
      <JssText field={props.fields?.data?.item?.heading?.jsonValue} />
      <br />
      <JssText field={props.fields?.data?.item?.title?.jsonValue} />
      <br />
      <JssText field={props.fields?.data?.item?.text?.jsonValue} />
      <br />
      <a href={props.fields?.data?.item?.cTALink?.jsonValue?.value.href}>
        {props.fields?.data?.item?.cTAIcon?.Icon?.svgMarkup && (
          <span
            dangerouslySetInnerHTML={{
              __html: props.fields?.data?.item?.cTAIcon?.Icon?.svgMarkup.value,
            }}
          />
        )}
      </a>
      <br />
      <span>Locations:</span>
      <br />
      <ul>
        {props.fields?.data?.item?.locations?.LocationsList?.map(
          (location, index) => (
            <li key={index}>
              <JssText field={location?.title} />
              <br />
              <JSSImage field={location?.image?.jsonValue} />
              <br />
              <JssText field={location?.city} />
              <br />
              <JssText field={location?.street} />
              <br />
              <JssText field={location?.postCode} />
              <br />
              <JssText field={location?.getDirections} />
              <br />
            </li>
          )
        )}
      </ul>
      <br />
      <span>Filter Options:</span>
      <br />
      <ul>
        {props.fields?.data?.item?.filterOptions?.filterOptionsList?.map(
          (filterOption, index) => (
            <li key={index}>
              <JssText field={filterOption?.displayName} />
              <br />
              <JssText field={filterOption?.filter} />
              <br />
              <span>{filterOption?.filterValue?.value}</span>
              <br />
            </li>
          )
        )}
      </ul>
      <br />
      <JssText field={props.fields?.data?.item?.cTAText?.jsonValue} />
      <br />
      <JssText field={props.fields?.data?.item?.getDirectionsText?.jsonValue} />
      <br />
      <span>Page ID: </span> <span>{props.fields?.data?.contextItem?.id}</span>
      <br />
    </div>
  );
};

export const Slider = (props: LocationCardsProps): JSX.Element => {
  if (!props.fields) {
    return <LocationCardsDefaultComponent {...props} />;
  }
  return <Grid {...props} />;
};
