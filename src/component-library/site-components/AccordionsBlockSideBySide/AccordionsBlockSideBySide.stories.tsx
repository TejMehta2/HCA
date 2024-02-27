import React from 'react';
import AccordionsBlockSideBySide from './AccordionsBlockSideBySide';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';
import TextButton from '../../core-components/TextButton/TextButton';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AccordionsBlockSideBySide> = {
  title: 'site-components/AccordionsBlockSideBySide',
  component: AccordionsBlockSideBySide,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof AccordionsBlockSideBySide> = {
  args: {
    theme: 'K-HCA-Fern-20',
    subtitle: (
      <Text tag="h3" variation="subheading-1">
        Meta title
      </Text>
    ),
    header: (
      <Text tag="h2" variation="display-3">
        Accordion Block
      </Text>
    ),
    body: (
      <Text tag="p" variation="body-large">
        Quis ut irure non mollit. Ipsum esse mollit sunt nulla. Ipsum non cillum
        mollit officia tempor in ad non consequat esse. Sunt culpa adipisicing
        eiusmod ullamco eu esse laborum deserunt et officia reprehenderit.
        Aliquip laboris duis ex labore veniam labore do nostrud minim labore
        eiusmod voluptate sit commodo officia. Commodo tempor tempor magna
        deserunt sunt dolore dolore.
      </Text>
    ),
    accordions: [
      {
        title: 'How long will I have to wait to book a hip pain appointment?',
        children: (
          <p>
            Eiusmod irure nostrud culpa veniam nisi incididunt nostrud commodo
            deserunt anim quis cupidatat irure duis. Eu voluptate pariatur non.
            Elit dolore consequat veniam et. Eiusmod consectetur sit dolor
            laborum excepteur laborum quis.
          </p>
        ),
      },
      {
        title: 'What are the payment options for hip pain treatment at HCA?',
        children: (
          <p>
            Eiusmod irure nostrud culpa veniam nisi incididunt nostrud commodo
            deserunt anim quis cupidatat irure duis. Eu voluptate pariatur non.
            Elit dolore consequat veniam et. Eiusmod consectetur sit dolor
            laborum excepteur laborum quis.
          </p>
        ),
      },
      {
        title: 'What should I prepare for my hip pain appointment?',
        children: (
          <p>
            Eiusmod irure nostrud culpa veniam nisi incididunt nostrud commodo
            deserunt anim quis cupidatat irure duis. Eu voluptate pariatur non.
            Elit dolore consequat veniam et. Eiusmod consectetur sit dolor
            laborum excepteur laborum quis.
          </p>
        ),
      },
      {
        title: 'Do you offer hip pain rehabilitation and support?',
        children: (
          <p>
            Eiusmod irure nostrud culpa veniam nisi incididunt nostrud commodo
            deserunt anim quis cupidatat irure duis. Eu voluptate pariatur non.
            Elit dolore consequat veniam et. Eiusmod consectetur sit dolor
            laborum excepteur laborum quis.
          </p>
        ),
      },
    ],

    ctas: (
      <>
        <Button variation="full" size="large">
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

export const BecomingAPatient: StoryObj<typeof AccordionsBlockSideBySide> = {
  args: {
    theme: 'K-HCA-Fern-20',
    header: (
      <Text tag="h2" variation="display-1">
        Becoming a patient
      </Text>
    ),
    body: (
      <Text tag="p" variation="subheading-1">
        what best applies to you?
      </Text>
    ),
    accordions: [
      {
        title: 'I have a referral from my GP',
        children: (
          <p>
            Eiusmod irure nostrud culpa veniam nisi incididunt nostrud commodo
            deserunt anim quis cupidatat irure duis. Eu voluptate pariatur non.
            Elit dolore consequat veniam et. Eiusmod consectetur sit dolor
            laborum excepteur laborum quis.
          </p>
        ),
      },
      {
        title: 'I don’t have a referral from my GP',
        children: (
          <p>
            Eiusmod irure nostrud culpa veniam nisi incididunt nostrud commodo
            deserunt anim quis cupidatat irure duis. Eu voluptate pariatur non.
            Elit dolore consequat veniam et. Eiusmod consectetur sit dolor
            laborum excepteur laborum quis.
          </p>
        ),
      },
      {
        title: 'I know what consultant I want to see',
        children: (
          <p>
            Eiusmod irure nostrud culpa veniam nisi incididunt nostrud commodo
            deserunt anim quis cupidatat irure duis. Eu voluptate pariatur non.
            Elit dolore consequat veniam et. Eiusmod consectetur sit dolor
            laborum excepteur laborum quis.
          </p>
        ),
      },
      {
        title: 'I’m an international patient',
        children: (
          <p>
            Eiusmod irure nostrud culpa veniam nisi incididunt nostrud commodo
            deserunt anim quis cupidatat irure duis. Eu voluptate pariatur non.
            Elit dolore consequat veniam et. Eiusmod consectetur sit dolor
            laborum excepteur laborum quis.
          </p>
        ),
      },
      {
        title: 'I have private medical insurance',
        children: (
          <p>
            Eiusmod irure nostrud culpa veniam nisi incididunt nostrud commodo
            deserunt anim quis cupidatat irure duis. Eu voluptate pariatur non.
            Elit dolore consequat veniam et. Eiusmod consectetur sit dolor
            laborum excepteur laborum quis.
          </p>
        ),
      },
      {
        title: 'I don’t have private medical insurance',
        children: (
          <p>
            Eiusmod irure nostrud culpa veniam nisi incididunt nostrud commodo
            deserunt anim quis cupidatat irure duis. Eu voluptate pariatur non.
            Elit dolore consequat veniam et. Eiusmod consectetur sit dolor
            laborum excepteur laborum quis.
          </p>
        ),
      },
    ],
  },
};
