import React from 'react';
import ImageAndTextBlock from './ImageAndTextBlock';
import type { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';
import Text from '../../foundation/Text/Text';
import Doctify from '../../components/Doctify/Doctify';
import CQCBlock from '../../components/CQCBlock/CQCBlock';
import Icons from '../../foundation/Icons/Icons';
import Button from '../../core-components/Button/Button';
import ContactList from '../../components/ContactList/ContactList';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ImageAndTextBlock> = {
  title: 'site-components/ImageAndTextBlock',
  component: ImageAndTextBlock,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Short: StoryObj<typeof ImageAndTextBlock> = {
  args: {
    theme: 'D-HCA-Teal',
    length: 'short',
    image: (
      <Image
        src="/placeholders/children-playing.jpg"
        alt="two children playing"
        width="643"
        height="605"
      />
    ),

    header: (
      <Text tag="h2" variation="display-2">
        New to private healthcare?
      </Text>
    ),
    children: (
      <>
        <Text tag="p" variation="body-large">
          Quis laboris proident sint amet id cillum do dolor in tempor est.
          Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
          laborum et culpa minim. Commodo ex laboris pariatur labore nostrud
          dolore ad sit occaecat. Qui ipsum in minim. Nostrud duis cupidatat
          sunt lorem ut.
        </Text>
      </>
    ),

    subheader: (
      <Text tag="h3" variation="subheading-1">
        payment plans
      </Text>
    ),
    ctas: (
      <>
        <Button size="large" variation="full">
          <a href="#">
            <span>
              <Icons iconName={'icon3Lines'} />
            </span>
            <span>
              Learn more about <strong>self-pay</strong>
            </span>
          </a>
        </Button>
        <Button size="large" variation="outline">
          <a href="#">
            <Icons iconName={'icon3Lines'} />
            <span>
              Access care with <strong>insurance</strong>
            </span>
          </a>
        </Button>
      </>
    ),
  },
};

export const ImageKeepAspectRatio: StoryObj<typeof ImageAndTextBlock> = {
  args: {
    ...Short.args,
    imageKeepAspectRatio: true,
  },
};

export const Long: StoryObj<typeof ImageAndTextBlock> = {
  args: {
    theme: 'F-HCA-Fern',
    imageAlignment: 'right',
    length: 'long',
    image: (
      <Image
        src="/placeholders/children-playing.jpg"
        alt="two children playing"
        width="643"
        height="605"
      />
    ),

    header: (
      <Text tag="h2" variation="display-2">
        New to private healthcare?
      </Text>
    ),
    children: (
      <>
        <Text tag="p" variation="body-large">
          Quis ut irure non mollit. Ipsum esse mollit sunt nulla. Ipsum non
          cillum mollit officia tempor in ad non consequat esse. Sunt culpa
          adipisicing eiusmod ullamco eu esse laborum deserunt et officia
          reprehenderit. Aliquip laboris duis ex labore veniam labore do nostrud
          minim labore eiusmod voluptate sit commodo officia. Commodo tempor
          tempor magna deserunt sunt dolore dolore. dolore.
        </Text>
        <Text tag="p" variation="body-large">
          Quis ut irure non mollit. Ipsum esse mollit sunt nulla. Ipsum non
          cillum mollit officia tempor in ad non consequat esse. Sunt culpa
          adipisicing eiusmod ullamco eu esse laborum deserunt et officia
          reprehenderit. Aliquip laboris duis ex labore veniam labore do nostrud
          minim labore eiusmod voluptate sit commodo officia. Commodo tempor
          tempor magna deserunt sunt dolore dolore.
        </Text>
      </>
    ),
    subheader: (
      <Text tag="h3" variation="subheading-1">
        payment plans
      </Text>
    ),
    ctas: (
      <>
        <Button size="large" variation="full">
          <a href="#">
            <span>
              Learn more about <strong>self-pay</strong>
            </span>
          </a>
        </Button>
        <Button size="large" variation="outline">
          <a href="#">
            <span>
              Access care with <strong>insurance</strong>
            </span>
          </a>
        </Button>
      </>
    ),
  },
};

export const Rating: StoryObj<typeof ImageAndTextBlock> = {
  args: {
    theme: 'A-HCA-White',
    length: 'short',
    image: (
      <Image
        src="/placeholders/hospital-in-london.jpg"
        alt="hospital building"
        width="643"
        height="605"
      />
    ),

    header: (
      <Text tag="h2" variation="display-2">
        New to private healthcare?
      </Text>
    ),
    children: (
      <>
        <Text tag="p" variation="body-large">
          Quis laboris proident sint amet id cillum do dolor in tempor est.
          Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
          laborum et culpa minim. Commodo ex laboris pariatur labore nostrud
          dolore ad sit occaecat. Qui ipsum in minim. Nostrud duis cupidatat
          sunt lorem ut.
        </Text>
      </>
    ),

    subheader: (
      <Text tag="h3" variation="subheading-1">
        payment plans
      </Text>
    ),

    ratings: [
      <Doctify
        key={1}
        alignment="left"
        link={<a href="#"></a>}
        rating={4}
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
      />,

      <CQCBlock
        key={2}
        link={<a href="#">CQCBlock</a>}
        rating="Outstanding"
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
      />,
    ],
  },
};

export const iconList: StoryObj<typeof ImageAndTextBlock> = {
  args: {
    theme: 'B-HCA-Navy-Blue',
    imageAlignment: 'left',
    length: 'short',
    image: (
      <Image
        src="/placeholders/finger-touching-screen.jpg"
        alt="two children playing"
        width="643"
        height="605"
      />
    ),

    header: (
      <Text tag="h2" variation="display-2">
        Patient amenities
      </Text>
    ),
    children: (
      <>
        <Text tag="p" variation="body-large">
          Quis laboris proident sint amet id cillum do dolor in tempor est.
          Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
          laborum et culpa minim.
        </Text>
      </>
    ),

    iconList: [
      { icon: <Icons iconName="iconPin"></Icons>, text: 'Quis laboris proi' },
      { icon: <Icons iconName="iconRedo"></Icons>, text: 'Quis laboris proi' },
      {
        icon: <Icons iconName="iconMobile"></Icons>,
        text: 'Quis laboris proident sint amet',
      },
      {
        icon: <Icons iconName="iconStethoscope"></Icons>,
        text: 'Quis laboris proident sint amet',
      },
      {
        icon: <Icons iconName="iconHospital"></Icons>,
        text: 'Quis laboris proi',
      },
      {
        icon: <Icons iconName="iconSearch"></Icons>,
        text: 'Quis laboris proi',
      },
    ],
  },
};

export const TalkToUs: StoryObj<typeof ImageAndTextBlock> = {
  args: {
    theme: 'I-HCA-Goldenrod',
    imageAlignment: 'left',
    length: 'short',
    image: (
      <Image
        src="/placeholders/doctor-inspecting-a-childs-arm.jpg"
        alt="a doctor inspecting a childs arm"
        width="643"
        height="605"
      />
    ),
    subheader: (
      <Text tag="h3" variation="subheading-1">
        Contacts
      </Text>
    ),
    header: (
      <Text tag="h2" variation="display-2">
        Talk to us
      </Text>
    ),
    children: (
      <ContactList
        items={[
          {
            title: (
              <Text tag="h4" variation="subheading-2">
                Embassy team
              </Text>
            ),
            number: (
              <>
                <Text tag="p" variation="display-6">
                  020 3131 5978
                </Text>
              </>
            ),
            icon: <Icons iconName="iconClock"></Icons>,
            openingHours: (
              <Text tag="p" variation="body-large">
                Monday to Friday 8am - 6pm
              </Text>
            ),
          },
          {
            title: (
              <Text tag="h4" variation="subheading-2">
                Internation team (agencies & insurers)
              </Text>
            ),
            number: (
              <Text tag="p" variation="display-6">
                020 3131 5978
              </Text>
            ),
            icon: <Icons iconName="iconClock"></Icons>,
            openingHours: (
              <Text tag="p" variation="body-large">
                Monday to Friday 8am - 6pm
              </Text>
            ),
          },
        ]}
      />
    ),
  },
};

export const hideImageOnMobile: StoryObj<typeof ImageAndTextBlock> = {
  args: {
    ...Short.args,
    hideImageOnMobile: true,
  },
};

export const PricingInformation: StoryObj<typeof ImageAndTextBlock> = {
  args: {
    theme: 'A-HCA-White',
    imageAlignment: 'left',
    length: 'long',
    contentVariation: 'pricing',
    image: (
      <Image
        src="/placeholders/children-playing.jpg"
        alt="two children playing"
        width="643"
        height="605"
      />
    ),
    subheader: (
      <Text tag="p" variation="subheading-1">
        payment plans
      </Text>
    ),
    header: (
      <Text tag="h2" variation="display-2">
        Hospital stay & procedure
      </Text>
    ),
    children: (
      <>
        <div>
          <Text tag="p" variation="subheading-2">
            prices from
          </Text>
          <Text tag="p" variation="display-2">
            £13,500
          </Text>
          <Text tag="p" variation="body-large">
            subject to the specifics of your treatment as recommended by your
            consultant.
          </Text>
        </div>
        <div>
          <Text tag="p" variation="subheading-2">
            indicative consultant fee from
          </Text>
          <Text tag="p" variation="display-5">
            £1,400
          </Text>
        </div>
        <div>
          <Text tag="p" variation="subheading-2">
            Expected length of stay
          </Text>
          <Text tag="p" variation="display-5">
            3 nights
          </Text>
        </div>
      </>
    ),
    ctas: (
      <>
        <Button size="large" variation="full">
          <a href="#">
            <Icons iconName={'iconPlus'} />
            <span>
              More <strong>information</strong>
            </span>
          </a>
        </Button>
        <Button size="large" variation="outline">
          <a href="#">
            <Icons iconName={'iconShare'} />
            <span>
              Share <strong>cost information</strong>
            </span>
          </a>
        </Button>
      </>
    ),
  },
};

export const Hero: StoryObj<typeof ImageAndTextBlock> = {
  args: {
    contentVariation: 'hero',
    theme: 'D-HCA-Teal',
    length: 'short',
    image: (
      <Image
        src="/placeholders/children-playing.jpg"
        alt="two children playing"
        width="643"
        height="605"
      />
    ),

    header: (
      <Text tag="h2" variation="display-2">
        New to private healthcare?
      </Text>
    ),
    children: (
      <>
        <Text tag="p" variation="body-large">
          Quis laboris proident sint amet id cillum do dolor in tempor est.
          Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
          laborum et culpa minim. Commodo ex laboris pariatur labore nostrud
          dolore ad sit occaecat. Qui ipsum in minim. Nostrud duis cupidatat
          sunt lorem ut.
        </Text>
      </>
    ),

    subheader: (
      <Text tag="h3" variation="subheading-1">
        payment plans
      </Text>
    ),
    ctas: (
      <>
        <Button size="large" variation="full">
          <a href="#">
            <span>
              <Icons iconName={'icon3Lines'} />
            </span>
            <span>
              Learn more about <strong>self-pay</strong>
            </span>
          </a>
        </Button>
        <Button size="large" variation="outline">
          <a href="#">
            <Icons iconName={'icon3Lines'} />
            <span>
              Access care with <strong>insurance</strong>
            </span>
          </a>
        </Button>
      </>
    ),
  },
};

export const SmallLogoCentered: StoryObj<typeof ImageAndTextBlock> = {
  args: {
    theme: 'Palace-White',
    imageKeepAspectRatio: true,
    imageNoStretch: true,
    imageVerticalAlignment: 'center',
    imageWidth: 'narrow',
    image: (
      <Image src="/cqc-large.png" alt="CQC logo" width="456" height="144" />
    ),

    header: (
      <Text tag="h2" variation="display-5">
        The independent regulator of health and social care in England
      </Text>
    ),
    ctas: (
      <>
        <Button size="large" variation="full">
          <a href="#">
            <span>
              View the <strong>report</strong>
            </span>
            <span>
              <Icons iconName={'iconExternal'} />
            </span>
          </a>
        </Button>
      </>
    ),
  },
};
