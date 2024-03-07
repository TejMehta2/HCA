import React from 'react';
import {
  Field,
  Text as JssText,
  Image as JSSImage,
  RichText,
  Item,
  ImageFieldValue,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';

type CardsFields = {
  fields?: {
    Number?: Field<string>;
    Text?: Field<string>;
    Theme?: Item;
    MapStyles?: Field<string>;
    CardStyles?: Field<string>;
    PinPosition?: Field<string>;
  };
};

interface Fields {
  Heading?: Field<string>;
  Title?: Field<string>;
  Text?: Field<string>;
  BackgroundImage?: ImageFieldValue;
  PinImage?: ImageFieldValue;
  Cards?: CardsFields[];
}

type LocationsMapProps = {
  params?: Params;
  fields?: Fields;
};

const LocationsMapDefaultComponent = (
  props: LocationsMapProps
): JSX.Element => (
  <div className={`component ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">LocationsMap no datasource</span>
    </div>
  </div>
);

export const Default = (props: LocationsMapProps): JSX.Element => {
  if (!props.fields) {
    return <LocationsMapDefaultComponent {...props} />;
  }
  return (
    <div className={`component ${props.params?.styles}`}>
      <JssText field={props.fields?.Heading} />
      <br />
      <JssText field={props.fields?.Title} />
      <br />
      <RichText tag="span" field={props.fields?.Text} />
      <br />
      <JSSImage field={props.fields?.BackgroundImage} />
      <br />
      <ul>
        {props.fields?.Cards?.map((card, index) => (
          <li key={index}>
            <br />
            <JssText field={card?.fields?.Number} />
            <br />
            <JssText field={card?.fields?.Text} />
            <br />
            <span>{card?.fields?.Theme?.name?.toString()}</span>
            <br />
            <JssText field={card?.fields?.MapStyles} />
            <br />
            <JssText field={card?.fields?.CardStyles} />
            <br />
            <JssText field={card?.fields?.PinPosition} />
            <br />
          </li>
        ))}
      </ul>
      <br />
    </div>
  );
};
