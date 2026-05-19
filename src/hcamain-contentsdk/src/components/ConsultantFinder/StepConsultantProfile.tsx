/* eslint-disable */
/* eslint-disable @typescript-eslint/no-explicit-any */
// Consultant profile component
// Place on page in wildcarded folder e.g. \XMCloud\HCA-Eqtr\HCA-XMCloud\src\hcamain\src\pages\finder\StepConsultantProfile
// alongside the [...path].tsx page definition,
// the last path element being the wildcard and carrying the doctify slug
// e.g. https://www.hcacloud.localhost/finder/profile/mr-andrew-goldberg
// as per https://developers.sitecore.com/learn/accelerate/xm-cloud/implementation/information-architecture/wildcard-pages

'use client';

import { type JSX } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  GetStaticComponentProps,
  Image as JssImage,
  ImageField,
  Field,
  LinkField,
  useComponentProps,
  ComponentRendering,
} from '@sitecore-content-sdk/nextjs';
import Text from '@component-library/foundation/Text/Text';
import SidePanel from '@component-library/consultant-finder/SidePanel/SidePanel';
import Reviews from '@component-library/consultant-finder/Reviews/Reviews';
import InfoBox from '@component-library/consultant-finder/InfoBox/InfoBox';
import {
  checkIfConsultantIsNoReviews,
  checkIfConsultantIsDoctifyPhoneNumber,
  checkIfLiveBookingIsAvailable,
  getPhysicianStructuredData,
} from 'lib/consultant-finder/API_HCA';
import {
  getSpecialistProfileData,
  isErrorWithProfileData,
} from 'lib/consultant-finder/API_Doctify';
import Button from '@component-library/core-components/Button/Button';
import Icons from '@component-library/foundation/Icons/Icons';
import Breadcrumbs from '@component-library/site-components/Breadcrumbs/Breadcrumbs';
import ConsultantFinderProfileWrapper from '@component-library/consultant-finder/ConsultantFinderProfileWrapper/ConsultantFinderProfileWrapper';
import SideWrapper from '@component-library/consultant-finder/SideWrapper/SideWrapper';
import MainWrapper from '@component-library/consultant-finder/MainWrapper/MainWrapper';
import Tabs from '@component-library/core-components/Tabs/Tabs';
import ProfilePageSection from '@component-library/consultant-finder/ProfilePageSection/ProfilePageSection';
import ProfilePageHeader from '@component-library/consultant-finder/ProfilePageHeader/ProfilePageHeader';
import About from '@component-library/consultant-finder/About/About';
import DataComponentSimple from '@component-library/consultant-finder/DataComponentSimple/DataComponentSimple';
import TreatmentsConditions from '@component-library/consultant-finder/TreatmentsConditions/TreatmentsConditions';
import ConsultantFees from '@component-library/consultant-finder/ConsultantFees/ConsultantFees';
import OverallRating from '@component-library/consultant-finder/OverallRating/OverallRating';
import Locations from '@component-library/consultant-finder/Locations/Locations';
import Navigation from '@component-library/consultant-finder/Navigation/Navigation';
import Themes from '@component-library/foundation/Themes/Themes';
import MobileTabs from '@component-library/consultant-finder/MobileTabs/MobileTabs';
import {
  capitalizeFirstLetter,
  yearsExperience,
  formatDateShort,
} from '@component-library/utility-functions/index';
import axios, { CancelTokenSource } from 'axios';
import Head from 'next/head';
import TextLink from '@component-library/core-components/TextLink/TextLink';
import { FINDER_PROFILE_CANONICAL_BASE_URL } from 'lib/constants';
import Modals from '@component-library/components/Modals/Modals';
import MultiplePhoneNumbers from '@component-library/consultant-finder/MultiplePhoneNumbers/MultiplePhoneNumbers';
import router from 'next/router';
// import Script from 'next/script';

