/* eslint-disable @typescript-eslint/no-explicit-any */
// Consultant profile component
// Place on page in wildcarded folder e.g. \XMCloud\HCA-Eqtr\HCA-XMCloud\src\hcamain\src\pages\finder\StepConsultantProfile
// alongside the [...path].tsx page definition,
// the last path element being the wildcard and carrying the doctify slug
// e.g. https://www.hcacloud.localhost/finder/profile/mr-andrew-goldberg
// as per https://developers.sitecore.com/learn/accelerate/xm-cloud/implementation/information-architecture/wildcard-pages

import React, { useRef } from 'react';
import Link from 'next/link';
import {
  GetStaticComponentProps,
  Image as JssImage,
  Link as JssLink,
  ImageField,
  Field,
  LinkField,
  useComponentProps,
  ComponentRendering,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Text from '@component-library/foundation/Text/Text';
import SidePanel from '@component-library/consultant-finder/SidePanel/SidePanel';
import Reviews from '@component-library/consultant-finder/Reviews/Reviews';
import InfoBox from '@component-library/consultant-finder/InfoBox/InfoBox';

// import { useSearchParams } from 'next/navigation';
import { getLDBFirstAppointmentData as getLDBFirstAppointmentData } from 'lib/consultant-finder/API_C2';
import { checkIfLiveBookingIsAvailable } from 'lib/consultant-finder/API_HCA';
import {
  getSpecialistProfileData,
  isErrorWithProfileData,
} from 'lib/consultant-finder/API_Doctify';
import Container from '@component-library/foundation/Containers/Container';
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
  API_C2_FirstAppointment_BaseURL: Field<string>;
  API_C2_FirstAppointment_Header: Field<string>;
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
}
interface ServerSideProps {
  Slug: string;
  IsLiveDiaryConsultant: boolean;
  FirstAppointment: any;
  ProfileJson: any;
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

  const consultantProfileJson = await getSpecialistProfileData(slug);
  const isLiveDiaryConsultant = await checkIfLiveBookingIsAvailable(slug);
  const errorWithProfileData = isErrorWithProfileData(consultantProfileJson);
  const firstAppointment =
    isLiveDiaryConsultant && !errorWithProfileData
      ? await getLDBFirstAppointmentData(consultantProfileJson?.gmcNumber)
      : null;
  //console.log("consultantProfileJson: ", consultantProfileJson);

