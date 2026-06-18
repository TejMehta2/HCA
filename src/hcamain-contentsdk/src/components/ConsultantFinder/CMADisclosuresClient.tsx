// CMA Disclosure component works in 2 modes,
// client side and server side depending on if the Doctify mode in the config checkbox is checked
// if API_HCA_CMAs_UseDoctifyData is checked, then the links in the profile are set to point to the new Doctify format links
// and to get the data from Doctify.
// otherwise they will use the legacy format and our look up data.
// if the wildcard page is rendered or if the legacy static page in the root is rendered.
//
// legacy compatible mode - CMA Id format, data will be looked up client side from the id and rendered.
// https://www.hcacloud.localhost/cma-disclosure?CmaContentId=5251DC52-E57D-47EA-8552-98BFEFF89E72
//
// new mode - doctify slug format, data will come from the Doctify record and is based on the slug
// https://www.hcacloud.localhost/Finder/CMADisclosures/miss-joanna-franks
'use client';

import { type JSX, Suspense, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import type {
  ComponentRendering,
  Page,
} from '@sitecore-content-sdk/nextjs';
import axios from 'axios';
import CmaDisclosure from '@component-library/consultant-finder/CmaDisclosure/CmaDisclosure';
import { getPathSegments } from './routeQuery';

type Fields = object;

export type CMADisclosuresProps = {
  rendering: ComponentRendering;
  params: { [key: string]: string };
  fields: Fields;
  page: Page;
};

type CMADisclosuresClientProps = Omit<CMADisclosuresProps, 'page'> & {
  cmaHTML: string;
};

const StepDefaultComponent = (
  props: Pick<CMADisclosuresClientProps, 'params'>
): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">No CMA disclosure</span>
    </div>
  </div>
);

const DefaultContent = (props: CMADisclosuresClientProps): JSX.Element => {
  const params = useParams<{ path?: string[] }>();
  const searchParams = useSearchParams();
  const id = props.params.RenderingIdentifier;
  const [cmaHTML, setcmaHTML] = useState(props.cmaHTML || 'Loading...');
  //console.log('cmaHTML', cmaHTML);
  useEffect(() => {
    if (props.cmaHTML) {
      return;
    }

    //console.log('use effect1');
    // grab the GUID from the query parmeters - legacy style - redirect?
    let cmaId = searchParams.get('CmaContentId');
    const path = getPathSegments(params.path);
    if (!cmaId && path.length > 0) {
      //grab the GUID from the url frag - NextJS style? parmeters
      cmaId = path[path.length - 1];
    }
    const cmaURL = `https:/api/finderAPI/CMA?cmaId=${cmaId}`;

    axios
      .get(cmaURL)
      .then(function (response) {
        // handle success
        // console.log('loaded cma', response.data?.Value);
        setcmaHTML(response.data?.Value);
      })
      .catch(function (error) {
        // handle error
        console.warn('error loading cma', error);
        setcmaHTML('error loading');
      })
      .finally(function () {
        // always executed
      });
  }, [params.path, props.cmaHTML, searchParams]);

  if (props.fields) {
    return (
      <div
        className={`component promo ${props.params.styles}`}
        id={id ? id : undefined}
      >
        <CmaDisclosure>
          <div
            dangerouslySetInnerHTML={{
              __html: cmaHTML ? cmaHTML : 'No CMA record found',
            }}
          ></div>
        </CmaDisclosure>
      </div>
    );
  }

  return <StepDefaultComponent params={props.params} />;
};

export const Default = (props: CMADisclosuresClientProps): JSX.Element => (
  <Suspense fallback={null}>
    <DefaultContent {...props} />
  </Suspense>
);
