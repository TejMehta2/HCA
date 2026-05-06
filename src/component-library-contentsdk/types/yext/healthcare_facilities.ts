import { BaseYextEntity } from "./baseYextEntity";

export interface Interval {
  start: unknown;
  end: unknown;
}

export interface DayHour {
  openIntervals?: Interval[];
  isClosed?: boolean;
}

export interface HolidayHours {
  date: string;
  openIntervals?: Interval[];
  isClosed?: boolean;
  isRegularHours?: boolean;
}

export interface Hours {
  monday?: DayHour;
  tuesday?: DayHour;
  wednesday?: DayHour;
  thursday?: DayHour;
  friday?: DayHour;
  saturday?: DayHour;
  sunday?: DayHour;
  holidayHours?: HolidayHours[];
  reopenDate?: string;
}

export enum Category {
  BOOK_TRAVEL = 'Book Travel',
  CHECK_IN = 'Check in',
  FEES_POLICIES = 'Fees Policies - Deprecated',
  FLIGHT_STATUS = 'Flight Status',
  TICKETS = 'Tickets',
  TICKETING = 'Ticketing - Deprecated',
  AMENITIES = 'Amenities',
  FRONT_DESK = 'Front Desk - Deprecated',
  PARKING = 'Parking',
  GIFT_CARD = 'Gift Card',
  WAITLIST = 'Waitlist',
  DELIVERY = 'Delivery (Restaurant)',
  ORDER = 'Order (Restaurant)',
  TAKEOUT = 'Takeout - Deprecated',
  PICKUP = 'Pickup (Restaurant)',
  RESERVE = 'Reserve (Restaurant)',
  MENU = 'Menu',
  APPOINTMENT = 'Appointment - Deprecated',
  PORTFOLIO = 'Portfolio - Deprecated',
  QUOTE = 'Quote',
  SERVICES = 'Services',
  STORE_ORDERS = 'Store Orders - Deprecated',
  STORE_SHOP = 'Store Shop - Deprecated',
  STORE_SUPPORT = 'Store Support - Deprecated',
  SCHEDULE = 'Schedule',
  SHOWTIMES = 'Showtimes',
  AVAILABILITY = 'Availability',
  PRICING = 'Pricing',
  ACTIVITIES = 'Activities',
  BOOK = 'Book',
  BOOK__HOTEL_ = 'Book (Hotel)',
  BOOK__RIDE_ = 'Book Ride',
  BOOK__TOUR_ = 'Book Tour',
  CAREERS = 'Careers',
  CHARGE = 'Charge',
  COUPONS = 'Coupons',
  DELIVERY__RETAIL_ = 'Delivery (Retail)',
  DONATE = 'Donate',
  EVENTS = 'Events',
  ORDER__RETAIL_ = 'Order (Retail)',
  OTHER_MENU = 'Other Menu - Deprecated',
  PICKUP__RETAIL_ = 'Pickup (Retail)',
  RESERVE__PARKING_ = 'Reserve (Parking)',
  SHOWS = 'Shows',
  SPORTS = 'Sports',
  SUPPORT = 'Support',
  TEE_TIME = 'Tee Time',
  GIFT_CARD__RESTAURANT_ = 'Gift Card (Restaurant) - Deprecated',
}

export interface AppleActionLinks {
  category: Category;
  appStoreUrl: string;
  quickLinkUrl: string;
  appName: string;
}

export interface ImageThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface Image {
  url: string;
  width: number;
  height: number;
  thumbnails?: ImageThumbnail[];
  alternateText?: string;
}

export interface FrequentlyAskedQuestions {
  question: string;
  answer?: string;
}

export enum Type {
  DEPARTMENT_IN = 'Department In',
  INDEPENDENT_ESTABLISHMENT_IN = 'Independent Establishment In',
}

export interface GoogleEntityRelationship {
  type: Type;
  placeId: string;
}

export enum Type_1 {
  POSTAL_CODE = 'Postal Code',
  REGION = 'State/Region',
  COUNTY = 'County',
  CITY = 'City',
  SUBLOCALITY = 'Sublocality',
}

export interface ServiceAreaPlaces {
  name?: string;
  type?: Type_1;
}

export interface Address {
  line1?: string;
  line2?: string;
  line3?: string;
  sublocality?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  extraDescription?: string;
  countryCode?: string;
}

export interface ComplexImage {
  image: Image;
  details?: string;
  description?: string;
  clickthroughUrl?: string;
}

