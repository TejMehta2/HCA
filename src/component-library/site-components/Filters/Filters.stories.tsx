import React from 'react';
import Filters from './Filters';
import type { Meta, StoryObj } from '@storybook/react';

import Checkbox from '../../core-components/Checkbox/Checkbox';
import Checkboxes from '../../core-components/Checkboxes/Checkboxes';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Filters> = {
  title: 'site-components/Filters',
  component: Filters,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof Filters> = {
  args: {
    resultsCount: 20,
    filters: [
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
            <Checkbox
              id="3"
              value="portland"
              name="locations"
              label="Portland Hospital"
            ></Checkbox>
            <Checkbox
              id="4"
              value="lister"
              name="locations"
              label="Lister Hospital"
            ></Checkbox>
            <Checkbox
              id="5"
              value="wellington-hospital"
              name="locations"
              label="Wellington Hospital"
            ></Checkbox>
            <Checkbox
              id="6"
              value="harley-street"
              name="locations"
              label="Harley Street Clinic"
            ></Checkbox>
            <Checkbox
              id="7"
              value="harley-street"
              name="locations"
              label="Harley Street Clinic"
            ></Checkbox>
            <Checkbox
              id="8"
              value="harley-street"
              name="locations"
              label="Harley Street Clinic"
            ></Checkbox>
          </Checkboxes>
        ),
      },
      {
        title: 'Locations',
        contentVariation: 'filters',
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
            <Checkbox
              id="3"
              value="portland"
              name="locations"
              label="Portland Hospital"
            ></Checkbox>
            <Checkbox
              id="4"
              value="lister"
              name="locations"
              label="Lister Hospital"
            ></Checkbox>
            <Checkbox
              id="5"
              value="wellington-hospital"
              name="locations"
              label="Wellington Hospital"
            ></Checkbox>
            <Checkbox
              id="6"
              value="harley-street"
              name="locations"
              label="Harley Street Clinic"
            ></Checkbox>
            <Checkbox
              id="7"
              value="harley-street"
              name="locations"
              label="Harley Street Clinic"
            ></Checkbox>
            <Checkbox
              id="8"
              value="harley-street"
              name="locations"
              label="Harley Street Clinic"
            ></Checkbox>
          </Checkboxes>
        ),
      },
      {
        title: 'Locations',
        contentVariation: 'filters',
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
            <Checkbox
              id="3"
              value="portland"
              name="locations"
              label="Portland Hospital"
            ></Checkbox>
            <Checkbox
              id="4"
              value="lister"
              name="locations"
              label="Lister Hospital"
            ></Checkbox>
            <Checkbox
              id="5"
              value="wellington-hospital"
              name="locations"
              label="Wellington Hospital"
            ></Checkbox>
            <Checkbox
              id="6"
              value="harley-street"
              name="locations"
              label="Harley Street Clinic"
            ></Checkbox>
            <Checkbox
              id="7"
              value="harley-street"
              name="locations"
              label="Harley Street Clinic"
            ></Checkbox>
            <Checkbox
              id="8"
              value="harley-street"
              name="locations"
              label="Harley Street Clinic"
            ></Checkbox>
          </Checkboxes>
        ),
      },
      {
        title: 'Locations',
        contentVariation: 'filters',
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
            <Checkbox
              id="3"
              value="portland"
              name="locations"
              label="Portland Hospital"
            ></Checkbox>
            <Checkbox
              id="4"
              value="lister"
              name="locations"
              label="Lister Hospital"
            ></Checkbox>
            <Checkbox
              id="5"
              value="wellington-hospital"
              name="locations"
              label="Wellington Hospital"
            ></Checkbox>
            <Checkbox
              id="6"
              value="harley-street"
              name="locations"
              label="Harley Street Clinic"
            ></Checkbox>
            <Checkbox
              id="7"
              value="harley-street"
              name="locations"
              label="Harley Street Clinic"
            ></Checkbox>
            <Checkbox
              id="8"
              value="harley-street"
              name="locations"
              label="Harley Street Clinic"
            ></Checkbox>
          </Checkboxes>
        ),
      },
      {
        title: 'Locations',
        contentVariation: 'filters',
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
            <Checkbox
              id="3"
              value="portland"
              name="locations"
              label="Portland Hospital"
            ></Checkbox>
            <Checkbox
              id="4"
              value="lister"
              name="locations"
              label="Lister Hospital"
            ></Checkbox>
            <Checkbox
              id="5"
              value="wellington-hospital"
              name="locations"
              label="Wellington Hospital"
            ></Checkbox>
            <Checkbox
              id="6"
              value="harley-street"
              name="locations"
              label="Harley Street Clinic"
            ></Checkbox>
            <Checkbox
              id="7"
              value="harley-street"
              name="locations"
              label="Harley Street Clinic"
            ></Checkbox>
            <Checkbox
              id="8"
              value="harley-street"
              name="locations"
              label="Harley Street Clinic"
            ></Checkbox>
          </Checkboxes>
        ),
      },
      {
        title: 'Locations',
        contentVariation: 'filters',
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
            <Checkbox
              id="3"
              value="portland"
              name="locations"
              label="Portland Hospital"
            ></Checkbox>
            <Checkbox
              id="4"
              value="lister"
              name="locations"
              label="Lister Hospital"
            ></Checkbox>
            <Checkbox
              id="5"
              value="wellington-hospital"
              name="locations"
              label="Wellington Hospital"
            ></Checkbox>
            <Checkbox
              id="6"
              value="harley-street"
              name="locations"
              label="Harley Street Clinic"
            ></Checkbox>
            <Checkbox
              id="7"
              value="harley-street"
              name="locations"
              label="Harley Street Clinic"
            ></Checkbox>
            <Checkbox
              id="8"
              value="harley-street"
              name="locations"
              label="Harley Street Clinic"
            ></Checkbox>
          </Checkboxes>
        ),
      },
      {
        title: 'Locations',
        contentVariation: 'filters',
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
            <Checkbox
              id="3"
              value="portland"
              name="locations"
              label="Portland Hospital"
            ></Checkbox>
            <Checkbox
              id="4"
              value="lister"
              name="locations"
              label="Lister Hospital"
            ></Checkbox>
            <Checkbox
              id="5"
              value="wellington-hospital"
              name="locations"
              label="Wellington Hospital"
            ></Checkbox>
            <Checkbox
              id="6"
              value="harley-street"
              name="locations"
              label="Harley Street Clinic"
            ></Checkbox>
          </Checkboxes>
        ),
      },
      {
        title: 'Locations',
        contentVariation: 'filters',
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
            <Checkbox
              id="3"
              value="portland"
              name="locations"
              label="Portland Hospital"
            ></Checkbox>
            <Checkbox
              id="4"
              value="lister"
              name="locations"
              label="Lister Hospital"
            ></Checkbox>
            <Checkbox
              id="5"
              value="wellington-hospital"
              name="locations"
              label="Wellington Hospital"
            ></Checkbox>
            <Checkbox
              id="6"
              value="harley-street"
              name="locations"
              label="Harley Street Clinic"
            ></Checkbox>
          </Checkboxes>
        ),
      },
      {
        title: 'Locations',
        contentVariation: 'filters',
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
            <Checkbox
              id="3"
              value="portland"
              name="locations"
              label="Portland Hospital"
            ></Checkbox>
            <Checkbox
              id="4"
              value="lister"
              name="locations"
              label="Lister Hospital"
            ></Checkbox>
            <Checkbox
              id="5"
              value="wellington-hospital"
              name="locations"
              label="Wellington Hospital"
            ></Checkbox>
            <Checkbox
              id="6"
              value="harley-street"
              name="locations"
              label="Harley Street Clinic"
            ></Checkbox>
          </Checkboxes>
        ),
      },
      {
        title: 'Locations',
        contentVariation: 'filters',
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
            <Checkbox
              id="3"
              value="portland"
              name="locations"
              label="Portland Hospital"
            ></Checkbox>
            <Checkbox
              id="4"
              value="lister"
              name="locations"
              label="Lister Hospital"
            ></Checkbox>
            <Checkbox
              id="5"
              value="wellington-hospital"
              name="locations"
              label="Wellington Hospital"
            ></Checkbox>
            <Checkbox
              id="6"
              value="harley-street"
              name="locations"
              label="Harley Street Clinic"
            ></Checkbox>
          </Checkboxes>
        ),
      },

      {
        title: 'Locations',
        contentVariation: 'filters',
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
            <Checkbox
              id="3"
              value="portland"
              name="locations"
              label="Portland Hospital"
            ></Checkbox>
            <Checkbox
              id="4"
              value="lister"
              name="locations"
              label="Lister Hospital"
            ></Checkbox>
            <Checkbox
              id="5"
              value="wellington-hospital"
              name="locations"
              label="Wellington Hospital"
            ></Checkbox>
            <Checkbox
              id="6"
              value="harley-street"
              name="locations"
              label="Harley Street Clinic"
            ></Checkbox>
          </Checkboxes>
        ),
      },
    ],
  },
};
