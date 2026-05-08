// Client-safe component map for App Router

import { BYOCClientWrapper, NextjsContentSdkComponent, FEaaSClientWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

import * as StickyCTA from 'src/components/Page Content/StickyCTA/StickyCTA';
import * as CallUsTodayCTA from 'src/components/Page Content/CallUsTodayCTA/CallUsTodayCTA';
import * as Accordions from 'src/components/Page Content/Accordions/Accordions';
import * as TableOfContents from 'src/components/Navigation/TableOfContents/TableOfContents';
import * as MainNavigation from 'src/components/Navigation/MainNavigation/MainNavigation';
import * as CareersSearchResults from 'src/components/Careers/CareersSearchResults/CareersSearchResults';
import * as CareersSearchHero from 'src/components/Careers/CareersSearchHero/CareersSearchHero';
import * as CareersSearchBlock from 'src/components/Careers/CareersSearchBlock/CareersSearchBlock';
import * as CareersLatestVacancies from 'src/components/Careers/CareersLatestVacancies/CareersLatestVacancies';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCClientWrapper],
  ['FEaaSWrapper', FEaaSClientWrapper],
  ['Form', Form],
  ['StickyCTA', { ...StickyCTA }],
  ['CallUsTodayCTA', { ...CallUsTodayCTA }],
  ['Accordions', { ...Accordions }],
  ['TableOfContents', { ...TableOfContents }],
  ['MainNavigation', { ...MainNavigation }],
  ['CareersSearchResults', { ...CareersSearchResults }],
  ['CareersSearchHero', { ...CareersSearchHero }],
  ['CareersSearchBlock', { ...CareersSearchBlock }],
  ['CareersLatestVacancies', { ...CareersLatestVacancies }],
]);

export default componentMap;
