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

import { encode } from 'querystring';
// import { useSearchParams } from 'next/navigation';
import { ConsultantFinderContext } from 'src/context/consultantFinderContext';
import { checkIfLiveBookingIsAvailable, getSpecialistProfileData, isErrorWithProfileData } from 'src/pages/Finder/StepConsultantProfile/finderHelpers';

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

interface ServerSideProps
{
  Slug: string;
  IsLiveDiaryConsultant: boolean;
  ProfileJson: string;
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
  
  let returnProps: ServerSideProps =
  {
    Slug: slug,
    ErrorWithProfileData: errorWithProfileData,
    IsLiveDiaryConsultant: isLiveDiaryConsultant,
    ProfileJson: consultantProfileJson
  }

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
  const serverSideData = useComponentProps<ServerSideProps>(props.rendering.uid);
  //console.log('server side data from component props: ', serverSideData);
  console.log('Is live diaries consultant:', serverSideData?.IsLiveDiaryConsultant);
  const { message, setMessage } = useContext(ConsultantFinderContext);

  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div
        className={`component promo ${props.params.styles}`}
        id={id ? id : undefined}
      >
        <div>Message: {message}</div>
        <button onClick={() => setMessage('testing new')}>
          Change message
        </button>
        <div>Slug: {serverSideData?.Slug}</div>
        <div>Error with data?: {serverSideData?.ErrorWithProfileData ? "true" : "false"}</div>
        <div>Is live diaries consultant?: {serverSideData?.IsLiveDiaryConsultant ? "true" : "false"}</div>
        <div>Their doctify profile data: {JSON.stringify(serverSideData?.ProfileJson)}</div>

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
            {/* <div className="field-promolink">
              <h2>Links from the specifc component template</h2>
              <h3>The profile will render either the enquire now or book online link</h3>
              <Button size={'small'} theme={'outline'}>
                <JssLink field={props.fields.EnquireNowLink} title={props.fields.EnquireNowLink.value.text}></JssLink>
              </Button>
              <Button size={'small'} theme={'outline'}>
                <JssLink field={props.fields.BookOnlineLink} title={props.fields.BookOnlineLink.value.text}></JssLink>
              </Button>
              <h3>Back if coming from advanced search path...</h3>
              <Button size={'small'} theme={'outline'}>
                <JssLink field={props.fields.BackFromAdvSearchLink} title={props.fields.BackFromAdvSearchLink.value.text}></JssLink>
              </Button>
              <h3>Back if coming from find consultant path...</h3>
              <Button size={'small'} theme={'outline'}>
                <JssLink field={props.fields.BackFromFindByConsultantLink} title={props.fields.BackFromFindByConsultantLink.value.text}></JssLink>
              </Button>
            </div>            
            <div className="field-promolink">
              <h2>Links from the base template</h2>
              <Button size={'small'} theme={'outline'}>
                <JssLink field={props.fields.NextLink} title={props.fields.NextLink.value.text}></JssLink>
              </Button>
              <Button size={'small'} theme={'outline'}>
                <JssLink field={props.fields.BackLink} title={props.fields.BackLink.value.text}></JssLink>
              </Button>
              <Button size={'small'} theme={'outline'}>
                <JssLink field={props.fields.StartLink} title={props.fields.StartLink.value.text}></JssLink>
              </Button>
            </div> */}
          </div>
        </div>
      </div>
    );
  }

  return <StepDefaultComponent {...props} />;
};


