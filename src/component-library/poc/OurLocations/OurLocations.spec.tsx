import React from 'react';
import { render } from '@testing-library/react';
import OurLocations from './OurLocations';
import { OurLocationsProps } from './OurLocations.types';
import { OurLocationsRegionProps } from '../../components/OurLocationsRegion/OurLocationsRegion.types';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';
import Icons from '../../foundation/Icons/Icons';
import MapEngland from '../../assets/locations/map-england.png';
import LondonDesktopArea from '../../assets/locations/London.png';
import LondonMobileArea from '../../assets/locations/LondonMobile.png';
import ManchesterDesktopArea from '../../assets/locations/Manchester.png';
import ManchesterMobileArea from '../../assets/locations/ManchesterMobile.png';
import BirminghamDesktopArea from '../../assets/locations/Birmingham.png';
import BirminghamMobileArea from '../../assets/locations/BirminghamMobile.png';

const locations: OurLocationsRegionProps[] = [
  {
    id: 0,
    name: 'Locations across the UK',
    amount: '35',
    theme: 'B-HCA-Navy-Blue',
    area: { mobile: MapEngland },
    mapStyles: { transform: 'translateY(0) scale(1.1)' },
    cardStyles: { transform: 'translateY(-50%)' },
  },
  {
    id: 1,
    name: 'Locations across London',
    amount: '9',
    theme: 'H-HCA-Tangerine',
    area: { mobile: LondonMobileArea, desktop: LondonDesktopArea },
    mapStyles: { transform: 'translateY(-20%) scale(1.5)' },
    cardStyles: { transform: 'translateY(-55%) translateX(40%)' },
  },
  {
    id: 2,
    name: 'Locations across Manchester',
    amount: '2',
    theme: 'G-HCA-Orange',
    area: { mobile: ManchesterMobileArea, desktop: ManchesterDesktopArea },
    mapStyles: { transform: 'translateY(10%) translateX(15%) scale(1.7)' },
    cardStyles: { transform: 'translateY(-55%) translateX(0)' },
  },
  {
    id: 3,
    name: 'Location across Birmingham',
    amount: '1',
    theme: 'F-HCA-Fern',
    area: { mobile: BirminghamMobileArea, desktop: BirminghamDesktopArea },
    mapStyles: { transform: 'translateY(-5%) translateX(25%) scale(1.7)' },
    cardStyles: { transform: 'translateY(-35%) translateX(30%)' },
  },
];

const mockProps: OurLocationsProps = {
  subtitle: (
    <Text tag="h3" variation="subheading-1">
      our locations
    </Text>
  ),
  title: (
    <Text tag="h2" variation="display-2">
      The widest range of locations in the UK
    </Text>
  ),
  body: (
    <Text tag="p" variation="body-large">
      Quis laboris proident sint amet id cillum do dolor in tempor est.
      Exercitation aute sint tempor eu ut aliquip commodo enim nulla et laborum.
    </Text>
  ),
  cta: (
    <Button size="large" variation="full">
      <a href="#">
        <span>
          <Icons iconName={'iconSearch'} />
        </span>
        <span>
          Search all <strong>locations</strong>
        </span>
      </a>
    </Button>
  ),
  locations: locations,
};

describe('OurLocations', () => {
  it('Renders children from props', async () => {
    window.scrollTo = jest.fn();
    const { getByText } = render(<OurLocations {...mockProps} />);
    expect(getByText('The widest range of locations in the UK')).toBeVisible();
  });
});
