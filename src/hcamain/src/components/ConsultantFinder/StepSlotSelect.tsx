/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// Template finder component

import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  GetStaticComponentProps,
  useComponentProps,
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
import SlotsCalendar from '@component-library/consultant-finder/SlotsCalendar/SlotsCalendar';
import { ConsultantFinderContext } from '@component-library/context/consultantFinderContext';
import Navigation from '@component-library/consultant-finder/Navigation/Navigation';
import TextButton from '@component-library/core-components/TextButton/TextButton';
import Icons from '@component-library/foundation/Icons/Icons';
import Container from '@component-library/foundation/Containers/Container';
import { getHolidays } from '../../lib/consultant-finder/API_HCA';
import SitecoreSvg from 'src/jss-abstractions/SitecoreSvg/SitecoreSvg';
import { GetServerSidePropsContext } from 'next';

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

interface ServerSideProps {
  Holidays: any;
}

/**
 * if exported, will be called if/during SSG
 * @param {ComponentRendering} _rendering
 * @param {LayoutServiceData} _layoutData
 * @param {GetStaticPropsContext} _context
 */
/*export*/ const getStaticProps: GetStaticComponentProps = async () => {
  const holidaysJson = await getHolidays();
  const returnProps: ServerSideProps = {
    Holidays: holidaysJson,
  };
  //console.log('holidaysJson', holidaysJson);
  return returnProps;
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
  const serverSideData = useComponentProps<ServerSideProps>(
    props.rendering.uid
  );
  //console.log('serverSideData', serverSideData);

  const holidaysUK = serverSideData?.Holidays;

  //console.log('steps slot', props.fields);
  const {
    selectedLocation,
    selectedTypeOfAppointment,
    // setConsultantGUID,
    selectedDate,
    selectedTime,
    isBookableContent,
  } = useContext(ConsultantFinderContext);
  const id = props.params.RenderingIdentifier;
  const router = useRouter();
  const [slug, setSlug] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [gmcNumber, setGmcNumber] = useState<string>('');
  const [reviewsTotal, setReviewsTotal] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    if (!router.isReady) {
      return;
    }

    // get slug from URL
    const slug = router?.query?.slug || '';
    setSlug(slug.toString());

    // get name from URL
    const nameURL = router?.query?.name || '';
    setName(nameURL.toString());

    // get gmc number from URL
    const gmcNumber = router?.query?.gmcNumber || '';
    setGmcNumber(gmcNumber.toString());

    // get reviews total number from URL
    const reviewsTotal = router?.query?.reviewsTotal || null;
    setReviewsTotal(Number(reviewsTotal));

    // if selected location and appointment type is missing then redirect to appointment type
    if (selectedLocation === '' && selectedTypeOfAppointment === '') {
      router.push(
        `/finder/step-terms-and-conditions?slug=${slug}&name=${encodeURIComponent(name)}&gmcNumber=${gmcNumber}&reviewsTotal=${reviewsTotal}`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  if (props.fields) {
    return (
      <div
        className={`component promo ${props.params.styles}`}
        id={id ? id : undefined}
      >
        {router.isReady &&
          selectedLocation !== '' &&
          selectedTypeOfAppointment !== '' && (
            <>
              <HeaderLDB
                logo={<JssImage field={props?.fields?.HCALogo} />}
                progress={
                  <ProgressBar
                    currentPage={props?.fields?.CurrentStep?.value}
                    steps={props?.fields?.Steps}
                    slug={slug}
                    gmcNumber={gmcNumber}
                    reviewsTotal={reviewsTotal}
                    name={name}
                  ></ProgressBar>
                }
              ></HeaderLDB>
              <SlotsCalendar
                holidays={holidaysUK}
                titleText={
                  props?.fields?.TitleText?.value || 'Please select a slot'
                }
                keyShortNoticeText={
                  props?.fields?.KeyShortNoticeText?.value || ''
                }
                keyBookOnlineText={
                  props?.fields?.KeyBookOnlineText?.value || ''
                }
                API_C2_GetConsultantSlots_LoadingMsg={
                  props?.fields?.API_C2_GetConsultantSlots_LoadingMsg?.value ||
                  ''
                }
                API_C2_GetConsultantSlots_BaseURL={
                  props?.fields?.API_C2_GetConsultantSlots_BaseURL?.value ||
                  'https:/api/C2/GetLDBConsultantSlots?'
                }
                API_C2_GetConsultantSlots_NoResultsMsg={
                  props?.fields?.API_C2_GetConsultantSlots_NoResultsMsg
                    ?.value || 'No slots found'
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
                      href={`${props?.fields?.BackLink?.value?.href}?slug=${slug}&name=${encodeURIComponent(name)}&gmcNumber=${gmcNumber}&reviewsTotal=${reviewsTotal}`}
                    >
                      <Icons iconName="iconArrowSmallLeft" />
                      <span>{props.fields.BackLink.value.text || 'Back'}</span>
                    </Link>
                  </TextButton>
                </div>
                {selectedDate !== '' && selectedTime !== '' && (
                  <Text tag="p" variation="body-medium-extra-large">
                    {isBookableContent &&
                      `${props?.fields?.AppointmentSelectedText?.value ||
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
                            `${props?.fields?.NextLink?.value?.href}?slug=${slug}&name=${encodeURIComponent(name)}&gmcNumber=${gmcNumber}&reviewsTotal=${reviewsTotal}`
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
          )}
      </div>
    );
  }

  return <StepDefaultComponent {...props} />;
};
