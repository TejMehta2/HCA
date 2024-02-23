import React from 'react';
import { render } from '@testing-library/react';
import MarketingPreferences from './MarketingPreferences';
import { MarketingPreferencesProps } from './MarketingPreferences.types';
import Checkboxes from '../../core-components/Checkboxes/Checkboxes';
import Checkbox from '../../core-components/Checkbox/Checkbox';
import Text from '../../foundation/Text/Text';

const mockProps: MarketingPreferencesProps = {
  title: <Text variation="body-bold-extra-large">Marketing preferences</Text>,
  bodyCopy: (
    <Text>
      I consent to my Personal Data being used for information to be sent to me
      which is relevant to me and/or my treatment. This may include updates on
      new clinical products, services or HCA facilities, patient events or
      information regarding HCA charity initiatives. For further information on
      how your data is used, read our <a href="/">Privacy Policy</a>.
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
      <Checkbox label="Post" name="contactPreference" value="post" id="post" />
    </Checkboxes>
  ),
};

describe('MarketingPreferences', () => {
  it('Renders children from props', async () => {
    const { getByText } = render(<MarketingPreferences {...mockProps} />);
    expect(getByText('Marketing preferences')).toBeVisible();
  });
});
