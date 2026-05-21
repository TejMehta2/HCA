/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

// Template finder component

import { type JSX, Suspense } from 'react';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  ComponentRendering,
  Image as JssImage,
  ImageField,
  Field,
  LinkField,
} from '@sitecore-content-sdk/nextjs';
import Button from '@component-library/core-components/Button/Button';
import Text from '@component-library/foundation/Text/Text';
import HeaderLDB from '@component-library/consultant-finder/HeaderLDB/HeaderLDB';
import ProgressBar from '@component-library/the-birth-company/ProgressBar/ProgressBar';
import { TheBirthCompanyContextProvider } from '@component-library/context/theBirthCompanyContext';
import { TheBirthCompanyContext } from '@component-library/context/theBirthCompanyContext';

import Navigation from '@component-library/consultant-finder/Navigation/Navigation';
import TextButton from '@component-library/core-components/TextButton/TextButton';
import Icons from '@component-library/foundation/Icons/Icons';
import Container from '@component-library/foundation/Containers/Container';
import SitecoreSvg from 'src/jss-abstractions/SitecoreSvg/SitecoreSvg';

import SlotsCalendarBirthCompany from '@component-library/the-birth-company/SlotsCalendar/SlotsCalendarBirthCompany';

interface Fields {
  HCALogo: ImageField;
  CurrentStep: any;
  Steps: any;
  CardImage: ImageField;
  StartLink: LinkField;
  NextLink: LinkField;
  BackLink: LinkField;
  TitleText: Field<string>;
  KeyShortNoticeText: Field<string>;
  KeyBookOnlineText: Field<string>;
  AppointmentSelectedText: Field<string>;
  API_C2_GetConsultantSlots_LoadingMsg: Field<string>;
  API_C2_GetConsultantSlots_Header: Field<string>;
  API_C2_GetConsultantSlots_BaseURL: Field<string>;
  API_C2_GetConsultantSlots_NoResultsMsg: Field<string>;
  ViewMapText: Field<string>;
  PhoneNumberToBook: Field<string>;
  PhoneNumberIcon: any;
  ChooseTimeHeading: Field<string>;
  BookByPhoneIcon: any;
}

type StepProps = {
  rendering: ComponentRendering;
  params: { [key: string]: string };
  fields: Fields;
};

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
      <TbcSlots {...props} />
    </TheBirthCompanyContextProvider>
  );
};

