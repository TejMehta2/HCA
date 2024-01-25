import React from 'react';
import CardBlock from './CardBlock';
import type { Meta, StoryObj } from '@storybook/react';
import CardBlog from '../../components/CardBlog/CardBlog';
import Text from '../../foundation/Text/Text';
import Tags from '../../core-components/Tags/Tags';
import CardPatientStories from '../../components/CardPatientStories/CardPatientStories';
import Image from 'next/image';
import CardDoctor from '../../site-components/CardDoctor/CardDoctor';
import CardLocation from '../../components/CardLocation/CardLocation';
import Button from '../../core-components/Button/Button';
import TextButton from '../../core-components/TextButton/TextButton';
import CardContent from '../../components/CardContent/CardContent';
import AdvancedBlockHeader from '../../components/AdvancedBlockHeader/AdvancedBlockHeader';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof CardBlock> = {
  title: 'site-components/CardBlock',
  component: CardBlock,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
    theme: 'J-HCA-Turquoise-10',
  },
  argTypes: {
    header: {
      control: false,
      table: {
        disable: true,
      },
    },
    children: {
      control: false,
      table: {
        disable: true,
      },
    },
  },
};

const CardBlogExample = () => (
  <CardBlog>
    <time dateTime="Sept 7, 2023">Sept 7, 2023</time>
    <Text variation="heading-2" tag="h3">
      <a href="#">
        The Harley Street Clinic retain CQC &apos;Outstanding&apos; rating
      </a>
    </Text>
    <Text variation="body-large">
      There are over 1400 at The Portland, each year. Hear new mums sharing
      theirs
    </Text>
    <Tags>
      <a href="#">Announcement</a>
    </Tags>
  </CardBlog>
);

const CardPatientStoriesExample = () => (
  <CardPatientStories
    image={
      <Image
        src="/placeholders/crying-baby.png"
        alt="baby crying"
        width="456"
        height="253"
      />
    }
    title={
      <Text tag="h3" variation="display-4">
        Every new birth tells its own story
      </Text>
    }
    bodyCopy={
      <Text tag="p" variation="body-large">
        Quis laboris proident sint amet id cillum do dolor in tempor est
        exercitation aute sint tempor eu ut.
      </Text>
    }
    link={
      <a href="#">
        <span>
          Read the <strong>Story</strong>
        </span>
      </a>
    }
  />
);

const CardDoctorExample = () => (
  <CardDoctor
    image={
      <Image
        src="/placeholders/doctor-portrait-circle.png"
        alt="doctor portrait"
        width="91"
        height="91"
      />
    }
    title={
      <Text variation="display-5" tag="h3">
        John Smith
      </Text>
    }
    department={<span>Orthopaedics</span>}
    cta={
      <a href="#">
        <span>
          View <strong>profile</strong>
        </span>
      </a>
    }
  />
);

const CardLocationExample = () => (
  <CardLocation
    image={
      <Image
        src="/placeholders/location-card.jpg"
        alt="a building"
        width="358"
        height="176"
      />
    }
    title={
      <Text tag="h3" variation="heading-1">
        The Harley Street Clinic
      </Text>
    }
    address={
      <Text tag="h3" variation="body-large">
        35 Weymouth Street W1G 8BJ London
      </Text>
    }
    distance={
      <Text tag="h3" variation="body-semi-bold-small">
        0.12 miles from your location
      </Text>
    }
    ctas={{
      button1: (
        <a href="#">
          <span>
            Learn <strong>more</strong>
          </span>
        </a>
      ),
      button2: (
        <a href="#">
          <span>
            Get <strong>directions</strong>
          </span>
        </a>
      ),
    }}
  />
);

