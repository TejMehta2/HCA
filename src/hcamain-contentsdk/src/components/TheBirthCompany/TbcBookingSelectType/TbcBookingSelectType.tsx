/* eslint-disable */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

// Template finder component
import { type JSX, Suspense } from 'react';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import {
  Image as JssImage,
  Text as JssText,
  ImageField,
  Field,
  LinkField,
} from '@sitecore-content-sdk/nextjs';
import Button from '@component-library/core-components/Button/Button';
import Text from '@component-library/foundation/Text/Text';
import HeaderLDB from '@component-library/consultant-finder/HeaderLDB/HeaderLDB';
import ProgressBar from '@component-library/the-birth-company/ProgressBar/ProgressBar';
import TextButton from '@component-library/core-components/TextButton/TextButton';
import Navigation from '@component-library/consultant-finder/Navigation/Navigation';
import Icons from '@component-library/foundation/Icons/Icons';
import Headline from '@component-library/consultant-finder/Headline/Headline';

import { TheBirthCompanyContextProvider } from '@component-library/context/theBirthCompanyContext';
import LoaderCF from '@component-library/consultant-finder/LoaderCF/LoaderCF';
import BookingTypeCards from '@component-library/the-birth-company/BookingTypeCards/BookingTypeCards';
interface Fields {
  HCALogo: ImageField;
  CurrentStep: any;
  Steps: any;
  SonographerIcon: any;
  SonographerTitle: Field<string>;
  SonographerBodyText: Field<string>;
  ConsultantTitle: Field<string>;
  ConsultantIcon: any;
  ConsultantBodyText: Field<string>;
  Title: Field<string>;
  CardImage: ImageField;
  StartLink: LinkField;
  NextLink: LinkField;
  BackLink: LinkField;
  BodyText: Field<string>;
  CantFindBannerText: Field<string>;
  CantFindPhoneNumber: Field<string>;
  CantFindIcon: any;
  servicesFolder: {
    id: string;
  };
}

type StepProps = {
  params: { [key: string]: string };
  fields: Fields;
};

interface TypeFields {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  type: 'booking' | 'phone' | 'cta';
  link: {
    title: string;
    url: string;
  };
}

const StepDefaultComponent = (props: StepProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Consultant Finder Step</span>
    </div>
  </div>
);

export const Default = (props: StepProps): JSX.Element => {
  return (
    <TheBirthCompanyContextProvider>
      <Suspense fallback={null}>
        <TbcLocations {...props} />
      </Suspense>
    </TheBirthCompanyContextProvider>
  );
};

export const TbcLocations = (props: StepProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const router = useRouter();
  const [appointmentTypes, setAppointmentTypes] = useState<TypeFields[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const searchParams = useSearchParams();

  // Set params for next page
  const nextPageParams = new URLSearchParams(searchParams.toString());
  const configurationId = props.fields.servicesFolder.id;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    const paramScanId = searchParams.get('scanId');
    const paramExtras = searchParams.getAll('extraId');
    const paramLocationId = searchParams.get('locationId');

    //  if any required params are missing redirect back to the start of the journey
    if (!paramLocationId) {
      router.push('/booking/location');
    }

    const extras = paramExtras.map((extra) => `&extraId=${extra}`).join('');

    const requestURL = `${process.env.NEXT_PUBLIC_INTEGRATION_LAYER_PROXY_PATH}/tbcbooking/types?scanid=${paramScanId}&locationid=${paramLocationId}&configurationid=${configurationId}${extras}`;

    axios
      .get(requestURL)
      .then((res) => {
        setLoading(false);
        setError(false);
        setAppointmentTypes(res?.data || []);
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      });
  }, [router, searchParams, configurationId]);

  const handleSubmit = (selectedTypeId: string) => {
    nextPageParams.set('typeId', selectedTypeId);
    router.push(`${props?.fields?.NextLink?.value?.href}?${nextPageParams}`);
  };

  const typeCtas = appointmentTypes.map((appointmentType) => {
    let cta;

    if (appointmentType.type === 'phone') {
      cta = (
        <>
          <Text variation="body-bold-small" tag="p">
            Enquire Now:
          </Text>
          <TextButton>
            <a href={`tel:${appointmentType.link.url}`}>
              <Icons iconName="iconPhone" />
              {appointmentType.link.title}
            </a>
          </TextButton>
        </>
      );
    } else if (appointmentType.type === 'booking') {
      cta = (
        <Button size="small" variation="full">
          <button onClick={() => handleSubmit(appointmentType.id)}>
            <span>
              <Icons iconName="iconCalendar" />
            </span>
            <span>{appointmentType.link.title}</span>
          </button>
        </Button>
      );
    } else if (appointmentType.type === 'cta') {
      cta = (
        <Button size="small" variation="full">
          <a href={appointmentType.link.url}>
            <span>
              <Icons iconName="iconCalendar" />
            </span>
            <span>{appointmentType.link.title}</span>
          </a>
        </Button>
      );
    }

    return {
      title: <span>{appointmentType.name}</span>,
      copy: <span>{appointmentType.description}</span>,
      cta: cta,
    };
  });

  if (props.fields) {
    return (
      <>
        <div
          className={`component promo ${props.params.styles}`}
          id={id ? id : undefined}
        >
          {
            <div className="component-content">
              <HeaderLDB
                logo={<JssImage field={props?.fields?.HCALogo} />}
                progress={
                  <ProgressBar
                    currentPage={props?.fields?.CurrentStep?.value}
                    steps={props?.fields?.Steps}
                  ></ProgressBar>
                }
              ></HeaderLDB>
              <Headline>
                <Text tag="h1" variation="heading-1">
                  <JssText field={props?.fields?.Title}></JssText>
                </Text>
              </Headline>
              {loading && <LoaderCF />}
              {!loading && !error && <BookingTypeCards cards={typeCtas} />}
            </div>
          }
        </div>
        <Navigation>
          <div>
            <TextButton>
              <Link
                href={`${props?.fields?.BackLink?.value?.href
                  }?${searchParams.toString()}`}
              >
                <Icons iconName="iconArrowSmallLeft" />
                <span>{props.fields.BackLink.value.text || 'Back'}</span>
              </Link>
            </TextButton>
          </div>
        </Navigation>
      </>
    );
  }

  return <StepDefaultComponent {...props} />;
};