export interface Coordinate {
  latitude?: number;
  longitude?: number;
}

export interface C_aboutAdditionalInfo {
  icon?: Image;
  aboutIconSVG?: unknown;
  text?: string;
  uRL?: string;
}

export enum LinkType {
  OTHER = 'Other',
  URL = 'URL',
  PHONE = 'Phone',
  EMAIL = 'Email',
}

export interface C_aboutButton {
  label?: string;
  linkType?: LinkType;
  link?: string;
}

export interface C_amenities {
  amenitiesIcon?: Image;
  amenitiesIconSVG?: unknown;
  amenitiesName?: string;
  uRL?: string;
}

export interface C_amenitiesButton {
  label?: string;
  linkType?: LinkType;
  link?: string;
}

export interface CTA {
  label?: string;
  linkType?: LinkType;
  link?: string;
}

export interface C_articlesSection {
  title?: string;
  image?: Image;
  body?: string;
  cTA?: CTA;
}

export interface C_bookAppointment {
  label?: string;
  linkType?: LinkType;
  link?: string;
}

export interface C_callButtonPhoneNumbers {
  label?: string;
  linkType?: LinkType;
  link?: string;
}

export interface PhoneNumberNumericValues {
  label?: string;
  linkType?: LinkType;
  link?: string;
}

export interface C_callButtonPhoneNumbers2 {
  phoneNumberNumericValues?: PhoneNumberNumericValues;
  phoneNumberTextValues?: string;
}

export interface C_cQCImage {
  cQCImage?: Image;
  cQCURLLink?: string;
}

export interface EntityReference {
  entityId: string;
  name: string;
}

export interface C_fAQCTAButton {
  label?: string;
  linkType?: LinkType;
  link?: string;
}

export interface C_metaDetails {
  title?: string;
  description?: string;
}

export enum C_micrositeBrand {
  BRAND_A = 'Brand A',
  BRAND_B = 'Brand B',
  BRAND_C = 'Brand C',
}

export enum C_pageType {
  LOCATOR___DIRECTORY_ONLY = 'Locator / Directory Only',
  LOCATION_PAGE___LOCATOR___DIRECTORY_ONLY = 'Location Page + Locator / Directory',
}

export interface C_promoButton {
  label?: string;
  linkType?: LinkType;
  link?: string;
}

export interface C_starImage {
  starIcon?: Image;
  text?: string;
}

export interface C_treatmentAndServices {
  title?: string;
  image?: Image;
  body?: string;
  cTA?: CTA;
}

export interface ProductLists {
  label?: string;
  ids?: string[];
}

export enum Type_2 {
  NONE = 'None',
  BOOK_NOW = 'Book Now',
  CALL_NOW = 'Call Now',
  CONTACT_US = 'Contact Us',
  SEND_MESSAGE = 'Send Message',
  USE_APP = 'Use App',
  PLAY_GAME = 'Play Game',
  SHOP_NOW = 'Shop Now',
  SIGN_UP = 'Sign Up',
  WATCH_VIDEO = 'Watch Video',
  SEND_EMAIL = 'Send Email',
  LEARN_MORE = 'Learn More',
  PURCHASE_GIFT_CARDS = 'Purchase Gift Cards',
  ORDER_NOW = 'Order Now',
  FOLLOW_PAGE = 'Follow Page',
}

export interface FacebookCallToAction {
  type: Type_2;
  value?: string;
}

export interface FeaturedMessage {
  description?: string;
  url?: string;
}

export enum LocationType {
  LOCATION = 'Location',
  HEALTHCARE_FACILITY = 'Healthcare Facility',
  HEALTHCARE_PROFESSIONAL = 'Healthcare Professional',
  ATM = 'ATM',
  RESTAURANT = 'Restaurant',
  HOTEL = 'Hotel',
}

export interface MenuUrl {
  url?: string;
  displayUrl?: string;
  preferDisplayUrl?: boolean;
}

export interface OrderUrl {
  url?: string;
  displayUrl?: string;
  preferDisplayUrl?: boolean;
}

