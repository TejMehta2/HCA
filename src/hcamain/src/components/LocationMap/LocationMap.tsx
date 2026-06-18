import React from 'react';
import {
  Text as JssText,
  Field,
  ComponentRendering,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';
import LocationMapComponent from '@component-library/components/LocationMap/LocationMap';
import CardMap from '@component-library/components/CardMap/CardMap';
import Text from '@component-library/foundation/Text/Text';
import Icons from '@component-library/foundation/Icons/Icons';
import Params from 'src/types/params';

type PageLocation = {
  lat?: { value?: string };
  lng?: { value?: string };
  title?: { value?: string };
  addressLine1?: { value?: string };
  addressLine2?: { value?: string };
  city?: { value?: string };
  postCode?: { value?: string };
  url?: { path?: string; url?: string };
  directions?: { value?: string };
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

export type LocationMapProps = {
  params?: Params;
  fields?: Fields;
  rendering?: ComponentRendering;
};

const LocationMapDefault = (props: LocationMapProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext?.pageEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            Location Map please click to select datasource
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

const LocationMap = (props: LocationMapProps): JSX.Element => {
  const { t } = useI18n();

  if (!props.fields?.data?.item) {
    return <LocationMapDefault {...props} />;
  }

  const pages = props.fields.data.item.locations?.PagesList || [];

  const locations = pages.flatMap((p) => {
    const lat = Number(p.lat?.value) || 0;
    const lng = Number(p.lng?.value) || 0;
    if (lat === 0 && lng === 0) return [];

    const directionsUrl = p.directions?.value || undefined;
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
            {[
              p.addressLine1?.value,
              p.addressLine2?.value,
              p.city?.value,
              p.postCode?.value,
            ]
              .filter((v): v is string => Boolean(v))
              .join(', ')}
          </Text>
        }
        ctas={{
          button1: pageUrl ? (
            <a href={pageUrl}>
              <JssText
                field={props.fields?.data?.item?.cTACardText?.jsonValue}
              />
            </a>
          ) : undefined,
          button2: directionsUrl ? (
            <a href={directionsUrl}>
              <span>
                <JssText
                  field={props.fields?.data?.item?.getDirectionsText?.jsonValue}
                />
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

    return [{ center: { lat, lng }, card }];
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
