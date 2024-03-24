import React from 'react';
import Text from '../../foundation/Text/Text';
import Image from 'next/image';
import YextResultCardConsultants from './YextResultCardConsultants';
import { CardProps } from '@yext/search-ui-react';
import Doctify from '../../components/Doctify/Doctify';
import Icons from '../../foundation/Icons/Icons';

// TODO - replace these props with Yext type generated interfaced
// https://hitchhikers.yext.com/docs/search/search-result-typing/?target=using-generated-types-in-your-project
interface YextConsultantCardProps {}

const YextResultCardConsultantsAdaptor = (
  props: CardProps<YextConsultantCardProps>
): JSX.Element => {
  const {} = props;
  // TODO - unpack props to replace these static values once Yext type generation is available
  const title = 'Christian Brown';
  const copy =
    "Mr Christian Brown is a Consultant Urological Surgeon and a member of the prostate robotic and laparoscopic teams at King's College Hospital....";
  const image = {
    alt: 'doctor headshot',
    src: '/placeholders/doctor-portrait-circle.png',
    width: 140,
    height: 140,
  };
  const cta = {
    url: '#',
    label: 'View profile',
  };
  const doctifyRating = 4;
  const doctifyReviews = '13,500 +';
  const phoneNumber = '020 3993 1861';
  const specialties = 'General Urology, Urology, Urological Oncology';

  return (
    <YextResultCardConsultants
      image={
        <>
          <Image {...image} />
        </>
      }
      title={
        <Text tag="h3" variation={'heading-1'}>
          {title}
        </Text>
      }
      copy={
        <Text tag="div" variation={'body-large'}>
          {copy}
        </Text>
      }
      cta={<a href={cta.url}>{cta.label}</a>}
      doctify={
        <Doctify
          alignment="left"
          link={<a href="#"></a>}
          rating={doctifyRating}
          reviews={doctifyReviews}
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
      }
      phone={{
        icon: <Icons iconName="iconPhone"></Icons>,
        text: (
          <Text variation="body-large" tag="span">
            {phoneNumber}
          </Text>
        ),
      }}
      specialties={{
        icon: <Icons iconName="iconStethoscope"></Icons>,
        text: (
          <Text variation="body-large" tag="span">
            {specialties}
          </Text>
        ),
      }}
    />
  );
};

export default YextResultCardConsultantsAdaptor;
