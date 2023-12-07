import React from 'react';
import Themes from './Themes';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../Text/Text';
import Button from '../../core-components/Button/Button';
import Tags from '../../core-components/Tags/Tags';
import TextButton from '../../core-components/TextButton/TextButton';
import TextLink from '../../core-components/TextLink/TextLink';
import Tabs from '../../core-components/Tabs/Tabs';
import CQCBlock from '../../components/CQCBlock/CQCBlock';
import Icons from '../../foundation/Icons/Icons';
import Image from 'next/image';
import CardBlog from '../../components/CardBlog/CardBlog';
import Doctify from '../../components/Doctify/Doctify';

// TODO - replace demo cards with actual cards, and make sure they theme children correctly.

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Themes> = {
  title: 'foundation/Themes',
  component: Themes,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  args: {
    children: (
      <div
        style={{
          display: 'grid',
          gap: '1rem',
          alignContent: 'start',
          justifyContent: 'start',
          background: 'var(--background)',
          color: 'var(--text)',
          padding: '1rem',
        }}
      >
        <Text variation="display-1">Heading</Text>
        <Text variation="subheading-1">Subheading</Text>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur
          delectus, laborum hic facilis quae ab distinctio veniam aperiam
          possimus modi. Impedit totam mollitia eos, perspiciatis, nemo dolor,
          soluta quae repellat iure modi sequi laboriosam dignissimos quidem
          eius repudiandae esse amet?
        </Text>
        <Button size="small" theme="full">
          <button>Button full</button>
        </Button>
        <Button size="small" theme="outline">
          <button>Button outline</button>
        </Button>
        <Tags>
          <a href="#">Tags</a>
        </Tags>
        <TextButton>
          <button>TextButton</button>
        </TextButton>
        <TextLink>
          <a href="#">TextLink</a>
        </TextLink>
        <CardBlog>
          <time dateTime="Sept 7, 2023">Sept 7, 2023</time>
          <Text variation="heading-2" tag="h3">
            <a href="#">Standard theme card</a>
          </Text>
          <Text variation="body-large">
            There are over 1400 at The Portland, each year. Hear new mums
            sharing theirs
          </Text>
          <Tags>
            <a href="#">Announcement</a>
          </Tags>
        </CardBlog>
        <CardBlog variation="feature">
          <time dateTime="Sept 7, 2023">Sept 7, 2023</time>
          <Text variation="heading-2" tag="h3">
            <a href="#">Feature theme card</a>
          </Text>
          <Text variation="body-large">
            There are over 1400 at The Portland, each year. Hear new mums
            sharing theirs
          </Text>
          <Tags>
            <a href="#">Announcement</a>
          </Tags>
        </CardBlog>
        <Tabs
          tabs={[
            { icon: 'iconOneOff', label: 'One-off' },
            { icon: 'iconFlexible', label: 'Flexi' },
            { icon: 'iconCalendar', label: 'Annual' },
          ]}
          callback={() => {}}
        />

        <CQCBlock
          link={<a href="#"></a>}
          title="Care Quality Commission verified"
          text="All our hospitals are rated Good or Oustanding."
          icon={<Icons iconName="iconCheckCircle"></Icons>}
          logo={{
            dark: (
              <Image
                src="/cqc-white.png"
                alt="cqc logo"
                width="120"
                height="37"
              />
            ),
            light: (
              <Image
                src="/cqc-color.png"
                alt="cqc logo"
                width="120"
                height="37"
              />
            ),
          }}
        ></CQCBlock>

        <Doctify
          link={<a href="#"></a>}
          rating={5}
          reviews="13,500 +"
          logo={{
            dark: (
              <Image
                src="/doctify-dark.png"
                alt="doctify logo"
                width="83"
                height="21"
              />
            ),
            light: (
              <Image
                src="/doctify-light.png"
                alt="doctify logo"
                width="83"
                height="21"
              />
            ),
          }}
        />
      </div>
    ),
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof Themes> = {
  args: {},
};

export const Nesting: StoryObj<typeof Themes> = {
  args: {
    theme: 'l',
    children: (
      <div
        style={{
          display: 'grid',
          gap: '1rem',
          alignContent: 'start',
          justifyContent: 'start',
          background: 'var(--background)',
          color: 'var(--text)',
          padding: '1rem',
        }}
      >
        <Text variation="display-3">Parent theme</Text>
        <Button size="small" theme="full">
          <button>Button full</button>
        </Button>
        <Button size="small" theme="outline">
          <button>Button outline</button>
        </Button>
        <Tags>
          <a href="#">Tags</a>
        </Tags>
        <Themes theme="a">
          <div
            style={{
              display: 'grid',
              gap: '1rem',
              alignContent: 'start',
              justifyContent: 'start',
              background: 'var(--background)',
              color: 'var(--text)',
              padding: '1rem',
            }}
          >
            <Text variation="display-3">Child theme</Text>
            <Button size="small" theme="full">
              <button>Button full</button>
            </Button>
            <Button size="small" theme="outline">
              <button>Button outline</button>
            </Button>
            <Tags>
              <a href="#">Tags</a>
            </Tags>
            <Themes theme="e">
              <div
                style={{
                  display: 'grid',
                  gap: '1rem',
                  alignContent: 'start',
                  justifyContent: 'start',
                  background: 'var(--background)',
                  color: 'var(--text)',
                  padding: '1rem',
                }}
              >
                <Text variation="display-3">Child theme</Text>
                <Button size="small" theme="full">
                  <button>Button full</button>
                </Button>
                <Button size="small" theme="outline">
                  <button>Button outline</button>
                </Button>
                <Tags>
                  <a href="#">Tags</a>
                </Tags>
              </div>
            </Themes>
          </div>
        </Themes>
      </div>
    ),
  },
};

export const Overrides: StoryObj<typeof Themes> = {
  args: {
    theme: 'l',
    children: (
      <div
        style={{
          display: 'grid',
          gap: '1rem',
          alignContent: 'start',
          justifyContent: 'start',
          background: 'var(--background)',
          color: 'var(--text)',
          padding: '1rem',
        }}
      >
        <Text variation="display-3">Theme L</Text>
        <Button size="small" theme="full">
          <button>Button full</button>
        </Button>
        <Button size="small" theme="outline">
          <button>Button outline</button>
        </Button>
        <Tags>
          <a href="#">Tags</a>
        </Tags>
        <div
          style={{
            display: 'grid',
            gap: '1rem',
            alignContent: 'start',
            justifyContent: 'start',
            background: 'var(--background)',
            color: 'var(--text)',
            padding: '1rem',
          }}
        >
          <Text variation="display-3">Overrides via prop</Text>
          <Button size="small" theme="full-dark">
            <button>Button full-dark</button>
          </Button>
          <Button size="small" theme="full-light">
            <button>Button full-light</button>
          </Button>
          <Button size="small" theme="outline-dark">
            <button>Button outline-dark</button>
          </Button>
          <Button size="small" theme="outline-light">
            <button>Button outline-light</button>
          </Button>
          <Tags theme="green">
            <a href="#">Tags green</a>
          </Tags>
          <Tags theme="blue">
            <a href="#">Tags blue</a>
          </Tags>
          <Tags theme="white">
            <a href="#">Tags white</a>
          </Tags>
        </div>
      </div>
    ),
  },
};

export const ThemeA: StoryObj<typeof Themes> = {
  args: { theme: 'a' },
};
export const ThemeB: StoryObj<typeof Themes> = {
  args: { theme: 'b' },
};
export const ThemeC: StoryObj<typeof Themes> = {
  args: { theme: 'c' },
};
export const ThemeD: StoryObj<typeof Themes> = {
  args: { theme: 'd' },
};
export const ThemeE: StoryObj<typeof Themes> = {
  args: { theme: 'e' },
};
export const ThemeF: StoryObj<typeof Themes> = {
  args: { theme: 'f' },
};
export const ThemeG: StoryObj<typeof Themes> = {
  args: { theme: 'g' },
};
export const ThemeH: StoryObj<typeof Themes> = {
  args: { theme: 'h' },
};
export const ThemeI: StoryObj<typeof Themes> = {
  args: { theme: 'i' },
};
export const ThemeJ: StoryObj<typeof Themes> = {
  args: { theme: 'j' },
};
export const ThemeK: StoryObj<typeof Themes> = {
  args: { theme: 'k' },
};
export const ThemeL: StoryObj<typeof Themes> = {
  args: { theme: 'l' },
};
