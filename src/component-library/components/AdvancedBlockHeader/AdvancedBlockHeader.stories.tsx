import React from 'react';
import AdvancedBlockHeader from './AdvancedBlockHeader';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';
import TextButton from '../../core-components/TextButton/TextButton';
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AdvancedBlockHeader> = {
  title: 'components/AdvancedBlockHeader',
  component: AdvancedBlockHeader,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof AdvancedBlockHeader> = {
  args: {
    subtitle: <Text variation={'subheading-1'}>Sub title</Text>,
    title: <Text variation={'display-2'}>Advanced block</Text>,
    body: (
      <Text variation={'body-large'}>
        Quis laboris proident sint amet id cillum do dolor in tempor est.
        Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
        laborum et culpa minim. Commodo ex laboris pariatur labore nostrud
        dolore ad sit occaecat. Qui ipsum in minim. Nostrud duis cupidatat sunt
        lorem ut.
      </Text>
    ),
    ctas: (
      <>
        <Button size={'small'} variation={'full'}>
          <a href="#">
            <span>
              Click <strong>me</strong>
            </span>
          </a>
        </Button>
        <TextButton>
          <a href="#">
            <span>
              Click <strong>me</strong>
            </span>
          </a>
        </TextButton>
      </>
    ),
  },
};