export enum PaymentOptions {
  AFTERPAY = 'Afterpay',
  ALIPAY = 'Alipay',
  AMERICANEXPRESS = 'American Express',
  ANDROIDPAY = 'Google Pay',
  APPLEPAY = 'Apple Pay',
  ATM = 'ATM',
  ATMQUICK = 'ATM Quick',
  BACS = 'BACS',
  BANCONTACT = 'Bancontact',
  BANKDEPOSIT = 'Bank Deposit',
  BANKPAY = 'Bank Pay',
  BGO = 'Bank/Giro Overschrijving',
  BITCOIN = 'Bitcoin',
  Bar = 'Bargeld',
  CARTASI = 'CartaSi',
  CASH = 'Cash',
  CCS = 'CCS',
  CHECK = 'Check',
  CONB = 'Contactloos betalen',
  CONTACTLESSPAYME = 'Contactless Payment',
  CVVV = 'Cadeaubon/VVV bon',
  DEBITNOTE = 'Debit Note',
  DINERSCLUB = 'Diners Club',
  DIRECTDEBIT = 'Direct Debit',
  DISCOVER = 'Discover',
  ECKARTE = 'Girokarte',
  ECOCHEQUE = 'EcoCheque',
  EKENA = 'E-kena',
  EMV = 'Elektronische Maaltijdcheques',
  FINANCING = 'Financing',
  GOPAY = 'GoPay',
  HAYAKAKEN = 'Hayakaken',
  HEBAG = 'He-Bag',
  IBOD = 'iBOD',
  ICCARDS = 'IC Cards',
  ICOCA = 'Icoca',
  ID = 'iD',
  IDEAL = 'iDeal',
  INCA = 'Incasso',
  INVOICE = 'Invoice',
  JCB = 'JCB',
  JCoinPay = 'J−Coin Pay',
  JKOPAY = 'JKO Pay',
  KITACA = 'Kitaca',
  KLA = 'Klantenkaart',
  KLARNA = 'Klarna',
  LINEPAY = 'LINE Pay',
  MAESTRO = 'Maestro',
  MANACA = 'Manaca',
  MASTERCARD = 'MasterCard',
  MIPAY = 'Mi Pay',
  MONIZZE = 'Monizze',
  MPAY = 'MPay',
  Manuelle_Lastsch = 'Manuelle Lastschrift',
  Merpay = 'メルPay',
  NANACO = 'nanaco',
  NEXI = 'Nexi',
  NIMOCA = 'Nimoca',
  OREM = 'Onder Rembours',
  PASMO = 'Pasmo',
  PAYBACKPAY = 'Payback Pay',
  PAYBOX = 'Paybox',
  PAYCONIQ = 'Payconiq',
  PAYPAL = 'PayPal',
  PAYPAY = 'PayPay',
  PAYSEC = 'PaySec',
  PIN = 'PIN',
  POSTEPAY = 'Postepay',
  QRCODE = 'QR Code Payment',
  QUICPAY = 'QUICPay',
  RAKUTENEDY = 'Rakuten Edy',
  RAKUTENPAY = '楽天Pay',
  SAMSUNGPAY = 'Samsung Pay',
  SODEXO = 'Sodexo',
  SUGOCA = 'Sugoca',
  SUICA = 'Suica',
  SWISH = 'Swish',
  TICKETRESTAURANT = 'Ticket Restaurant',
  TOICA = 'Toica',
  TRAVELERSCHECK = "Traveler's Check",
  TSCUBIC = 'TS CUBIC',
  TWINT = 'Twint',
  UNIONPAY = 'China UnionPay',
  VEV = 'Via een verzekering',
  VISA = 'Visa',
  VISAELECTRON = 'Visa Electron',
  VOB = 'Vooruit betalen',
  VOUCHER = 'Voucher',
  VPAY = 'V PAY',
  WAON = 'WAON',
  WECHATPAY = 'WeChat Pay',
  WIRETRANSFER = 'Wire Transfer',
  Yucho_Pay = 'ゆうちょPay',
  ZELLE = 'Zelle',
  AuPay = 'auPay',
  DBarai = 'd払い ',
  Überweisung = 'Banküberweisung',
}

export enum PriceRange {
  UNSPECIFIED = 'Unspecified',
  ONE = '$',
  TWO = '$$',
  THREE = '$$$',
  FOUR = '$$$$',
}

export interface RankTrackingCompetitors {
  name: string;
  website: string;
}

export enum RankTrackingFrequency {
  WEEKLY = 'Weekly',
  MONTHLY = 'Monthly',
  QUARTERLY = 'Quarterly',
}

export enum RankTrackingKeywords {
  NAME = 'Name',
  PRIMARY_CATEGORY = 'Primary Category',
  SECONDARY_CATEGORY = 'Secondary Category',
}

