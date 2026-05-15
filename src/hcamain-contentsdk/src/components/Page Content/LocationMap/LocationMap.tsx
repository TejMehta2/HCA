'use client';

/* eslint-disable prettier/prettier */
import { type JSX } from 'react';
import { Text as JssText, Field, ComponentRendering } from '@sitecore-content-sdk/nextjs';
import { ComponentWithContextProps } from 'lib/component-props';
import { useTranslations } from 'next-intl';
import LocationMapComponent from '@component-library/components/LocationMap/LocationMap';
import CardMap from '@component-library/components/CardMap/CardMap';
import Text from '@component-library/foundation/Text/Text';
import Icons from '@component-library/foundation/Icons/Icons';
import returnDirections from 'src/jss-abstractions/GetDirections/GetDirections';
import Params from 'src/types/params';

type PageLocation = {
  lat?: { value?: string };
  lng?: { value?: string };
  title?: { value?: string };
  description?: { value?: string };
  url?: { path?: string; url?: string };
  proxyurl?: { jsonValue?: { value?: { href?: string } }; path?: string; text?: string };
  googlePlaceId?: { value?: string };
  directions?: { value?: string };
  geocodedCoordinate?: { jsonValue?: { value?: { latitude?: number; longitude?: number } } };
};

interface Fields {
  data?: {
    item?: {
      locations?: { PagesList?: PageLocation[] };
      cTACardText?: { jsonValue?: Field<string> };
      getDirectionsText?: { jsonValue?: Field<string> };
    };
  };
}

export type LocationMapProps = ComponentWithContextProps & {
  params?: Params;
  fields?: Fields;
  rendering?: ComponentRendering;
};

const LocationMapDefault = (props: LocationMapProps): JSX.Element => {
  const isExperienceEditor = props.page.mode.isEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">Location Map please click to select datasource</span>
        </div>
      </div>
    );
  }
  return <></>;
};

const LocationMap = (props: LocationMapProps): JSX.Element => {
  const t = useTranslations(props?.page?.siteName);

  if (!props.fields?.data?.item) {
    return <LocationMapDefault {...props} />;
  }

  const pages = props.fields.data.item.locations?.PagesList || [];

  const locations = pages.map((p) => {
    const lat = Number(p.lat?.value) ||
      (p.geocodedCoordinate?.jsonValue?.value?.latitude as number) || 0;
    const lng = Number(p.lng?.value) ||
      (p.geocodedCoordinate?.jsonValue?.value?.longitude as number) || 0;

    const googlePlaceId = p.googlePlaceId?.value || undefined;
    const directions = p.directions?.value || undefined;
    const geocodedCoordinate = p.geocodedCoordinate?.jsonValue?.value;
    const directionsUrl = returnDirections(googlePlaceId || '', directions || '', geocodedCoordinate || {});
    const pageUrl = p.url?.path || p.url?.url;

    const card = (hideCard: () => void) => (
      <CardMap
        title={
          <Text tag="h3" variation="heading-2">
            {p.title?.value}
          </Text>
        }
        address={
          <Text tag="p" variation="body-large">
            {p.description?.value}
          </Text>
        }
        ctas={{
          button1: pageUrl ? (
            <a href={pageUrl}>
              <JssText field={props.fields?.data?.item?.cTACardText?.jsonValue} />
            </a>
          ) : undefined,
          button2: directionsUrl ? (
            <a href={directionsUrl}>
              <span>
                <JssText field={props.fields?.data?.item?.getDirectionsText?.jsonValue} />
              </span>
            </a>
          ) : undefined,
          close: (
            <button onClick={hideCard}>
              <span>{t('close') || 'Close'}</span>
              <Icons iconName="iconCross" />
            </button>
          ),
        }}
      />
    );

    return {
      center: { lat, lng },
      card,
    };
  });

  const defaultCenter = locations[0]?.center || { lat: 51.5072, lng: -0.1276 };

  return (
    <LocationMapComponent
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
      center={defaultCenter}
      locations={locations}
    />
  );
};

export const Default = LocationMap;
