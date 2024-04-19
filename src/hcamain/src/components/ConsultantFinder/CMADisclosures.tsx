/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// CMA disclosure component for consultant legal statement
// from legacy site - sits in the root e.g. https://www.hcacloud.localhost/cma-disclosure?CmaContentId=5251DC52-E57D-47EA-8552-98BFEFF89E72
import {
  GetStaticComponentProps,
  useComponentProps,
  ComponentRendering,
  LayoutServiceData,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { getCMA } from 'lib/consultant-finder/API_HCA';
import { GetServerSidePropsContext } from 'next';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

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
  cmaHTML: string;
}

/**
 * If exported, will be called during SSG
 * @param {ComponentRendering} _rendering
 * @param {LayoutServiceData} _layoutData
 * @param {GetStaticPropsContext} _context
 */
/*export*/ const getStaticProps: GetStaticComponentProps = async (
  _rendering,
  _layoutData,
  context
) => {
  // based on https://github.com/vercel/next.js/discussions/38061

  let id: string | undefined = '';
  const path = context?.params?.path;
  if (path !== undefined) {
    if (path && typeof path !== 'string' && path.length) {
      id = path.pop();
    }
  }

  if (id) {
    const rec = await getCMA(id);

    if (rec) {
      const returnProps: ServerSideProps = {
        cmaHTML: rec.Value, // HTML
      };
      // returned stuff from the server side
      return returnProps;
    }
  }
  return {
    notFound: true, // This will result in a 404 page being rendered
  };
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

export const Default = (props: StepProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const serverSideData = useComponentProps<ServerSideProps>(
    props.rendering.uid
  );
  const router = useRouter();
  const pathname = usePathname();
  //console.log('serverSideData?.cmaHTML', serverSideData?.cmaHTML);
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    // grab the GUID from the query parmeters - legacy style - redirect
    const id = router?.query?.CmaContentId || null;
    if (id) {
      const url = `${pathname
        ?.toLowerCase()
        .replace('cma-disclosure', 'cma-disclosures')}/${id}`;
      // redirect old format to new format (Next format) url
      router.replace(url, undefined, { shallow: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverSideData?.cmaHTML]);

  return (
    <div
      className={`component promo ${props.params.styles}`}
      id={id ? id : undefined}
    >
      <div className="component-content">
        <div
          dangerouslySetInnerHTML={{
            __html: serverSideData
              ? serverSideData.cmaHTML
              : 'No CMA record found',
          }}
        />
      </div>
    </div>
  );
};
