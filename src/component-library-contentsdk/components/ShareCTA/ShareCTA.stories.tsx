import React from 'react';
import ShareCTA from './ShareCTA';
import type { Meta, StoryObj } from '@storybook/react';
import Text from '../../foundation/Text/Text';
import Button from '../../core-components/Button/Button';
import Icons from '../../foundation/Icons/Icons';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ShareCTA> = {
  title: 'components/ShareCTA',
  component: ShareCTA,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

const handleCopy = () => {
  navigator.clipboard.writeText(
    'https://hca-digital-dev-hca-main.hcatest.co.uk/'
  );
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof ShareCTA> = {
  args: {
    shareData: {
      url: 'https://hca-digital-dev-hca-main.hcatest.co.uk/',
      title: 'Hip Surgery - £5,000',
      text: 'Quis laboris proident sint amet id cillum do dolor in tempor est. Exercitation aute sint tempor eu ut aliquip commodo enim nulla et laborum et culpa minim. Commodo ex laboris pariatur labore nostrud dolore ad sit occaecat. Qui ipsum in minim. Nostrud duis cupidatat sunt lorem ut.',
    },

    shareCtaText: (
      <span>
        Share <strong>cost information</strong>
      </span>
    ),
    shareCtaIcon: (
      <span>
        <Icons iconName="iconShare" />
      </span>
    ),
    children: (
      <>
        <Button size="large" variation="square-outline">
          <button onClick={handleCopy}>
            <Icons iconName="iconCopy"></Icons>
            <span>Copy Link</span>
          </button>
        </Button>

        <Button size="large" variation="square-outline">
          <a
            href={`mailto:?subject=${encodeURI('Hip Surgery')}&body=${encodeURI(
              'Quis laboris proident sint amet id cillum do dolor in tempor est https://hca-digital-dev-hca-main.hcatest.co.uk/'
            )}`}
            title="Share by Email"
          >
            <Icons iconName="iconEmail"></Icons>
            <span>Email</span>
          </a>
        </Button>

        <Button size="large" variation="square-outline">
          <a
            href={`https://web.whatsapp.com/send?text=${encodeURI(
              'https://hca-digital-dev-hca-main.hcatest.co.uk/'
            )}`}
            rel="nofollow noopener"
            target="_blank"
          >
            <Icons iconName="iconWhatsapp"></Icons>
            <span>WhatsApp</span>
          </a>
        </Button>

        <Button size="large" variation="square-outline">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=https://hca-digital-dev-hca-main.hcatest.co.uk/`}
            rel="nofollow noopener"
            target="_blank"
          >
            <Icons iconName="iconFacebook"></Icons>
            <span>Facebook</span>
          </a>
        </Button>

        {/* 
            //  TODO messenger on desktop may be possible but would need app id, need to confirm 
            https://developers.facebook.com/docs/sharing/reference/send-dialog#examples

            <Button size="large" variation="square-outline">
                    <a
                      href={`http://www.facebook.com/dialog/send?app_id=123456789&amp;link=${encodeURI(
                        'https://hca-digital-dev-hca-main.hcatest.co.uk/'
                      )}&amp;redirect_uri=${encodeURI('https://hca-digital-dev-hca-main.hcatest.co.uk/')}`}
                      rel="nofollow noopener"
                      target="_blank"
                    >
                      <Icons iconName="iconMessenger"></Icons>
                      <span>Messenger</span>
                    </a>
            </Button> */}

        <Button size="large" variation="square-outline">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURI(
              'Hip Surgery - £5,000'
            )}/&url=https://hca-digital-dev-hca-main.hcatest.co.uk/`}
            rel="nofollow noopener"
            target="_blank"
          >
            <Icons iconName="iconX"></Icons>
            <span>X (Twitter)</span>
          </a>
        </Button>
      </>
    ),

    heading: (
      <Text tag="h2" variation="display-2">
        Share this cost
      </Text>
    ),

    subheading: (
      <Text tag="p" variation="subheading-1">
        Hip Surgery - £5,000
      </Text>
    ),
  },
};
