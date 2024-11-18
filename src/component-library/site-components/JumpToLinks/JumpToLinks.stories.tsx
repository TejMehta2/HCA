import React from 'react';
import JumpToLinks, { JumpToLink } from './JumpToLinks';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import Themes from '../../foundation/Themes/Themes';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof JumpToLinks> = {
  title: 'site-components/JumpToLinks',
  component: JumpToLinks,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof JumpToLinks> = {
  args: {
    heading: <Text variation="body-medium-medium">Navigate to</Text>,
    children: (
      <>
        <JumpToLink>
          <a href="#">
            <img src="/placeholders/taking pulse.jpeg" alt="" />
            <span>Cancer care</span>
          </a>
        </JumpToLink>
        <JumpToLink>
          <a href="#">
            <img src="/placeholders/taking pulse.jpeg" alt="" />
            <span>Hereditary genetic testing</span>
          </a>
        </JumpToLink>
        <JumpToLink>
          <a href="#">
            <img src="/placeholders/taking pulse.jpeg" alt="" />
            <span>Cancer surgery</span>
          </a>
        </JumpToLink>
        <JumpToLink>
          <a href="#">
            <img src="/placeholders/taking pulse.jpeg" alt="" />
            <span>Systemic anti-cancer therapies</span>
          </a>
        </JumpToLink>
        <JumpToLink>
          <a href="#">
            <img src="/placeholders/taking pulse.jpeg" alt="" />
            <span>Interventional radiology</span>
          </a>
        </JumpToLink>
        <JumpToLink>
          <a href="#">
            <img src="/placeholders/taking pulse.jpeg" alt="" />
            <span>Clinical trials</span>
          </a>
        </JumpToLink>
        <JumpToLink>
          <a href="#">
            <img src="/placeholders/taking pulse.jpeg" alt="" />
            <span>Wellbeing & Support</span>
          </a>
        </JumpToLink>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <Themes theme="A-HCA-White">
        <Story />
      </Themes>
    ),
  ],
};
