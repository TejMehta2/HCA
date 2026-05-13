// Client-safe component map for App Router

import { BYOCClientWrapper, NextjsContentSdkComponent, FEaaSClientWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

import * as TreatmentsSearch from 'src/components/Page Content/TreatmentsSearch/TreatmentsSearch';
import * as TestAndScansSearch from 'src/components/Page Content/TestAndScansSearch/TestAndScansSearch';
import * as StickyCTA from 'src/components/Page Content/StickyCTA/StickyCTA';
import * as ShareCTA from 'src/components/Page Content/ShareCTA/ShareCTA';
import * as ServiceLinesSearch from 'src/components/Page Content/ServiceLinesSearch/ServiceLinesSearch';
import * as PaymentFormConfirmation from 'src/components/Page Content/PaymentFormConfirmation/PaymentFormConfirmation';
import * as PaymentForm from 'src/components/Page Content/PaymentForm/PaymentForm';
import * as PatientStoriesSearch from 'src/components/Page Content/PatientStoriesSearch/PatientStoriesSearch';
import * as PatientStoriesCards from 'src/components/Page Content/PatientStoriesCards/PatientStoriesCards';
import * as MoreInformationCTA from 'src/components/Page Content/MoreInformationCTA/MoreInformationCTA';
import * as ModalContent from 'src/components/Page Content/ModalContent/ModalContent';
import * as LocationsSearch from 'src/components/Page Content/LocationsSearch/LocationsSearch';
import * as GeolocationPermissionsCta from 'src/components/Page Content/LocationsSearch/GeolocationPermissionsCta';
import * as LocationsMap from 'src/components/Page Content/LocationsMap/LocationsMap';
import * as LocationMap from 'src/components/Page Content/LocationMap/LocationMap';
import * as LocationCards from 'src/components/Page Content/LocationCards/LocationCards';
import * as HeroBannerWithSearch from 'src/components/Page Content/HeroBannerWithSearch/HeroBannerWithSearch';
import * as Log404Email from 'src/components/Page Content/EmailUtils/Log404Email';
import * as CardWithModal from 'src/components/Page Content/ContentCardsSliderWithOverlay/CardWithModal';
import * as CallUsTodayCTA from 'src/components/Page Content/CallUsTodayCTA/CallUsTodayCTA';
import * as BookAnAppointmentCTA from 'src/components/Page Content/BookAnAppointmentCTA/BookAnAppointmentCTA';
import * as BlogSearch from 'src/components/Page Content/BlogSearch/BlogSearch';
import * as BlogRelatedArticles from 'src/components/Page Content/BlogRelatedArticles/BlogRelatedArticles';
import * as BlogPageHeader from 'src/components/Page Content/BlogPageHeader/BlogPageHeader';
import * as BlogCards from 'src/components/Page Content/BlogCards/BlogCards';
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
  ['TreatmentsSearch', { ...TreatmentsSearch }],
  ['TestAndScansSearch', { ...TestAndScansSearch }],
  ['StickyCTA', { ...StickyCTA }],
  ['ShareCTA', { ...ShareCTA }],
  ['ServiceLinesSearch', { ...ServiceLinesSearch }],
  ['PaymentFormConfirmation', { ...PaymentFormConfirmation }],
  ['PaymentForm', { ...PaymentForm }],
  ['PatientStoriesSearch', { ...PatientStoriesSearch }],
  ['PatientStoriesCards', { ...PatientStoriesCards }],
  ['MoreInformationCTA', { ...MoreInformationCTA }],
  ['ModalContent', { ...ModalContent }],
  ['LocationsSearch', { ...LocationsSearch }],
  ['GeolocationPermissionsCta', { ...GeolocationPermissionsCta }],
  ['LocationsMap', { ...LocationsMap }],
  ['LocationMap', { ...LocationMap }],
  ['LocationCards', { ...LocationCards }],
  ['HeroBannerWithSearch', { ...HeroBannerWithSearch }],
  ['Log404Email', { ...Log404Email }],
  ['CardWithModal', { ...CardWithModal }],
  ['CallUsTodayCTA', { ...CallUsTodayCTA }],
  ['BookAnAppointmentCTA', { ...BookAnAppointmentCTA }],
  ['BlogSearch', { ...BlogSearch }],
  ['BlogRelatedArticles', { ...BlogRelatedArticles }],
  ['BlogPageHeader', { ...BlogPageHeader }],
  ['BlogCards', { ...BlogCards }],
  ['Accordions', { ...Accordions }],
  ['TableOfContents', { ...TableOfContents }],
  ['MainNavigation', { ...MainNavigation }],
  ['CareersSearchResults', { ...CareersSearchResults }],
  ['CareersSearchHero', { ...CareersSearchHero }],
  ['CareersSearchBlock', { ...CareersSearchBlock }],
  ['CareersLatestVacancies', { ...CareersLatestVacancies }],
]);

export default componentMap;
