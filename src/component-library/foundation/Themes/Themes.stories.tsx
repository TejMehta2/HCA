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
import Pagination from '../../core-components/Pagination/Pagination';
import Checkbox from '../../core-components/Checkbox/Checkbox';
import RadioButton from '../../core-components/RadioButton/RadioButton';

// TODO - replace demo cards with actual cards, and make sure they theme children correctly.

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

/* Mock callback function for fetching data  */
const getPageContent = (page: number) => console.log(page);

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
        <Button size="small" variation="full">
          <button>Button full</button>
        </Button>
        <Button size="small" variation="outline">
          <button>Button outline</button>
        </Button>
        <Tags contentVariation="quote">
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
          callback={() => { }}
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

        <Pagination
          pageCount={14}
          callback={(newPage: number) => {
            return getPageContent(newPage);
          }}
        />

        <Checkbox label="Example 1" name="example" value={1} id="example-1" />
        <RadioButton label="example A" value="example-a" name="test" />
        <RadioButton label="example B" value="example-b" name="test" />
        <RadioButton label="example C" value="example-c" name="test" />
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
    theme: 'G-HCA-Orange',
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
        <Button size="small" variation="full">
          <button>Button full</button>
        </Button>
        <Button size="small" variation="outline">
          <button>Button outline</button>
        </Button>
        <Tags>
          <a href="#">Tags</a>
        </Tags>
        <Themes theme="D-HCA-Teal">
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
            <Button size="small" variation="full">
              <button>Button full</button>
            </Button>
            <Button size="small" variation="outline">
              <button>Button outline</button>
            </Button>
            <Tags>
              <a href="#">Tags</a>
            </Tags>
            <Themes theme="B-HCA-Navy-Blue">
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
                <Button size="small" variation="full">
                  <button>Button full</button>
                </Button>
                <Button size="small" variation="outline">
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
    theme: 'G-HCA-Orange',
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
        <Button size="small" variation="full">
          <button>Button full</button>
        </Button>
        <Button size="small" variation="outline">
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
          <Button size="small" variation="full-dark">
            <button>Button full-dark</button>
          </Button>
          <Button size="small" variation="full-light">
            <button>Button full-light</button>
          </Button>
          <Button size="small" variation="outline-dark">
            <button>Button outline-dark</button>
          </Button>
          <Button size="small" variation="outline-light">
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

export const ThemeAWhite: StoryObj<typeof Themes> = {
  args: { theme: 'A-HCA-White' },
};
export const ThemeBNavyBlue: StoryObj<typeof Themes> = {
  args: { theme: 'B-HCA-Navy-Blue' },
};
export const ThemeCDenim: StoryObj<typeof Themes> = {
  args: { theme: 'C-HCA-Denim' },
};
export const ThemeDTeal: StoryObj<typeof Themes> = {
  args: { theme: 'D-HCA-Teal' },
};
export const ThemeECerulean: StoryObj<typeof Themes> = {
  args: { theme: 'E-HCA-Cerulean' },
};
export const ThemeECerulean25: StoryObj<typeof Themes> = {
  args: { theme: 'E-HCA-Cerulean-25' },
};
export const ThemeFFern: StoryObj<typeof Themes> = {
  args: { theme: 'F-HCA-Fern' },
};
export const ThemeGOrange: StoryObj<typeof Themes> = {
  args: { theme: 'G-HCA-Orange' },
};
export const ThemeHTangerine: StoryObj<typeof Themes> = {
  args: { theme: 'H-HCA-Tangerine' },
};
export const ThemeIGoldenrod: StoryObj<typeof Themes> = {
  args: { theme: 'I-HCA-Goldenrod' },
};
export const ThemeJTangerine20: StoryObj<typeof Themes> = {
  args: { theme: 'J-HCA-Tangerine-20' },
};
export const ThemeKFern20: StoryObj<typeof Themes> = {
  args: { theme: 'K-HCA-Fern-20' },
};
export const ThemeLTeal5: StoryObj<typeof Themes> = {
  args: { theme: 'L-HCA-Teal-5' },
};
export const ThemeMGoldenrod20: StoryObj<typeof Themes> = {
  args: { theme: 'M-HCA-Goldenrod-20' },
};
export const ThemeNDenim5: StoryObj<typeof Themes> = {
  args: { theme: 'N-HCA-Denim-5' },
};
export const ThemeOTeal20: StoryObj<typeof Themes> = {
  args: { theme: 'O-HCA-Teal-20' },
};
export const ThemePalaceWhite: StoryObj<typeof Themes> = {
  args: { theme: 'Palace-White' },
};
export const ThemePalaceGrey: StoryObj<typeof Themes> = {
  args: { theme: 'Palace-Grey' },
};
export const ThemePalaceBeige: StoryObj<typeof Themes> = {
  args: { theme: 'Palace-Beige' },
};
export const ThemePalaceRed: StoryObj<typeof Themes> = {
  args: { theme: 'Palace-Red' },
};
export const ThemeChelseaWhite: StoryObj<typeof Themes> = {
  args: { theme: 'Chelsea-White' },
};
export const ThemeChelseaNavyBlue: StoryObj<typeof Themes> = {
  args: { theme: 'Chelsea-Navy-Blue' },
};
export const ThemeChelseaBeige: StoryObj<typeof Themes> = {
  args: { theme: 'Chelsea-Beige' },
};
export const ThemeChelseaGold: StoryObj<typeof Themes> = {
  args: { theme: 'Chelsea-Gold' },
};
export const ThemeLBI: StoryObj<typeof Themes> = {
  args: { theme: 'LBI' },
};
export const ThemeLBIDark: StoryObj<typeof Themes> = {
  args: { theme: 'LBI-Dark' },
};
export const ThemeLBIWhite: StoryObj<typeof Themes> = {
  args: { theme: 'LBI-White' },
};
export const ThemeAlanBlack: StoryObj<typeof Themes> = {
  args: { theme: 'Alan-Black' },
};
export const ThemeAlanWhite: StoryObj<typeof Themes> = {
  args: { theme: 'Alan-White' },
};
export const ThemeAlanLightGrey: StoryObj<typeof Themes> = {
  args: { theme: 'Alan-Light-Grey' },
};
