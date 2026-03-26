import * as React from 'react';


import '@yext/search-ui-react/bundle.css';
//import './styles/bundle.css'; // TODO - switch out for node_modules version as above, work around workspaces limitation
import {
  SearchHeadlessProvider,
  provideHeadless,
  HeadlessConfig,
  Environment,
} from '@yext/search-headless-react';

const environment = process.env
  .NEXT_PUBLIC_YEXT_ENVIRONMENT! as keyof typeof Environment;

export const headlessConfig: HeadlessConfig = {
  apiKey: process.env.NEXT_PUBLIC_YEXT_API_KEY!,
  experienceKey: process.env.NEXT_PUBLIC_YEXT_EXPERIENCE_KEY!,
  locale: 'en_GB',
  environment: Environment[environment],
};

const searcher = provideHeadless(headlessConfig);

/*Jira HED-1597 YEXT analytics https://hitchhikers.yext.com/guides/search-analytics-getting-started/03-analytics-request/*/

/* commenting as we need to check if cookie consent is needed and how this plays with GTM
import { provideAnalytics } from '@yext/analytics';
const analytics = provideAnalytics({
  experienceKey: process.env.NEXT_PUBLIC_YEXT_EXPERIENCE_KEY!, // example: answers-js-docs
  businessId: parseInt(process.env.NEXT_PUBLIC_YEXT_BUSINESS_ID!), // HCA 3806694, // '<your business id>'
  experienceVersion: process.env.NEXT_PUBLIC_YEXT_ENVIRONMENT!, //'PRODUCTION',
  region: 'EU',
});
*/
interface SearchProps {
  children: JSX.Element;
}
const YextProvider = (props: SearchProps) => {
  const { children } = props;

  /*
  console.log(
    'functional cookies allowed?',
    eval("'OnetrustActiveGroups' in window ? OnetrustActiveGroups?.includes('C0003') : true")
  );
  console.log('yext analytics', JSON.stringify(analytics));
  */
  return (
    <SearchHeadlessProvider searcher={searcher}>
      {children}
    </SearchHeadlessProvider>
  );
};

export default YextProvider;
