/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// CMA disclosure component for consultant legal statement
// from legacy site - sits in the root e.g. https://www.hcacloud.localhost/cma-disclosure?CmaContentId=5251DC52-E57D-47EA-8552-98BFEFF89E72
import {
  GetStaticComponentProps,
  useComponentProps,
  ComponentRendering,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { getCMAs } from 'lib/consultant-finder/API_HCA';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Fields {
  // from the Specific component data template e.g. /sitecore/templates/Project/HCA/Consultant finder/StepSPECIFIC
  // add specific fields defined in the data template here...
}

type StepProps = {
  rendering: ComponentRendering;
  params: { [key: string]: string };
  fields: Fields;
};

interface ServerSideProps {
  cmaHTMLs: any[];
}

/**
 * Will be called during SSG
 * @param {ComponentRendering} _rendering
 * @param {LayoutServiceData} _layoutData
 * @param {GetStaticPropsContext} _context
 */
export const getStaticProps: GetStaticComponentProps = async (
  _rendering,
  _layoutData,
  _context
) => {
  const CMAs = await getCMAs();
  const returnProps: ServerSideProps = {
    cmaHTMLs: CMAs,
  };
  // returned stuff from the server side
  return returnProps;
};

const CMADisclosureComponent = (props: StepProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">CMA Disclosure</span>
    </div>
  </div>
);

export const Default = (props: StepProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const serverSideData = useComponentProps<ServerSideProps>(
    props.rendering.uid
  );

  const [cmaData, setCMAData] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    // grab the GUID from the query parmeters
    const id = router?.query?.CmaContentId || null;
    if (id && serverSideData?.cmaHTMLs) {
      // find our record from the server-side data
      const record = serverSideData?.cmaHTMLs.filter(
        (rec: { Key: string | unknown[] }) => rec.Key === id
      );
      if (record) {
        setCMAData(record[0].Value);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  if (props.fields) {
    return (
      <div
        className={`component promo ${props.params.styles}`}
        id={id ? id : undefined}
      >
        <div className="component-content">
          <div dangerouslySetInnerHTML={{ __html: cmaData }} />
        </div>
      </div>
    );
  }

  return <CMADisclosureComponent {...props} />;
};