export enum RankTrackingQueryTemplates {
  KEYWORD = 'Keyword',
  KEYWORD_ZIP = 'Keyword Zip',
  KEYWORD_CITY = 'Keyword City',
  KEYWORD_IN_CITY = 'Keyword in City',
  KEYWORD_NEAR_ME = 'Keyword near me',
  KEYWORD_CITY_STATE = 'Keyword City State',
}

export enum RankTrackingSites {
  GOOGLE_DESKTOP = 'Google Desktop',
  GOOGLE_MOBILE = 'Google Mobile',
  BING_DESKTOP = 'Bing Desktop',
  BING_MOBILE = 'Bing Mobile',
  YAHOO_DESKTOP = 'Yahoo Desktop',
  YAHOO_MOBILE = 'Yahoo Mobile',
}

export interface ReservationUrl {
  url?: string;
  displayUrl?: string;
  preferDisplayUrl?: boolean;
}

export interface ServiceArea {
  places?: string[];
}

export enum Presentation {
  BUTTON = 'Button',
  LINK = 'Link',
}

export interface UberLink {
  text?: string;
  presentation: Presentation;
}

export interface UberTripBranding {
  text: string;
  url: string;
  description: string;
}

export interface WebsiteUrl {
  url?: string;
  displayUrl?: string;
  preferDisplayUrl?: boolean;
}

export interface ComplexVideo {
  url: string;
  video?: string;
  description?: string;
}

