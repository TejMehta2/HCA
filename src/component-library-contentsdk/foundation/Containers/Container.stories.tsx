import Container from './Container';
import type { Meta, StoryObj } from '@storybook/react';
import Button from '../../core-components/Button/Button';
import { JSX } from 'react';
import ConatinerProps from './Container.types';
import React from 'react';
import Icons from '../Icons/Icons';
import About from '../../consultant-finder/About/About';
import DataComponentSimple from '../../consultant-finder/DataComponentSimple/DataComponentSimple';
import ProfilePageSection from '../../consultant-finder/ProfilePageSection/ProfilePageSection';

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

export const GridLayout: StoryObj<typeof Container> = (
  args: JSX.IntrinsicAttributes & ConatinerProps
) => (
  <>
    <Container {...args}>
      <ProfilePageSection>
        <About
          description="Patrick is unusual in that he is dually accredited as both a GP and a Consultant Physician in General Internal Medicine. Graduating from Dublin, he spent a year doing paediatric accident and emergency in one of Europe’s busiest stand-alone paediatric hospitals before completing his GP vocational training in Cambridge, where he worked as a GP for almost 10 years, apart from a brief spell as a Ship’s Physician for Carnival Cruise Lines. Moving to rural Scotland in 2009, he undertook additional training to accredit as a Consultant Physician in addition to his GP work, living and working in Fort William for 13 years until he joined Palace Gate Practice in 2022.
        Throughout his medical career he has been involved in the teaching and training of medical students and junior doctors, and has held various honorary titles (e.g. Lecturer) with the universities of Cambridge, Edinburgh, Aberdeen and Imperial College here in London. He has been awarded the honour of Fellowship of three UK Royal Colleges for contributions to medicine, training and healthcare.
        He is interested in all aspects of General Practice, adult & elderly medicine, paediatrics, and continues to maintain his consultant skills at various sites across the UK.
        Outside medicine he plays the piano (though not as well as he used to, or would wish to), loves the arts, tennis (a better spectator than player) and his 10 nieces and nephews."
        />
      </ProfilePageSection>
      <ProfilePageSection>
        <DataComponentSimple
          title="Subspecialities"
          data="Foot & Ankle Surgery, Paediatric Orthopaedic Surgery, Sports Injury, Trauma Surgery"
        ></DataComponentSimple>
      </ProfilePageSection>
    </Container>
  </>
);

GridLayout.args = {
  marginTop: 'spacing-7',
  marginBottom: 'spacing-11',
  gridLayout: true,
};
