import React from 'react';
import MarketingPreferences from './MarketingPreferences';
import type { Meta, StoryObj } from '@storybook/react';
import Checkboxes from '../../core-components/Checkboxes/Checkboxes';
import Checkbox from '../../core-components/Checkbox/Checkbox';
import Text from '../../foundation/Text/Text';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof MarketingPreferences> = {
  title: 'site-components/MarketingPreferences',
  component: MarketingPreferences,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<typeof MarketingPreferences> = {
  args: {
    title: <Text variation="body-bold-extra-large">Marketing preferences</Text>,
    bodyCopy: (
      <Text>
        I consent to my Personal Data being used for information to be sent to
        me which is relevant to me and/or my treatment. This may include updates
        on new clinical products, services or HCA facilities, patient events or
        information regarding HCA charity initiatives. For further information
        on how your data is used, read our <a href="/">Privacy Policy</a>.
      </Text>
    ),
    preferences: (
      <Checkboxes>
        <Checkbox
          label="Email"
          name="contactPreference"
          value="email"
          id="email"
        />
        <Checkbox label="SMS" name="contactPreference" value="sms" id="sms" />
        <Checkbox
          label="Phone"
          name="contactPreference"
          value="phone"
          id="phone"
        />
        <Checkbox
          label="Post"
          name="contactPreference"
          value="post"
          id="post"
        />
      </Checkboxes>
    ),
  },
};
