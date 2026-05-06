// Below are built-in components that are available in the app, it's recommended to keep them as is

import { BYOCServerWrapper, NextjsContentSdkComponent, FEaaSServerWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

// end of built-in components
import * as PartialDesignDynamicPlaceholder from 'src/components/partial-design-dynamic-placeholder/PartialDesignDynamicPlaceholder';
import * as IntroBlock from 'src/components/IntroBlock/IntroBlock';
import * as ImageShortText from 'src/components/ImageShortText/ImageShortText';
import * as DoctifyGraphQltypes from 'src/components/Doctify/DoctifyGraphQl.types';
import * as DoctifyGraphQl from 'src/components/Doctify/DoctifyGraphQl';
import * as Doctifytypes from 'src/components/Doctify/Doctify.types';
import * as Doctify from 'src/components/Doctify/Doctify';
import * as CQCRatingGraphQltypes from 'src/components/CQCRating/CQCRatingGraphQl.types';
import * as CQCRatingGraphQl from 'src/components/CQCRating/CQCRatingGraphQl';
import * as CQCRatingtypes from 'src/components/CQCRating/CQCRating.types';
import * as CQCRating from 'src/components/CQCRating/CQCRating';
import * as Accordions from 'src/components/Accordions/Accordions';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCServerWrapper],
  ['FEaaSWrapper', FEaaSServerWrapper],
  ['Form', { ...Form, componentType: 'client' }],
  ['PartialDesignDynamicPlaceholder', { ...PartialDesignDynamicPlaceholder }],
  ['IntroBlock', { ...IntroBlock }],
  ['ImageShortText', { ...ImageShortText }],
  ['DoctifyGraphQl', { ...DoctifyGraphQltypes, ...DoctifyGraphQl }],
  ['Doctify', { ...Doctifytypes, ...Doctify }],
  ['CQCRatingGraphQl', { ...CQCRatingGraphQltypes, ...CQCRatingGraphQl }],
  ['CQCRating', { ...CQCRatingtypes, ...CQCRating }],
  ['Accordions', { ...Accordions, componentType: 'client' }],
]);

export default componentMap;
