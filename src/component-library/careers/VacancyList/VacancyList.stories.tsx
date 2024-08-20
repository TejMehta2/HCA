import React from 'react';
import VacancyList from './VacancyList';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import Filters from '../../site-components/Filters/Filters';
import Checkbox from '../../core-components/Checkbox/Checkbox';
import Checkboxes from '../../core-components/Checkboxes/Checkboxes';
import YextResultCardCareers from '../../yext/YextResultCardCareers/YextResultCardCareers';
import Button from '../../core-components/Button/Button';
import Themes from '../../foundation/Themes/Themes';
import { Default as CardStory } from '../../yext/YextResultCardCareers/YextResultCardCareers.stories';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof VacancyList> = {
  title: 'careers/VacancyList',
  component: VacancyList,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },

  decorators: [
    (Story) => (
      <Themes theme={'A-HCA-White'}>
        <Story />
      </Themes>
    ),
  ],
};

const cardHeadings = [
  'EHR Registration Scheduling Change Lead',
  'Staff Nurse - Outpatients',
  'Senior Staff Nurse - Medical Ward',
  'Copywritter',
  'Taxation Accoutant',
  'Medical Laboratory Assistant (Grade 4)',
];
export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof VacancyList> = {
  args: {
    title: <Text variation={'display-3'}>Latest vacancies</Text>,
    filters: (
      <Filters
        buttonText={
          <span>
            <strong>Filter</strong> by
          </span>
        }
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
                />
                <Checkbox
                  id="2"
                  value="london-bridge"
                  name="locations"
                  label="London Bridge Hospital"
                />
              </Checkboxes>
            ),
          },
        ]}
      />
    ),
    cards: (
      <>
        {cardHeadings.map((title, index) => (
          <YextResultCardCareers
            key={index}
            {...CardStory.args}
            title={<Text variation={'heading-1'}>{title}</Text>}
          />
        ))}
      </>
    ),
    cta: (
      <Button variation="full" size="large">
        <a href="#">
          <span>
            View <strong>all 251 vacancies</strong>
          </span>
        </a>
      </Button>
    ),
  },
};
