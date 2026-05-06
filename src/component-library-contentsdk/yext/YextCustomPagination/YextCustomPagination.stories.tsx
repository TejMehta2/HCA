import React, { useEffect } from 'react';
import YextCustomPagination from './YextCustomPagination';
import type { Meta, StoryObj } from '@storybook/react';
import { useSearchActions } from '@yext/search-headless-react';
import Themes from '../../foundation/Themes/Themes';
import { VerticalResults } from '@yext/search-ui-react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof YextCustomPagination> = {
  title: 'yext/YextCustomPagination',
  component: YextCustomPagination,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof YextCustomPagination> = {
  args: {},
  decorators: [
    (Story) => {
      const MockSearchWrapper = () => {
        const searchActions = useSearchActions();
        useEffect(() => {
          searchActions.setVertical('healthcare_professionals');
          searchActions.setVerticalLimit(5);
          searchActions.executeVerticalQuery();
        }, [searchActions]);
        return <></>;
      };

      return (
        <Themes theme={'A-HCA-White'}>
          <Story />
          <MockSearchWrapper />
          <VerticalResults CardComponent={() => <></>} />
        </Themes>
      );
    },
  ],
};