const CardContentExample = () => (
  <CardContent
    image={
      <Image
        src="/placeholders/couple-on-bench.jpeg"
        alt="baby crying"
        width="456"
        height="253"
      />
    }
    title={
      <Text tag="h3" variation="display-4">
        Every new birth tells its own story
      </Text>
    }
    bodyCopy={
      <Text tag="p" variation="body-large">
        Quis laboris proident sint amet id cillum do dolor in tempor est
        exercitation aute sint tempor eu ut.
      </Text>
    }
    link={
      <a href="#">
        <span>
          Read the <strong>Story</strong>
        </span>
      </a>
    }
  />
);

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const CardBlogBlock: StoryObj<typeof CardBlock> = {
  args: {
    header: (
      <AdvancedBlockHeader
        subtitle={<Text variation={'subheading-1'}>Sub title</Text>}
        body={
          <Text variation={'body-large'}>
            Quis laboris proident sint amet id cillum do dolor in tempor est.
            Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
            laborum et culpa minim. Commodo ex laboris pariatur labore nostrud
            dolore ad sit occaecat. Qui ipsum in minim. Nostrud duis cupidatat
            sunt lorem ut.
          </Text>
        }
        ctas={
          <>
            <Button size={'small'} theme={'full'}>
              <a href="#">
                <span>
                  Learn more about <strong>self-pay</strong>
                </span>
              </a>
            </Button>
            <TextButton>
              <a href="#">
                <span>
                  Access care with <strong>insurance</strong>
                </span>
              </a>
            </TextButton>
          </>
        }
        title={
          <Text variation={'display-2'} tag="h2">
            Blog Card Block
          </Text>
        }
      />
    ),
    children: (
      <>
        <CardBlogExample />
        <CardBlogExample />
        <CardBlogExample />
        <CardBlogExample />
        <CardBlogExample />
        <CardBlogExample />
      </>
    ),
    variation: '3-columns',
  },
};

export const CardPatientStoriesBlock: StoryObj<typeof CardBlock> = {
  args: {
    header: (
      <AdvancedBlockHeader
        subtitle={<Text variation={'subheading-1'}>Sub title</Text>}
        body={
          <Text variation={'body-large'}>
            Quis laboris proident sint amet id cillum do dolor in tempor est.
            Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
            laborum et culpa minim. Commodo ex laboris pariatur labore nostrud
            dolore ad sit occaecat. Qui ipsum in minim. Nostrud duis cupidatat
            sunt lorem ut.
          </Text>
        }
        ctas={
          <>
            <Button size={'small'} theme={'full'}>
              <a href="#">
                <span>
                  Learn more about <strong>self-pay</strong>
                </span>
              </a>
            </Button>
            <TextButton>
              <a href="#">
                <span>
                  Access care with <strong>insurance</strong>
                </span>
              </a>
            </TextButton>
          </>
        }
        title={
          <Text variation={'display-2'} tag="h2">
            Patient Stories Card Block
          </Text>
        }
      />
    ),
    children: (
      <>
        <CardPatientStoriesExample />
        <CardPatientStoriesExample />
        <CardPatientStoriesExample />
        <CardPatientStoriesExample />
        <CardPatientStoriesExample />
        <CardPatientStoriesExample />
      </>
    ),
    variation: '3-columns',
  },
};

export const CardDoctorBlock: StoryObj<typeof CardBlock> = {
  args: {
    header: (
      <AdvancedBlockHeader
        subtitle={<Text variation={'subheading-1'}>Sub title</Text>}
        body={
          <Text variation={'body-large'}>
            Quis laboris proident sint amet id cillum do dolor in tempor est.
            Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
            laborum et culpa minim. Commodo ex laboris pariatur labore nostrud
            dolore ad sit occaecat. Qui ipsum in minim. Nostrud duis cupidatat
            sunt lorem ut.
          </Text>
        }
        ctas={
          <>
            <Button size={'small'} theme={'full'}>
              <a href="#">
                <span>
                  Learn more about <strong>self-pay</strong>
                </span>
              </a>
            </Button>
            <TextButton>
              <a href="#">
                <span>
                  Access care with <strong>insurance</strong>
                </span>
              </a>
            </TextButton>
          </>
        }
        title={
          <Text variation={'display-2'} tag="h2">
            Consultant Card Block
          </Text>
        }
      />
    ),
    children: (
      <>
        <CardDoctorExample />
        <CardDoctorExample />
        <CardDoctorExample />
        <CardDoctorExample />
        <CardDoctorExample />
        <CardDoctorExample />
        <CardDoctorExample />
        <CardDoctorExample />
      </>
    ),
    variation: '4-columns',
  },
};

