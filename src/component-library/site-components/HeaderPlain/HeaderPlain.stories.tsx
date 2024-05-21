import React from 'react';
import HeaderPlain from './HeaderPlain';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import SearchBar from '../../components/SearchBar/SearchBar';
import Filters from '../Filters/Filters';
import Sorting from '../../components/Sorting/Sorting';
import Checkboxes from '../../core-components/Checkboxes/Checkboxes';
import Checkbox from '../../core-components/Checkbox/Checkbox';
import Themes from '../../foundation/Themes/Themes';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof HeaderPlain> = {
  title: 'site-components/HeaderPlain',
  component: HeaderPlain,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <Themes theme={'D-HCA-Teal'}>
        <Story />
      </Themes>
    ),
  ],
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof HeaderPlain> = {
  args: {
    subheading: (
      <Text tag="h3" variation="subheading-1">
        Optional meta title
      </Text>
    ),
    heading: (
      <Text tag="h1" variation="display-1">
        News & articles about healthcare
      </Text>
    ),
    description: (
      <p>
        Quis laboris proident sint amet id cillum do dolor in tempor est.
        Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
        laborum et culpa minim. Commodo ex laboris pariatur labore nostrud
        dolore.
      </p>
    ),
  },
};

export const WithSubtitle: StoryObj<typeof HeaderPlain> = {
  args: {
    heading: (
      <Text tag="h1" variation="display-1">
        News & articles about healthcare
      </Text>
    ),
    subtitle: (
      <Text tag="h2" variation="subheading-1">
        Optional subtitle
      </Text>
    ),
    description: (
      <p>
        Quis laboris proident sint amet id cillum do dolor in tempor est.
        Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
        laborum et culpa minim. Commodo ex laboris pariatur labore nostrud
        dolore.
      </p>
    ),
  },
};

export const DefaultWithSearch: StoryObj<typeof HeaderPlain> = {
  args: {
    subheading: (
      <Text tag="h3" variation="subheading-1">
        Optional meta title
      </Text>
    ),
    children: <SearchBar placeholder="" />,
    heading: (
      <Text tag="h1" variation="display-1">
        News & articles about healthcare
      </Text>
    ),
    description: (
      <p>
        Quis laboris proident sint amet id cillum do dolor in tempor est.
        Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
        laborum et culpa minim. Commodo ex laboris pariatur labore nostrud
        dolore.
      </p>
    ),
  },
};

export const DefaultWithSearchAndFilters: StoryObj<typeof HeaderPlain> = {
  args: {
    subheading: (
      <Text tag="h3" variation="subheading-1">
        Optional meta title
      </Text>
    ),
    children: (
      <SearchBar placeholder="">
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
        />
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
          }}
        />
      </SearchBar>
    ),
    heading: (
      <Text tag="h1" variation="display-1">
        News & articles about healthcare
      </Text>
    ),
    description: (
      <p>
        Quis laboris proident sint amet id cillum do dolor in tempor est.
        Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
        laborum et culpa minim. Commodo ex laboris pariatur labore nostrud
        dolore.
      </p>
    ),
  },
};
