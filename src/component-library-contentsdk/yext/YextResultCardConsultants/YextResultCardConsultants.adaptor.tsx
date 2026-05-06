import React, { type JSX } from 'react';
import Text from '../../foundation/Text/Text';
import Image from 'next/image';
import YextResultCardConsultants from './YextResultCardConsultants';
import { CardProps } from '@yext/search-ui-react';
import Doctify from '../../components/Doctify/Doctify';
import Icons from '../../foundation/Icons/Icons';
import HealthcareProfessional from '../../types/yext/healthcare_professionals';
import DoctifyLogoDark from '../../assets/images/doctify-dark.png';
import DoctifyLogoLight from '../../assets/images/doctify-light.png';
import TextLink from '../../core-components/TextLink/TextLink';
import { tidySearchDescription } from '../helpers/tidySearchDescription';

const YextResultCardConsultantsAdaptor = (
  props: CardProps<HealthcareProfessional>
): JSX.Element => {
  const { result } = props;
  const { rawData } = result;
  const {
    c_overallExperience,
    c_totalReviews,
    c_body,
    c_specialty,
    mainPhone,
    headshot,
    name,
    websiteUrl,
  } = rawData;

  const cta = {
    url: websiteUrl?.url,
    label: 'View profile',
  };

  const specialties = c_specialty?.map((item) => item.keywordName)?.join(', ');

  const strippedDescription = tidySearchDescription(c_body);

  return (
    <YextResultCardConsultants
      image={
        headshot?.url ? (
          <>
            <Image
              alt={'headshot of ' + name}
              src={headshot?.url}
              width={headshot?.width}
              height={headshot?.height}
            />
          </>
        ) : undefined
      }
      title={
        <Text tag="h3" variation={'heading-1'}>
          {name}
        </Text>
      }
      copy={
        strippedDescription ? (
          <Text tag="div" variation={'body-large'}>
            <span dangerouslySetInnerHTML={{ __html: strippedDescription }} />
          </Text>
        ) : undefined
      }
      cta={<a href={cta.url}>{cta.label}</a>}
      doctify={
        <Doctify
          alignment="left"
          link={<a href="#"></a>}
          rating={c_overallExperience!}
          reviews={c_totalReviews}
          logo={{
            dark: (
              <Image
                src={DoctifyLogoDark}
                alt="doctify logo"
                width="83"
                height="21"
              />
            ),
            light: (
              <Image
                src={DoctifyLogoLight}
                alt="doctify logo"
                width="83"
                height="21"
              />
            ),
          }}
        />
      }
      phone={
        mainPhone ? (
          <TextLink variation={'body-large'}>
            <a href={`tel:${mainPhone}`}>
              <Icons iconName="iconPhone"></Icons>
              <span>{mainPhone as string}</span>
            </a>
          </TextLink>
        ) : undefined
      }
      specialties={
        specialties
          ? {
              icon: <Icons iconName="iconStethoscope"></Icons>,
              text: (
                <Text variation="body-large" tag="span">
                  {specialties}
                </Text>
              ),
            }
          : undefined
      }
    />
  );
};

export default YextResultCardConsultantsAdaptor;
