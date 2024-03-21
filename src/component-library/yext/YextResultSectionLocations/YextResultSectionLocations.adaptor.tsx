import React from 'react';
import Numbers from '../../components/Numbers/Numbers';
import Icons from '../../foundation/Icons/Icons';
import Text from '../../foundation/Text/Text';
import Image from 'next/image';
import YextResultSectionLocations from './YextResultSectionLocations';
import YextResultCardLocations from '../YextResultCardLocations/YextResultCardLocations';

interface YextSectionLocationsProps {
  variation?: 'stacked' | 'side-by-side';
  results?: unknown[];
}
const YextResultSectionLocationsAdaptor = (
  props: YextSectionLocationsProps
): JSX.Element => {
  const { variation = 'stacked' } = props;
  // TODO - unpack props to replace these static values once Yext type generation is available
  const cardPropsExample = {
    number: <Numbers number={<span>1</span>} />,
    image: (
      <Image
        src="/placeholders/couple-on-bench.jpeg"
        alt="couple on bench"
        width="140"
        height="140"
      />
    ),
    title: (
      <Text variation="heading-1">
        Golders Green Outpatients and Diagnostics Centre
      </Text>
    ),
    distance: <Text variation={'body-large'}>546.0 km</Text>,
    ctas: {
      button: <button>Learn more</button>,
      textButton: (
        <button>
          <Icons iconName="iconEmail"></Icons>Email us
        </button>
      ),
    },
    address: {
      icon: <Icons iconName={'iconPin'}></Icons>,
      text: (
        <Text variation="body-large" tag="span">
          Roman House, 296 Golders Green Road London NW11 9PY
        </Text>
      ),
    },
    phone: {
      icon: <Icons iconName="iconPhone"></Icons>,
      text: (
        <Text variation="body-large" tag="span">
          020 3993 1861
        </Text>
      ),
    },
    openingHours: {
      icon: <Icons iconName="iconPhone"></Icons>,
      text: (
        <Text variation="body-large" tag="span">
          <strong>Open Now.</strong> Closes at 20:00
        </Text>
      ),
    },
  };
  const locations = [
    {
      id: '1',
      card: (
        <YextResultCardLocations
          {...cardPropsExample}
          number={<Numbers number={<span>1</span>} />}
          variation={variation}
        />
      ),
      center: {
        lat: 51.52036,
        lng: -0.14797,
      },
    },
    {
      id: '2',
      card: (
        <YextResultCardLocations
          {...cardPropsExample}
          number={<Numbers number={<span>2</span>} />}
          variation={variation}
        />
      ),
      center: {
        lat: 51.506359,
        lng: -0.08786,
      },
    },
    {
      id: '3',
      card: (
        <YextResultCardLocations
          {...cardPropsExample}
          number={<Numbers number={<span>3</span>} />}
          variation={variation}
        />
      ),
      center: {
        lat: 51.53204,
        lng: -0.16985,
      },
    },
  ];
  const args = {
    apiKey: 'AIzaSyCJu0aTsRYKOQVPsETLeTvI84jxDZjRGAg',
    center: {
      lat: 51.5072,
      lng: 0.1276,
    },
    locations,
    title: 'Locations',
  };
  return <YextResultSectionLocations {...args} variation={variation} />;
};

export default YextResultSectionLocationsAdaptor;
