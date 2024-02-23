// Consultant profile component
// Place on page in wildcarded folder e.g. \XMCloud\HCA-Eqtr\HCA-XMCloud\src\hcamain\src\pages\finder\StepConsultantProfile
// alongside the [...path].tsx page definition,
// the last path element being the wildcard and carrying the doctify slug
// e.g. https://www.hcacloud.localhost/finder/profile/mr-andrew-goldberg
// as per https://developers.sitecore.com/learn/accelerate/xm-cloud/implementation/information-architecture/wildcard-pages

import React, { useContext } from 'react';
import {
  GetServerSideComponentProps,
  GetStaticComponentProps,
  Image as JssImage,
  RichText as JssRichText,
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

import { encode } from 'querystring';
// import { useSearchParams } from 'next/navigation';
import { ConsultantFinderContext } from 'src/context/consultantFinderContext';
import {
  checkIfLiveBookingIsAvailable,
  getSpecialistProfileData,
  isErrorWithProfileData,
} from 'src/pages/Finder/StepConsultantProfile/finderHelpers';
import Container from '@component-library/foundation/Containers/Container';
import Button from '@component-library/core-components/Button/Button';
import Icons from '@component-library/foundation/Icons/Icons';

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
}

interface ServerSideProps {
  Slug: string;
  IsLiveDiaryConsultant: boolean;
  ProfileJson: any;
  ErrorWithProfileData: boolean;
}

/**
 * Will be called during SSG
 * @param {ComponentRendering} rendering
 * @param {LayoutServiceData} layoutData
 * @param {GetStaticPropsContext} context
 */
export const getStaticProps: GetStaticComponentProps = async (
  rendering,
  layoutData,
  context
) => {
  // based on https://github.com/vercel/next.js/discussions/38061
  const slug = context?.params?.requestPath as string; // e.g. mr-andrew-goldberg
  const consultantProfileJson = await getSpecialistProfileData(slug);
  const isLiveDiaryConsultant = await checkIfLiveBookingIsAvailable(slug);
  const errorWithProfileData = isErrorWithProfileData(consultantProfileJson);
  //console.log("consultantProfileJson: ", consultantProfileJson);

  const returnProps: ServerSideProps = {
    Slug: slug,
    ErrorWithProfileData: errorWithProfileData,
    IsLiveDiaryConsultant: isLiveDiaryConsultant,
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
  const { message, setMessage } = useContext(ConsultantFinderContext);

  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div
        className={`component promo ${props.params.styles}`}
        id={id ? id : undefined}
      >
        <SidePanel>
          <div>
            <Reviews
              doctifyLogo={null}
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
          </div>
        </SidePanel>
        <div>Message: {message}</div>
        <button onClick={() => setMessage('testing new')}>
          Change message
        </button>
        <div>Slug: {serverSideData?.Slug}</div>
        <div>
          Error with data?:{' '}
          {serverSideData?.ErrorWithProfileData ? 'true' : 'false'}
        </div>
        <div>
          Is live diaries consultant?:{' '}
          {serverSideData?.IsLiveDiaryConsultant ? 'true' : 'false'}
        </div>
        {/* <div>
          Their doctify profile data:{' '}
          {JSON.stringify(serverSideData?.ProfileJson)}
        </div> */}

        <div className="component-content">
          <div className="field-promoicon">
            <JssImage field={props.fields.CardImage} />
          </div>
          <div className="promo-text">
            <div>
              <div className="field-promotext">
                <Text tag="div">
                  <JssRichText field={props.fields.TitleText} />
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <StepDefaultComponent {...props} />;
};
