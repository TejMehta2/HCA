import React from 'react';
import {
  Text as JssText,
  RichText as JssRichText,
  Field,
} from '@sitecore-jss/sitecore-jss-nextjs';
import CardMap from '@component-library/components/CardMap/CardMap';
import Text from '@component-library/foundation/Text/Text';

type Data = {
  id: string;
  type: string;
  title: string;
  description: string;
  name: string;
  imageUrl: null;
  url: string;
  directions: string;
};

type Location = {
  data: Data;
};

type LocationCardApi = {
  locations: Location[];
  directionsText: Field<string>;
  linkText: Field<string>;
};

const LocationCardApi = (props: LocationCardApi): JSX.Element => {
  console.log(props);
  const { locations, directionsText, linkText } = props;
  return (
    <>
      {locations &&
        locations.map((item: Location) => {
          const { data } = item;
          const { id, title, name, description, imageUrl, url, directions } =
            data;

          return (
            <CardMap
              key={id}
              title={
                <Text variation="heading-1" tag="h4">
                  {title || name}
                </Text>
              }
              address={
                <>
                  {
                    <Text variation={'body-large'} tag="span">
                      {description}
                    </Text>
                  }
                </>
              }
              image={imageUrl ? <img src={imageUrl} alt={title} /> : undefined}
              ctas={{
                button1: (
                  <a href={url}>
                    <JssRichText field={linkText} tag="span" />
                  </a>
                ),
                button2: (
                  <a href={directions}>
                    <span>
                      <JssText field={directionsText} />
                    </span>
                  </a>
                ),
              }}
            />
          );
        })}
    </>
  );
};

export default LocationCardApi;
