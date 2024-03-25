import React from 'react';

import CardMap from '@component-library/components/CardMap/CardMap';
import Text from '@component-library/foundation/Text/Text';

import {
  Text as JssText,
  Image as JssImage,
  RichText as JssRichText,
  Field,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';

type Location = {
  title?: { value?: string };
  image?: { value?: ImageField };
  city?: { value?: string };
  street?: { value?: string };
  postCode?: { value?: string };
  getDirections?: { value?: string };
  url: { path?: string };
};

type LocationCardDefault = {
  locations: Location[];
  directionsText: Field<string>;
  linkText: Field<string>;
};

export const LocationCardDefault = (locations, directionsText, linkText) => {
  const locationsArr = [];

  locations.map((location: Location, index: number) => {
    locationsArr.push(
      <CardMap
        key={index}
        title={
          <Text variation="heading-1" tag="h4">
            <JssText field={location.title} />
          </Text>
        }
        address={
          <>
            {location?.street?.value && (
              <Text variation={'body-large'} tag="span">
                <JssText field={location?.street} />
                &nbsp;
              </Text>
            )}
            {location?.postCode?.value && (
              <Text variation={'body-large'} tag="span">
                <JssText field={location?.postCode} />
                &nbsp;
              </Text>
            )}
            {location?.city?.value && (
              <Text variation={'body-large'} tag="span">
                <JssText field={location?.city} />
              </Text>
            )}
          </>
        }
        image={<JssImage field={location?.image?.value} />}
        ctas={{
          button1: (
            <a href={location.url.path}>
              <JssRichText field={linkText} />
            </a>
          ),
          button2: (
            <a href={location?.getDirections?.value}>
              <span>
                <JssText field={directionsText} />
              </span>
            </a>
          ),
        }}
      />
    );
  });

  return locationsArr;
};
