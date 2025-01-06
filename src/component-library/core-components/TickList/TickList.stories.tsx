import React from 'react';
import TickList from './TickList';
import type { Meta, StoryObj } from '@storybook/react';
import Themes from '../../foundation/Themes/Themes';
import Accordion from '../../components/Accordion/Accordion';
import Button from '../Button/Button';
import Icons from '../../foundation/Icons/Icons';
import Text from '../../foundation/Text/Text';
import RichText from '../RichText/RichText';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof TickList> = {
  title: 'core-components/TickList',
  component: TickList,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof TickList> = {
  args: {
    children: (
      <ul>
        <li>
          You’ll be given a local anaesthetic to numb your groin or wrist. You
          may also be given a sedative to help you relax.
        </li>
        <li>
          A small tube will be inserted into your artery. A catheter is then
          placed inside that tube.
        </li>
        <li>The balloon is inflated, which opens your artery.</li>
        <li>
          A stent, made of wire mesh, will be inserted to keep the artery open.
        </li>
        <li>
          The balloon and catheter are then removed, leaving the stent in
          position.
        </li>
      </ul>
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

export const InAccordion: StoryObj<typeof TickList> = {
  args: {
    children: (
      <ul>
        <li>
          You’ll be given a local anaesthetic to numb your groin or wrist. You
          may also be given a sedative to help you relax.
        </li>
        <li>
          A small tube will be inserted into your artery. A catheter is then
          placed inside that tube.
        </li>
        <li>The balloon is inflated, which opens your artery.</li>
        <li>
          A stent, made of wire mesh, will be inserted to keep the artery open.
        </li>
        <li>
          The balloon and catheter are then removed, leaving the stent in
          position.
        </li>
      </ul>
    ),
  },
  decorators: [
    (Story) => (
      <Themes theme="A-HCA-White">
        <div style={{ maxWidth: '551px' }}>
          <Accordion
            title={'What happens during a PCI?'}
            onShow={() => {}}
            isActive={true}
          >
            <Text variation="body-large">
              <p>
                A PCI usually takes between one and two hours, although
                sometimes it can take longer. The typical PCI procedure steps
                are as follows:
              </p>
              <Story />
            </Text>
            <Button size="small" variation="full">
              <a href="#">
                <Icons iconName="iconStethoscope" />{' '}
                <span>Find a PCI consultant</span>
              </a>
            </Button>
          </Accordion>
        </div>
      </Themes>
    ),
  ],
};

export const AsRteClass: StoryObj<typeof TickList> = {
  args: {
    children: <></>,
  },
  decorators: [
    () => (
      <Themes theme="A-HCA-White">
        <div style={{ maxWidth: '551px' }}>
          <Accordion
            title={'Global tick class example'}
            onShow={() => {}}
            isActive={true}
          >
            <RichText>
              <p>Default:</p>
              <ul>
                <li>
                  You’ll be given a local anaesthetic to numb your groin or
                  wrist. You may also be given a sedative to help you relax.
                </li>
                <li>
                  A small tube will be inserted into your artery. A catheter is
                  then placed inside that tube.
                </li>
                <li>The balloon is inflated, which opens your artery.</li>
                <li>
                  A stent, made of wire mesh, will be inserted to keep the
                  artery open.
                </li>
                <li>
                  The balloon and catheter are then removed, leaving the stent
                  in position.
                </li>
              </ul>
              <p>Has CSS class .tick:</p>
              <ul className="tick">
                <li>
                  You’ll be given a local anaesthetic to numb your groin or
                  wrist. You may also be given a sedative to help you relax.
                </li>
                <li>
                  A small tube will be inserted into your artery. A catheter is
                  then placed inside that tube.
                </li>
                <li>The balloon is inflated, which opens your artery.</li>
                <li>
                  A stent, made of wire mesh, will be inserted to keep the
                  artery open.
                </li>
                <li>
                  The balloon and catheter are then removed, leaving the stent
                  in position.
                </li>
              </ul>
            </RichText>
            <Button size="small" variation="full">
              <a href="#">
                <Icons iconName="iconStethoscope" />{' '}
                <span>CTA to demonstrate spacing</span>
              </a>
            </Button>
          </Accordion>
        </div>
      </Themes>
    ),
  ],
};