export const CardContentBlock: StoryObj<typeof CardBlock> = {
  args: {
    header: (
      <AdvancedBlockHeader
        subtitle={<Text variation={'subheading-1'}>Sub title</Text>}
        body={
          <Text variation={'body-large'}>
            Quis laboris proident sint amet id cillum do dolor in tempor est.
            Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
            laborum et culpa minim. Commodo ex laboris pariatur labore nostrud
            dolore ad sit occaecat. Qui ipsum in minim. Nostrud duis cupidatat
            sunt lorem ut.
          </Text>
        }
        ctas={
          <>
            <Button size={'small'} theme={'full'}>
              <a href="#">
                <span>
                  Learn more about <strong>self-pay</strong>
                </span>
              </a>
            </Button>
            <TextButton>
              <a href="#">
                <span>
                  Access care with <strong>insurance</strong>
                </span>
              </a>
            </TextButton>
          </>
        }
        title={
          <Text variation={'display-2'} tag="h2">
            Location Card Block
          </Text>
        }
      />
    ),
    children: (
      <>
        <CardContentExample />
        <CardContentExample />
        <CardContentExample />
        <CardContentExample />
        <CardContentExample />
        <CardContentExample />
      </>
    ),
    variation: '3-columns',
  },
};

export const CardLocationBlock: StoryObj<typeof CardBlock> = {
  args: {
    header: (
      <AdvancedBlockHeader
        subtitle={<Text variation={'subheading-1'}>Sub title</Text>}
        body={
          <Text variation={'body-large'}>
            Quis laboris proident sint amet id cillum do dolor in tempor est.
            Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
            laborum et culpa minim. Commodo ex laboris pariatur labore nostrud
            dolore ad sit occaecat. Qui ipsum in minim. Nostrud duis cupidatat
            sunt lorem ut.
          </Text>
        }
        ctas={
          <>
            <Button size={'small'} theme={'full'}>
              <a href="#">
                <span>
                  Learn more about <strong>self-pay</strong>
                </span>
              </a>
            </Button>
            <TextButton>
              <a href="#">
                <span>
                  Access care with <strong>insurance</strong>
                </span>
              </a>
            </TextButton>
          </>
        }
        title={
          <Text variation={'display-2'} tag="h2">
            Location Card Block
          </Text>
        }
      />
    ),
    children: (
      <>
        <CardLocationExample />
        <CardLocationExample />
        <CardLocationExample />
        <CardLocationExample />
        <CardLocationExample />
        <CardLocationExample />
      </>
    ),
    variation: '3-columns',
  },
};

export const SideBySideBlock: StoryObj<typeof CardBlock> = {
  args: {
    header: (
      <AdvancedBlockHeader
        subtitle={<Text variation={'subheading-1'}>Sub title</Text>}
        body={
          <Text variation={'body-large'}>
            Quis laboris proident sint amet id cillum do dolor in tempor est.
            Exercitation aute sint tempor eu ut aliquip commodo enim nulla et
            laborum et culpa minim. Commodo ex laboris pariatur labore nostrud
            dolore ad sit occaecat. Qui ipsum in minim. Nostrud duis cupidatat
            sunt lorem ut.
          </Text>
        }
        ctas={
          <>
            <Button size={'small'} theme={'full'}>
              <a href="#">
                <span>
                  Learn more about <strong>self-pay</strong>
                </span>
              </a>
            </Button>
            <TextButton>
              <a href="#">
                <span>
                  Access care with <strong>insurance</strong>
                </span>
              </a>
            </TextButton>
          </>
        }
        title={
          <Text variation={'display-2'} tag="h2">
            Side-by-side Card Block
          </Text>
        }
      />
    ),
    children: (
      <CardContent
        key={0}
        title={
          <Text variation="heading-1" tag="h4">
            Cardiac care
          </Text>
        }
        bodyCopy={
          <Text variation="body-large" tag="p">
            There are over 1400 at The Portland, each year. Hear new mums
            sharing theirs
          </Text>
        }
        image={
          <Image
            src="/placeholders/multicard.jpg"
            alt="baby crying"
            width="363"
            height="243"
          />
        }
        link={
          <a href="#">
            <span>
              Read the <strong>Story</strong>
            </span>
          </a>
        }
      />
    ),
    variation: 'side-by-side',
  },
};
