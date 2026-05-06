import React from 'react';
import OffsetTextBlock from './OffsetTextBlock';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof OffsetTextBlock> = {
  title: 'careers/OffsetTextBlock',
  component: OffsetTextBlock,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof OffsetTextBlock> = {
  args: {
    theme: 'A-HCA-White',
    title: (
      <Text tag="h2" variation="display-1">
        Caring for patients is more than a job: it&apos;s a&nbsp;
        <Text tag="span" variation="decorative">
          calling.
        </Text>
      </Text>
    ),
    bodyCopy: (
      <Text variation="body-large" tag="p">
        Life with us means taking pride in your team and delivering the highest
        quality care. We&apos;ll support your ongoing learning in an environment
        that features advanced equipment and practices, one of the best
        colleague-to-patient ratios in the UK and varied, interesting work. As
        part of HCA US, one of the nation&apos;s leading providers of healthcare
        services, we can also promise that you&apos;ll learn from experts in
        every department and that your opportunities will be endless. With us,
        you&apos;ll be empowered to achieve more in your career, and more for
        our patients.
      </Text>
    ),
    ctas: (
      <Button size="large" variation="full">
        <a href="#">Working at HCA UK</a>
      </Button>
    ),
  },
};