  const returnProps: ServerSideProps = {
    Slug: slug,
    ErrorWithProfileData: errorWithProfileData,
    IsLiveDiaryConsultant: isLiveDiaryConsultant,
    FirstAppointment: firstAppointment,
    ProfileJson: consultantProfileJson,
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
  //console.log('consultant profile data', props.fields);
  const serverSideData = useComponentProps<ServerSideProps>(
    props.rendering.uid
  );

  // Refs for each tab section
  const aboutRef = useRef<HTMLDivElement>(null);
  const locationsRef = useRef<HTMLDivElement>(null);
  const feesRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  if (
    !serverSideData ||
    serverSideData.ErrorWithProfileData ||
    !serverSideData.ProfileJson
  ) {
    return <div>Profile is missing data, please retry later</div>;
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

  /*
  // example client side get first appointment call
  getLDBFirstAppointmentData( "4113571", 
  props.fields.API_C2_FirstAppointment_BaseURL.value, 
  props.fields.API_C2_FirstAppointment_Header.value)
  .then(res=>
    {  console.log('first appointment client side:', res);
    });*/

  // top specialty
  const topSpecialty = serverSideData?.ProfileJson?.keywords?.filter(
    (item: any) => item.parentName === 'ABSTRACT_TOP_LEVEL_KEYWORD'
  );

  // languages
  const languagesList: string[] = [];
  serverSideData?.ProfileJson?.languages?.forEach((item: any) => {
    languagesList.push(capitalizeFirstLetter(item.name));
  });
  const languagesString = languagesList.toString().split(',').join(', ');

  // gmcNumber
  const gmcNumber = serverSideData?.ProfileJson?.registrationBodies?.filter(
    (item: any) => item.name === 'General Medical Council'
  )[0]?.registrationNumber;

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

  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div id={id ? id : undefined}>
        {serverSideData && (
          <div>
            {/* top section */}
            <div>
              <Breadcrumbs>
                <Link href="/Finder/Step-Intro">
                  {props?.fields?.Breadcrumb?.value || 'Consultant Finder'}
                </Link>
                {topSpecialty[0]?.name && (
                  <Link href={`/Finder/{topSpecialty[0]?.name}`}>
                    {topSpecialty[0]?.name}
                  </Link>
                )}
                <span>{`${serverSideData?.ProfileJson?.firstName} ${serverSideData?.ProfileJson?.lastName}`}</span>
              </Breadcrumbs>
              <MobileTabs>
                <Themes theme={'A-HCA-White'}>
                  <Tabs
                    callback={(label) => {
                      console.log(label);
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
                  image={
                    serverSideData?.ProfileJson?.images?.logo ||
                    props?.fields?.ProfileImagePlaceholderImage?.value.src ||
                    null
                  }
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
                        console.log(label);
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
                      serverSideData?.ProfileJson?.review?.overallExperience
                    }
                    reviewsText="Patients"
                    reviewsTotal={
                      serverSideData?.ProfileJson?.review?.reviewsTotal || 0
                    }
                    noReviewsMsg={
                      'This consultant does not have any reviews at the moment.'
                    }
                    titleText={
                      props?.fields?.PanelTitle?.value || 'PATIENTS REVIEWS'
                    }
                  />
                  {serverSideData?.ProfileJson?.isLiveDiaryConsultant &&
                    serverSideData?.FirstAppointment?.initial_appointment &&
                    serverSideData?.FirstAppointment?.follow_appointment && (
                      <>
                        <InfoBox
                          backgroundColour="green"
                          icon={null}
                          isShortInfo={true}
                          shortText={`${
                            props?.fields?.NextInitialAppointmentText?.value ||
                            'Next initial appointment'
                          } ${formatDateShort(
                            serverSideData?.FirstAppointment
                              ?.initial_appointment
                          )}`}
                        />
                        <InfoBox
                          backgroundColour="orange"
                          icon={null}
                          isShortInfo={true}
                          shortText={`${
                            props?.fields?.NextFollowOnAppointmentText?.value ||
                            'Next follow up appointment'
                          } ${formatDateShort(
                            serverSideData?.FirstAppointment?.follow_appointment
                          )}`}
                        />
                        <Text tag="p" variation="body-small">
                          {`${
                            props?.fields?.LastCheckedText?.value ||
                            'Last checked:'
                          } ${serverSideData?.FirstAppointment?.refreshedText}
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
                {/* No fees check */}
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
                      props?.fields?.NewAppointmentText?.value ||
                      'Follow-up appointment'
                    }
                    noFeesInfo={
                      props.fields.NoFeesInfo.value ||
                      "This consultant doesn't have any consultation fees information at the moment."
                    }
                  ></ConsultantFees>
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
                        data={`${
                          serverSideData?.ProfileJson?.registrationBodies[0]
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
                      props?.fields?.PhoneNumberHref?.value || '+442045711724'
                    }
                    displayNumber={
                      props?.fields?.DisplayNumber?.value || '0204 5711 724'
                    }
                  ></Locations>
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
                  ></OverallRating>
                </ProfilePageSection>
                {/* iframe with patient and peer reviews */}
                <iframe
                  src={`/Finder/Frame-Reviews?slug=${serverSideData?.Slug}`}
                  width="100%"
                  height="700px"
                  id="specialistReviews"
                  name="specialistReviews"
                  scrolling="no"
                ></iframe>
                {/* iframe with patient and peer reviews */}
              </MainWrapper>
              <SideWrapper>
                <SidePanel isSticky={true}>
                  <Reviews
                    doctifyLogo={
                      <JssImage field={props?.fields?.DoctifyLogoImage} />
                    }
                    doctifyText={
                      props?.fields?.DoctifyText?.value || 'Reviewed By'
                    }
                    hasDoctifyBranding={true}
                    isConsultantProfileReviews={true}
                    reviewsCount={
                      serverSideData?.ProfileJson?.review?.overallExperience
                    }
                    reviewsText="Patients"
                    reviewsTotal={
                      serverSideData?.ProfileJson?.review?.reviewsTotal || 0
                    }
                    noReviewsMsg={
                      'This consultant does not have any reviews at the moment.'
                    }
                    titleText={
                      props?.fields?.PanelTitle?.value || 'PATIENTS REVIEWS'
                    }
                  />
                  {serverSideData?.ProfileJson?.isLiveDiaryConsultant &&
                    serverSideData?.FirstAppointment?.initial_appointment &&
                    serverSideData?.FirstAppointment?.follow_appointment && (
                      <>
                        <InfoBox
                          backgroundColour="green"
                          icon={null}
                          isShortInfo={true}
                          shortText={`${
                            props?.fields?.NextInitialAppointmentText?.value ||
                            'Next initial appointment'
                          } ${formatDateShort(
                            serverSideData?.FirstAppointment
                              ?.initial_appointment
                          )}`}
                        />
                        <InfoBox
                          backgroundColour="orange"
                          icon={null}
                          isShortInfo={true}
                          shortText={`${
                            props?.fields?.NextFollowOnAppointmentText?.value ||
                            'Next follow up appointment'
                          } ${formatDateShort(
                            serverSideData?.FirstAppointment?.follow_appointment
                          )}`}
                        />
                        <Text tag="p" variation="body-small">
                          {`${
                            props?.fields?.LastCheckedText?.value ||
                            'Last checked:'
                          } ${serverSideData?.FirstAppointment?.refreshedText}
                          `}
                        </Text>
                      </>
                    )}
                  <Container marginTop="spacing-5">
                    {/* if consultant has live diaries then show 'book online' */}
                    {serverSideData?.IsLiveDiaryConsultant && (
                      <Container marginBottom="spacing-4">
                        <Button
                          variation="full-dark"
                          size="small"
                          contentVariation="full-width"
                        >
                          <JssLink
                            field={props.fields.BookOnlineButtonLink}
                            title={props.fields.BookOnlineButtonLink.value.text}
                          ></JssLink>
                        </Button>
                      </Container>
                    )}
                    {/* if consultant doesn't have live diaries and in doctify data hideAppointmentRequest : false - show enqire button */}
                    {!serverSideData?.IsLiveDiaryConsultant &&
                      !serverSideData?.ProfileJson?.hideAppointmentRequest && (
                        <Container marginBottom="spacing-4">
                          <Button
                            variation="full-dark"
                            size="small"
                            contentVariation="full-width"
                          >
                            <Link
                              href={`${props?.fields?.EnquireNowButtonLink?.value?.href}/${serverSideData?.ProfileJson.slug}`}
                            >
                              <span>
                                {props?.fields?.EnquireNowButtonLink?.value
                                  ?.title || 'Enquire now'}
                              </span>
                            </Link>
                          </Button>
                        </Container>
                      )}
                    <Button
                      variation="outline"
                      size="small"
                      contentVariation="full-width"
                    >
                      <a
                        href={`tel:${
                          props?.fields?.PhoneNumberHref?.value ||
                          '+442045711724'
                        }`}
                      >
                        <span>
                          <Icons iconName="iconPhone" />
                        </span>
                        <span>
                          {props?.fields?.CallToBookButtonText?.value ||
                            'Call to book'}
                        </span>
                      </a>
                    </Button>
                  </Container>
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
                  <JssLink
                    field={props.fields.BookOnlineButtonLink}
                    title={props.fields.BookOnlineButtonLink.value.text}
                  ></JssLink>
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
                      href={`${props?.fields?.EnquireNowButtonLink?.value?.href}/${serverSideData?.ProfileJson.slug}`}
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
                <a
                  href={`tel:${
                    props?.fields?.PhoneNumberHref?.value || '+442045711724'
                  }`}
                >
                  <span>
                    {props?.fields?.CallToBookButtonText?.value ||
                      'Call to book'}
                  </span>
                </a>
              </Button>
            </Navigation>
          </div>
        )}
      </div>
    );
  }

  return <StepDefaultComponent {...props} />;
};
