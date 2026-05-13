// Below are built-in components that are available in the app, it's recommended to keep them as is

import { BYOCServerWrapper, NextjsContentSdkComponent, FEaaSServerWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

// end of built-in components
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
import * as TestsAndScansSearchtypes from 'src/components/Page Content/TestAndScansSearch/TestsAndScansSearch.types';
import * as TestAndScansSearch from 'src/components/Page Content/TestAndScansSearch/TestAndScansSearch';
import * as TestAndScansCards from 'src/components/Page Content/TestAndScansCards/TestAndScansCards';
import * as TalkToUs from 'src/components/Page Content/TalkToUs/TalkToUs';
import * as Tab from 'src/components/Page Content/Tab/Tab';
import * as StickyCTA from 'src/components/Page Content/StickyCTA/StickyCTA';
import * as Statstypes from 'src/components/Page Content/Stats/Stats.types';
import * as Stats from 'src/components/Page Content/Stats/Stats';
import * as ShareCTA from 'src/components/Page Content/ShareCTA/ShareCTA';
import * as ServiceLinesSearch from 'src/components/Page Content/ServiceLinesSearch/ServiceLinesSearch';
import * as ServiceCards from 'src/components/Page Content/ServiceCards/ServiceCards';
import * as PricingInformation from 'src/components/Page Content/PricingInformation/PricingInformation';
import * as PlainHeader from 'src/components/Page Content/PlainHeader/PlainHeader';
import * as PaymentFormConfirmation from 'src/components/Page Content/PaymentFormConfirmation/PaymentFormConfirmation';
import * as Paymenttypes from 'src/components/Page Content/PaymentFormConfirmation/Payment.types';
import * as PaymentFormtypes from 'src/components/Page Content/PaymentForm/PaymentForm.types';
import * as PaymentForm from 'src/components/Page Content/PaymentForm/PaymentForm';
import * as Header from 'src/components/Page Content/PaymentForm/helpers/Header';
import * as DynamicTextField from 'src/components/Page Content/PaymentForm/helpers/DynamicTextField';
import * as DynamicTextArea from 'src/components/Page Content/PaymentForm/helpers/DynamicTextArea';
import * as DynamicSelectField from 'src/components/Page Content/PaymentForm/helpers/DynamicSelectField';
import * as createSchema from 'src/components/Page Content/PaymentForm/helpers/createSchema';
import * as PatientStoriesSearch from 'src/components/Page Content/PatientStoriesSearch/PatientStoriesSearch';
import * as PatientStoriesCardstypes from 'src/components/Page Content/PatientStoriesCards/PatientStoriesCards.types';
import * as PatientStoriesCards from 'src/components/Page Content/PatientStoriesCards/PatientStoriesCards';
import * as PatientStories from 'src/components/Page Content/PatientStories/PatientStories';
import * as PageTeaser from 'src/components/Page Content/PageTeaser/PageTeaser';
import * as PackageComparison from 'src/components/Page Content/PackageComparison/PackageComparison';
import * as MoreInformationCTA from 'src/components/Page Content/MoreInformationCTA/MoreInformationCTA';
import * as ModalContent from 'src/components/Page Content/ModalContent/ModalContent';
import * as Metadata from 'src/components/Page Content/Metadata/Metadata';
import * as LogoBlock from 'src/components/Page Content/LogoBlock/LogoBlock';
import * as LocationsSearchtypes from 'src/components/Page Content/LocationsSearch/LocationsSearch.types';
import * as LocationsSearch from 'src/components/Page Content/LocationsSearch/LocationsSearch';
import * as GeolocationPermissionsCta from 'src/components/Page Content/LocationsSearch/GeolocationPermissionsCta';
import * as LocationsMap from 'src/components/Page Content/LocationsMap/LocationsMap';
import * as LocationMap from 'src/components/Page Content/LocationMap/LocationMap';
import * as LocationCardsTypes from 'src/components/Page Content/LocationCards/LocationCardsTypes';
import * as LocationCards from 'src/components/Page Content/LocationCards/LocationCards';
import * as LandingPageHeadertypes from 'src/components/Page Content/LandingPageHeader/LandingPageHeader.types';
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
import * as responsetypes from 'src/components/Page Content/DoctorCards/response.types';
import * as DoctorCardstypes from 'src/components/Page Content/DoctorCards/DoctorCards.types';
import * as DoctorCards from 'src/components/Page Content/DoctorCards/DoctorCards';
import * as DoctifyTestimonialsCarousel from 'src/components/Page Content/DoctifyTestimonialsCarousel/DoctifyTestimonialsCarousel';
import * as DoctifyGraphQltypes from 'src/components/Page Content/Doctify/DoctifyGraphQl.types';
import * as DoctifyGraphQl from 'src/components/Page Content/Doctify/DoctifyGraphQl';
import * as Doctifytypes from 'src/components/Page Content/Doctify/Doctify.types';
import * as Doctify from 'src/components/Page Content/Doctify/Doctify';
import * as DiamondLine from 'src/components/Page Content/DiamondLine/DiamondLine';
import * as CTAButton from 'src/components/Page Content/CTAButton/CTAButton';
import * as CTABlockDuo from 'src/components/Page Content/CTABlockDuo/CTABlockDuo';
import * as CTABlock from 'src/components/Page Content/CTABlock/CTABlock';
import * as CQCRatingGraphQltypes from 'src/components/Page Content/CQCRating/CQCRatingGraphQl.types';
import * as CQCRatingGraphQl from 'src/components/Page Content/CQCRating/CQCRatingGraphQl';
import * as CQCRatingtypes from 'src/components/Page Content/CQCRating/CQCRating.types';
import * as CQCRating from 'src/components/Page Content/CQCRating/CQCRating';
import * as ContentVerticalSlider from 'src/components/Page Content/ContentVerticalSlider/ContentVerticalSlider';
import * as ContentIconBlocks from 'src/components/Page Content/ContentIconBlocks/ContentIconBlocks';
import * as ContentCarouselExtended from 'src/components/Page Content/ContentCarouselExtended/ContentCarouselExtended';
import * as ContentCarousel from 'src/components/Page Content/ContentCarousel/ContentCarousel';
import * as ContentCardsTriplet from 'src/components/Page Content/ContentCardsTriplet/ContentCardsTriplet';
import * as ContentCardsSliderWithOverlay from 'src/components/Page Content/ContentCardsSliderWithOverlay/ContentCardsSliderWithOverlay';
import * as CardWithModal from 'src/components/Page Content/ContentCardsSliderWithOverlay/CardWithModal';
import * as ContentCardsSlider from 'src/components/Page Content/ContentCardsSlider/ContentCardsSlider';
import * as ContentCardsMasonry from 'src/components/Page Content/ContentCardsMasonry/ContentCardsMasonry';
import * as ContentCards from 'src/components/Page Content/ContentCards/ContentCards';
import * as ContactDetailsBox from 'src/components/Page Content/ContactDetailsBox/ContactDetailsBox';
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
  ['VideoPlayer', { ...VideoPlayer }],
  ['TreatmentsSearch', { ...TreatmentsSearch, componentType: 'client' }],
  ['TreatmentsCards', { ...TreatmentsCards }],
  ['Timeline', { ...Timeline }],
  ['TextBlockHeading', { ...TextBlockHeading }],
  ['TextBlockComponent', { ...TextBlockComponent }],
  ['Testimonials', { ...Testimonials }],
  ['TestsAndScansSearch', { ...TestsAndScansSearchtypes }],
  ['TestAndScansSearch', { ...TestAndScansSearch, componentType: 'client' }],
  ['TestAndScansCards', { ...TestAndScansCards }],
  ['TalkToUs', { ...TalkToUs }],
  ['Tab', { ...Tab }],
  ['StickyCTA', { ...StickyCTA, componentType: 'client' }],
  ['Stats', { ...Statstypes, ...Stats }],
  ['ShareCTA', { ...ShareCTA, componentType: 'client' }],
  ['ServiceLinesSearch', { ...ServiceLinesSearch, componentType: 'client' }],
  ['ServiceCards', { ...ServiceCards }],
  ['PricingInformation', { ...PricingInformation }],
  ['PlainHeader', { ...PlainHeader }],
  ['PaymentFormConfirmation', { ...PaymentFormConfirmation, componentType: 'client' }],
  ['Payment', { ...Paymenttypes }],
  ['PaymentForm', { ...PaymentFormtypes, ...PaymentForm, componentType: 'client' }],
  ['Header', { ...Header }],
  ['DynamicTextField', { ...DynamicTextField }],
  ['DynamicTextArea', { ...DynamicTextArea }],
  ['DynamicSelectField', { ...DynamicSelectField }],
  ['createSchema', { ...createSchema }],
  ['PatientStoriesSearch', { ...PatientStoriesSearch, componentType: 'client' }],
  ['PatientStoriesCards', { ...PatientStoriesCardstypes, ...PatientStoriesCards, componentType: 'client' }],
  ['PatientStories', { ...PatientStories }],
  ['PageTeaser', { ...PageTeaser }],
  ['PackageComparison', { ...PackageComparison }],
  ['MoreInformationCTA', { ...MoreInformationCTA, componentType: 'client' }],
  ['ModalContent', { ...ModalContent, componentType: 'client' }],
  ['Metadata', { ...Metadata }],
  ['LogoBlock', { ...LogoBlock }],
  ['LocationsSearch', { ...LocationsSearchtypes, ...LocationsSearch, componentType: 'client' }],
  ['GeolocationPermissionsCta', { ...GeolocationPermissionsCta, componentType: 'client' }],
  ['LocationsMap', { ...LocationsMap, componentType: 'client' }],
  ['LocationMap', { ...LocationMap, componentType: 'client' }],
  ['LocationCardsTypes', { ...LocationCardsTypes }],
  ['LocationCards', { ...LocationCards, componentType: 'client' }],
  ['LandingPageHeader', { ...LandingPageHeadertypes, ...LandingPageHeader }],
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
  ['response', { ...responsetypes }],
  ['DoctorCards', { ...DoctorCardstypes, ...DoctorCards }],
  ['DoctifyTestimonialsCarousel', { ...DoctifyTestimonialsCarousel }],
  ['DoctifyGraphQl', { ...DoctifyGraphQltypes, ...DoctifyGraphQl }],
  ['Doctify', { ...Doctifytypes, ...Doctify }],
  ['DiamondLine', { ...DiamondLine }],
  ['CTAButton', { ...CTAButton }],
  ['CTABlockDuo', { ...CTABlockDuo }],
  ['CTABlock', { ...CTABlock }],
  ['CQCRatingGraphQl', { ...CQCRatingGraphQltypes, ...CQCRatingGraphQl }],
  ['CQCRating', { ...CQCRatingtypes, ...CQCRating }],
  ['ContentVerticalSlider', { ...ContentVerticalSlider }],
  ['ContentIconBlocks', { ...ContentIconBlocks }],
  ['ContentCarouselExtended', { ...ContentCarouselExtended }],
  ['ContentCarousel', { ...ContentCarousel }],
  ['ContentCardsTriplet', { ...ContentCardsTriplet }],
  ['ContentCardsSliderWithOverlay', { ...ContentCardsSliderWithOverlay }],
  ['CardWithModal', { ...CardWithModal, componentType: 'client' }],
  ['ContentCardsSlider', { ...ContentCardsSlider }],
  ['ContentCardsMasonry', { ...ContentCardsMasonry }],
  ['ContentCards', { ...ContentCards }],
  ['ContactDetailsBox', { ...ContactDetailsBox }],
  ['CallUsTodayCTA', { ...CallUsTodayCTA, componentType: 'client' }],
  ['BookAnAppointmentCTA', { ...BookAnAppointmentCTA, componentType: 'client' }],
  ['BlogText', { ...BlogText }],
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
