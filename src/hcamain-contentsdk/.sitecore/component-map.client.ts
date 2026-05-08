// Client-safe component map for App Router

import { BYOCClientWrapper, NextjsContentSdkComponent, FEaaSClientWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

import * as StickyCTA from 'src/components/Page Content/StickyCTA/StickyCTA';
import * as CallUsTodayCTA from 'src/components/Page Content/CallUsTodayCTA/CallUsTodayCTA';
import * as Accordions from 'src/components/Page Content/Accordions/Accordions';
import * as TableOfContents from 'src/components/Navigation/TableOfContents/TableOfContents';
import * as MainNavigation from 'src/components/Navigation/MainNavigation/MainNavigation';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCClientWrapper],
  ['FEaaSWrapper', FEaaSClientWrapper],
  ['Form', Form],
  ['StickyCTA', { ...StickyCTA }],
  ['CallUsTodayCTA', { ...CallUsTodayCTA }],
  ['Accordions', { ...Accordions }],
  ['TableOfContents', { ...TableOfContents }],
  ['MainNavigation', { ...MainNavigation }],
]);

export default componentMap;
