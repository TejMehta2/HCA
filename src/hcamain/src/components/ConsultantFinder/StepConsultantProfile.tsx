/* eslint-disable @typescript-eslint/no-explicit-any */
// Consultant profile component
// Place on page in wildcarded folder e.g. \XMCloud\HCA-Eqtr\HCA-XMCloud\src\hcamain\src\pages\finder\StepConsultantProfile
// alongside the [...path].tsx page definition,
// the last path element being the wildcard and carrying the doctify slug
// e.g. https://www.hcacloud.localhost/finder/profile/mr-andrew-goldberg
// as per https://developers.sitecore.com/learn/accelerate/xm-cloud/implementation/information-architecture/wildcard-pages

import React from 'react';
import {
  GetStaticComponentProps,
  Image as JssImage,
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
import {
  getLDBFirstAppointmentData as getLDBFirstAppointmentData,
} from 'src/pages/Finder/lib/API_C2';
import { checkIfLiveBookingIsAvailable } from 'src/pages/Finder/lib/API_HCA';
import {
  getSpecialistProfileData,
  isErrorWithProfileData
} from 'src/pages/Finder/lib/API_Doctify';
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
import { capitalizeFirstLetter } from '@component-library/utility-functions/index';
import TreatmentsConditions from '@component-library/consultant-finder/TreatmentsConditions/TreatmentsConditions';
import ConsultantFees from '@component-library/consultant-finder/ConsultantFees/ConsultantFees';
import OverallRating from '@component-library/consultant-finder/OverallRating/OverallRating';
import Locations from '@component-library/consultant-finder/Locations/Locations';
import Navigation from '@component-library/consultant-finder/Navigation/Navigation';
import Themes from '@component-library/foundation/Themes/Themes';
import MobileTabs from '@component-library/consultant-finder/MobileTabs/MobileTabs';
import { yearsExperience } from '@component-library/utility-functions/index';

interface Fields {
  // from the Specific component data template e.g. /sitecore/templates/Project/HCA/Consultant finder/StepSPECIFIC

  // add specific fields defined in the data template here...
  EnquireNowLink: LinkField;
  BookOnlineLink: LinkField;
  BackFromAdvSearchLink: LinkField;
  BackFromFindByConsultantLink: LinkField;
  // from the StepCommon template e.g. /sitecore/templates/Project/HCA/Consultant finder/StepCommon
  TitleText: Field<string>;
  CardImage: ImageField;
  StartLink: LinkField;
  NextLink: LinkField;
  BackLink: LinkField;
  DoctifyLogoImage: ImageField;
  API_C2_FirstAppointment_BaseURL: Field<string>;
  API_C2_FirstAppointment_Header: Field<string>;
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
  const consultantProfileJson = await getSpecialistProfileData(slug);
  const isLiveDiaryConsultant = await checkIfLiveBookingIsAvailable(slug);
  const errorWithProfileData = isErrorWithProfileData(consultantProfileJson);
  const firstAppointment = isLiveDiaryConsultant && !errorWithProfileData ? 
                              await getLDBFirstAppointmentData(consultantProfileJson?.gmcNumber) : null;
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
  console.log('consultant profile data', props.fields);
  const serverSideData = useComponentProps<ServerSideProps>(
    props.rendering.uid
  );
  console.log('consultant data,', serverSideData?.ProfileJson);
  //console.log('server side data from component props: ', serverSideData);
  console.log(
    'Is live diaries consultant:',
    serverSideData?.IsLiveDiaryConsultant
  );
  console.log('first appointment:', serverSideData?.FirstAppointment);

  /*
  // example client side get first appointment call
  getLDBFirstAppointmentData( "4113571", 
                              props.fields.API_C2_FirstAppointment_BaseURL.value, 
                              props.fields.API_C2_FirstAppointment_Header.value)
                              .then(res=>
                                {  console.log('first appointment client side:', res);
                                });*/

  // top specialty
  const topSpecialty = serverSideData?.ProfileJson.keywords.filter(
    (item: any) => item.parentName === 'ABSTRACT_TOP_LEVEL_KEYWORD'
  );

  // languages
  const languagesList: string[] = [];
  serverSideData?.ProfileJson?.languages.forEach((item: any) => {
    languagesList.push(capitalizeFirstLetter(item.name));
  });
  const languagesString = languagesList.toString().split(',').join(', ');

  // gmcNumber
  const gmcNumber = serverSideData?.ProfileJson?.registrationBodies.filter(
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
        {/* top section */}
        <div>
          <Breadcrumbs>
            <a href="#">Consultant Finder</a>
            {topSpecialty[0]?.name && <a href="#">{topSpecialty[0]?.name}</a>}
            <span>{`${serverSideData?.ProfileJson?.firstName} ${serverSideData?.ProfileJson?.lastName}`}</span>
          </Breadcrumbs>
          <MobileTabs>
            <Themes theme={'F-HCA-White'}>
              <Tabs
                callback={() => {}}
                tabs={[
                  {
                    icon: 'iconBook',
                    label: 'About',
                  },
                  {
                    icon: 'iconPin',
                    label: 'Locations',
                  },
                  {
                    icon: 'iconCreditCard',
                    label: 'Fees',
                  },
                  {
                    icon: 'iconComment',
                    label: 'Reviews',
                  },
                ]}
              />
            </Themes>
          </MobileTabs>
        </div>
        <ConsultantFinderProfileWrapper>
          <MainWrapper>
            <ProfilePageHeader
              image={serverSideData?.ProfileJson?.images?.logo}
              name={`${serverSideData?.ProfileJson?.firstName} ${serverSideData?.ProfileJson?.lastName}`}
              topSpecialty={topSpecialty[0]?.name || ''}
              infoBoxText={'some text'}
              overallExperienceYears={
                yearsExperience(
                  serverSideData?.ProfileJson?.yearsOfExperience
                ) || 0
              }
              overallExperienceYearsText={'years of experience'}
            >
              <Themes theme={'F-HCA-White'}>
                <Tabs
                  callback={() => {}}
                  tabs={[
                    {
                      icon: 'iconBook',
                      label: 'About',
                    },
                    {
                      icon: 'iconPin',
                      label: 'Locations',
                    },
                    {
                      icon: 'iconCreditCard',
                      label: 'Fees',
                    },
                    {
                      icon: 'iconComment',
                      label: 'Reviews',
                    },
                  ]}
                />
              </Themes>
            </ProfilePageHeader>
            <ProfilePageSection>
              <About
                title={'About'}
                description={serverSideData?.ProfileJson?.about}
              >
                <SidePanel>
                  <Reviews
                    doctifyLogo={
                      <JssImage field={props.fields.DoctifyLogoImage} />
                    }
                    doctifyText="Reviewed By"
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
                    titleText="PATIENTS REVIEWS"
                  />
                  <InfoBox
                    backgroundColour="green"
                    icon={null}
                    isShortInfo
                    longText="If you're experiencing life-threatening symptoms such as chest pain or shortness of breath, we always recommend calling 999 instead of booking an appointment."
                    longTextTitle="TITLE"
                    shortText="Next initial appointment on Fri, Oct 28"
                  />
                  <InfoBox
                    backgroundColour="orange"
                    icon={null}
                    isShortInfo
                    longText="If you're experiencing life-threatening symptoms such as chest pain or shortness of breath, we always recommend calling 999 instead of booking an appointment."
                    longTextTitle="TITLE"
                    shortText="Next initial appointment on Fri, Oct 28"
                  />
                  <Text tag="p" variation="body-small">
                    Last checked: 1 min ago
                  </Text>
                </SidePanel>
              </About>
            </ProfilePageSection>
            {subSpecialtiesData.length > 0 && (
              <ProfilePageSection>
                <DataComponentSimple
                  title={'Subspecialities'}
                  data={subSpecialtiesData}
                ></DataComponentSimple>
              </ProfilePageSection>
            )}
            <ProfilePageSection>
              <TreatmentsConditions
                treatmentsLabel={'ALL PROCEDURES'}
                conditionsLabel={'ALL CONDITIONS'}
                treatmentsList={treatments}
                conditionsList={conditions}
                noTreatmentsMsg={'No treatments'}
                noConditionsMsg={'No conditions'}
              ></TreatmentsConditions>
            </ProfilePageSection>
            <ProfilePageSection>
              <DataComponentSimple
                title={'Languages'}
                data={languagesString}
              ></DataComponentSimple>
            </ProfilePageSection>
            {/* No fees check */}
            <ProfilePageSection>
              <ConsultantFees
                title={'Consultation Fees'}
                newAppointmentFees={
                  serverSideData?.ProfileJson?.consultationFees?.new || null
                }
                newAppointmentFeesLabel={'New appointment'}
                followUpAppointmentFees={
                  serverSideData?.ProfileJson?.consultationFees?.followUp ||
                  null
                }
                followUpAppointmentFeesLabel={'Follow-up appointment'}
              ></ConsultantFees>
            </ProfilePageSection>
            <ProfilePageSection>
              <DataComponentSimple
                title={'qualifications'}
                data={serverSideData?.ProfileJson?.suffix}
              ></DataComponentSimple>
            </ProfilePageSection>
            {serverSideData?.ProfileJson?.registrationBodies.length > 0 && (
              <ProfilePageSection>
                <DataComponentSimple
                  title={'Registered with'}
                  data={`General Medical Council: ${gmcNumber}`}
                ></DataComponentSimple>
              </ProfilePageSection>
            )}
            <ProfilePageSection>
              <Locations
                title={'Locations'}
                locations={serverSideData?.ProfileJson?.practices}
                noLocationsText={
                  'This consultant doesn’t have any locations information at the moment.'
                }
              ></Locations>
            </ProfilePageSection>
            <OverallRating
              title={'Reviews'}
              subtitle={'Overall Rating'}
              overallExperienceLabel={'Overall experience'}
              personalCareLabel={'Personal care received'}
              explanationLabel={'Explanation of care provided'}
              overallExperience={
                serverSideData?.ProfileJson?.review?.overallExperience || 0
              }
              overalCare={
                serverSideData?.ProfileJson?.review?.bedsideManner || 0
              }
              explanation={
                serverSideData?.ProfileJson?.review?.explanation || 0
              }
            ></OverallRating>
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
                doctifyLogo={<JssImage field={props.fields.DoctifyLogoImage} />}
                doctifyText="Reviewed By"
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
                titleText="PATIENTS REVIEWS"
              />
              <InfoBox
                backgroundColour="green"
                icon={null}
                isShortInfo
                longText="If you're experiencing life-threatening symptoms such as chest pain or shortness of breath, we always recommend calling 999 instead of booking an appointment."
                longTextTitle="TITLE"
                shortText="Next initial appointment on Fri, Oct 28"
              />
              <InfoBox
                backgroundColour="orange"
                icon={null}
                isShortInfo
                longText="If you're experiencing life-threatening symptoms such as chest pain or shortness of breath, we always recommend calling 999 instead of booking an appointment."
                longTextTitle="TITLE"
                shortText="Next initial appointment on Fri, Oct 28"
              />
              <Text tag="p" variation="body-small">
                Last checked: 1 min ago
              </Text>
              <Container marginTop="spacing-5">
                {/* if consultant has live diaries then show 'book online' */}
                {serverSideData?.IsLiveDiaryConsultant && (
                  <Button
                    variation="full-dark"
                    size="small"
                    contentVariation="full-width"
                  >
                    <button>
                      <span>
                        <strong>Book</strong> online
                      </span>
                    </button>
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
                      <button>
                        <span>
                          <strong>Enquire</strong> now
                        </span>
                      </button>
                    </Button>
                  )}
                <Button
                  variation="outline"
                  size="small"
                  contentVariation="full-width"
                >
                  <button>
                    <Icons iconName="iconPhone" />
                    <span>
                      <strong>Call to</strong> book
                    </span>
                  </button>
                </Button>
              </Container>
            </SidePanel>
          </SideWrapper>
        </ConsultantFinderProfileWrapper>
        <Navigation showOnMobile={true}>
          {/* if consultant has live diaries then show 'book online' */}
          {serverSideData?.IsLiveDiaryConsultant && (
            <Button
              variation="full-dark"
              size="small"
              contentVariation="full-width"
            >
              <button>
                <span>
                  <strong>Book</strong> online
                </span>
              </button>
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
                <button>
                  <span>
                    <strong>Enquire</strong> now
                  </span>
                </button>
              </Button>
            )}
          <Button
            variation="outline"
            size="small"
            contentVariation="full-width"
          >
            <button>
              {/* <Icons iconName="iconPhone" /> */}
              <span>
                <strong>Call to</strong> book
              </span>
            </button>
          </Button>
        </Navigation>
      </div>
    );
  }

  return <StepDefaultComponent {...props} />;
};
