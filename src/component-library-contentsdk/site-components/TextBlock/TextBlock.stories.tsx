import React from 'react';
import TextBlock from './TextBlock';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';
import Themes from '../../foundation/Themes/Themes';
import Icons from '../../foundation/Icons/Icons';
import Image from 'next/image';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof TextBlock> = {
  title: 'site-components/TextBlock',
  component: TextBlock,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof TextBlock> = {
  args: {
    title: <Text variation={'display-2'}>What does a CT scan show?</Text>,
    subheading: <Text variation={'subheading-1'}>Subheading</Text>,
    text: (
      <Text variation={'body-large'}>
        CT scans show detailed images of the many structures that make up our
        body. This includes images of bones, blood vessels and our internal
        organs. A CT scan can detect a significant and abnormal injury to the
        body, even in its early stages. CT scans are especially helpful for
        investigating orthopaedic injuries. This is due to its advanced
        capabilities such as detecting tears in bone tissue that an X-ray would
        be unable to identify. It is also used as part of cardiac
        diagnostics and virtual colonoscopy for gastrointestinal problems. The
        detailed imaging a CT scan provides imaging for orthopaedic conditions
        including spinal injuries. This is because it’s able to provide far
        detailed more information about the vertebrae and other spinal
        structures than a normal X-ray can. Our weight-bearing CT scanner for
        lower limb at Elstree Outpatients & Diagnostic Centre, and our
        weight-bearing CT scanner for foot, ankle and knee at HCA UK at The
        Shard, allow for highly advanced evaluations of dynamic bone
        deformities. Showing far improved visualisation of the joint than
        conventional weight bearing X-ray, the weight-bearing CT scanner ensures
        our specialists give patients a more accurate diagnosis and treatment
        plan possible.  The role of the CT scanner in health screening is
        particularly prevalent in bowel cancer screening and lung cancer
        screening. Screening is a key area for diagnosing conditions early
      </Text>
    ),
    ctas: (
      <>
        <Button size={'large'} variation={'full'}>
          <a href="#">Learn more</a>
        </Button>
        <Button size={'large'} variation={'outline'}>
          <a href="#">Learn more</a>
        </Button>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <>
        <Themes theme={'A-HCA-White'}>
          <Story />
        </Themes>
        <Themes theme={'B-HCA-Navy-Blue'}>
          <Story />
        </Themes>
      </>
    ),
  ],
};

export const NoCta: StoryObj<typeof TextBlock> = {
  args: {
    ...Default.args,
    ctas: undefined,
  },
  decorators: Default.decorators,
};

export const NoSubheading: StoryObj<typeof TextBlock> = {
  args: {
    ...Default.args,
    subheading: undefined,
  },
  decorators: Default.decorators,
};

export const Centered: StoryObj<typeof TextBlock> = {
  args: {
    contentVariation: 'centered',
    title: (
      <Text variation={'display-1'}>
        Never miss an update on our{' '}
        <Text tag="span" variation="decorative">
          commitment
        </Text>{' '}
        to patients.
      </Text>
    ),
    subheading: <Text variation={'subheading-1'}>follow us</Text>,
    text: (
      <Text variation={'body-large'}>
        Ipsum esse cupidatat amet. Enim amet adipisicing deserunt nostrud esse
        Lorem nisi laboris nulla est enim. Non in et duis velit magna excepteur.
        Quis ad ullamco et Lorem aliquip ex nostrud et sunt fugiat est cupidatat
        velit fugiat.
      </Text>
    ),
    ctas: (
      <>
        <Button size={'large'} variation={'full'}>
          <a href="#">
            <Icons iconName="iconFacebook" />
            Follow HCA UK on Facebook
          </a>
        </Button>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <>
        <Themes theme={'A-HCA-White'}>
          <Story />
        </Themes>
        <Themes theme={'B-HCA-Navy-Blue'}>
          <Story />
        </Themes>
      </>
    ),
  ],
};

export const BackgroundImage: StoryObj<typeof TextBlock> = {
  args: {
    theme: 'Alan-Black',
    contentVariation: 'centered',
    image: (
      <Image
        src="/placeholders/lab-technician.jpeg"
        alt="lab technician"
        width="1024"
        height="683"
      />
    ),
    textWidth: 'narrow',
    title: <Text variation={'display-2'}>We&apos;re here to help</Text>,
    subheading: (
      <Text variation={'subheading-1'}>Ready to take the next step?</Text>
    ),
    text: (
      <Text variation={'body-large'}>
        If you have worrying symptoms you’d like to get checked, need a second
        opinion or just want a free chat with one of our nurse specialists, get
        in touch. Our friendly team will take care of the rest. 
      </Text>
    ),
    ctas: (
      <>
        <Button size={'large'} variation={'full'}>
          <a href="#">
            <Icons iconName="iconPhone" />
            Call us today
          </a>
        </Button>
      </>
    ),
  },
};