interface Fields {
  EnquireNowLink: LinkField;
  BookOnlineLink: LinkField;
  BackFromAdvSearchLink: LinkField;
  BackFromFindByConsultantLink: LinkField;
  Breadcrumb: Field<string>;
  TitleText: Field<string>;
  CardImage: ImageField;
  StartLink: LinkField;
  NextLink: LinkField;
  BackLink: LinkField;
  DoctifyLogoImage: ImageField;
  API_C2_FirstAppointment_LoadingMsg: Field<string>;
  API_C2_FirstAppointment_BaseURL: Field<string>;
  ProfileImagePlaceholderImage: any;
  AboutHeadingText: Field<string>;
  AboutTabText: Field<string>;
  LocationsTabText: Field<string>;
  ReviewsTabText: Field<string>;
  FeesTabText: Field<string>;
  AllProceduresSubHeadingText: Field<string>;
  AllConditionsSubHeadingText: Field<string>;
  SubSpecialtiesSubHeadingText: Field<string>;
  LanguagesSubHeadingText: Field<string>;
  LocationsHeadingText: Field<string>;
  ConsultationFeesHeadingText: Field<string>;
  RegisteredWithSubHeadingText: Field<string>;
  QualificationsSubHeadingText: Field<string>;
  NewAppointmentText: Field<string>;
  FollowUpAppointmentText: Field<string>;
  ReviewsHeadingText: Field<string>;
  OverallRatingSubHeadingText: Field<string>;
  OverallExperienceCategoryText: Field<string>;
  PersonalCareReceivedCategoryText: Field<string>;
  ExplainationOfCareCategoryText: Field<string>;
  LastCheckedText: Field<string>;
  BookOnlineButtonLink: LinkField;
  CallToBookButtonText: Field<string>;
  PhoneNumberHref: Field<string>;
  DisplayNumber: Field<string>;
  VideoConsultationText: Field<string>;
  VideoConsultationTitle: Field<string>;
  NextInitialAppointmentText: Field<string>;
  NextFollowOnAppointmentText: Field<string>;
  ViewOnGoogleMapsText: Field<string>;
  NoTreatmentsMsg: Field<string>;
  NoConditionsMsg: Field<string>;
  NoFeesInfo: Field<string>;
  NoQualificationsMsg: Field<string>;
  DoctifyText: Field<string>;
  PanelTitle: Field<string>;
  ExperienceText: Field<string>;
  EnquireNowButtonLink: LinkField;
  ResultsLink: LinkField;
  BreadcrumbHomePage: LinkField;
  CallToBookModalTitle: Field<string>;
}
interface ServerSideProps {
  Slug: string;
  IsLiveDiaryConsultant: boolean;
  IgnoreReviewsConsultant: boolean;
  DoctifyPhoneNumberConsultant: boolean;
  ProfileJson: any;
  PhysicianStructuredDataJson: any;
  ErrorWithProfileData: boolean;
}

/**
 * Will be called during SSG
 * @param {ComponentRendering} _rendering
 * @param {LayoutServiceData} _layoutData
 * @param {GetStaticPropsContext} context
 */
