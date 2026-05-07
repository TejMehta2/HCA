// Below are built-in components that are available in the app, it's recommended to keep them as is

import { BYOCServerWrapper, NextjsContentSdkComponent, FEaaSServerWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

// end of built-in components
import * as PartialDesignDynamicPlaceholder from 'src/components/partial-design-dynamic-placeholder/PartialDesignDynamicPlaceholder';
import * as IntroBlock from 'src/components/Page Content/IntroBlock/IntroBlock';
import * as ImageShortText from 'src/components/Page Content/ImageShortText/ImageShortText';
import * as DoctifyGraphQltypes from 'src/components/Page Content/Doctify/DoctifyGraphQl.types';
import * as DoctifyGraphQl from 'src/components/Page Content/Doctify/DoctifyGraphQl';
import * as Doctifytypes from 'src/components/Page Content/Doctify/Doctify.types';
import * as Doctify from 'src/components/Page Content/Doctify/Doctify';
import * as CTAButton from 'src/components/Page Content/CTAButton/CTAButton';
import * as CQCRatingGraphQltypes from 'src/components/Page Content/CQCRating/CQCRatingGraphQl.types';
import * as CQCRatingGraphQl from 'src/components/Page Content/CQCRating/CQCRatingGraphQl';
import * as CQCRatingtypes from 'src/components/Page Content/CQCRating/CQCRating.types';
import * as CQCRating from 'src/components/Page Content/CQCRating/CQCRating';
import * as CallUsTodayCTA from 'src/components/Page Content/CallUsTodayCTA/CallUsTodayCTA';
import * as Accordions from 'src/components/Page Content/Accordions/Accordions';
import * as MainNavigationtypes from 'src/components/Navigation/MainNavigation/MainNavigation.types';
import * as MainNavigation from 'src/components/Navigation/MainNavigation/MainNavigation';
import * as Footerutilities from 'src/components/Navigation/Footer/Footer.utilities';
import * as Footertypes from 'src/components/Navigation/Footer/Footer.types';
import * as Footer from 'src/components/Navigation/Footer/Footer';
import * as BasicFooter from 'src/components/Navigation/BasicFooter/BasicFooter';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCServerWrapper],
  ['FEaaSWrapper', FEaaSServerWrapper],
  ['Form', { ...Form, componentType: 'client' }],
  ['PartialDesignDynamicPlaceholder', { ...PartialDesignDynamicPlaceholder }],
  ['IntroBlock', { ...IntroBlock }],
  ['ImageShortText', { ...ImageShortText }],
  ['DoctifyGraphQl', { ...DoctifyGraphQltypes, ...DoctifyGraphQl }],
  ['Doctify', { ...Doctifytypes, ...Doctify }],
  ['CTAButton', { ...CTAButton }],
  ['CQCRatingGraphQl', { ...CQCRatingGraphQltypes, ...CQCRatingGraphQl }],
  ['CQCRating', { ...CQCRatingtypes, ...CQCRating }],
  ['CallUsTodayCTA', { ...CallUsTodayCTA, componentType: 'client' }],
  ['Accordions', { ...Accordions, componentType: 'client' }],
  ['MainNavigation', { ...MainNavigationtypes, ...MainNavigation }],
  ['Footer', { ...Footerutilities, ...Footertypes, ...Footer }],
  ['BasicFooter', { ...BasicFooter }],
]);

export default componentMap;
