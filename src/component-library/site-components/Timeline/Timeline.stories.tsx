import React from 'react';
import Timeline, { TimelineStep } from './Timeline';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import Themes from '../../foundation/Themes/Themes';
import Icons from '../../foundation/Icons/Icons';
import TextLink from '../../core-components/TextLink/TextLink';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Timeline> = {
  title: 'site-components/Timeline',
  component: Timeline,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof Timeline> = {
  args: {
    subheading: <Text variation="subheading-1">your patient journey</Text>,
    heading: (
      <Text variation="display-3">
        From consultation to aftercare: Your time with HCA Healthcare UK
      </Text>
    ),
    copy: (
      <Text variation="body-large">
        From the moment you step through the door, until the time you&apos;re
        ready to leave, we want you to feel as comfortable as possible with us,
        every step of the way. Along with state-of-the-art treatment and
        luxurious surroundings, one of the ways we can put you at ease is to
        prepare you for your visit and let you know what to expect at each
        stage. If you have any questions that aren&apos;t answered here, or in
        the FAQ section below, please don&apos;t hesitate to get in touch. Our
        team will be happy to help in any way they can.
      </Text>
    ),
    ctas: (
      <TextLink>
        <a href="#">
          <span>See more</span>
          <Icons iconName="iconArrowRight" />
        </a>
      </TextLink>
    ),
    children: (
      <>
        <TimelineStep
          index={<Text variation="display-5">01</Text>}
          heading={<Text variation="display-5">Initial consultation</Text>}
          copy={
            <Text variation="body-large">
              If you&apos;re concerned about your heart, we can offer you a GP
              appointment, often within 24 hours. You&apos;ll be able to discuss
              your symptoms and medical history with the consultant, and
              they&apos;ll arrange any imaging or diagnostic tests – often on
              the same day.
              <ul>
                <li>A cognitive test and neurological exam to check which stage of Alzheimer’s disease you’re in</li>
                <li>A cognitive test and neurological exam to check which stage of Alzheimer’s</li>
                <li>Jump</li>
              </ul>
            </Text>
          }
          link={
            <a href="#">
              <span>Read the story</span>
            </a>
          }
        />
        <TimelineStep
          index={<Text variation="display-5">02</Text>}
          heading={
            <Text variation="display-5">Investigations and diagnosis</Text>
          }
          copy={
            <Text variation="body-large">
              The tests your consultant arranges will depend on the nature of
              your condition. You&apos;ll get the results within 48 hours, and
              your case will be presented to a dedicated cardiac
              multidisciplinary team, in order to ensure the highest level of
              medical care.
            </Text>
          }
        />
        <TimelineStep
          index={<Text variation="display-5">03</Text>}
          heading={<Text variation="display-5">Treatment</Text>}
          copy={
            <Text variation="body-large">
              While some patients are given a local anaesthetic, others will
              have a general anaesthetic, which means they&apos;ll be asleep for
              the procedure. If you have a local anaesthetic, you may also be
              given a sedative to help you relax. After your PCI, you may be
              able to go home the same day. However, if you do stay overnight,
              you&apos;ll be well looked after in one of our beautiful,
              comfortable rooms.
            </Text>
          }
        />
        <TimelineStep
          index={<Text variation="display-5">04</Text>}
          heading={<Text variation="display-5">After care</Text>}
          copy={
            <Text variation="body-large">
              If you do stay overnight, you should be able to return home the
              next day. You won&apos;t be able to drive for at least a week, so
              you&apos;ll need to arrange for someone to help with your
              transport. You can expect to have a bit of bruising or soreness
              where the catheter was inserted, but please get in touch if it
              gets worse, starts to swell or if you get a temperature.
              We&apos;ll also prescribe medication to help with your recovery,
              including aspiring to reduce the risk of blood clots, and statins
              to lower your cholesterol.
            </Text>
          }
        />
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
