import Container from './Container';
import type { Meta, StoryObj } from '@storybook/react';
import Button from '../../core-components/Button/Button';
import { JSX } from 'react';
import ConatinerProps from './Container.types';
import React from 'react';
import Icons from '../Icons/Icons';

const meta: Meta<typeof Container> = {
  title: 'foundation/Container',
  component: Container,
};

export default meta;

export const Default: StoryObj<typeof Container> = (
  args: JSX.IntrinsicAttributes & ConatinerProps
) => (
  <>
    <Container {...args}>
      <Button variation="full-dark" size="large" contentVariation="full-width">
        <button>
          <span>Button Text</span>
          <Icons iconName="iconPhone" />
        </button>
      </Button>
      <Button variation="full-dark" size="large" contentVariation="full-width">
        <button>
          <span>Button Text</span>
          <Icons iconName="iconPhone" />
        </button>
      </Button>
    </Container>
  </>
);

Default.args = {
  marginTop: 'spacing-8',
  marginBottom: 'spacing-8',
  marginLeft: 'spacing-8',
  marginRight: 'spacing-8',
  displayFlex: 'displayFlex',
  width: '',
  withButtons: true,
};
