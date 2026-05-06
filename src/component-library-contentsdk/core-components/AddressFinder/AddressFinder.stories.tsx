import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import AddressFinder from './AddressFinder';
import Themes from '../../foundation/Themes/Themes';

import TextField from '../form/basic/TextField/TextField';

const meta: Meta<typeof AddressFinder> = {
  title: 'core-components/AddressFinder',
  component: AddressFinder,
};

export default meta;
type Story = StoryObj<typeof AddressFinder>;

export const Default: Story = {
  render: () => (
    <AddressFinder
      render={(splitAddressResponse) => {
        if (!splitAddressResponse) return <></>;
        const { address1, address2, postcode, town } = splitAddressResponse;
        return (
          <>
            <TextField
              label={'Line 1'}
              name={'line1'}
              type="text"
              defaultValue={address1 || ''}
            />
            <TextField
              label={'Line 2'}
              name={'line2'}
              type="text"
              defaultValue={address2 || ''}
            />
            <TextField
              label={'Postcode'}
              name={'postcode'}
              type="text"
              defaultValue={postcode || ''}
            />
            <TextField
              label={'Town'}
              name={'town'}
              type="text"
              defaultValue={town || ''}
            />
          </>
        );
      }}
    />
  ),
  decorators: [
    (Story) => (
      <Themes theme="A-HCA-White">
        <Story />
      </Themes>
    ),
  ],
};

export const WithError: Story = {
  render: () => (
    <AddressFinder
      error={'Error message'}
      render={(splitAddressResponse) => {
        if (!splitAddressResponse) return <></>;
        const { address1, address2, postcode, town } = splitAddressResponse;
        return (
          <>
            <TextField
              label={'Line 1'}
              name={'line1'}
              type="text"
              defaultValue={address1 || ''}
            />
            <TextField
              label={'Line 2'}
              name={'line2'}
              type="text"
              defaultValue={address2 || ''}
            />
            <TextField
              label={'Postcode'}
              name={'postcode'}
              type="text"
              defaultValue={postcode || ''}
            />
            <TextField
              label={'Town'}
              name={'town'}
              type="text"
              defaultValue={town || ''}
            />
          </>
        );
      }}
    />
  ),
  decorators: [
    (Story) => (
      <Themes theme="A-HCA-White">
        <Story />
      </Themes>
    ),
  ],
};
