import React from 'react';
import {
  Field,
  Text as JssText,
  Image as JSSImage,
  RichText,
  ImageFieldValue,
} from '@sitecore-jss/sitecore-jss-nextjs';

type CardsFields = {
  fields: {
    Number: Field<string>;
    Text: Field<string>;
    Colour: Field<string>;
    ForegroundImage: Field<string>;
    PositionX: Field<string>;
    PositionY: Field<string>;
  };
};

interface Fields {
  Heading: Field<string>;
  Title: Field<string>;
  Text: Field<string>;
  BackgroundImage: ImageFieldValue;
  Cards: CardsFields[];
}

type LocationsMapProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const LocationsMapDefaultComponent = (
  props: LocationsMapProps
): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
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
    <div className={`component ${props.params.styles}`}>
      <JssText field={props.fields.Heading} />
      <br />
      <JssText field={props.fields.Title} />
      <br />
      <RichText tag="span" field={props.fields.Text} />
      <br />
      <JSSImage field={props.fields.BackgroundImage} />
      <br />
      <ul>
        {props.fields.Cards.map((card, index) => (
          <li key={index}>
            <br />
            <JssText field={card.fields.Number} />
            <br />
            <JssText field={card.fields.Text} />
            <br />
            <JssText field={card.fields.Colour} />
            <br />
            <JssText field={card.fields.ForegroundImage} />
            <br />
            <JssText field={card.fields.PositionX} />
            <br />
            <JssText field={card.fields.PositionY} />
            <br />
          </li>
        ))}
      </ul>
      <br />
    </div>
  );
};
