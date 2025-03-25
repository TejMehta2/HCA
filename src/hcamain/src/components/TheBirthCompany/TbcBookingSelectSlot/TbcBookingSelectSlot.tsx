/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// Template finder component

import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  GetStaticComponentProps,
  ComponentRendering,
  Image as JssImage,
  ImageField,
  Field,
  LinkField,
  LayoutServiceData,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Button from '@component-library/core-components/Button/Button';
import Text from '@component-library/foundation/Text/Text';
import HeaderLDB from '@component-library/consultant-finder/HeaderLDB/HeaderLDB';
import ProgressBar from '@component-library/consultant-finder/ProgressBar/ProgressBar';
import Navigation from '@component-library/consultant-finder/Navigation/Navigation';
import TextButton from '@component-library/core-components/TextButton/TextButton';
import Icons from '@component-library/foundation/Icons/Icons';
import Container from '@component-library/foundation/Containers/Container';
import SitecoreSvg from 'src/jss-abstractions/SitecoreSvg/SitecoreSvg';
import { GetServerSidePropsContext } from 'next';
import { TheBirthCompanyContext } from 'src/context/theBirthCompanyContext';
import axios from 'axios';
import {
  formatDateYYYYMMDD,
  formatDateLong,
  removeSeconds,
  formatTime12hr,
} from '@component-library/utility-functions';

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

// interface ServerSideProps {
//   Holidays: any;
// }

/**
 * if exported, will be called if/during SSG
 * @param {ComponentRendering} _rendering
 * @param {LayoutServiceData} _layoutData
 * @param {GetStaticPropsContext} _context
 */
/*export*/ const getStaticProps: GetStaticComponentProps = async () => {
  // const holidaysJson = await getHolidays();
  // const returnProps: ServerSideProps = {
  //   Holidays: holidaysJson,
  // };
  //console.log('holidaysJson', holidaysJson);
  //return returnProps;
  return 'ok';
};

// will be called if not SSG
export async function getServerSideProps(
  rendering: ComponentRendering,
  layoutData: LayoutServiceData,
  context: GetServerSidePropsContext
) {
  // proxy to GetStaticComponentProps
  return await getStaticProps(rendering, layoutData, context);
}

const StepDefaultComponent = (props: StepProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Consultant Finder Step</span>
    </div>
  </div>
);

