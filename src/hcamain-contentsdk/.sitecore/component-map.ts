// Below are built-in components that are available in the app, it's recommended to keep them as is

import { BYOCServerWrapper, NextjsContentSdkComponent, FEaaSServerWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

// end of built-in components
import * as RowSplitter from 'src/components/Structure/RowSplitter';
import * as ColumnSplitter from 'src/components/Structure/ColumnSplitter';
import * as ContainerComponent from 'src/components/Structure/ContainerComponent/ContainerComponent';
import * as PartialDesignDynamicPlaceholder from 'src/components/partial-design-dynamic-placeholder/PartialDesignDynamicPlaceholder';
import * as RichText from 'src/components/Page Content/RichText';
import * as StickyCTA from 'src/components/Page Content/StickyCTA/StickyCTA';
import * as Metadata from 'src/components/Page Content/Metadata/Metadata';
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
import * as BookAnAppointmentCTA from 'src/components/Page Content/BookAnAppointmentCTA/BookAnAppointmentCTA';
import * as BlogText from 'src/components/Page Content/BlogText/BlogText';
import * as BlogSearchtypes from 'src/components/Page Content/BlogSearch/BlogSearch.types';
import * as BlogSearch from 'src/components/Page Content/BlogSearch/BlogSearch';
import * as BlogRelatedArticlestypes from 'src/components/Page Content/BlogRelatedArticles/BlogRelatedArticles.types';
import * as BlogRelatedArticles from 'src/components/Page Content/BlogRelatedArticles/BlogRelatedArticles';
import * as BlogQuote from 'src/components/Page Content/BlogQuote/BlogQuote';
import * as BlogPageHeadertypes from 'src/components/Page Content/BlogPageHeader/BlogPageHeader.types';
import * as BlogPageHeader from 'src/components/Page Content/BlogPageHeader/BlogPageHeader';
import * as BlogImage from 'src/components/Page Content/BlogImage/BlogImage';
import * as BlogDetailsHeader from 'src/components/Page Content/BlogDetailsHeader/BlogDetailsHeader';
import * as BlogCategories from 'src/components/Page Content/BlogCategories/BlogCategories';
import * as BlogCards from 'src/components/Page Content/BlogCards/BlogCards';
import * as Authorsmapping from 'src/components/Page Content/Authors/Authors.mapping';
import * as AuthorsmappingGraphQL from 'src/components/Page Content/Authors/Authors.mapping.GraphQL';
import * as Authors from 'src/components/Page Content/Authors/Authors';
import * as Amenities from 'src/components/Page Content/Amenities/Amenities';
import * as Accordions from 'src/components/Page Content/Accordions/Accordions';
import * as TableOfContentstypes from 'src/components/Navigation/TableOfContents/TableOfContents.types';
import * as TableOfContents from 'src/components/Navigation/TableOfContents/TableOfContents';
import * as SubNavigationtypes from 'src/components/Navigation/SubNavigation/SubNavigation.types';
import * as SubNavigation from 'src/components/Navigation/SubNavigation/SubNavigation';
import * as MainNavigationtypes from 'src/components/Navigation/MainNavigation/MainNavigation.types';
import * as MainNavigation from 'src/components/Navigation/MainNavigation/MainNavigation';
import * as Footerutilities from 'src/components/Navigation/Footer/Footer.utilities';
import * as Footertypes from 'src/components/Navigation/Footer/Footer.types';
import * as Footer from 'src/components/Navigation/Footer/Footer';
import * as Breadcrumbs from 'src/components/Navigation/Breadcrumbs/Breadcrumbs';
import * as BasicFooter from 'src/components/Navigation/BasicFooter/BasicFooter';
import * as JobDetailsHeadertypes from 'src/components/Careers/JobDetailsHeader/JobDetailsHeader.types';
import * as JobDetailsHeader from 'src/components/Careers/JobDetailsHeader/JobDetailsHeader';
import * as JobDetails from 'src/components/Careers/JobDetails/JobDetails';
import * as CareersSearchResults from 'src/components/Careers/CareersSearchResults/CareersSearchResults';
import * as CareersSearchHerotypes from 'src/components/Careers/CareersSearchHero/CareersSearchHero.types';
import * as CareersSearchHero from 'src/components/Careers/CareersSearchHero/CareersSearchHero';
import * as CareersSearchBlocktypes from 'src/components/Careers/CareersSearchBlock/CareersSearchBlock.types';
import * as CareersSearchBlock from 'src/components/Careers/CareersSearchBlock/CareersSearchBlock';
import * as CareersLatestVacanciestypes from 'src/components/Careers/CareersLatestVacancies/CareersLatestVacancies.types';
import * as CareersLatestVacancies from 'src/components/Careers/CareersLatestVacancies/CareersLatestVacancies';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCServerWrapper],
  ['FEaaSWrapper', FEaaSServerWrapper],
  ['Form', { ...Form, componentType: 'client' }],
  ['RowSplitter', { ...RowSplitter }],
  ['ColumnSplitter', { ...ColumnSplitter }],
  ['ContainerComponent', { ...ContainerComponent }],
  ['PartialDesignDynamicPlaceholder', { ...PartialDesignDynamicPlaceholder }],
  ['RichText', { ...RichText }],
  ['StickyCTA', { ...StickyCTA, componentType: 'client' }],
  ['Metadata', { ...Metadata }],
  ['IntroBlock', { ...IntroBlock }],
  ['ImageShortText', { ...ImageShortText }],
  ['DoctifyGraphQl', { ...DoctifyGraphQltypes, ...DoctifyGraphQl }],
  ['Doctify', { ...Doctifytypes, ...Doctify }],
  ['CTAButton', { ...CTAButton }],
  ['CQCRatingGraphQl', { ...CQCRatingGraphQltypes, ...CQCRatingGraphQl }],
  ['CQCRating', { ...CQCRatingtypes, ...CQCRating }],
  ['CallUsTodayCTA', { ...CallUsTodayCTA, componentType: 'client' }],
  ['BookAnAppointmentCTA', { ...BookAnAppointmentCTA, componentType: 'client' }],
  ['BlogText', { ...BlogText, componentType: 'client' }],
  ['BlogSearch', { ...BlogSearchtypes, ...BlogSearch, componentType: 'client' }],
  ['BlogRelatedArticles', { ...BlogRelatedArticlestypes, ...BlogRelatedArticles, componentType: 'client' }],
  ['BlogQuote', { ...BlogQuote }],
  ['BlogPageHeader', { ...BlogPageHeadertypes, ...BlogPageHeader, componentType: 'client' }],
  ['BlogImage', { ...BlogImage }],
  ['BlogDetailsHeader', { ...BlogDetailsHeader }],
  ['BlogCategories', { ...BlogCategories }],
  ['BlogCards', { ...BlogCards, componentType: 'client' }],
  ['Authors', { ...Authorsmapping, ...AuthorsmappingGraphQL, ...Authors }],
  ['Amenities', { ...Amenities }],
  ['Accordions', { ...Accordions, componentType: 'client' }],
  ['TableOfContents', { ...TableOfContentstypes, ...TableOfContents, componentType: 'client' }],
  ['SubNavigation', { ...SubNavigationtypes, ...SubNavigation }],
  ['MainNavigation', { ...MainNavigationtypes, ...MainNavigation, componentType: 'client' }],
  ['Footer', { ...Footerutilities, ...Footertypes, ...Footer }],
  ['Breadcrumbs', { ...Breadcrumbs }],
  ['BasicFooter', { ...BasicFooter }],
  ['JobDetailsHeader', { ...JobDetailsHeadertypes, ...JobDetailsHeader }],
  ['JobDetails', { ...JobDetails }],
  ['CareersSearchResults', { ...CareersSearchResults, componentType: 'client' }],
  ['CareersSearchHero', { ...CareersSearchHerotypes, ...CareersSearchHero, componentType: 'client' }],
  ['CareersSearchBlock', { ...CareersSearchBlocktypes, ...CareersSearchBlock, componentType: 'client' }],
  ['CareersLatestVacancies', { ...CareersLatestVacanciestypes, ...CareersLatestVacancies, componentType: 'client' }],
]);

export default componentMap;
