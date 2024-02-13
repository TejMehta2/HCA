import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  CdpHelper,
  LayoutServicePageState,
  SiteInfo,
  useSitecoreContext,
  PosResolver,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { useEffect } from 'react';
import config from 'temp/config';
import { init } from '@sitecore/engage';
import { siteResolver } from 'lib/site-resolver';

/**
 * This is the CDP page view component.
 * It uses the Sitecore Engage SDK to enable page view events on the client-side.
 * See Sitecore Engage SDK documentation for details.
 * https://www.npmjs.com/package/@sitecore/engage
 */
const CdpPageView = (): JSX.Element => {
  const {
    sitecoreContext: { pageState, route, variantId, site },
  } = useSitecoreContext();
  
  const router = useRouter();

  useEffect(() => {
    // Check if the 'test' query parameter is empty or not present
    const isTestParamEmpty = !router.query.test || router.query.test === '';

    // If 'test' query parameter is empty, redirect to '/Finder/Step-Intro'
    if (isTestParamEmpty) {
      router.push('/Finder/Step-Intro');
    }
  }, [router.query.test]);

  return (
    <>
      <Link href="/Finder/Step-Intro">Back</Link>
      <h1>How are you paying for your treatment?</h1>
      <Link href="/Finder/Step-Locations">Next</Link>
    </>
  );
};

export default CdpPageView;
