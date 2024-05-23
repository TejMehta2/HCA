import React, { FormEvent } from 'react';
import SelectField from './SelectField';
import type { Meta, StoryObj } from '@storybook/react';
import Themes from '../../../../foundation/Themes/Themes';
// import TextField from '../TextField/TextField';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof SelectField> = {
  title: 'core-components/form/basic/SelectField',
  component: SelectField,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Default: StoryObj<typeof SelectField> = {
  args: {
    id: 'select1',
    label: 'Select field label',
    placeholder: 'Please select',
    helpText: 'Helper text',
    options: [
      {
        text: 'Option 1',
      },
      {
        text: 'Option 2',
      },
      {
        text: 'Option 3',
      },
      {
        text: 'Option 4',
      },
      {
        text: 'Option 5',
      },
      {
        text: 'Option 6',
      },
      {
        text: 'Option 7',
      },
      {
        text: 'Option 8',
      },
    ],
  },
  decorators: [
    (Story) => (
      <Themes theme="A-HCA-White">
        <div style={{ maxWidth: '56rem', margin: 'auto' }}>
          <Story />
        </div>
      </Themes>
    ),
  ],
};

const dummySubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  alert('submitted');
};

export const WithForm: StoryObj<typeof SelectField> = {
  args: {
    id: 'select1',
    label: 'Select field label',
    placeholder: 'Please select',
    helpText: 'Helper text',
    options: [
      {
        text: 'Option 1',
      },
      {
        text: 'Option 2',
      },
      {
        text: 'Option 3',
      },
    ],
  },
  decorators: [
    (Story) => (
      <Themes theme="A-HCA-White">
        <div style={{ maxWidth: '56rem', margin: 'auto' }}>
          <form onSubmit={dummySubmit}>
            <Story />
            <button>submit</button>
          </form>
        </div>
      </Themes>
    ),
  ],
};
