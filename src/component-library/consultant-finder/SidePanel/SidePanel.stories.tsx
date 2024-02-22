import React from 'react';
import SidePanel from './SidePanel';
import type { Meta, StoryObj } from '@storybook/react';
import InfoBox from '../InfoBox/InfoBox';
import Reviews from '../Reviews/Reviews';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof SidePanel> = {
  title: 'consultant-finder/SidePanel',
  component: SidePanel,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
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
      </div>
    ),
  },
};
