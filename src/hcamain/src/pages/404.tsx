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

const Custom404 = (props: SitecorePageProps): JSX.Element => {
  postData('landed on 404 page');
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

const postData = async (freeText: string) => {
  const dataToSend:ILogEmailFields = {
    profileType: '404Report',
    freeText: freeText
  };
  //const URL = 'https:/api/formAPI/PostLogEmail';
  console.log('dataToSend', dataToSend);
  await submitLogEmail(dataToSend);

  /*
  axios
    .post(URL, dataToSend)
    .then((resp) => {
      console.log(resp);
    })
    .catch((error) => {
      console.log(error);
    });*/
};
/*
const onSubmit = (data: any) => {
  // console.log('data', data);
  postData(data);
};*/












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
