import React from 'react';
import {
  Text as JssText,
  Image as JssImage,
  RichText as JssRichText,
  Field,
} from '@sitecore-jss/sitecore-jss-nextjs';
import CardMap from '@component-library/components/CardMap/CardMap';
import Text from '@component-library/foundation/Text/Text';

import { LocationsFields, Result } from '../LocationCardsTypes';

export const LocationCardApi = (
  locations: Result[],
  directionsText: Field<string>,
  linkText: Field<string>
) => {
  const locationsArr: JSX.Element[] = [];

  locations.map((item: Result) => {
    const { data } = item;
    const { id, title, name, description, imageUrl, url, directions } = data;

    locationsArr.push(
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
  });

  return locationsArr.length > 0 ? locationsArr : <></>;
};

export const LocationCardDefault = (
  locations: LocationsFields[],
  directionsText: Field<string>,
  linkText: Field<string>
) => {
  const locationsArr: JSX.Element[] = [];

  locations.map((location: LocationsFields, index: number) => {
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
  console.log('default');
  return locationsArr;
};