export const getStaticProps: GetStaticComponentProps = async (
  _rendering,
  _layoutData,
  context
) => {
  // based on https://github.com/vercel/next.js/discussions/38061
  const slug = context?.params?.requestPath as string; // e.g. mr-andrew-goldberg

  // Check if slug is defined
  if (!slug) {
    return {
      notFound: true, // This will result in a 404 page being rendered
    };
  }

  const path = (context?.params?.path?.toString() ?? '').replace(',-w-,', '');
  const consultantProfileJson = await getSpecialistProfileData(slug);
  const physicianStructuredDataJson = await getPhysicianStructuredData(
    slug,
    consultantProfileJson,
    path
  );
  const isLiveDiaryConsultant = await checkIfLiveBookingIsAvailable(slug);
  const ignoreReviewConsultant = await checkIfConsultantIsNoReviews(slug);
  const consultantIsDoctifyPhoneNumber =
    physicianStructuredDataJson?.mainEntity?.medicalSpecialty?.name ===
    'General Practice (GP)' ||
    (await checkIfConsultantIsDoctifyPhoneNumber(slug));

  /*
  console.log('physicianStructuredDataJson', physicianStructuredDataJson);
  console.log(
    'is GP derived',
    physicianStructuredDataJson.mainEntity.medicalSpecialty.name ===
      'General Practice (GP)'
  );
  console.log('consultantIsDoctifyPhoneNumber', consultantIsDoctifyPhoneNumber);*/

  const errorWithProfileData = isErrorWithProfileData(consultantProfileJson);

  const returnProps: ServerSideProps = {
    Slug: slug,
    ErrorWithProfileData: errorWithProfileData,
    IsLiveDiaryConsultant: isLiveDiaryConsultant,
    IgnoreReviewsConsultant: ignoreReviewConsultant,
    DoctifyPhoneNumberConsultant: consultantIsDoctifyPhoneNumber,
    ProfileJson: consultantProfileJson,
    PhysicianStructuredDataJson: physicianStructuredDataJson,
  };

  // returned stuff from the server side
  return returnProps;
};

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
  const [doctifyLoaded, setDoctifyLoaded] = useState(false);
  const [firstAppointmentData, setFirstAppointmentData] = useState<any>();
  const [nextAptRequestToken, setNextAptRequestToken] =
    useState<CancelTokenSource | null>(null);

  const serverSideData = useComponentProps<ServerSideProps>(
    props.rendering.uid
  );

  // function extractOneTrustConfig(html: string | undefined) {
  //   if (!html) return null;

  //   // Grab the otSDKStub.js src
  //   const srcMatch = html.match(/src="([^"]*otSDKStub\.js[^"]*)"/i);

  //   // Grab the data-domain-script value
  //   const domainMatch = html.match(/data-domain-script="([^"]+)"/i);

  //   if (!srcMatch || !domainMatch) return null;

  //   return {
  //     src: srcMatch[1],
  //     domainScript: domainMatch[1],
  //   };
  // }

  // const cookieHtml = process.env.NEXT_PUBLIC_LOAD_COOKIES;

  // top specialty
  const topSpecialty = serverSideData?.ProfileJson?.keywords?.filter(
    (item: any) => item.parentName === 'ABSTRACT_TOP_LEVEL_KEYWORD'
  );

  const id = props.params.RenderingIdentifier;
  const shortName = `${serverSideData?.ProfileJson?.firstName || ''} ${serverSideData?.ProfileJson?.lastName || ''
    }`;
  const name = `${serverSideData?.ProfileJson?.title || ''} ${serverSideData?.ProfileJson?.firstName || ''
    } ${serverSideData?.ProfileJson?.lastName || ''} ${serverSideData?.ProfileJson?.suffix || ''
    }`;
  const title = `${name} - ${topSpecialty[0]?.name || ''} at HCA Healthcare UK`;

  // Refs for each tab section
  const aboutRef = useRef<HTMLDivElement>(null);
  const locationsRef = useRef<HTMLDivElement>(null);
  const feesRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  //console.log('bef next apt useEffect', doctifyLoaded);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (!doctifyLoaded) {
      setDoctifyLoaded(true); // only want to call this once when the server side has loaded - deps are serverSideData
      // Check if we made a request
      if (nextAptRequestToken) {
        // Cancel the previous request before making a new request
        nextAptRequestToken.cancel();
        setNextAptRequestToken(null);
      }
      // call to our local server api endpoint to get the first appointment data from C2
      const getLDBFirstAppointmentDatasURL = `${props?.fields?.API_C2_FirstAppointment_BaseURL?.value}${serverSideData?.ProfileJson?.gmcNumber}`;
      //console.log('load data', doctifyLoaded, getLDBFirstAppointmentDatasURL);

      const cancelToken = axios.CancelToken.source();
      setNextAptRequestToken(cancelToken);
      axios
        .get(getLDBFirstAppointmentDatasURL, {
          cancelToken: cancelToken.token,
        })
        .then((firstAppointmentResponse) => {
          // map in the first appointment data for each consultant, results will come in the same order as the request
          setFirstAppointmentData(firstAppointmentResponse?.data);
          //console.log('first apt', firstAppointmentResponse?.data);
        })
        .catch((error) => {
          console.warn(error);
        });

      // data layer for each page render
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'consultantFinder',
        consultantName: shortName,
        consultantSpecialty: topSpecialty[0]?.name || '',
        consultantReviews:
          serverSideData?.ProfileJson?.review?.reviewsTotal || 0,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverSideData]); // only trigger fetch on serverside data update

  // if (
  //   !serverSideData ||
  //   serverSideData.ErrorWithProfileData ||
  //   !serverSideData.ProfileJson
  // ) {
  //   return <div>Profile is missing data, please retry later</div>;
  // }

  if (
    !serverSideData ||
    serverSideData.ErrorWithProfileData ||
    !serverSideData.ProfileJson
  ) {
    router.push('/404-c');
  }

  // Callback function to handle tab clicks
  const handleTabClick = (label: any) => {
    // Determine which ref to use based on the label
    let ref: any;
    switch (label.label) {
      case 'About':
        ref = aboutRef;
        break;
      case 'Locations':
        ref = locationsRef;
        break;
      case 'Fees':
        ref = feesRef;
        break;
      case 'Reviews':
        ref = reviewsRef;
        break;
      default:
        break;
    }

    // Scroll to the section if ref exists
    if (ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
      });
    } else {
      console.log('Ref not found or not initialized'); // Debugging check
    }
  };

  // languages
  const languagesList: string[] = [];
  serverSideData?.ProfileJson?.languages?.forEach((item: any) => {
    languagesList.push(capitalizeFirstLetter(item.name));
  });
  const languagesString = languagesList.toString().split(',').join(', ');

  // gmcNumber
  const gmcNumber = serverSideData?.ProfileJson?.gmcNumber; // https://hcauk-digital.atlassian.net/browse/HED-1551 fix for non GMC practicioners who are on live diaries

  // subspecialties
  const subSpecialtiesData = serverSideData?.ProfileJson?.keywords
    .filter(
      (item: any) =>
        item.keywordType === 'specialty' &&
        item.parentName !== 'ABSTRACT_TOP_LEVEL_KEYWORD'
    )
    .map((item: any) => item.name)
    .toString()
    .split(',')
    .join(', ');

  // conditions & treatments
  const treatments = serverSideData?.ProfileJson?.keywords.filter(
    (item: any) => item.keywordType === 'procedure'
  );
  const conditions = serverSideData?.ProfileJson?.keywords.filter(
    (item: any) => item.keywordType === 'condition'
  );

  const profileImage =
    serverSideData?.ProfileJson?.images?.logo ||
    props?.fields?.ProfileImagePlaceholderImage?.value.src ||
    null;

  const canonicalURL = `${FINDER_PROFILE_CANONICAL_BASE_URL}/${serverSideData?.ProfileJson?.slug}`;

  const description = serverSideData?.ProfileJson?.about
    ?.substring(0, serverSideData?.ProfileJson?.about?.indexOf('.'))
    .replaceAll('<p>', '')
    .replaceAll('</p>', '')
    .replaceAll('<strong>', '')
    .replaceAll('</strong>', '');

  const keywords = serverSideData?.ProfileJson?.medicalProcedures
    ?.replaceAll('<ul>', '')
    .replaceAll('</ul>', '')
    .replaceAll('<li>', '')
    .replaceAll('</li>', ', ')
    .replaceAll('<p>', '')
    .replaceAll('</p>', '');

  // Callback function to handle datalayer phone reveal tracking
  function callRevealTrack(): void {
    dialogRef?.current?.showModal();
    /* HWPD-3463 - data layer */
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'consultantFinder',
      goalType: 'callReveal',
      consultantName: shortName,
      consultantSpecialty: topSpecialty[0]?.name || '',
      consultantReviews: serverSideData?.ProfileJson?.review?.reviewsTotal || 0,
    });
  }

  if (props.fields) {
    return (
      <div id={id ? id : undefined}>
        {serverSideData && (
          <div>
            <Modals ref={dialogRef}>
              <MultiplePhoneNumbers
                practices={serverSideData?.ProfileJson?.practices || []}
                title={
                  props?.fields?.CallToBookModalTitle?.value ||
                  'Appointments at'
                }
                defaultNumber={props?.fields?.PhoneNumberHref?.value}
                isDoctifyPhoneNumberConsultant={
                  serverSideData?.DoctifyPhoneNumberConsultant || false
                }
                slug={serverSideData?.ProfileJson?.slug}
              ></MultiplePhoneNumbers>
            </Modals>
            <Head>
              <title>{title}</title>
              <link rel="canonical" href={canonicalURL} />
              <meta name="description" content={description} />
              <meta name="keywords" content={keywords} />
              {/*Open Graph tags*/}
              <meta property="og:title" content={title} key="og:title" />
              <meta property="og:description" content={description} />
              <meta property="og:image" content={profileImage} key="og:image" />
              <meta property="og:url" content={canonicalURL} />
              {/* // see https://validator.schema.org/ and https://search.google.com/test/rich-results */}
              <script
                id="consultant-profile-data"
                type="application/ld+json"
                key="schema"
                dangerouslySetInnerHTML={{
                  __html: `${JSON.stringify(
                    serverSideData?.PhysicianStructuredDataJson
                  )}`,
                }}
              ></script>
            </Head>
            <div>
              <Breadcrumbs
                backCta={{
                  text: 'Consultant Finder',
                  link: `${props?.fields?.BreadcrumbHomePage?.value?.href ||
                    '/finder/step-intro'
                    }`,
                }}
              >
                <TextLink>
                  <a href="/">
                    <Icons iconName="iconHome"></Icons>
                    <span className="sr-only">Home</span>
                  </a>
                </TextLink>
                <TextLink>
                  <Link
                    href={`${props?.fields?.BreadcrumbHomePage?.value?.href ||
                      '/finder/step-intro'
                      }`}
                  >
                    {props?.fields?.Breadcrumb?.value || 'Consultant Finder'}
                  </Link>
                </TextLink>
                {topSpecialty[0]?.name && (
                  <TextLink>
                    <Link
                      href={`${props?.fields?.ResultsLink?.value?.href
                        }?search=${topSpecialty[0]?.name || ''}&keywordId=${topSpecialty[0]?.id || ''
                        }&sortType=relevance&lat=51.507217&lon=-0.1275862&distance=0&limit=12&offset=0`}
                    >
                      {topSpecialty[0]?.name}
                    </Link>
                  </TextLink>
                )}
                <span>{`${serverSideData?.ProfileJson?.firstName} ${serverSideData?.ProfileJson?.lastName}`}</span>
              </Breadcrumbs>
              <MobileTabs>
                <Themes theme={'A-HCA-White'}>
                  <Tabs
                    callback={(label) => {
                      handleTabClick(label);
                    }}
                    tabs={[
                      {
                        icon: 'iconBook',
                        label:
                          `${props?.fields?.AboutTabText?.value}` || 'About',
                      },
                      {
                        icon: 'iconPin',
                        label:
                          `${props?.fields?.LocationsTabText?.value}` ||
                          'Locations',
                      },
                      {
                        icon: 'iconCreditCard',
                        label: `${props?.fields?.FeesTabText?.value}` || 'Fees',
                      },
                      {
                        icon: 'iconComment',
                        label:
                          `${props?.fields?.ReviewsTabText?.value}` ||
                          'Reviews',
                      },
                    ]}
                  />
                </Themes>
              </MobileTabs>
            </div>
            <ConsultantFinderProfileWrapper>
              <MainWrapper>
                <ProfilePageHeader
                  image={profileImage}
                  name={`${serverSideData?.ProfileJson?.firstName} ${serverSideData?.ProfileJson?.lastName}`}
                  topSpecialty={topSpecialty[0]?.name || ''}
                  infoBoxText={'some text'}
                  overallExperienceYears={
                    yearsExperience(
                      serverSideData?.ProfileJson?.yearsOfExperience
                    ) || 0
                  }
                  overallExperienceYearsText={
                    props?.fields?.ExperienceText?.value ||
                    'years of experience'
                  }
                >
                  <Themes theme={'A-HCA-White'}>
                    <Tabs
                      callback={(label) => {
                        handleTabClick(label);
                      }}
                      tabs={[
                        {
                          icon: 'iconBook',
                          label:
                            `${props?.fields?.AboutTabText?.value}` || 'About',
                        },
                        {
                          icon: 'iconPin',
                          label:
                            `${props?.fields?.LocationsTabText?.value}` ||
                            'Locations',
                        },
                        {
                          icon: 'iconCreditCard',
                          label:
                            `${props?.fields?.FeesTabText?.value}` || 'Fees',
                        },
                        {
                          icon: 'iconComment',
                          label:
                            `${props?.fields?.ReviewsTabText?.value}` ||
                            'Reviews',
                        },
                      ]}
                    />
                  </Themes>
                </ProfilePageHeader>
                <SidePanel isMobile={true}>
                  <Reviews
                    doctifyLogo={
                      <JssImage field={props.fields.DoctifyLogoImage} />
                    }
                    doctifyText={
                      props?.fields?.DoctifyText?.value || 'Reviewed By'
                    }
                    hasDoctifyBranding={true}
                    isConsultantProfileReviews={true}
                    reviewsCount={
                      serverSideData?.IgnoreReviewsConsultant
                        ? 0
                        : serverSideData?.ProfileJson?.review?.averageRating || 0
                    }
                    reviewsText="Patients"
                    reviewsTotal={
                      serverSideData?.IgnoreReviewsConsultant
                        ? 0
                        : serverSideData?.ProfileJson?.review?.reviewsTotal || 0
                    }
                    noReviewsMsg={
                      'This consultant does not have any reviews at the moment.'
                    }
                    titleText={
                      props?.fields?.PanelTitle?.value || 'PATIENTS REVIEWS'
                    }
                    reviewsRef={reviewsRef}
                    ignoreReviewsConsultant={
                      serverSideData?.IgnoreReviewsConsultant || false
                    }
                  />
                  {serverSideData?.ProfileJson?.isLiveDiaryConsultant &&
                    firstAppointmentData?.initial_appointment &&
                    firstAppointmentData?.follow_appointment && (
                      <>
                        <InfoBox
                          backgroundColour="green"
                          icon={null}
                          isShortInfo={true}
                          shortText={`${props?.fields?.NextInitialAppointmentText?.value ||
                            'Next initial appointment'
                            } ${formatDateShort(
                              firstAppointmentData?.initial_appointment
                            )}`}
                        />
                        <InfoBox
                          backgroundColour="orange"
                          icon={null}
                          isShortInfo={true}
                          shortText={`${props?.fields?.NextFollowOnAppointmentText?.value ||
                            'Next follow up appointment'
                            } ${formatDateShort(
                              firstAppointmentData?.follow_appointment
                            )}`}
                        />
                        <Text tag="p" variation="body-small">
                          {`${props?.fields?.LastCheckedText?.value ||
                            'Last checked:'
                            } ${firstAppointmentData?.refreshedText}
                          `}
                        </Text>
                      </>
                    )}
                </SidePanel>
                <ProfilePageSection ref={aboutRef}>
                  <About
                    title={props?.fields?.AboutHeadingText?.value || 'About'}
                    description={serverSideData?.ProfileJson?.about || ''}
                  ></About>
                </ProfilePageSection>
                {subSpecialtiesData.length > 0 && (
                  <ProfilePageSection>
                    <DataComponentSimple
                      title={
                        props.fields.SubSpecialtiesSubHeadingText.value ||
                        'Subspecialities'
                      }
                      data={subSpecialtiesData}
                    ></DataComponentSimple>
                  </ProfilePageSection>
                )}
                <ProfilePageSection>
                  <TreatmentsConditions
                    treatmentsLabel={
                      props?.fields?.AllProceduresSubHeadingText?.value ||
                      'ALL PROCEDURES'
                    }
                    conditionsLabel={
                      props.fields.AllConditionsSubHeadingText.value ||
                      'ALL CONDITIONS'
                    }
                    treatmentsList={treatments}
                    conditionsList={conditions}
                    noTreatmentsMsg={
                      props?.fields?.NoTreatmentsMsg?.value ||
                      "This consultant doesn't have any procedures information at the moment."
                    }
                    noConditionsMsg={
                      props?.fields?.NoConditionsMsg?.value ||
                      "This consultant doesn't have any conditions information at the moment."
                    }
                  ></TreatmentsConditions>
                </ProfilePageSection>
                <ProfilePageSection>
                  <DataComponentSimple
                    title={
                      props?.fields?.LanguagesSubHeadingText?.value ||
                      'Languages'
                    }
                    data={languagesString}
                  ></DataComponentSimple>
                </ProfilePageSection>
                <ProfilePageSection>
                  <DataComponentSimple
                    title={
                      props?.fields?.QualificationsSubHeadingText?.value ||
                      'qualifications'
                    }
                    data={
                      serverSideData?.ProfileJson?.suffix ||
                      props?.fields?.NoQualificationsMsg?.value ||
                      "This consultant doesn't have any qualification information at the moment."
                    }
                  ></DataComponentSimple>
                </ProfilePageSection>
                {serverSideData?.ProfileJson?.registrationBodies &&
                  serverSideData?.ProfileJson?.registrationBodies.length >
                  0 && (
                    <ProfilePageSection>
                      <DataComponentSimple
                        title={
                          props?.fields?.RegisteredWithSubHeadingText?.value ||
                          'Registered with'
                        }
                        data={`${serverSideData?.ProfileJson?.registrationBodies[0]
                          ?.name || 'General Medical Council'
                          }: ${gmcNumber}`}
                      ></DataComponentSimple>
                    </ProfilePageSection>
                  )}
                <ProfilePageSection ref={locationsRef}>
                  <Locations
                    title={
                      props?.fields?.LocationsHeadingText?.value || 'Locations'
                    }
                    locations={serverSideData?.ProfileJson?.practices}
                    noLocationsText={
                      "This consultant doesn't have any locations information at the moment."
                    }
                    viewOnGoogleMapText={
                      props?.fields?.ViewOnGoogleMapsText?.value ||
                      'View on Google Maps'
                    }
                    videoConsultationText={
                      props?.fields?.VideoConsultationText?.value ||
                      'Call to book a video consultation.'
                    }
                    videoConsultationTitle={
                      props?.fields?.VideoConsultationTitle?.value ||
                      'Video Consultation'
                    }
                    phoneNumberHref={
                      props?.fields?.PhoneNumberHref?.value || '+442070794344'
                    }
                    displayNumber={
                      props?.fields?.DisplayNumber?.value || '020 7079 4344'
                    }
                  ></Locations>
                </ProfilePageSection>
                <ProfilePageSection ref={feesRef}>
                  <ConsultantFees
                    title={
                      props?.fields?.ConsultationFeesHeadingText?.value ||
                      'Consultation Fees'
                    }
                    newAppointmentFees={
                      serverSideData?.ProfileJson?.consultationFees?.new || null
                    }
                    newAppointmentFeesLabel={
                      props?.fields?.NewAppointmentText?.value ||
                      'New appointment'
                    }
                    followUpAppointmentFees={
                      serverSideData?.ProfileJson?.consultationFees?.followUp ||
                      null
                    }
                    followUpAppointmentFeesLabel={
                      props?.fields?.FollowUpAppointmentText?.value ||
                      'Follow-up appointment'
                    }
                    noFeesInfo={
                      props.fields.NoFeesInfo.value ||
                      "This consultant doesn't have any consultation fees information at the moment."
                    }
                  ></ConsultantFees>
                </ProfilePageSection>
                <ProfilePageSection ref={reviewsRef} noBottomBorder={true}>
                  <OverallRating
                    title={
                      props?.fields?.ReviewsHeadingText?.value || 'Reviews'
                    }
                    subtitle={
                      props?.fields?.OverallRatingSubHeadingText?.value ||
                      'Overall Rating'
                    }
                    overallExperienceLabel={
                      props?.fields?.OverallExperienceCategoryText?.value ||
                      'Overall experience'
                    }
                    personalCareLabel={
                      props?.fields?.PersonalCareReceivedCategoryText?.value ||
                      'Personal care received'
                    }
                    explanationLabel={
                      props?.fields?.ExplainationOfCareCategoryText?.value ||
                      'Explanation of care provided'
                    }
                    overallExperience={
                      serverSideData?.ProfileJson?.review?.overallExperience ||
                      0
                    }
                    overalCare={
                      serverSideData?.ProfileJson?.review?.bedsideManner || 0
                    }
                    explanation={
                      serverSideData?.ProfileJson?.review?.explanation || 0
                    }
                    ignoreReviewsConsultant={
                      serverSideData?.IgnoreReviewsConsultant || false
                    }
                    noReviewsMsg={
                      'This consultant does not have any reviews at the moment.'
                    }
                  ></OverallRating>
                </ProfilePageSection>
                {/* iframe with patient and peer reviews */}
                {!serverSideData?.IgnoreReviewsConsultant && (
                  <iframe
                    src={`/finder/frame-reviews?slug=${serverSideData?.Slug}`}
                    width="100%"
                    height="700px"
                    id="specialistReviews"
                    name="specialistReviews"
                    scrolling="no"
                  ></iframe>
                )}
                {/* iframe with patient and peer reviews */}
              </MainWrapper>
              <SideWrapper>
                <SidePanel
                  isSticky={true}
                  buttons={
                    <>
                      {/* if consultant has live diaries then show 'book online' */}
                      {serverSideData?.IsLiveDiaryConsultant && (
                        <Button variation="full-dark" size="small">
                          <Link
                            href={`/finder/step-terms-and-conditions?slug=${serverSideData?.ProfileJson.slug
                              }&name=${encodeURIComponent(shortName)}&gmcNumber=${gmcNumber}&reviewsTotal=${serverSideData?.ProfileJson?.review
                                ?.reviewsTotal || 0
                              }&search=${topSpecialty[0]?.name || ''}&keywordId=${topSpecialty[0]?.id || ''}`}
                          >
                            <span>
                              {props.fields.BookOnlineButtonLink.value.text ||
                                'Book online'}
                            </span>
                          </Link>
                        </Button>
                      )}
                      {/* if consultant doesn't have live diaries and in doctify data hideAppointmentRequest : false - show enqire button */}
                      {!serverSideData?.IsLiveDiaryConsultant &&
                        !serverSideData?.ProfileJson
                          ?.hideAppointmentRequest && (
                          <Button variation="full-dark" size="small">
                            <Link
                              href={`${props?.fields?.EnquireNowButtonLink?.value?.href
                                }?slug=${serverSideData?.ProfileJson.slug
                                }&reviewsTotal=${serverSideData?.ProfileJson?.review
                                  ?.reviewsTotal || 0
                                }`}
                            >
                              <span>
                                {props?.fields?.EnquireNowButtonLink?.value
                                  ?.title || 'Enquire now'}
                              </span>
                            </Link>
                          </Button>
                        )}
                      <Button variation="outline" size="small">
                        <button onClick={callRevealTrack}>
                          <span>
                            <Icons iconName="iconPhone" />
                          </span>
                          <span>
                            {props?.fields?.CallToBookButtonText?.value ||
                              'Call to book'}
                          </span>
                        </button>
                      </Button>
                    </>
                  }
                >
                  <Reviews
                    doctifyLogo={
                      <JssImage field={props.fields.DoctifyLogoImage} />
                    }
                    doctifyText={
                      props?.fields?.DoctifyText?.value || 'Reviewed By'
                    }
                    hasDoctifyBranding={true}
                    isConsultantProfileReviews={true}
                    reviewsCount={
                      serverSideData?.IgnoreReviewsConsultant
                        ? 0
                        : serverSideData?.ProfileJson?.review?.averageRating || 0
                    }
                    reviewsText="Patients"
                    reviewsTotal={
                      serverSideData?.IgnoreReviewsConsultant
                        ? 0
                        : serverSideData?.ProfileJson?.review?.reviewsTotal || 0
                    }
                    noReviewsMsg={
                      'This consultant does not have any reviews at the moment.'
                    }
                    titleText={
                      props?.fields?.PanelTitle?.value || 'PATIENTS REVIEWS'
                    }
                    reviewsRef={reviewsRef}
                    ignoreReviewsConsultant={
                      serverSideData?.IgnoreReviewsConsultant || false
                    }
                  />
                  {serverSideData?.ProfileJson?.isLiveDiaryConsultant &&
                    firstAppointmentData?.initial_appointment &&
                    firstAppointmentData?.follow_appointment && (
                      <>
                        <InfoBox
                          backgroundColour="green"
                          icon={null}
                          isShortInfo={true}
                          shortText={`${props?.fields?.NextInitialAppointmentText?.value ||
                            'Next initial appointment'
                            } ${formatDateShort(
                              firstAppointmentData?.initial_appointment
                            )}`}
                        />
                        <InfoBox
                          backgroundColour="orange"
                          icon={null}
                          isShortInfo={true}
                          shortText={`${props?.fields?.NextFollowOnAppointmentText?.value ||
                            'Next follow up appointment'
                            } ${formatDateShort(
                              firstAppointmentData?.follow_appointment
                            )}`}
                        />
                        <Text tag="p" variation="body-small">
                          {`${props?.fields?.LastCheckedText?.value ||
                            'Last checked:'
                            } ${firstAppointmentData?.refreshedText}
                          `}
                        </Text>
                      </>
                    )}
                </SidePanel>
              </SideWrapper>
            </ConsultantFinderProfileWrapper>
            <Navigation showOnMobile={true} hasCustomBtnMobile={true}>
              {/* if consultant has live diaries then show 'book online' */}
              {serverSideData?.IsLiveDiaryConsultant && (
                <Button
                  variation="full-dark"
                  size="small"
                  contentVariation="full-width"
                >
                  <Link
                    href={`/finder/step-terms-and-conditions?slug=${serverSideData?.ProfileJson.slug}&name=${encodeURIComponent(shortName)}&gmcNumber=${gmcNumber}&search=${topSpecialty[0]?.name || ''}&keywordId=${topSpecialty[0]?.id || ''}`}
                  >
                    <span>
                      {props.fields.BookOnlineButtonLink.value.text ||
                        'Book online'}
                    </span>
                  </Link>
                </Button>
              )}
              {/* if consultant doesn't have live diaries and in doctify data hideAppointmentRequest : false - show enqire button */}
              {!serverSideData?.IsLiveDiaryConsultant &&
                !serverSideData?.ProfileJson?.hideAppointmentRequest && (
                  <Button
                    variation="full-dark"
                    size="small"
                    contentVariation="full-width"
                  >
                    <Link
                      href={`${props?.fields?.EnquireNowButtonLink?.value?.href}?slug=${serverSideData?.ProfileJson.slug}`}
                    >
                      <span>
                        {props?.fields?.EnquireNowButtonLink?.value?.title ||
                          'Enquire now'}
                      </span>
                    </Link>
                  </Button>
                )}
              <Button
                variation="outline"
                size="small"
                contentVariation="full-width"
              >
                <button onClick={callRevealTrack}>
                  <span>
                    {props?.fields?.CallToBookButtonText?.value ||
                      'Call to book'}
                  </span>
                </button>
              </Button>
            </Navigation>
          </div>
        )}
      </div>
    );
  }

  return <StepDefaultComponent {...props} />;
};
