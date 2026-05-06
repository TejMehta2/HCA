import React from 'react';
import SidePanel from './SidePanel';
import type { Meta, StoryObj } from '@storybook/react';
import InfoBox from '../InfoBox/InfoBox';
import Reviews from '../Reviews/Reviews';
import Button from '../../core-components/Button/Button';
import Icons from '../../foundation/Icons/Icons';
import Themes from '../../foundation/Themes/Themes';
import Container from '../../foundation/Containers/Container';
import Text from '../../foundation/Text/Text';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof SidePanel> = {
  title: 'consultant-finder/SidePanel',
  component: SidePanel,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <Themes theme={'A-HCA-White'}>
        <Story />
      </Themes>
    ),
  ],
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof SidePanel> = {
  args: {
    children: (
      <div>
        <Reviews
          reviewsTotal={5}
          reviewsCount={5}
          reviewsText={'Patients'}
          isConsultantProfileReviews={true}
          titleText={'PATIENTS REVIEWS'}
          doctifyText={'Reviewed By'}
          doctifyLogo={null}
          hasDoctifyBranding={true}
        />
        <InfoBox
          backgroundColour="green"
          icon={null}
          isShortInfo={true}
          longText="If you're experiencing life-threatening symptoms such as chest pain or shortness of breath, we always recommend calling 999 instead of booking an appointment."
          longTextTitle="TITLE"
          shortText="Next initial appointment on Fri, Oct 28"
        />
        <InfoBox
          backgroundColour="orange"
          icon={null}
          isShortInfo={true}
          longText="If you're experiencing life-threatening symptoms such as chest pain or shortness of breath, we always recommend calling 999 instead of booking an appointment."
          longTextTitle="TITLE"
          shortText="Next initial appointment on Fri, Oct 28"
        />
        <Themes theme={'D-HCA-Teal'}>
          <Text tag="p" variation="body-medium-small">
            Last checked: 1 min ago
          </Text>
        </Themes>
        <Container marginTop="spacing-5">
          <Button
            variation="full-dark"
            size="small"
            contentVariation="full-width"
          >
            <button>
              <span>
                <strong>Book</strong> online
              </span>
            </button>
          </Button>
          <Button
            variation="outline"
            size="small"
            contentVariation="full-width"
          >
            <button>
              <Icons iconName="iconPhone" />
              <span>
                <strong>Call to</strong> book
              </span>
            </button>
          </Button>
        </Container>
      </div>
    ),
  },
};
