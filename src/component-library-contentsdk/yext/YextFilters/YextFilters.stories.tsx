import React from 'react';
import YextFilters from './YextFilters';
import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from '../../core-components/Checkbox/Checkbox';
import Checkboxes from '../../core-components/Checkboxes/Checkboxes';
import Themes from '../../foundation/Themes/Themes';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof YextFilters> = {
  title: 'yext/YextFilters',
  component: YextFilters,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem' }}>
        <Themes theme={'A-HCA-White'}>
          <Story />
        </Themes>
      </div>
    ),
  ],
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof YextFilters> = {
  args: {
    filtersTitle: 'Tests, Scans, Treatments',
    children: (
      <Checkboxes>
        <Checkbox
          id="1"
          label="Conditions (20)"
          name="conditions"
          value="conditions"
        ></Checkbox>

        <Checkbox
          id="2"
          label="Tests (15)"
          name="tests"
          value="tests"
        ></Checkbox>

        <Checkbox
          id="3"
          label="Treatments (2)"
          name="tests"
          value="tests"
        ></Checkbox>
      </Checkboxes>
    ),
    resultsCount: 20,
  },
};
