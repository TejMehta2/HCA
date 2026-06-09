// Below are built-in components that are available in the app, it's recommended to keep them as is

import { BYOCServerWrapper, NextjsContentSdkComponent, FEaaSServerWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

// end of built-in components
import * as TbcBookingStepWrapper from 'src/components/TheBirthCompany/TbcBookingStepWrapper/TbcBookingStepWrapper';
import * as TbcBookingSelectType from 'src/components/TheBirthCompany/TbcBookingSelectType/TbcBookingSelectType';
import * as TbcBookingSelectSlot from 'src/components/TheBirthCompany/TbcBookingSelectSlot/TbcBookingSelectSlot';
import * as TbcBookingSelectLocation from 'src/components/TheBirthCompany/TbcBookingSelectLocation/TbcBookingSelectLocation';
import * as TbcBookingScansSearch from 'src/components/TheBirthCompany/TbcBookingScansSearch/TbcBookingScansSearch';
import * as TbcBookingDetails from 'src/components/TheBirthCompany/TbcBookingDetails/TbcBookingDetails';
import * as TbcBookingConfirmationClient from 'src/components/TheBirthCompany/TbcBookingConfirmation/TbcBookingConfirmationClient';
import * as TbcBookingConfirmation from 'src/components/TheBirthCompany/TbcBookingConfirmation/TbcBookingConfirmation';
import * as PregnancyCalculator from 'src/components/TheBirthCompany/PregnancyCalculator/PregnancyCalculator';
import * as RowSplitter from 'src/components/Structure/RowSplitter';
import * as ColumnSplitter from 'src/components/Structure/ColumnSplitter';
import * as ContainerComponent from 'src/components/Structure/ContainerComponent/ContainerComponent';
import * as PartialDesignDynamicPlaceholder from 'src/components/partial-design-dynamic-placeholder/PartialDesignDynamicPlaceholder';
import * as RichText from 'src/components/Page Content/RichText';
import * as VideoPlayer from 'src/components/Page Content/VideoPlayer/VideoPlayer';
import * as TreatmentsSearch from 'src/components/Page Content/TreatmentsSearch/TreatmentsSearch';
import * as TreatmentsCards from 'src/components/Page Content/TreatmentsCards/TreatmentsCards';
import * as Timeline from 'src/components/Page Content/Timeline/Timeline';
import * as TextBlockHeading from 'src/components/Page Content/TextBlockHeading/TextBlockHeading';
import * as TextBlockComponent from 'src/components/Page Content/TextBlockComponent/TextBlockComponent';
import * as Testimonials from 'src/components/Page Content/Testimonials/Testimonials';
import * as TestAndScansSearch from 'src/components/Page Content/TestAndScansSearch/TestAndScansSearch';
import * as TestAndScansCards from 'src/components/Page Content/TestAndScansCards/TestAndScansCards';
import * as TalkToUs from 'src/components/Page Content/TalkToUs/TalkToUs';
import * as Tab from 'src/components/Page Content/Tab/Tab';
import * as StickyCTA from 'src/components/Page Content/StickyCTA/StickyCTA';
import * as Stats from 'src/components/Page Content/Stats/Stats';
import * as ShareCTA from 'src/components/Page Content/ShareCTA/ShareCTA';
import * as ServiceLinesSearch from 'src/components/Page Content/ServiceLinesSearch/ServiceLinesSearch';
import * as ServiceCards from 'src/components/Page Content/ServiceCards/ServiceCards';
import * as PricingInformation from 'src/components/Page Content/PricingInformation/PricingInformation';
import * as PlainHeader from 'src/components/Page Content/PlainHeader/PlainHeader';
import * as PrintConfirmationCta from 'src/components/Page Content/PaymentFormConfirmation/PrintConfirmationCta';
import * as PaymentFormConfirmation from 'src/components/Page Content/PaymentFormConfirmation/PaymentFormConfirmation';
import * as PaymentForm from 'src/components/Page Content/PaymentForm/PaymentForm';
import * as PatientStoriesSearch from 'src/components/Page Content/PatientStoriesSearch/PatientStoriesSearch';
import * as PatientStoriesCards from 'src/components/Page Content/PatientStoriesCards/PatientStoriesCards';
import * as PatientStories from 'src/components/Page Content/PatientStories/PatientStories';
import * as PageTeaser from 'src/components/Page Content/PageTeaser/PageTeaser';
import * as PackageComparison from 'src/components/Page Content/PackageComparison/PackageComparison';
import * as MoreInformationCTA from 'src/components/Page Content/MoreInformationCTA/MoreInformationCTA';
import * as ModalContent from 'src/components/Page Content/ModalContent/ModalContent';
import * as Metadata from 'src/components/Page Content/Metadata/Metadata';
import * as LogoBlock from 'src/components/Page Content/LogoBlock/LogoBlock';
import * as LocationsSearch from 'src/components/Page Content/LocationsSearch/LocationsSearch';
import * as GeolocationPermissionsCta from 'src/components/Page Content/LocationsSearch/GeolocationPermissionsCta';
import * as LocationsMap from 'src/components/Page Content/LocationsMap/LocationsMap';
import * as LocationMap from 'src/components/Page Content/LocationMap/LocationMap';
import * as LocationCards from 'src/components/Page Content/LocationCards/LocationCards';
import * as LandingPageHeader from 'src/components/Page Content/LandingPageHeader/LandingPageHeader';
import * as IntroBlock from 'src/components/Page Content/IntroBlock/IntroBlock';
import * as ImageTextList from 'src/components/Page Content/ImageTextList/ImageTextList';
import * as ImageShortText from 'src/components/Page Content/ImageShortText/ImageShortText';
import * as ImagesCarousel from 'src/components/Page Content/ImagesCarousel/ImagesCarousel';
import * as ImageAndTabs from 'src/components/Page Content/ImageAndTabs/ImageAndTabs';
import * as HeroLocationDetails from 'src/components/Page Content/HeroLocationDetails/HeroLocationDetails';
import * as HeroBannerWithSearch from 'src/components/Page Content/HeroBannerWithSearch/HeroBannerWithSearch';
import * as HeaderWithVideo from 'src/components/Page Content/HeaderWithVideo/HeaderWithVideo';
import * as HeaderWithImage from 'src/components/Page Content/HeaderWithImage/HeaderWithImage';
import * as GenericSearch from 'src/components/Page Content/GenericSearch/GenericSearch';
import * as FixedPricePackage from 'src/components/Page Content/FixedPricePackage/FixedPricePackage';
import * as FindAConsultantCTA from 'src/components/Page Content/FindAConsultantCTA/FindAConsultantCTA';
import * as FAQBlock from 'src/components/Page Content/FAQBlock/FAQBlock';
import * as Log404Email from 'src/components/Page Content/EmailUtils/Log404Email';
import * as DoctorCards from 'src/components/Page Content/DoctorCards/DoctorCards';
import * as DoctifyTestimonialsCarousel from 'src/components/Page Content/DoctifyTestimonialsCarousel/DoctifyTestimonialsCarousel';
import * as DoctifyGraphQl from 'src/components/Page Content/Doctify/DoctifyGraphQl';
import * as Doctify from 'src/components/Page Content/Doctify/Doctify';
import * as DiamondLine from 'src/components/Page Content/DiamondLine/DiamondLine';
import * as CTAButton from 'src/components/Page Content/CTAButton/CTAButton';
import * as CTABlockDuo from 'src/components/Page Content/CTABlockDuo/CTABlockDuo';
import * as CTABlock from 'src/components/Page Content/CTABlock/CTABlock';
import * as CQCRatingGraphQl from 'src/components/Page Content/CQCRating/CQCRatingGraphQl';
import * as CQCRating from 'src/components/Page Content/CQCRating/CQCRating';
import * as ContentVerticalSlider from 'src/components/Page Content/ContentVerticalSlider/ContentVerticalSlider';
import * as ContentIconBlocks from 'src/components/Page Content/ContentIconBlocks/ContentIconBlocks';
import * as ContentCarouselExtended from 'src/components/Page Content/ContentCarouselExtended/ContentCarouselExtended';
import * as ContentCarousel from 'src/components/Page Content/ContentCarousel/ContentCarousel';
import * as ContentCardsTriplet from 'src/components/Page Content/ContentCardsTriplet/ContentCardsTriplet';
import * as ContentCardsSliderWithOverlay from 'src/components/Page Content/ContentCardsSliderWithOverlay/ContentCardsSliderWithOverlay';
import * as ContentCardsSlider from 'src/components/Page Content/ContentCardsSlider/ContentCardsSlider';
import * as ContentCardsMasonry from 'src/components/Page Content/ContentCardsMasonry/ContentCardsMasonry';
import * as ContentCards from 'src/components/Page Content/ContentCards/ContentCards';
import * as ContactDetailsBox from 'src/components/Page Content/ContactDetailsBox/ContactDetailsBox';
import * as CallUsTodayCTA from 'src/components/Page Content/CallUsTodayCTA/CallUsTodayCTA';
import * as BookAnAppointmentCTA from 'src/components/Page Content/BookAnAppointmentCTA/BookAnAppointmentCTA';
import * as BlogText from 'src/components/Page Content/BlogText/BlogText';
import * as BlogSearch from 'src/components/Page Content/BlogSearch/BlogSearch';
import * as BlogRelatedArticles from 'src/components/Page Content/BlogRelatedArticles/BlogRelatedArticles';
import * as BlogQuote from 'src/components/Page Content/BlogQuote/BlogQuote';
import * as BlogPageHeader from 'src/components/Page Content/BlogPageHeader/BlogPageHeader';
import * as BlogImage from 'src/components/Page Content/BlogImage/BlogImage';
import * as BlogDetailsHeader from 'src/components/Page Content/BlogDetailsHeader/BlogDetailsHeader';
import * as BlogCategories from 'src/components/Page Content/BlogCategories/BlogCategories';
import * as BlogCards from 'src/components/Page Content/BlogCards/BlogCards';
import * as Authors from 'src/components/Page Content/Authors/Authors';
import * as Amenities from 'src/components/Page Content/Amenities/Amenities';
import * as Accordions from 'src/components/Page Content/Accordions/Accordions';
import * as TableOfContents from 'src/components/Navigation/TableOfContents/TableOfContents';
import * as SubNavigation from 'src/components/Navigation/SubNavigation/SubNavigation';
import * as MainNavigation from 'src/components/Navigation/MainNavigation/MainNavigation';
import * as Footer from 'src/components/Navigation/Footer/Footer';
import * as Breadcrumbs from 'src/components/Navigation/Breadcrumbs/Breadcrumbs';
import * as BasicFooter from 'src/components/Navigation/BasicFooter/BasicFooter';
import * as _StepTemplate from 'src/components/ConsultantFinder/_StepTemplate';
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
import * as StepConsultantProfile from 'src/components/ConsultantFinder/StepConsultantProfile';
import * as StepConsultantCardsClient from 'src/components/ConsultantFinder/StepConsultantCardsClient';
import * as StepConsultantCards from 'src/components/ConsultantFinder/StepConsultantCards';
import * as StepAppointmentType from 'src/components/ConsultantFinder/StepAppointmentType';
import * as routeQuery from 'src/components/ConsultantFinder/routeQuery';
import * as FrameReviews from 'src/components/ConsultantFinder/FrameReviews';
import * as CMADisclosuresClient from 'src/components/ConsultantFinder/CMADisclosuresClient';
import * as CMADisclosures from 'src/components/ConsultantFinder/CMADisclosures';
import * as AxiosLocalPatcher from 'src/components/ConsultantFinder/AxiosLocalPatcher';
import * as JobDetailsHeader from 'src/components/Careers/JobDetailsHeader/JobDetailsHeader';
import * as JobDetails from 'src/components/Careers/JobDetails/JobDetails';
import * as CareersSearchResults from 'src/components/Careers/CareersSearchResults/CareersSearchResults';
import * as CareersSearchHero from 'src/components/Careers/CareersSearchHero/CareersSearchHero';
import * as CareersSearchBlock from 'src/components/Careers/CareersSearchBlock/CareersSearchBlock';
import * as CareersLatestVacancies from 'src/components/Careers/CareersLatestVacancies/CareersLatestVacancies';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCServerWrapper],
  ['FEaaSWrapper', FEaaSServerWrapper],
  ['Form', { ...Form, componentType: 'client' }],
  ['TbcBookingStepWrapper', { ...TbcBookingStepWrapper }],
  ['TbcBookingSelectType', { ...TbcBookingSelectType, componentType: 'client' }],
  ['TbcBookingSelectSlot', { ...TbcBookingSelectSlot, componentType: 'client' }],
  ['TbcBookingSelectLocation', { ...TbcBookingSelectLocation, componentType: 'client' }],
  ['TbcBookingScansSearch', { ...TbcBookingScansSearch, componentType: 'client' }],
  ['TbcBookingDetails', { ...TbcBookingDetails, componentType: 'client' }],
  ['TbcBookingConfirmationClient', { ...TbcBookingConfirmationClient, componentType: 'client' }],
  ['TbcBookingConfirmation', { ...TbcBookingConfirmation }],
  ['PregnancyCalculator', { ...PregnancyCalculator, componentType: 'client' }],
  ['RowSplitter', { ...RowSplitter }],
  ['ColumnSplitter', { ...ColumnSplitter }],
  ['ContainerComponent', { ...ContainerComponent }],
  ['PartialDesignDynamicPlaceholder', { ...PartialDesignDynamicPlaceholder }],
  ['RichText', { ...RichText }],
  ['VideoPlayer', { ...VideoPlayer }],
  ['TreatmentsSearch', { ...TreatmentsSearch, componentType: 'client' }],
  ['TreatmentsCards', { ...TreatmentsCards }],
  ['Timeline', { ...Timeline }],
  ['TextBlockHeading', { ...TextBlockHeading }],
  ['TextBlockComponent', { ...TextBlockComponent }],
  ['Testimonials', { ...Testimonials }],
  ['TestAndScansSearch', { ...TestAndScansSearch, componentType: 'client' }],
  ['TestAndScansCards', { ...TestAndScansCards }],
  ['TalkToUs', { ...TalkToUs }],
  ['Tab', { ...Tab }],
  ['StickyCTA', { ...StickyCTA, componentType: 'client' }],
  ['Stats', { ...Stats }],
  ['ShareCTA', { ...ShareCTA, componentType: 'client' }],
  ['ServiceLinesSearch', { ...ServiceLinesSearch, componentType: 'client' }],
  ['ServiceCards', { ...ServiceCards }],
  ['PricingInformation', { ...PricingInformation }],
  ['PlainHeader', { ...PlainHeader }],
  ['PrintConfirmationCta', { ...PrintConfirmationCta, componentType: 'client' }],
  ['PaymentFormConfirmation', { ...PaymentFormConfirmation }],
  ['PaymentForm', { ...PaymentForm, componentType: 'client' }],
  ['PatientStoriesSearch', { ...PatientStoriesSearch, componentType: 'client' }],
  ['PatientStoriesCards', { ...PatientStoriesCards, componentType: 'client' }],
  ['PatientStories', { ...PatientStories }],
  ['PageTeaser', { ...PageTeaser }],
  ['PackageComparison', { ...PackageComparison }],
  ['MoreInformationCTA', { ...MoreInformationCTA, componentType: 'client' }],
  ['ModalContent', { ...ModalContent, componentType: 'client' }],
  ['Metadata', { ...Metadata }],
  ['LogoBlock', { ...LogoBlock }],
  ['LocationsSearch', { ...LocationsSearch, componentType: 'client' }],
  ['GeolocationPermissionsCta', { ...GeolocationPermissionsCta, componentType: 'client' }],
  ['LocationsMap', { ...LocationsMap, componentType: 'client' }],
  ['LocationMap', { ...LocationMap, componentType: 'client' }],
  ['LocationCards', { ...LocationCards, componentType: 'client' }],
  ['LandingPageHeader', { ...LandingPageHeader }],
  ['IntroBlock', { ...IntroBlock }],
  ['ImageTextList', { ...ImageTextList }],
  ['ImageShortText', { ...ImageShortText }],
  ['ImagesCarousel', { ...ImagesCarousel }],
  ['ImageAndTabs', { ...ImageAndTabs }],
  ['HeroLocationDetails', { ...HeroLocationDetails }],
  ['HeroBannerWithSearch', { ...HeroBannerWithSearch, componentType: 'client' }],
  ['HeaderWithVideo', { ...HeaderWithVideo }],
  ['HeaderWithImage', { ...HeaderWithImage }],
  ['GenericSearch', { ...GenericSearch }],
  ['FixedPricePackage', { ...FixedPricePackage }],
  ['FindAConsultantCTA', { ...FindAConsultantCTA }],
  ['FAQBlock', { ...FAQBlock }],
  ['Log404Email', { ...Log404Email, componentType: 'client' }],
  ['DoctorCards', { ...DoctorCards }],
  ['DoctifyTestimonialsCarousel', { ...DoctifyTestimonialsCarousel }],
  ['DoctifyGraphQl', { ...DoctifyGraphQl }],
  ['Doctify', { ...Doctify }],
  ['DiamondLine', { ...DiamondLine }],
  ['CTAButton', { ...CTAButton }],
  ['CTABlockDuo', { ...CTABlockDuo }],
  ['CTABlock', { ...CTABlock }],
  ['CQCRatingGraphQl', { ...CQCRatingGraphQl }],
  ['CQCRating', { ...CQCRating }],
  ['ContentVerticalSlider', { ...ContentVerticalSlider }],
  ['ContentIconBlocks', { ...ContentIconBlocks }],
  ['ContentCarouselExtended', { ...ContentCarouselExtended, componentType: 'client' }],
  ['ContentCarousel', { ...ContentCarousel }],
  ['ContentCardsTriplet', { ...ContentCardsTriplet }],
  ['ContentCardsSliderWithOverlay', { ...ContentCardsSliderWithOverlay }],
  ['ContentCardsSlider', { ...ContentCardsSlider }],
  ['ContentCardsMasonry', { ...ContentCardsMasonry }],
  ['ContentCards', { ...ContentCards }],
  ['ContactDetailsBox', { ...ContactDetailsBox, componentType: 'client' }],
  ['CallUsTodayCTA', { ...CallUsTodayCTA, componentType: 'client' }],
  ['BookAnAppointmentCTA', { ...BookAnAppointmentCTA, componentType: 'client' }],
  ['BlogText', { ...BlogText }],
  ['BlogSearch', { ...BlogSearch, componentType: 'client' }],
  ['BlogRelatedArticles', { ...BlogRelatedArticles }],
  ['BlogQuote', { ...BlogQuote }],
  ['BlogPageHeader', { ...BlogPageHeader, componentType: 'client' }],
  ['BlogImage', { ...BlogImage }],
  ['BlogDetailsHeader', { ...BlogDetailsHeader }],
  ['BlogCategories', { ...BlogCategories }],
  ['BlogCards', { ...BlogCards }],
  ['Authors', { ...Authors }],
  ['Amenities', { ...Amenities }],
  ['Accordions', { ...Accordions }],
  ['TableOfContents', { ...TableOfContents, componentType: 'client' }],
  ['SubNavigation', { ...SubNavigation }],
  ['MainNavigation', { ...MainNavigation }],
  ['Footer', { ...Footer }],
  ['Breadcrumbs', { ...Breadcrumbs }],
  ['BasicFooter', { ...BasicFooter }],
  ['_StepTemplate', { ..._StepTemplate }],
  ['StepTermsAndConditions', { ...StepTermsAndConditions, componentType: 'client' }],
  ['StepSlotSelect', { ...StepSlotSelect, componentType: 'client' }],
  ['StepSearchConsultant', { ...StepSearchConsultant, componentType: 'client' }],
  ['StepPayment', { ...StepPayment, componentType: 'client' }],
  ['StepLocationSelect', { ...StepLocationSelect, componentType: 'client' }],
  ['StepLocations', { ...StepLocations, componentType: 'client' }],
  ['StepLiveBookingForm', { ...StepLiveBookingForm, componentType: 'client' }],
  ['StepLiveBookingConfirmation', { ...StepLiveBookingConfirmation, componentType: 'client' }],
  ['StepIntro', { ...StepIntro, componentType: 'client' }],
  ['StepEnquireFormConfirmation', { ...StepEnquireFormConfirmation, componentType: 'client' }],
  ['StepEnquireForm', { ...StepEnquireForm, componentType: 'client' }],
  ['StepConsultantProfileClient', { ...StepConsultantProfileClient, componentType: 'client' }],
  ['StepConsultantProfile', { ...StepConsultantProfile }],
  ['StepConsultantCardsClient', { ...StepConsultantCardsClient, componentType: 'client' }],
  ['StepConsultantCards', { ...StepConsultantCards }],
  ['StepAppointmentType', { ...StepAppointmentType, componentType: 'client' }],
  ['routeQuery', { ...routeQuery }],
  ['FrameReviews', { ...FrameReviews }],
  ['CMADisclosuresClient', { ...CMADisclosuresClient, componentType: 'client' }],
  ['CMADisclosures', { ...CMADisclosures }],
  ['AxiosLocalPatcher', { ...AxiosLocalPatcher, componentType: 'client' }],
  ['JobDetailsHeader', { ...JobDetailsHeader }],
  ['JobDetails', { ...JobDetails }],
  ['CareersSearchResults', { ...CareersSearchResults, componentType: 'client' }],
  ['CareersSearchHero', { ...CareersSearchHero }],
  ['CareersSearchBlock', { ...CareersSearchBlock }],
  ['CareersLatestVacancies', { ...CareersLatestVacancies, componentType: 'client' }],
]);

export default componentMap;