export const TbcSlots = (props: StepProps): JSX.Element => {
  const {
    setSelectedLocation,
    setSelectedTypeOfAppointment,
    setSelectedScanId,
    setSelectedExtras,
    setSelectedSlotId,
    selectedSlotId,
    selectedDate,
    selectedTime,
  } = useContext(TheBirthCompanyContext);
  const id = props.params.RenderingIdentifier;

  const searchParams = useSearchParams();
  const paramScanId = searchParams.get('scanId');
  const paramLocationId = searchParams.get('locationId');
  const paramTypeId = searchParams.get('typeId');
  const paramSlotId = searchParams.get('slotId');
  const paramExtras = useMemo(
    () => searchParams.getAll('extraId'),
    [searchParams]
  );

  const [extras, setExtras] = useState('');

  const router = useRouter();

  // Set params for next page
  const nextPageParams = new URLSearchParams(searchParams.toString());

  if (selectedSlotId) {
    nextPageParams.set('slotId', selectedSlotId);
  }

  function formatQueryParams(ids: string[]): string {
    const extrasString = ids
      .map((id) => `extraId=${encodeURIComponent(id)}`)
      .join('&');
    return `&${extrasString}`;
  }

  useEffect(() => {
    if (paramLocationId) {
      setSelectedLocation(paramLocationId);
    }

    if (paramScanId) {
      setSelectedScanId(paramScanId);
    }

    if (paramTypeId) {
      setSelectedTypeOfAppointment(paramTypeId);
    }

    if (paramSlotId) {
      setSelectedSlotId(paramSlotId);
    }
    if (paramExtras) {
      if (paramExtras.length > 0) {
        setSelectedExtras(paramExtras);

        setExtras(formatQueryParams(paramExtras));
      }
    }
  }, [
    paramLocationId,
    setSelectedLocation,
    paramScanId,
    setSelectedScanId,
    paramTypeId,
    setSelectedTypeOfAppointment,
    paramSlotId,
    setSelectedSlotId,
    paramExtras,
    setSelectedExtras,
  ]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    //  if any required params are missing redirect back to the start of the journey
    if (!paramScanId || !paramLocationId || !paramTypeId) {
      router.push('/booking/location');
    }
  }, [router, paramScanId, paramLocationId, paramTypeId]);

  if (props.fields) {
    return (
      <div
        className={`component promo ${props.params.styles}`}
        id={id ? id : undefined}
      >
        {
          <>
            <HeaderLDB
              logo={<JssImage field={props?.fields?.HCALogo} />}
              progress={
                <ProgressBar
                  currentPage={props?.fields?.CurrentStep?.value}
                  steps={props?.fields?.Steps}
                ></ProgressBar>
              }
            ></HeaderLDB>
            <SlotsCalendarBirthCompany
              titleText={
                props?.fields?.TitleText?.value || 'Please select a slot'
              }
              keyShortNoticeText={
                props?.fields?.KeyShortNoticeText?.value || ''
              }
              keyBookOnlineText={props?.fields?.KeyBookOnlineText?.value || ''}
              API_C2_GetConsultantSlots_LoadingMsg={
                props?.fields?.API_C2_GetConsultantSlots_LoadingMsg?.value || ''
              }
              API_C2_GetConsultantSlots_BaseURL={
                props?.fields?.API_C2_GetConsultantSlots_BaseURL?.value ||
                'https:/api/C2/GetLDBConsultantSlots?'
              }
              API_C2_GetConsultantSlots_NoResultsMsg={
                props?.fields?.API_C2_GetConsultantSlots_NoResultsMsg?.value ||
                'No slots found'
              }
              viewMapText={
                props?.fields?.ViewMapText?.value ||
                'View location on Google Maps'
              }
              chooseTimeHeading={
                props?.fields?.ChooseTimeHeading?.value || 'Choose time'
              }
              shortNoticeIcon={
                <SitecoreSvg>
                  {props?.fields?.BookByPhoneIcon?.fields?.SvgMarkup?.value}
                </SitecoreSvg>
              }
            />
            <Navigation hideTextMobile={true}>
              <div>
                <TextButton>
                  <Link
                    href={`${props?.fields?.BackLink?.value?.href}?scanId=${paramScanId}&locationId=${paramLocationId}&typeId=${paramTypeId}&slotId=${selectedSlotId}${extras}`}
                  >
                    <Icons iconName="iconArrowSmallLeft" />
                    <span>{props.fields.BackLink.value.text || 'Back'}</span>
                  </Link>
                </TextButton>
              </div>
              {selectedDate !== '' && selectedTime !== '' && (
                <Text tag="p" variation="body-medium-extra-large">
                  {`${
                    props?.fields?.AppointmentSelectedText?.value ||
                    'Appointment selected on'
                  } ${selectedDate} at ${selectedTime}`}
                </Text>
              )}

              <Container>
                <Button size={'small'} variation={'full-dark'}>
                  <button
                    disabled={
                      selectedDate === '' && selectedTime === '' ? true : false
                    }
                    onClick={() =>
                      router.push(
                        `${props?.fields?.NextLink?.value?.href}?scanId=${paramScanId}&locationId=${paramLocationId}&typeId=${paramTypeId}&slotId=${selectedSlotId}${extras}`
                      )
                    }
                  >
                    <span>
                      {props?.fields?.NextLink?.value?.text || 'Book Slot'}
                    </span>
                  </button>
                </Button>
              </Container>
            </Navigation>
          </>
        }
      </div>
    );
  }

  return <StepDefaultComponent {...props} />;
};
