import React from 'react';
import SearchWrapper from './SearchWrapper';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import HeaderPlain from '../HeaderPlain/HeaderPlain';
import SearchBar from '../../components/SearchBar/SearchBar';
import {
  BLOG_MOCK_VALUES,
  SERVICE_LINES_MOCK_VALUES,
  LOCATIONS_MOCK_VALUES,
} from './MockData';
import Filters from '../Filters/Filters';
import Sorting from '../../components/Sorting/Sorting';
import Checkboxes from '../../core-components/Checkboxes/Checkboxes';
import Checkbox from '../../core-components/Checkbox/Checkbox';
import CardGrid from '../CardGrid/CardGrid';
import Pagination from '../../core-components/Pagination/Pagination';
import LocationMap from '../../components/LocationMap/LocationMap';
import { Default as locationMapProps } from '../../components/LocationMap/LocationMap.stories';
import { LocationMapProps } from '../../components/LocationMap/LocationMap.types';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof SearchWrapper> = {
  title: 'site-components/SearchWrapper',
  component: SearchWrapper,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Default: StoryObj<typeof SearchWrapper> = {
  args: {
    header: (
      <HeaderPlain
        subheading={<Text variation={'subheading-1'}>our HCA blog</Text>}
        heading={
          <Text variation={'display-2'}>News & articles about healthcare </Text>
        }
        search={<SearchBar placeholder="" />}
        theme={'A-HCA-White'}
      >
        <Text variation="body-large">
          Quis laboris proident sint amet id cillum do dolor in tempor est.
          Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
          laborum et culpa minim. Commodo ex laboris pariatur labore nostrud
          dolore.
        </Text>
      </HeaderPlain>
    ),

    searchDetail: (
      <Text tag="h2" variation="heading-1">
        45 articles including ‘Cardiac care’
      </Text>
    ),
    showing: (
      <Text tag="p" variation="body-medium">
        Showing 1-12
      </Text>
    ),
    children: (
      <>
        <CardGrid theme="A-HCA-White">
          {BLOG_MOCK_VALUES.firstPageContent}
        </CardGrid>
        <Pagination
          pageCount={BLOG_MOCK_VALUES.pageCount}
          callback={console.log}
        />
      </>
    ),
  },
};

export const ServiceLines: StoryObj<typeof SearchWrapper> = {
  args: {
    header: (
      <HeaderPlain
        heading={<Text variation={'display-2'}>All Service Lines</Text>}
        search={<SearchBar placeholder="" />}
        theme={'I-HCA-Goldenrod'}
        filters={
          <Filters
            resultsCount={40}
            filters={[
              {
                contentVariation: 'filters',
                title: 'Locations',
                children: (
                  <Checkboxes>
                    <Checkbox
                      id="1"
                      value="Christie"
                      name="locations"
                      label="Christie Hospital"
                    ></Checkbox>
                    <Checkbox
                      id="2"
                      value="london-bridge"
                      name="locations"
                      label="London Bridge Hospital"
                    ></Checkbox>
                  </Checkboxes>
                ),
              },
            ]}
          ></Filters>
        }
        sort={
          <Sorting
            options={[
              {
                id: 'option-a',
                defaultChecked: true,
                labelText: 'Alphabetically (A to Z)',
              },
              {
                id: 'option-b',
                labelText: 'Alphabetically (Z to A)',
              },
              { id: 'option-c', labelText: 'Price (Low to High)' },
              {
                id: 'option-d',
                labelText: 'Price (High to Low)',
              },
            ]}
            onChange={(event) => {
              const target = event.target as HTMLInputElement;
              console.log(target.value);
              console.log(target.checked);
            }}
          />
        }
      ></HeaderPlain>
    ),

    theme: 'I-HCA-Goldenrod',

    searchDetail: (
      <Text tag="h2" variation="heading-1">
        64 service lines
      </Text>
    ),

    children: (
      <>
        <CardGrid theme="A-HCA-White">
          {SERVICE_LINES_MOCK_VALUES.firstPageContent}
        </CardGrid>
        <Pagination
          pageCount={SERVICE_LINES_MOCK_VALUES.pageCount}
          callback={console.log}
        />
      </>
    ),
  },
};

export const OrthopaedicTreatments: StoryObj<typeof SearchWrapper> = {
  args: {
    header: (
      <HeaderPlain
        heading={
          <Text variation={'display-2'}>All orthopaedic treatments</Text>
        }
        search={<SearchBar placeholder="" />}
        theme={'A-HCA-White'}
        filters={
          <Filters
            resultsCount={40}
            filters={[
              {
                contentVariation: 'filters',
                title: 'Locations',
                children: (
                  <Checkboxes>
                    <Checkbox
                      id="1"
                      value="Christie"
                      name="locations"
                      label="Christie Hospital"
                    ></Checkbox>
                    <Checkbox
                      id="2"
                      value="london-bridge"
                      name="locations"
                      label="London Bridge Hospital"
                    ></Checkbox>
                  </Checkboxes>
                ),
              },
            ]}
          ></Filters>
        }
        sort={
          <Sorting
            options={[
              {
                id: 'option-a',
                defaultChecked: true,
                labelText: 'Alphabetically (A to Z)',
              },
              {
                id: 'option-b',
                labelText: 'Alphabetically (Z to A)',
              },
              { id: 'option-c', labelText: 'Price (Low to High)' },
              {
                id: 'option-d',
                labelText: 'Price (High to Low)',
              },
            ]}
            onChange={(event) => {
              const target = event.target as HTMLInputElement;
              console.log(target.value);
              console.log(target.checked);
            }}
          />
        }
      >
        <Text variation="body-large">
          Quis laboris proident sint amet id cillum do dolor in tempor est.
          Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
          laborum et culpa minim. Commodo ex laboris pariatur labore nostrud
          dolore.
        </Text>
      </HeaderPlain>
    ),

    theme: 'A-HCA-White',

    searchDetail: (
      <Text tag="h2" variation="heading-1">
        64 service lines
      </Text>
    ),
    showing: (
      <Text tag="p" variation="body-medium">
        Showing 1-12
      </Text>
    ),
    children: (
      <>
        <CardGrid theme="A-HCA-White">
          {SERVICE_LINES_MOCK_VALUES.firstPageContent}
        </CardGrid>
        <Pagination
          pageCount={SERVICE_LINES_MOCK_VALUES.pageCount}
          callback={console.log}
        />
      </>
    ),
  },
};

export const LocationsList: StoryObj<typeof SearchWrapper> = {
  args: {
    header: (
      <HeaderPlain
        heading={<Text variation={'display-2'}>Find a location</Text>}
        search={<SearchBar placeholder="" />}
        theme={'H-HCA-Tangerine'}
        filters={
          <Filters
            resultsCount={40}
            filters={[
              {
                contentVariation: 'filters',
                title: 'Locations',
                children: (
                  <Checkboxes>
                    <Checkbox
                      id="1"
                      value="Christie"
                      name="locations"
                      label="Christie Hospital"
                    ></Checkbox>
                    <Checkbox
                      id="2"
                      value="london-bridge"
                      name="locations"
                      label="London Bridge Hospital"
                    ></Checkbox>
                  </Checkboxes>
                ),
              },
            ]}
          ></Filters>
        }
        sort={
          <Sorting
            options={[
              {
                id: 'option-a',
                defaultChecked: true,
                labelText: 'Alphabetically (A to Z)',
              },
              {
                id: 'option-b',
                labelText: 'Alphabetically (Z to A)',
              },
              { id: 'option-c', labelText: 'Price (Low to High)' },
              {
                id: 'option-d',
                labelText: 'Price (High to Low)',
              },
            ]}
            onChange={(event) => {
              const target = event.target as HTMLInputElement;
              console.log(target.value);
              console.log(target.checked);
            }}
          />
        }
      >
        <Text variation="body-large">
          Quis laboris proident sint amet id cillum do dolor in tempor est.
          Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
          laborum et culpa minim. Commodo ex laboris pariatur labore nostrud
          dolore.
        </Text>
      </HeaderPlain>
    ),

    theme: 'A-HCA-White',

    searchDetail: (
      <Text tag="h2" variation="heading-1">
        64 service lines
      </Text>
    ),
    showing: (
      <Text tag="p" variation="body-medium">
        Showing 1-12
      </Text>
    ),
    tabbedResults: [
      {
        tab: { icon: 'iconGrid', label: 'Grid view' },
        tabContent: (
          <>
            <CardGrid theme="A-HCA-White">
              {LOCATIONS_MOCK_VALUES.firstPageContent}
            </CardGrid>
            <Pagination
              pageCount={LOCATIONS_MOCK_VALUES.pageCount}
              callback={console.log}
            />
          </>
        ),
      },
      {
        tab: { icon: 'iconPin', label: 'Map view' },
        tabContent: (
          <LocationMap {...(locationMapProps.args as LocationMapProps)} />
        ),
      },
    ],
  },
};