export const Default = (props: StepProps): JSX.Element => {
  // const serverSideData = useComponentProps<ServerSideProps>(
  //   props.rendering.uid
  // );
  //console.log('serverSideData', serverSideData);

  //const holidaysUK = serverSideData?.Holidays;

  console.log('steps slot', props);
  const {
    selectedLocationName,
    locationGUID,
    selectedTypeOfAppointment,
    consultantGUID,
    fristAppointmentDate,
    lat,
    lon,
    selectedDate,
    selectedTime,
    isBookableContent,
    setSelectedDate,
    //setSelectedTime,
    //setStartTime,
    setIsBookableContent,
  } = useContext(TheBirthCompanyContext);
  const id = props.params.RenderingIdentifier;
  const router = useRouter();
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const [firstDayOfWeek, setFirstDayOfWeek] = useState<any>(null);
  const [, setLastDayOfWeek] = useState<any>(null);
  const [dates, setDates] = useState([]);
  const [year, setYear] = useState(null);
  const [days, setDays] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [noSlots, setNoSlots] = useState(false);
  const [disablePrev, setDisablePrev] = useState(true);
  const [disableNext, setDisableNext] = useState(true);
  const [datesNotToBook, setDatesNotToBook] = useState<any>([]);
  const [slotsUrl, setSlotsUrl] = useState<string>('');

  const searchParams = useSearchParams();

  // Set params for next page
  const nextPageParams = new URLSearchParams(searchParams.toString());
  if (selectedDate) {
    nextPageParams.set('slotId', selectedDate);
  }

  const getFirstDayOfWeek = (date: any) => {
    const firstDayOfWeek = new Date(date);
    const dayOfWeek = firstDayOfWeek.getDay();
    // check if day is Sunday, then get current week
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    firstDayOfWeek.setDate(firstDayOfWeek.getDate() + diff);
    return firstDayOfWeek;
  };

  const getLastDayOfWeek = (firstDayOfWeek: any) => {
    const lastDayOfWeek = new Date(
      firstDayOfWeek.getFullYear(),
      firstDayOfWeek.getMonth(),
      firstDayOfWeek.getDate() + 6
    );
    return lastDayOfWeek;
  };

  const getDates: any = (firstDayOfWeek: any, lastDayOfWeek: any) => {
    const dates = [];
    const currentDate: any = new Date(firstDayOfWeek);

    //console.log('getdates', currentDate, lastDayOfWeek);
    while (currentDate < lastDayOfWeek) {
      const options: object = { day: 'numeric', month: 'short' };
      const dateString = new Intl.DateTimeFormat('en-US', options).format(
        currentDate
      );
      dates.push(dateString);
      currentDate.setDate(currentDate.getDate() + 1);
      setYear(currentDate.getFullYear());
    }
    // Add last day to the dates array
    const options: object = { day: 'numeric', month: 'short' };
    const dateString = new Intl.DateTimeFormat('en-US', options).format(
      lastDayOfWeek
    );
    dates.push(dateString);
    return dates;
  };

  // useEffect(() => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth',
  //   });

  //   // if (!router.isReady) {
  //   //   return;
  //   // }

  //   // get slug from URL
  //   const slug = router?.query?.slug || '';
  //   setSlug(slug.toString());

  //   // get gmc number from URL
  //   const gmcNumber = router?.query?.gmcNumber || '';
  //   setGmcNumber(gmcNumber.toString());

  //   // if selected location and appointment type is missing then redirect to appointment type
  //   // if (selectedLocation === '' && selectedTypeOfAppointment === '') {
  //   //   router.push(
  //   //     `/finder/step-terms-and-conditions?slug=${slug}&gmcNumber=${gmcNumber}&reviewsTotal=${reviewsTotal}`
  //   //   );
  //   // }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [router.isReady]);

  const getSlots = useCallback(
    (firstDay: string, lastDay: string) => {
      setLoadingSlots(true);
      setDisablePrev(true);
      setDisableNext(true);
      setSelectedDate('');
      setIsBookableContent(true);

      console.log('slotsURL', slotsUrl);
      axios
        .get(`${slotsUrl}&from=${firstDay}`)
        .then((res) => {
          setLoadingSlots(false);

          const uniqueDates = [
            ...new Set(
              res?.data?.slots.map((slot: any) => slot.startTime.split('T')[0])
            ),
          ];

          const days: any = uniqueDates.map((date) => ({
            date: date,
            slots: res?.data?.slots
              .filter((slot: any) => slot.startTime.split('T')[0] === date)
              .map((slot: any) => ({
                startTime: slot.startTime,
                endTime: slot.endTime,
              })),
          }));

          // enable next/ prev after slots call was completed
          // prev also needs to check against first available date and remain disable if prev week will be before the week containing it
          setDisableNext(false);
          setDisablePrev(false);

          if (firstDay !== null) {
            const currentDate = new Date(fristAppointmentDate);
            currentDate.setHours(0, 0, 0, 0); // Reset time to midnight
            const parsedFirstDayOfWeek = new Date(firstDay);
            parsedFirstDayOfWeek.setHours(0, 0, 0, 0); // Reset time to midnight
            const lastDayOfPrevWeek = new Date(
              parsedFirstDayOfWeek.getTime() - 24 * 60 * 60 * 1000
            );

            // console.log('first day of the week', firstDayOfWeek);
            // console.log('current date', currentDate);
            // console.log('lastDayOfPrevWeek', lastDayOfPrevWeek);

            if (currentDate > lastDayOfPrevWeek) {
              setDisablePrev(true);
            } else {
              setDisablePrev(false);
            }
          }

          if (res?.data?.slots.length > 0) {
            setNoSlots(false);
            setDays(days);
          } else {
            setNoSlots(true);
            setDays([]);
          }
        })
        .catch((error) => {
          console.log(error);
          setLoadingSlots(false);
          setDisablePrev(true);
          setDisableNext(true);
        });
    },
    [slotsUrl]
  );

  useEffect(() => {
    setLoadingSlots(true);
    const firstDay: any = getFirstDayOfWeek(new Date(fristAppointmentDate));
    setFirstDayOfWeek(firstDay);
    const lastDay: any = getLastDayOfWeek(firstDay);
    setLastDayOfWeek(lastDay);
    // console.log('fristAppointmentDate', fristAppointmentDate);
    // console.log('firstDay', formatDateYYYYMMDD(firstDay));
    // console.log('lastDay', formatDateYYYYMMDD(lastDay));

    const paramScanId = searchParams.get('scanId');
    const paramExtras = searchParams.getAll('extraId');
    const paramLocationId = searchParams.get('locationId');
    const paramTypeId = searchParams.get('typeId');
    const extras = paramExtras.map((extra) => `&extraId=${extra}`).join('');

    console.log('paramScanId', paramScanId);

    const getSlotsURL = `${process.env.NEXT_PUBLIC_INTEGRATION_LAYER_PROXY_PATH}/tbcbooking/calendar?scanid=${paramScanId}&locationid=${paramLocationId}&typeid=${paramTypeId}${extras}`;
    setSlotsUrl(getSlotsURL);

    console.log('slotsurl useeffect', getSlotsURL);

    getSlots(formatDateYYYYMMDD(firstDay), formatDateYYYYMMDD(lastDay));

    setDates(getDates(firstDay, lastDay));

    const holidays: any[] = [];

    if (holidays !== null && holidays !== undefined) {
      const holidaysUKData = holidays
        .map((item: any) => item.Values)
        .map((item: any) => item.ISODate);
      // console.log('holidaysUKData', holidaysUKData);
      setDatesNotToBook(holidaysUKData);
    } else {
      setDatesNotToBook([]);
    }
  }, [searchParams, fristAppointmentDate, getSlots]);

  console.log('days', days);

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
            {/* <SlotsCalendar
              holidays={holidaysUK}
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
            /> */}
            <Navigation hideTextMobile={true}>
              <div>
                <TextButton>
                  <Link
                    href={`${props?.fields?.BackLink?.value
                      ?.href}?${searchParams.toString()}`}
                  >
                    <Icons iconName="iconArrowSmallLeft" />
                    <span>{props.fields.BackLink.value.text || 'Back'}</span>
                  </Link>
                </TextButton>
              </div>
              {selectedDate !== '' && selectedTime !== '' && (
                <Text tag="p" variation="body-medium-extra-large">
                  {isBookableContent &&
                    `${
                      props?.fields?.AppointmentSelectedText?.value ||
                      'Appointment selected on'
                    } ${selectedDate} at ${selectedTime}`}
                  {!isBookableContent &&
                    props?.fields?.KeyShortNoticeText?.value}
                </Text>
              )}
              {isBookableContent && (
                <Container>
                  <Button size={'small'} variation={'full-dark'}>
                    <button
                      disabled={
                        selectedDate === '' && selectedTime === ''
                          ? true
                          : false
                      }
                      onClick={() =>
                        router.push(
                          `${props?.fields?.NextLink?.value
                            ?.href}?${nextPageParams.toString()}`
                        )
                      }
                    >
                      <span>
                        {props?.fields?.NextLink?.value?.text || 'Book Slot'}
                      </span>
                    </button>
                  </Button>
                </Container>
              )}
              {!isBookableContent && (
                <Container customBtn={true}>
                  <Button size={'small'} variation={'full-dark'}>
                    <a
                      href={`tel:${props?.fields?.PhoneNumberToBook?.value.replace(
                        /\s/g,
                        ''
                      )}`}
                    >
                      <SitecoreSvg>
                        {
                          props?.fields?.PhoneNumberIcon?.fields?.SvgMarkup
                            ?.value
                        }
                      </SitecoreSvg>
                      <span>{props?.fields?.PhoneNumberToBook?.value}</span>
                    </a>
                  </Button>
                </Container>
              )}
            </Navigation>
          </>
        }
      </div>
    );
  }

  return <StepDefaultComponent {...props} />;
};
