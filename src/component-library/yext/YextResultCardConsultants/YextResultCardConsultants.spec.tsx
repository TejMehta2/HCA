import React from 'react';
import { render } from '@testing-library/react';
import YextResultCardConsultants from './YextResultCardConsultants';
import { YextResultCardConsultantsProps } from './YextResultCardConsultants.types';
import Text from '../../foundation/Text/Text';
import Icons from '../../foundation/Icons/Icons';
import Image from 'next/image';
import Doctify from '../../components/Doctify/Doctify';

const mockProps: YextResultCardConsultantsProps = {
  image: (
    <Image
      src="/placeholders/doctor-portrait-circle.png"
      alt="doctor headshot"
      width="140"
      height="140"
    />
  ),
  title: <Text variation="heading-1">Christian Brown</Text>,
  doctify: (
    <Doctify
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
    />
  ),
  copy: (
    <Text variation="body-large">
      Mr Christian Brown is a Consultant Urological Surgeon and a member of the
      prostate robotic and laparoscopic teams at King&apos;s College
      Hospital....
    </Text>
  ),
  phone: {
    icon: <Icons iconName="iconPhone"></Icons>,
    text: (
      <Text variation="body-large" tag="span">
        020 3993 1861
      </Text>
    ),
  },
  specialties: {
    icon: <Icons iconName="iconStethoscope"></Icons>,
    text: (
      <Text variation="body-large" tag="span">
        General Urology, Urology, Urological Oncology
      </Text>
    ),
  },
  cta: <a href="#">View profile</a>,
};

describe('YextResultCardConsultants', () => {
  it('Renders title from props', async () => {
    const { getByText } = render(<YextResultCardConsultants {...mockProps} />);
    expect(getByText('Christian Brown')).toBeVisible();
  });
});
