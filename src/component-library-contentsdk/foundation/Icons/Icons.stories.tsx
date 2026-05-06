import Icons from './Icons';
import type { Meta, StoryObj } from '@storybook/react';
import iconMap from './icon-map.generated';
import React from 'react';
import Themes from '../Themes/Themes';
import Text from '../Text/Text';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Icons> = {
  title: 'foundation/Icons',
  component: Icons,

  parameters: {
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof Icons> = {
  args: {
    iconName: 'icon3Lines',
  },
};

const IconList = () =>
  [...iconMap.keys()]
    .filter(
      (key) =>
        !key.toLowerCase().includes('star') &&
        !key.toLowerCase().includes('diamond')
    )
    .map((key) => (
      <div title={key} key={key}>
        <Icons iconName={key} />
      </div>
    ));

export const Themed: StoryObj<typeof Icons> = {
  args: {
    iconName: 'icon3Lines',
  },
  decorators: [
    () => (
      <Themes theme={'A-HCA-White'}>
        <Text>A-HCA-White Default</Text>
        <div
          style={{
            color: 'var(--text)',
            background: 'var(--background)',
            padding: '1rem',
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap',
          }}
        >
          <IconList />
        </div>
        <Text>A-HCA-White Inverse (e.g. button hover)</Text>
        <div
          style={{
            color: 'var(--background)',
            background: 'var(--text)',
            padding: '1rem',
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap',
          }}
        >
          <IconList />
        </div>
        <Text>C-HCA-Denim default</Text>
        <Themes theme={'C-HCA-Denim'}>
          <div
            style={{
              color: 'var(--text)',
              background: 'var(--background)',
              padding: '1rem',
              display: 'flex',
              gap: '0.5rem',
              flexWrap: 'wrap',
            }}
          >
            <IconList />
          </div>
        </Themes>
      </Themes>
    ),
  ],
};
