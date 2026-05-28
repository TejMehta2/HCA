// Client-safe component map for App Router

import { BYOCClientWrapper, NextjsContentSdkComponent, FEaaSClientWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

import * as TbcBookingSelectType from 'src/components/TheBirthCompany/TbcBookingSelectType/TbcBookingSelectType';
import * as TbcBookingSelectSlot from 'src/components/TheBirthCompany/TbcBookingSelectSlot/TbcBookingSelectSlot';
import * as TbcBookingSelectLocation from 'src/components/TheBirthCompany/TbcBookingSelectLocation/TbcBookingSelectLocation';
import * as TbcBookingScansSearch from 'src/components/TheBirthCompany/TbcBookingScansSearch/TbcBookingScansSearch';
import * as TbcBookingDetails from 'src/components/TheBirthCompany/TbcBookingDetails/TbcBookingDetails';
import * as TbcBookingConfirmationClient from 'src/components/TheBirthCompany/TbcBookingConfirmation/TbcBookingConfirmationClient';
import * as PregnancyCalculator from 'src/components/TheBirthCompany/PregnancyCalculator/PregnancyCalculator';
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
import * as ContentCarouselExtended from 'src/components/Page Content/ContentCarouselExtended/ContentCarouselExtended';
import * as CallUsTodayCTA from 'src/components/Page Content/CallUsTodayCTA/CallUsTodayCTA';
import * as BookAnAppointmentCTA from 'src/components/Page Content/BookAnAppointmentCTA/BookAnAppointmentCTA';
import * as BlogSearch from 'src/components/Page Content/BlogSearch/BlogSearch';
import * as BlogPageHeader from 'src/components/Page Content/BlogPageHeader/BlogPageHeader';
import * as TableOfContents from 'src/components/Navigation/TableOfContents/TableOfContents';
import * as StepTermsAndConditions from 'src/components/ConsultantFinder/StepTermsAndConditions';
import * as StepSlotSelect from 'src/components/ConsultantFinder/StepSlotSelect';
import * as StepSearchConsultant from 'src/components/ConsultantFinder/StepSearchConsultant';
import * as StepPayment from 'src/components/ConsultantFinder/StepPayment';
import * as StepLocationSelect from 'src/components/ConsultantFinder/StepLocationSelect';
import * as StepLocations from 'src/components/ConsultantFinder/StepLocations';
import * as StepLiveBookingForm from 'src/components/ConsultantFinder/StepLiveBookingForm';
import * as StepLiveBookingConfirmation from 'src/components/ConsultantFinder/StepLiveBookingConfirmation';
import * as StepIntro from 'src/components/ConsultantFinder/StepIntro';
import * as StepEnquireFormConfirmation from 'src/components/ConsultantFinder/StepEnquireFormConfirmation';
import * as StepEnquireForm from 'src/components/ConsultantFinder/StepEnquireForm';
import * as StepConsultantProfileClient from 'src/components/ConsultantFinder/StepConsultantProfileClient';
import * as StepConsultantCardsClient from 'src/components/ConsultantFinder/StepConsultantCardsClient';
import * as StepAppointmentType from 'src/components/ConsultantFinder/StepAppointmentType';
import * as CMADisclosuresClient from 'src/components/ConsultantFinder/CMADisclosuresClient';
import * as AxiosLocalPatcher from 'src/components/ConsultantFinder/AxiosLocalPatcher';
import * as CareersSearchResults from 'src/components/Careers/CareersSearchResults/CareersSearchResults';
import * as CareersSearchHero from 'src/components/Careers/CareersSearchHero/CareersSearchHero';
import * as CareersLatestVacancies from 'src/components/Careers/CareersLatestVacancies/CareersLatestVacancies';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCClientWrapper],
  ['FEaaSWrapper', FEaaSClientWrapper],
  ['Form', Form],
  ['TbcBookingSelectType', { ...TbcBookingSelectType }],
  ['TbcBookingSelectSlot', { ...TbcBookingSelectSlot }],
  ['TbcBookingSelectLocation', { ...TbcBookingSelectLocation }],
  ['TbcBookingScansSearch', { ...TbcBookingScansSearch }],
  ['TbcBookingDetails', { ...TbcBookingDetails }],
  ['TbcBookingConfirmationClient', { ...TbcBookingConfirmationClient }],
  ['PregnancyCalculator', { ...PregnancyCalculator }],
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
  ['ContentCarouselExtended', { ...ContentCarouselExtended }],
  ['CallUsTodayCTA', { ...CallUsTodayCTA }],
  ['BookAnAppointmentCTA', { ...BookAnAppointmentCTA }],
  ['BlogSearch', { ...BlogSearch }],
  ['BlogPageHeader', { ...BlogPageHeader }],
  ['TableOfContents', { ...TableOfContents }],
  ['StepTermsAndConditions', { ...StepTermsAndConditions }],
  ['StepSlotSelect', { ...StepSlotSelect }],
  ['StepSearchConsultant', { ...StepSearchConsultant }],
  ['StepPayment', { ...StepPayment }],
  ['StepLocationSelect', { ...StepLocationSelect }],
  ['StepLocations', { ...StepLocations }],
  ['StepLiveBookingForm', { ...StepLiveBookingForm }],
  ['StepLiveBookingConfirmation', { ...StepLiveBookingConfirmation }],
  ['StepIntro', { ...StepIntro }],
  ['StepEnquireFormConfirmation', { ...StepEnquireFormConfirmation }],
  ['StepEnquireForm', { ...StepEnquireForm }],
  ['StepConsultantProfileClient', { ...StepConsultantProfileClient }],
  ['StepConsultantCardsClient', { ...StepConsultantCardsClient }],
  ['StepAppointmentType', { ...StepAppointmentType }],
  ['CMADisclosuresClient', { ...CMADisclosuresClient }],
  ['AxiosLocalPatcher', { ...AxiosLocalPatcher }],
  ['CareersSearchResults', { ...CareersSearchResults }],
  ['CareersSearchHero', { ...CareersSearchHero }],
  ['CareersLatestVacancies', { ...CareersLatestVacancies }],
]);

export default componentMap;
