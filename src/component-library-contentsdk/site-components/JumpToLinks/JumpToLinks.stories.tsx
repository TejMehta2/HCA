import React from 'react';
import JumpToLinks, {
  JumpToAnchor,
  JumpToLink,
  JumpToTextLink,
} from './JumpToLinks';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import Themes from '../../foundation/Themes/Themes';
import Icons from '../../foundation/Icons/Icons';

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
export const Links: StoryObj<typeof JumpToLinks> = {
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

export const Anchors: StoryObj<typeof JumpToLinks> = {
  args: {
    heading: <Text variation="body-bold-medium">On this page</Text>,
    children: (
      <>
        <JumpToAnchor>
          <a href="#">
            <Icons iconName="iconArrowSmallDown" />
            <span>PCI at at HCA UK</span>
          </a>
        </JumpToAnchor>
        <JumpToAnchor>
          <a href="#">
            <Icons iconName="iconArrowSmallDown" />
            <span>Your patient journey</span>
          </a>
        </JumpToAnchor>
        <JumpToAnchor>
          <a href="#">
            <Icons iconName="iconArrowSmallDown" />
            <span>Facilities</span>
          </a>
        </JumpToAnchor>
        <JumpToAnchor>
          <a href="#">
            <Icons iconName="iconArrowSmallDown" />
            <span>Locations</span>
          </a>
        </JumpToAnchor>
        <JumpToAnchor>
          <a href="#">
            <Icons iconName="iconArrowSmallDown" />
            <span>Choose your consultant</span>
          </a>
        </JumpToAnchor>
        <JumpToAnchor>
          <a href="#">
            <Icons iconName="iconArrowSmallDown" />
            <span>FAQ</span>
          </a>
        </JumpToAnchor>
        <JumpToAnchor>
          <a href="#">
            <Icons iconName="iconArrowSmallDown" />
            <span>Patient Stories</span>
          </a>
        </JumpToAnchor>
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

export const TextLinkAnchors: StoryObj<typeof JumpToLinks> = {
  args: {
    variation: 'stacked',
    isSticky: true,
    mobileHeading: 'On this page',
    heading: <Text variation="body-bold-large">Jump To</Text>,
    children: (
      <>
        <JumpToTextLink>
          <a href="#intro">
            <span>Introduction</span>
          </a>
        </JumpToTextLink>
        <JumpToTextLink>
          <a href="#link1">
            <span>Link 1</span>
          </a>
        </JumpToTextLink>
        <JumpToTextLink>
          <a href="#link2">
            <span>Link 2</span>
          </a>
        </JumpToTextLink>
        <JumpToTextLink>
          <a href="#link3">
            <span>Link 3</span>
          </a>
        </JumpToTextLink>
        <JumpToTextLink>
          <a href="#link4">
            <span>link 4</span>
          </a>
        </JumpToTextLink>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: 4000, display: 'grid', grid: 'auto / 2fr 1fr' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div id="intro" style={{ height: 600, background: 'lightblue' }}>
            intro
          </div>
          <div id="link1" style={{ height: 600, background: 'lightpink' }}>
            Link 1
          </div>
          <div id="link2" style={{ height: 600, background: 'lightgray' }}>
            Link 2
          </div>
          <div id="link3" style={{ height: 700, background: 'lightgreen' }}>
            Link 3
          </div>
          <div id="link4" style={{ height: 500, background: 'lightblue' }}>
            Link 4
          </div>
        </div>
        <div style={{ height: '100%' }}>
          <Themes theme="A-HCA-White">
            <Story />
          </Themes>
        </div>
      </div>
    ),
  ],
};
