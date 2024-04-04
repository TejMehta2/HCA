import React from 'react';
import {
  Field,
  Text as JssText,
  LinkField,
  RichText,
  Item,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';

type HCAIconFields = {
  fields?: {
    SvgMarkup?: Field<string>;
  };
};

type CardsFields = {
  fields?: {
    Title?: Field<string>;
    Text?: Field<string>;
    Number?: Field<string>;
    Theme?: Item;
    PinPositionX: Field<string>;
    PinPositionY: Field<string>;
    MapScale?: Field<string>;
    CTAIcon?: HCAIconFields;
    CTALink?: LinkField;
  };
};

interface Fields {
  Heading?: Field<string>;
  Title?: Field<string>;
  Text?: Field<string>;
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
      <ul>
        {props.fields?.Cards?.map((card, index) => (
          <li key={index}>
            <br />
            <JssText field={card?.fields?.Title} />
            <br />
            <JssText field={card?.fields?.Text} />
            <br />
            <JssText field={card?.fields?.Number} />
            <br />
            <span>{card?.fields?.Theme?.name?.toString()}</span>
            <br />
            <JssText field={card?.fields?.PinPositionX} />
            <br />
            <JssText field={card?.fields?.PinPositionY} />
            <br />
            <JssText field={card?.fields?.MapScale} />
            <br />
          </li>
        ))}
      </ul>
      <br />
    </div>
  );
};