export default interface HealthcareFacility extends BaseYextEntity {
  accessHours?: Hours;
  appleActionLinks?: AppleActionLinks[];
  appleBusinessConnectLinkedAccount?: unknown;
  appleBusinessDescription?: string;
  appleBusinessId?: string;
  appleBusinessIdDqe?: string;
  appleCompunknownId?: string;
  appleCompunknownIdDqe?: string;
  appleCoverPhoto?: Image;
  bingWebsiteOverride?: string;
  questionsAndAnswers?: boolean;
  covid19InformationUrl?: string;
  covidMessaging?: string;
  facebookAbout?: string;
  facebookWebsiteOverride?: string;
  frequentlyAskedQuestions?: FrequentlyAskedQuestions[];
  fullyVaccinatedStaff?: boolean;
  geomodifier?: string;
  googleEntityRelationship?: GoogleEntityRelationship;
  googleMyBusinessLabels?: string[];
  googlePlaceId?: string;
  googleShortName?: string;
  holidayHoursConversationEnabled?: boolean;
  impressum?: string;
  landingPageUrl?: string;
  c_uRL?: string;
  linkedInUrl?: string;
  neighborhood?: string;
  nudgeEnabled?: boolean;
  onlineServiceHours?: Hours;
  phoneticName?: string;
  pickupHours?: Hours;
  pinterestUrl?: string;
  primaryConversationContact?: unknown;
  reviewResponseConversationEnabled?: boolean;
  serviceAreaPlaces?: ServiceAreaPlaces[];
  slug?: string;
  telehealthUrl?: string;
  tikTokUrl?: string;
  what3WordsAddress?: string;
  yelpWebsiteOverride?: string;
  youTubeChannelUrl?: string;
  acceptingNewPatients?: boolean;
  additionalHoursText?: string;
  address: Address;
  addressHidden?: boolean;
  alternatePhone?: unknown;
  associations?: string[];
  brands?: string[];
  description?: string;
  distance?: string;
  hours?: Hours;
  logo?: ComplexImage;
  categories?: unknown;
  cityCoordinate?: Coordinate;
  closed?: boolean;
  conditionsTreated?: string[];
  c_aboutAdditionalInfo?: C_aboutAdditionalInfo[];
  c_aboutButton?: C_aboutButton;
  c_aboutSectionDescription?: string;
  c_aboutSectionImage?: Image;
  c_aboutSectionTitle?: string;
  c_activeInPages?: boolean;
  c_activeInSearch?: boolean;
  c_amenities?: C_amenities[];
  c_amenitiesButton?: C_amenitiesButton;
  c_amenitiesSectionDescription?: string;
  c_amenitiesSectionImage?: Image;
  c_amenitiesSectionTitle?: string;
  c_articleSectionTitle?: string;
  c_articlesSection?: C_articlesSection[];
  c_averageRating?: number;
  c_baseURL?: string;
  c_bingURL?: string;
  c_bookAppointment?: C_bookAppointment;
  c_breadcrumbLabel?: string;
  c_callButtonPhoneNumbers?: C_callButtonPhoneNumbers[];
  c_callButtonPhoneNumbers2?: C_callButtonPhoneNumbers2[];
  c_callButtonText?: string;
  c_cQCImage?: C_cQCImage;
  dm_directoryParents?: EntityReference[];
  c_facebookURL?: string;
  c_fAQCTAButton?: C_fAQCTAButton;
  c_fAQSectionTitle?: string;
  c_googlePhoneNumber?: number;
  c_heroImage?: Image;
  c_pagesURL?: string;
  c_linkedLocationFAQSection?: EntityReference[];
  c_linkedLocationPageArticlesSection?: EntityReference[];
  c_linkedLocations?: EntityReference[];
  c_linkedPagesTreatmentAndServicesSection?: EntityReference[];
  c_linkedProfessionals?: EntityReference[];
  c_linkedSpecialtiesAndTestTreatments?: EntityReference[];
  c_metaDetails?: C_metaDetails;
  c_micrositeBrand?: C_micrositeBrand[];
  c_notificationBanner?: string;
  c_openDate?: string;
  c_openMonth?: string;
  c_pageType?: C_pageType;
  c_parking?: string;
  c_promoButton?: C_promoButton[];
  c_promoSectionDescription?: string;
  c_promoSectionImage?: Image;
  c_promoSectionTitle?: string;
  c_publicTransport?: string;
  c_starImage?: C_starImage;
  c_contentGenTest?: string;
  c_testImage?: Image;
  c_treatmentAndServices?: C_treatmentAndServices[];
  c_treatmentAndServicesSectionTitle?: string;
  c_yextAISearchURL?: string;
  displayCoordinate?: Coordinate;
  dropoffCoordinate?: Coordinate;
  productLists?: ProductLists;
  emails?: string[];
  facebookOverrideCity?: string;
  facebookCoverPhoto?: Image;
  facebookCallToAction?: FacebookCallToAction;
  facebookDescriptor?: string;
  facebookEmail?: string;
  facebookLinkedAccount?: unknown;
  facebookName?: string;
  facebookPageUrl?: string;
  facebookParentPageId?: string;
  facebookProfilePhoto?: Image;
  facebookStoreId?: string;
  facebookVanityUrl?: string;
  fax?: unknown;
  featuredMessage?: FeaturedMessage;
  photoGallery?: ComplexImage[];
  geocodedCoordinate?: Coordinate;
  gmbLinkedAccount?: unknown;
  googleAccountId?: string;
  googleAttributes?: unknown;
  googleCoverPhoto?: Image;
  googleProfilePhoto?: Image;
  googleWebsiteOverride?: string;
  insuranceAccepted?: string[];
  instagramHandle?: string;
  isoRegionCode?: string;
  keywords?: string[];
  languages?: string[];
  localPhone?: unknown;
  locationType?: LocationType;
  mainPhone?: string;
  menuUrl?: MenuUrl;
  mobilePhone?: unknown;
  npi?: string;
  orderUrl?: OrderUrl;
  paymentOptions?: PaymentOptions[];
  phones?: unknown;
  pickupCoordinate?: Coordinate;
  priceRange?: PriceRange;
  alternateNames?: string[];
  alternateWebsites?: string[];
  rankTrackingCompetitors?: RankTrackingCompetitors[];
  customKeywords?: string[];
  rankTrackingEnabled?: boolean;
  rankTrackingFrequency?: RankTrackingFrequency;
  rankTrackingKeywords?: RankTrackingKeywords[];
  rankTrackingQueryTemplates?: RankTrackingQueryTemplates[];
  rankTrackingSites?: RankTrackingSites[];
  reservationUrl?: ReservationUrl;
  routableCoordinate?: Coordinate;
  serviceArea?: ServiceArea;
  services?: string[];
  shortName35?: string;
  shortName64?: string;
  timezone?: unknown;
  tollFreePhone?: unknown;
  ttyPhone?: unknown;
  twitterHandle?: string;
  uberClientId?: string;
  uberLink?: UberLink;
  uberTripBranding?: UberTripBranding;
  walkableCoordinate?: Coordinate;
  websiteUrl?: WebsiteUrl;
  yearEstablished?: number;
  yextDisplayCoordinate?: Coordinate;
  yextDropoffCoordinate?: Coordinate;
  yextPickupCoordinate?: Coordinate;
  yextRoutableCoordinate?: Coordinate;
  yextWalkableCoordinate?: Coordinate;
  videos?: ComplexVideo[];
}
