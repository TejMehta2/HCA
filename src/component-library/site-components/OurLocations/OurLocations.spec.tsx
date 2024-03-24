import React from 'react';
import { render } from '@testing-library/react';
import OurLocations from './OurLocations';
import { OurLocationsProps } from './OurLocations.types';
import CardLocation from '../../components/CardLocation/CardLocation';
import Button from '../../core-components/Button/Button';
import Icons from '../../foundation/Icons/Icons';
import Text from '../../foundation/Text/Text';

const mockProps: OurLocationsProps = {
  mapAspectRatio: 3000 / 3444,
  headerProps: {
    subtitle: (
      <Text tag="h3" variation="subheading-1">
        our locations
      </Text>
    ),
    title: (
      <Text tag="h2" variation="display-3">
        Exceptional Healthcare across the UK
      </Text>
    ),
    body: (
      <Text tag="p" variation="body-large">
        Quis laboris proident sint amet id cillum do dolor in tempor est.
        Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
        laborum.
      </Text>
    ),
    ctas: (
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
  },
  locations: [
    {
      mapX: 1763 / 3000,
      mapY: 2115 / 3444,
      mapScale: 0.5,
      theme: 'B-HCA-Navy-Blue',
      card: (
        <CardLocation
          quantity={
            <Text tag="p" variation="display-1">
              72
            </Text>
          }
          title={
            <Text tag="p" variation="heading-2">
              Locations across the UK
            </Text>
          }
          subtitle={
            <Text tag="p" variation={'subheading-2'}>
              Scroll down to explore
            </Text>
          }
          icon={<Icons iconName={'iconArrowDown'} />}
        />
      ),
    },
    {
      mapX: 1980 / 3000,
      mapY: 2930 / 3444,
      mapScale: 0.8,
      theme: 'D-HCA-Teal',
      card: (
        <CardLocation
          quantity={
            <Text tag="p" variation="display-1">
              64
            </Text>
          }
          title={
            <Text tag="p" variation="heading-2">
              Locations across London
            </Text>
          }
          cta={
            <a href="#">
              <span>
                View <strong>all</strong>
              </span>
            </a>
          }
        />
      ),
    },
    {
      mapX: 1640 / 3000,
      mapY: 2180 / 3444,
      mapScale: 0.8,
      theme: 'G-HCA-Orange',
      card: (
        <CardLocation
          quantity={
            <Text tag="p" variation="display-1">
              5
            </Text>
          }
          title={
            <Text tag="p" variation="heading-2">
              Locations in Cheshire & Manchester
            </Text>
          }
          cta={
            <a href="#">
              <span>
                View <strong>all</strong>
              </span>
            </a>
          }
        />
      ),
    },
    {
      mapX: 1650 / 3000,
      mapY: 2530 / 3444,
      mapScale: 0.8,
      theme: 'F-HCA-Fern',
      card: (
        <CardLocation
          quantity={
            <Text tag="p" variation="display-1">
              2
            </Text>
          }
          title={
            <Text tag="p" variation="heading-2">
              Locations in Birmingham
            </Text>
          }
          cta={
            <a href="#">
              <span>
                View <strong>all</strong>
              </span>
            </a>
          }
        />
      ),
    },
    {
      mapX: 1380 / 3000,
      mapY: 1315 / 3444,
      mapScale: 0.8,
      theme: 'H-HCA-Tangerine',
      card: (
        <CardLocation
          quantity={
            <Text tag="p" variation="display-1">
              1
            </Text>
          }
          title={
            <Text tag="p" variation="heading-2">
              Location in Glasgow
            </Text>
          }
          cta={
            <a href="#">
              <span>
                View <strong>all</strong>
              </span>
            </a>
          }
        />
      ),
    },
  ],
};

describe('OurLocations', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<OurLocations {...mockProps} />);
    expect(getByText('Exceptional Healthcare across the UK')).toBeVisible();
  });
});
