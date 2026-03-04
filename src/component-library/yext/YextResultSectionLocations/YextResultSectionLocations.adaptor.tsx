import React from 'react';
import Numbers from '../../components/Numbers/Numbers';
import Icons from '../../foundation/Icons/Icons';
import Text from '../../foundation/Text/Text';
import Image from 'next/image';
import YextResultSectionLocationsVertical from './YextResultSectionLocationsVertical';
import YextResultSectionLocationsUniversal from './YextResultSectionLocationsUniversal';
import YextResultCardLocations from '../YextResultCardLocations/YextResultCardLocations';
import HealthcareFacility, {
  Hours,
  DayHour,
} from '../../types/yext/healthcare_facilities';
import { Result } from '@yext/search-headless-react';

interface YextSectionLocationsProps {
  variation?: 'stacked' | 'side-by-side';
  results?: Result<HealthcareFacility>[];
  c_uRL?: string;
}
type weekdayType = keyof Hours;
const weekday: weekdayType[] = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

const YextResultSectionLocationsAdaptor = (
  props: YextSectionLocationsProps
): JSX.Element => {
  const { variation = 'stacked', results } = props;
  const newLocations = results?.map((result, index) => {
    const {
      address,
      name,
      mainPhone,
      yextDisplayCoordinate,
      closed,
      hours,
      c_heroImage,
      c_abstractImage,
      c_pageImage,
      googlePlaceId,
      c_uRL,
      c_abstractTitle,
      c_pageTitle,
    } = result.rawData;

    const yextImage = c_heroImage;

    const sitecoreImage = c_abstractImage || c_pageImage;

    const resultTitle = c_abstractTitle || c_pageTitle || name || '';

    const displayImage =
      name && yextImage?.url
        ? {
            alt: yextImage.alternateText || '',
            src: yextImage?.url,
            width: yextImage?.width,
            height: yextImage?.height,
          }
        : name && sitecoreImage
          ? {
              alt: name,
              src: sitecoreImage,
              width: 480,
              height: 384,
            }
          : undefined;

    const id = (index + 1).toString();

    const currentDay = new Date().getDay();

    let hoursText = '';

    if (hours) {
      try {
        const openingClosingTimes = hours[weekday[currentDay]] as DayHour;
        if (closed) {
          hoursText = 'Opens at ' + openingClosingTimes.openIntervals![0].start;
        } else if (openingClosingTimes.openIntervals![0].end) {
          hoursText = 'Closes at ' + openingClosingTimes.openIntervals![0].end;
        } else {
          hoursText = 'Open 24h';
        }
      } catch {}
    }

    const coordinates =
      result.rawData.geocodedCoordinate || result.rawData.displayCoordinate;
    const cardProps = {
      number: <Numbers number={<span>{id}</span>} />,
      image: displayImage ? <Image {...displayImage} /> : undefined,
      title: (
        <Text variation="heading-1">
          {c_uRL ? <a href={c_uRL}>{resultTitle}</a> : resultTitle}
        </Text>
      ),
      distance: (
        <Text variation={'body-large'}>
          {Math.round(Number(result.distance) / 100) / 10}km
        </Text>
      ),
      ctas: {
        button: (
          <a href={'tel:' + mainPhone}>
            <Icons iconName="iconPhone" />
            Call
          </a>
        ),
        textButton:
          coordinates || googlePlaceId ? (
            googlePlaceId ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://maps.google.com/?q=place_id:${googlePlaceId}`}
              >
                <Icons iconName="iconRedo" />
                Get directions
              </a>
            ) : (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://maps.google.com/?q=${result.rawData.geocodedCoordinate?.latitude},${result.rawData.geocodedCoordinate?.longitude}`}
              >
                <Icons iconName="iconRedo" />
                Get directions
              </a>
            )
          ) : undefined,
      },
      address: {
        icon: <Icons iconName={'iconPin'}></Icons>,
        text: address && (
          <Text variation="body-large" tag="span">
            {address.line1}, {address.line2} {address.city} {address.postalCode}
          </Text>
        ),
      },
      phone: mainPhone
        ? {
            icon: <Icons iconName="iconPhone"></Icons>,
            text: (
              <Text variation="body-large" tag="span">
                {mainPhone}
              </Text>
            ),
          }
        : undefined,
      openingHours: hoursText?.length
        ? {
            icon: <Icons iconName="iconClock"></Icons>,
            text: (
              <Text variation="body-large" tag="span">
                <strong>{closed ? 'Closed.' : 'Open Now.'}</strong> {hoursText}
              </Text>
            ),
          }
        : undefined,
    };

    return {
      id: id,
      card: (
        <YextResultCardLocations
          {...cardProps}
          number={<Numbers number={<span>{id}</span>} />}
          variation={variation}
        />
      ),
      center: {
        lat: yextDisplayCoordinate?.latitude || 51.5072,
        lng: yextDisplayCoordinate?.longitude || 0.1276,
      },
    };
  });

  const args = {
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    center: {
      lat: 51.5072,
      lng: 0.1276,
    },
    locations: newLocations,
    title: 'Locations',
  };
  if (variation === 'side-by-side')
    return (
      <YextResultSectionLocationsVertical {...args} variation={variation} />
    );
  return (
    <YextResultSectionLocationsUniversal {...args} variation={variation} />
  );
};

export default YextResultSectionLocationsAdaptor;
