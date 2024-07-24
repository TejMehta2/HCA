import config from 'temp/config';
import {
  GraphQLErrorPagesService,
  SitecoreContext,
  ErrorPages,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { SitecorePageProps } from 'lib/page-props';
import NotFound from 'src/NotFound';
import { componentBuilder } from 'temp/componentBuilder';
import Layout from 'src/Layout';
import { GetStaticProps } from 'next';
import { siteResolver } from 'lib/site-resolver';
import clientFactory from 'lib/graphql-client-factory';
import { ILogEmailFields, submitLogEmail } from 'lib/consultant-finder/API_HCA';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const Custom404 = (props: SitecorePageProps): JSX.Element => {
  const router = useRouter();
  const [postedData, setPostedData] = useState(false);
  //console.log(JSON.stringify(router));
  //router.isReady = true;
  useEffect(() => {
    console.log('in useeffect router.isReady', router.isReady);
    if (!router.isReady) {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  // post an email to notify HCA team that a 404 was hit, useEffect - only want a single email!
  if (!postedData) {
    setPostedData(true);
    console.log('in postedData', postedData);
    postData(`user landed on 404 page from ${router?.asPath}`);
  } else {
    console.log('else postedData', postedData);
  }

  if (!(props && props.layoutData)) {
    return <NotFound />;
  }

  return (
    <SitecoreContext
      componentFactory={componentBuilder.getComponentFactory()}
      layoutData={props.layoutData}
    >
      <Layout layoutData={props.layoutData} headLinks={props.headLinks} />
    </SitecoreContext>
  );
};

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    console.log('NavigationEvents', url);
    // You can now use the current URL
    // ...
  }, [pathname, searchParams]);

  return null;
}

const postData = async (freeText: string) => {
  const dataToSend: ILogEmailFields = {
    profileType: '404Report',
    freeText: freeText,
  };
  //console.log('postData dataToSend', dataToSend);
  /*const res = */ await submitLogEmail(dataToSend);
  //console.log('postData res', res);
};

export const getStaticProps: GetStaticProps = async (context) => {
  const site = siteResolver.getByName(config.sitecoreSiteName);
  const errorPagesService = new GraphQLErrorPagesService({
    clientFactory,
    siteName: site.name,
    language: context.locale || config.defaultLanguage,
    retries:
      (process.env.GRAPH_QL_SERVICE_RETRIES &&
        parseInt(process.env.GRAPH_QL_SERVICE_RETRIES, 10)) ||
      0,
  });
  let resultErrorPages: ErrorPages | null = null;

  if (!process.env.DISABLE_SSG_FETCH) {
    try {
      resultErrorPages = await errorPagesService.fetchErrorPages();
    } catch (error) {
      console.log('Error occurred while fetching error pages');
      console.log(error);
    }
  }

  return {
    props: {
      headLinks: [],
      layoutData: resultErrorPages?.notFoundPage?.rendered || null,
    },
  };
};

export default Custom404;
