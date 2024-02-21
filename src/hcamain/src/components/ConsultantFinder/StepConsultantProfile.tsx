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

// request e.g. https://www.hcacloud.localhost/Finder/StepConsultantProfile/mr-andrew-goldberg
const Doctify_Specialists_URL = 'https://api.doctify.com/api/hca/specialists/';
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
  const slug = context?.params?.requestPath; // e.g. mr-andrew-goldberg
  const requestURL = `${Doctify_Specialists_URL}${slug}`;

  try {
    const res = await fetch(requestURL);
    if (res.ok) {
      const docitfyData = await res.json();
      return `GetStaticComponentProps: slug=${slug}, requestURL=${requestURL}, docitfyData=${JSON.stringify(docitfyData)}`;
    } else {
      return `GetStaticComponentProps: slug=${slug}, requestURL=${requestURL}, docitfy call failed res=${res.status} text=${res.statusText}`;
    }
  } catch(e) {
    return `GetStaticComponentProps: slug=${slug}, requestURL=${requestURL}, docitfy call failed with exception=${e}`;
  }

  return null;
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
  const externalData = useComponentProps<string>(props.rendering.uid);
  console.log('profile', externalData);
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
        <div>External data: {externalData}</div>
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
