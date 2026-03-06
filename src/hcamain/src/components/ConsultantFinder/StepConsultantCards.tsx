/* eslint-disable */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// Template finder component

import React, { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import {
  GetStaticComponentProps,
  Image as JssImage,
  ImageField,
  Field,
  LinkField,
  useComponentProps,
  ComponentRendering,
  LayoutServiceData,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Text from '@component-library/foundation/Text/Text';
import ConsultantCard from '@component-library/consultant-finder/ConsultantCard/ConsultantCard';
import Pagination from '@component-library/core-components/Pagination/Pagination';
import axios, { CancelTokenSource } from 'axios';
import { ConsultantFinderContext } from '@component-library/context/consultantFinderContext';
import Themes from '@component-library/foundation/Themes/Themes';
import Checkbox from '@component-library/core-components/Checkbox/Checkbox';
import Filters from '@component-library/consultant-finder/FiltersCF/FiltersCF';
import Search from '@component-library/consultant-finder/Search/SearchConsultantsList';
import Sorting from '@component-library/components/Sorting/Sorting';
import ConsultantFinderResults from '@component-library/consultant-finder/ConsultantFinderResults/ConsultantFinderResults';
import Breadcrumbs from '@component-library/site-components/Breadcrumbs/Breadcrumbs';
import {
  getActiveLiveDiaryConsultantSlugs,
  getDoctifyPhoneNumberConsultantSlugs,
  getIgnoreReviewsConsultantSlugs,
} from 'lib/consultant-finder/API_HCA';
import ConsultantListHeader from '@component-library/consultant-finder/ConsultantListHeader/ConsultantListHeader';
import ConsultantListHeaderFilters from '@component-library/consultant-finder/ConsultantListHeader/ConsultantListHeaderFilters';
import ConsultantListHeaderSearch from '@component-library/consultant-finder/ConsultantListHeader/ConsultantListHeaderSearch';
import TextButton from '@component-library/core-components/TextButton/TextButton';
import Container from '@component-library/foundation/Containers/Container';
import ConsultantListHeaderTtitle from '@component-library/consultant-finder/ConsultantListHeader/ConsultantListHeaderTitle';
import { getInsuranceData } from 'lib/consultant-finder/API_Doctify';
import RadioButtons from '@component-library/core-components/RadioButtons/RadioButtons';
import RadioButton from '@component-library/core-components/RadioButton/RadioButton';
import { capitalizeFirstLetter } from '@component-library/utility-functions/index';
import LoaderCF from '@component-library/consultant-finder/LoaderCF/LoaderCF';
import { GetServerSidePropsContext } from 'next';
import TextLink from '@component-library/core-components/TextLink/TextLink';
import Icons from '@component-library/foundation/Icons/Icons';
import SearchLocation from '@component-library/consultant-finder/Search/SearchLocation';
import FunctionalCookiesBox from '@component-library/consultant-finder/FunctionalCookiesBox/FunctionalCookiesBox';

interface Fields {
  API_C2_FirstAppointment_LoadingMsg: Field<string>;
  API_C2_FirstAppointment_BaseURL: Field<string>;
  EnquireNowLink: LinkField;
  BookOnlineLink: LinkField;
  ViewProfileLink: LinkField;
  BackFromAdvSearchLink: LinkField;
  BackFromQuickSearchLink: LinkField;
  TitleText: Field<string>;
  CardImage: ImageField;
  StartLink: LinkField;
  NextLink: LinkField;
  BackLink: LinkField;
  LocationFilterOptions: object[];
  LanguageFilterOptions: object[];
  GenderFilterOptions: object[];
  ProfileImagePlaceholderImage: any;
  DoctifyLogoImage: ImageField;
  DoctifyText: Field<string>;
  ConditionsTreatmentsList: object[];
  SpecialitiesList: object[];
  SearchIcon: any;
  ConditionsTreatmentsFilterHeaderText: Field<string>;
  SpecialitiesFilterHeaderText: Field<string>;
  SearchPlaceholderText: Field<string>;
  VideoConsultationFilterOptionYesLabel: Field<string>;
  VideoConsultationFilterTitle: Field<string>;
  GenderFilterTitle: Field<string>;
  LocationFilterTitle: Field<string>;
  CoverForTreatmentFilterTitle: Field<string>;
  CoverForTreatmentFilterOptionSelfPayLabel: Field<string>;
  LanguagesFilterOptionTitle: Field<string>;
  LanguagesFilterOptionPleaseSelectText: Field<string>;
  SortByHigestRatedOptionText: Field<string>;
  SortByMostNearestOptionText: Field<string>;
  SortByMostRelevantOptionText: Field<string>;
  ResetAllText: Field<string>;
  ResetAllIcon: any;
  API_DoctifySearch_NoResultsMsg: Field<string>;
  API_DoctifySearch_NoResultsMsgLocations: Field<string>;
  API_DoctifySearch_LoadingMsg: Field<string>;
  API_DoctifySearch_Limit: Field<string>;
  API_DoctifySearch_DefaultParams: Field<string>;
  API_DoctifySearch_BaseURL: Field<string>;
  API_Autocomplete_BaseURL: Field<string>;
  API_Autocomplete_Limit: Field<string>;
  API_Autocomplete_LoadingMsg: Field<string>;
  API_Autocomplete_NoResultsMsg: Field<string>;
  ConsultantFinderNodeText: Field<string>;
  ResultsNodeText: Field<string>;
  ShowMoreText: Field<string>;
  ShowLessText: Field<string>;
  ShowLessIcon: any;
  ShowMoreIcon: any;
  PracticesTitle: Field<string>;
  TreatmentsTitle: Field<string>;
  NextAppointmentOnText: Field<string>;
  LastUpdatedText: Field<string>;
  InsurersFilterTitle: Field<string>;
  PhoneNumberHref: Field<string>;
  CallToBookButtonText: Field<string>;
  CallToBookIcon: any;
  BreadcrumbHomePage: LinkField;
  CallToBookModalTitle: Field<string>;
  DisplayNumber: Field<string>;
  LocationsList: any;
  FunctionalCookieSaveNextTimeTitle: Field<string>;
  FunctionalCookieSaveNextTimeLabel: Field<string>;
  LocationsResultsLabelText: Field<string>;
}

type StepProps = {
  rendering: ComponentRendering;
  params: { [key: string]: string };
  fields: Fields;
};
interface ServerSideProps {
  Insurers: any;
  LiveDiaryConsultantsSlugs: string[];
  DoctifyPhoneConsultantsSlugs: string[];
  NoReviewsConsultants: any;
}

/**
 * If exported, will be called during SSG
 * @param {ComponentRendering} _rendering
 * @param {LayoutServiceData} _layoutData
 * @param {GetStaticPropsContext} _context
 */
/*export*/ const getStaticProps: GetStaticComponentProps = async (
  _rendering,
  _layoutData,
  _context
) => {
  const ignoreConsutantReviews = await getIgnoreReviewsConsultantSlugs();
  console.log('test', ignoreConsutantReviews);
  const insurers = await getInsuranceData(); // was getData(insurersURL);
  const consultantsSlugsLD = await getActiveLiveDiaryConsultantSlugs(); // array of strings containing slugs no need to map was getData(liveDiariesSlugURL);
  const consultantsSlugsDoctifyPhone =
    await getDoctifyPhoneNumberConsultantSlugs(); // array of strings containing slugs no need to map was getData(liveDiariesSlugURL);
  //console.log("consultantsSlugsLD", consultantsSlugsLD);
  const returnProps: ServerSideProps = {
    Insurers: insurers,
    LiveDiaryConsultantsSlugs: consultantsSlugsLD,
    DoctifyPhoneConsultantsSlugs: consultantsSlugsDoctifyPhone,
    NoReviewsConsultants: ignoreConsutantReviews,
  };

  return returnProps;
};

// will be called if not SSG
export async function getServerSideProps(
  rendering: ComponentRendering,
  layoutData: LayoutServiceData,
  context: GetServerSidePropsContext
) {
  // proxy to GetStaticComponentProps
  return await getStaticProps(rendering, layoutData, context);
}

const StepDefaultComponent = (props: StepProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Consultant Finder Step</span>
    </div>
  </div>
);

export const Default = (props: StepProps): JSX.Element => {
  const serverSideData = useComponentProps<ServerSideProps>(
    props.rendering.uid
  );

  const insurersDoctify = serverSideData?.Insurers.sort((a: any, b: any) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );
  const consultantsSlugs: any = serverSideData?.LiveDiaryConsultantsSlugs;
  const doctifyPhoneSlugs: any = serverSideData?.DoctifyPhoneConsultantsSlugs;
  // const ignoreReviewsConsultantsSlugs: any  = serverSideData?.NoReviewsConsultants;
  // console.log('doctifyPhoneSlugs', doctifyPhoneSlugs);
  const {
    searchString,
    setSearchString,
    setKeywordId,
    searchStringLocations,
    setSearchStringLocations,
    selectedLocationConsultants,
    setSelectedLocationConsultants,
  } = useContext(ConsultantFinderContext);
  const id = props.params.RenderingIdentifier;
  const searchParams = useSearchParams();
  const router = useRouter();
  const [totalPgaes, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pageNotFound, setPageNotFound] = useState(false);
  const [checkedOptionGender, setCheckedOptionGender] = useState('');
  const [selectedInsurer, setSelectedInsurer] = useState<number>(0);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [offset, setOffset] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [checkedPractices, setCheckedPractices] = useState<string[]>([]);
  const [doctifyLoaded, setDoctifyLoaded] = useState(false);
  const [URLparams, setURLparams] = useState('');
  const [hydrated, setHydrated] = useState(false);
  const [hasFunctionalConsentCookie, setFunctionalConsentCookie] =
    useState(false);
  const cardAvailableAppointmentLoadingText: string =
    props?.fields?.API_C2_FirstAppointment_LoadingMsg?.value;
  const [loadingNextAppointmentText, setLoadingNextAppointmentText] = useState(
    cardAvailableAppointmentLoadingText
  );
  const [nextAptRequestToken, setNextAptRequestToken] =
    useState<CancelTokenSource | null>(null);

  const locations = props?.fields?.LocationsList || [];
  const locationConfig = locations.map((item: any) => ({
    name: item.fields.name.value,
    distance: item.fields.distance.value,
    lat: item.fields.lat.value,
    lon: item.fields.lon.value,
  }));

  // location
  const applyLocationToSearch = (nextLocation: string) => {
    const selectedLocationConfig =
      locationConfig.find(
        (loc: { name: string }) => loc.name === nextLocation
      ) ||
      locationConfig.find((loc: { name: string }) => loc.name === 'Anywhere');

    const { lat, lon, distance } = selectedLocationConfig ?? {};
    console.log('locationConfig', locationConfig);

    // update UI immediately
    setSelectedLocationConsultants(nextLocation);

    // update URL params -> triggers your existing fetch effect (router.query dependency)
    const { requestPath, offset, location, ...queryParams } = router.query;

    router.push(
      {
        pathname: router.pathname,
        query: {
          ...queryParams,
          lat: lat,
          lon: lon,
          distance: distance,
          offset: 0, // reset pagination when changing region
        },
      },
      undefined,
      { shallow: true }
    );
  };

  // hospitals
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const practice = e.target.value;
    const isChecked = e.target.checked;

    let updatedPractices: string[];
    if (isChecked) {
      updatedPractices = [...checkedPractices, practice];
    } else {
      updatedPractices = checkedPractices.filter((item) => item !== practice);
    }
    setCheckedPractices(updatedPractices);
    updateUrlParams(updatedPractices);
  };

  // Update URL query parameters
  const updateUrlParams = (practices: string[]) => {
    const queryParams = { ...router.query };
    delete queryParams.practice;
    delete queryParams.requestPath;
    delete queryParams.offset;
    if (practices.length > 0) {
      queryParams.practice = practices.join(',');
    }
    router.push(
      {
        pathname: router.pathname,
        query: { ...queryParams, offset: 0 },
      },
      undefined,
      { shallow: true }
    );
  };

  const isOneTrustAvailable = () =>
    typeof window !== 'undefined' && typeof (window as any).OneTrust !== 'undefined';

  const hasFunctionalConsent = () => {
    const groups = (window as any).OnetrustActiveGroups || '';
    return groups.includes('C0003');
  };

  const readCookie = (name: string) => {
    const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return m ? decodeURIComponent(m[1]) : null;
  };

  const setLocationCookie = (value: string) => {
    document.cookie = `location=${encodeURIComponent(value)}; path=/; max-age=31536000; SameSite=Lax`;
  };

  const deleteLocationCookie = () => {
    document.cookie = 'location=; path=/; max-age=0; SameSite=Lax';
    document.cookie = 'location=; max-age=0; SameSite=Lax';
  };

  // Persist whenever location changes (only after hydration + only if consent)
  useEffect(() => {
    if (!hydrated) return;
    if (typeof window === 'undefined') return;
    if (!hasFunctionalConsent()) return;
    setLocationCookie(selectedLocationConsultants);
  }, [hydrated, selectedLocationConsultants]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!router.isReady) return;

    const syncWithConsent = () => {
      const consent = hasFunctionalConsent();

      if (!consent) {
        deleteLocationCookie();
        setFunctionalConsentCookie(false);
        setHydrated(true);
        return;
      }

      // consent = true
      setFunctionalConsentCookie(true);

      // If URL has location, don't hydrate from cookie here.
      // Let the "results" useEffect handle location from URL.
      if (router.query.location) return;

      const saved = readCookie('location');
      const locationParam = router.query.location;
      if (locationParam) {
        setSelectedLocationConsultants(locationParam.length > 0 ? locationParam.toString().charAt(0).toUpperCase() + locationParam.slice(1) : 'Anywhere');
        setSearchStringLocations(locationParam.length > 0 ? locationParam.toString().charAt(0).toUpperCase() + locationParam.slice(1) : 'Anywhere');
      }

      if (saved) {
        // hydrate from cookie only if it exists
        setSelectedLocationConsultants(saved);
        setSearchStringLocations(saved);
      } else {
        // no cookie yet -> persist current selection instead of forcing Anywhere
        setLocationCookie(selectedLocationConsultants || 'Anywhere');
      }

      setHydrated(true);
    };

    syncWithConsent();
    window.addEventListener('OneTrustGroupsUpdated', syncWithConsent);
    return () => window.removeEventListener('OneTrustGroupsUpdated', syncWithConsent);
    // include searchStringLocations so the handler sees latest selection
  }, [router.isReady]);

  useEffect(() => {
    //console.log('next apt useEffect', doctifyLoaded);
    // Check if we made a request
    if (nextAptRequestToken) {
      // Cancel the previous request before making a new request
      nextAptRequestToken.cancel();
      setNextAptRequestToken(null);
    }

    if (doctifyLoaded) {
      // now make async client side call to find next appointments
      // get the next available appointment details
      // must pass gmc number to C2
      const gmcArray = results.map(
        (consultant: any) =>
          consultant?.registrationBodies.filter(
            (item: any) => item.name === 'General Medical Council'
          )[0]?.registrationNumber
      );
      const gmcList = gmcArray.map((gmc: any) => gmc).join(',');

      // call to our local server api endpoint to get the first appointment data from C2
      const getLDBFirstAppointmentDatasURL = `${props?.fields?.API_C2_FirstAppointment_BaseURL?.value}${gmcList}`;
      const cancelToken = axios.CancelToken.source();
      setNextAptRequestToken(cancelToken);
      axios
        .get(getLDBFirstAppointmentDatasURL, {
          cancelToken: cancelToken.token,
        })
        .then((firstAppointmentResponse) => {
          // map in the first appointment data for each consultant, results will come in the same order as the request
          firstAppointmentResponse.data.map(
            (firstAppointment: any, index: number) =>
              results[index]
                ? ((results[index] as any).firstAppointment = firstAppointment)
                : null
          );

          // update with the new data
          setLoadingNextAppointmentText('');
          setResults(results);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctifyLoaded]);

  // gender
  const handleGenderOptions = (value: string) => {
    setCheckedOptionGender(value);
    const { requestPath, offset, ...updatedQuery } = router.query;
    router.push(
      {
        pathname: router.pathname,
        query: { ...updatedQuery, gender: value, offset: 0 },
      },
      undefined,
      { shallow: true }
    );
  };

  // insurer
  const handleRadioButtonChange = (value: number) => {
    setSelectedInsurer(value);
    if (value === 0) {
      const { insurer, offset, ...queryWithoutInsurer } = router.query;
      router.push(
        {
          pathname: router.pathname,
          query: { ...queryWithoutInsurer, offset: 0 },
        },
        undefined,
        { shallow: true }
      );
    } else {
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, insurer: value },
        },
        undefined,
        { shallow: true }
      );
    }
  };

  // languages
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedLanguage(selectedValue);
    if (selectedValue !== '') {
      const { requestPath, ...updatedQuery } = router.query;
      router.push(
        {
          pathname: router.pathname,
          query: { ...updatedQuery, language: selectedValue, offset: 0 },
        },
        undefined,
        { shallow: true }
      );
    } else {
      const { language, ...queryWithoutLanguage } = router.query;
      router.push(
        {
          pathname: router.pathname,
          query: { ...queryWithoutLanguage, offset: 0 },
        },
        undefined,
        { shallow: true }
      );
    }
  };

  // reset all filters
  const handleResetFilters = () => {
    const {
      offset,
      sortBy,
      language,
      insurer,
      gender,
      videoConsultation,
      practice,
      requestPath,
      search,
      keywordId,
      location,
      distance,
      ...queryParams
    } = router.query;

    const newQueryParams: any = { ...queryParams };

    // Remove search if it exists
    if ('search' in newQueryParams) {
      delete newQueryParams.search;
    }

    // Remove keywordId if it exists
    if ('keywordId' in newQueryParams) {
      delete newQueryParams.keywordId;
    }

    // Remove language if it exists
    if ('language' in newQueryParams) {
      delete newQueryParams.language;
    }

    // Remove insurer if it exists
    if ('insurer' in newQueryParams) {
      delete newQueryParams.insurer;
    }

    // Remove gender if it exists
    if ('gender' in newQueryParams) {
      delete newQueryParams.gender;
    }

    // Remove videoConsultation if it exists
    if ('videoConsultation' in newQueryParams) {
      delete newQueryParams.videoConsultation;
    }

    // Remove practice if it exists
    if ('practice' in newQueryParams) {
      delete newQueryParams.practice;
    }

    // Remove location if it exists
    if ('location' in newQueryParams) {
      delete newQueryParams.location;
    }

    // Update offset and sortBy to their default values
    newQueryParams.offset = 0;
    newQueryParams.sortType = 'relevance';
    newQueryParams.lat = '51.507217';
    newQueryParams.lon = '-0.1275862';
    newQueryParams.distance = 0;

    setSelectedLocationConsultants('Anywhere');
    setSearchStringLocations('Anywhere');

    router.push(
      {
        pathname: router.pathname,
        query: newQueryParams,
      },
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    // If router is not ready, set loading to true
    if (!router.isReady) {
      setLoading(true);
      return; // Exit early if router is not ready
    }

    // location
    const locationQuery = router.query.location?.toString();
    const latQuery = router.query.lat?.toString();
    const lonQuery = router.query.lon?.toString();
    const distanceQuery = router.query.distance?.toString();

    if (locationQuery) {
      const locationFormatted =
        locationQuery.length > 0
          ? locationQuery.charAt(0).toUpperCase() + locationQuery.slice(1).toLowerCase()
          : 'Anywhere';

      setSelectedLocationConsultants(locationFormatted);
      setSearchStringLocations(locationFormatted);
    } else if (latQuery && lonQuery) {
      const matchedLocation =
        locationConfig.find(
          (loc: any) =>
            String(loc.lat) === latQuery &&
            String(loc.lon) === lonQuery &&
            String(loc.distance) === distanceQuery
        ) ||
        locationConfig.find(
          (loc: any) =>
            String(loc.lat) === latQuery &&
            String(loc.lon) === lonQuery
        );

      if (matchedLocation) {
        console.log('matchedLocation', matchedLocation);
        setSelectedLocationConsultants(matchedLocation.name);
        setSearchStringLocations(matchedLocation.name);
      }
    }

    // offset
    const initialOffset = router.query.offset ? Number(router.query.offset) : 0;
    setOffset(initialOffset);

    // practice
    const practiceQuery = router.query.practice;
    const videoPractice = router.query.videoConsultation;
    if (practiceQuery) {
      // console.log('practiceQuery', practiceQuery);
      const practices = Array.isArray(practiceQuery)
        ? practiceQuery
        : practiceQuery.split(',');
      setCheckedPractices(practices);
      // console.log('practices', practices);
      setCheckedPractices(practices);
    } else {
      setCheckedPractices([]); // Reset checked practices if there are no query parameters
    }

    // video
    if (videoPractice) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }

    // gender
    const genderQueryParam = router.query.gender;
    if (genderQueryParam) {
      setCheckedOptionGender(genderQueryParam.toString());
    } else {
      setCheckedOptionGender('');
    }

    // insurer
    const { insurer } = router.query;
    if (insurer) {
      setSelectedInsurer(Number(insurer));
    }

    // languages
    const { language } = router.query;
    if (language) {
      setSelectedLanguage(language.toString());
    }

    // Set the search string based on the query parameter if it exists
    const { search, keywordId } = router.query;

    if (search) {
      setSearchString(search.toString());
    } else {
      setSearchString('');
    }
    if (keywordId) {
      setKeywordId(Number(keywordId));
    } else {
      setKeywordId(0);
    }

    setLoading(true);

    // destructure params from URL
    const params = Object.fromEntries(searchParams.entries());

    let { lat, lon, location, distance, ...rest } = params;

    // if location exists -> override lat/lon from config
    if (location) {
      console.log(location);
      const locationFormatted =
        location.charAt(0).toUpperCase() + location.slice(1).toLowerCase();

      const selectedLocation = locationConfig.find(
        (loc: any) => loc.name === locationFormatted
      );

      console.log('locationConfig', locationConfig);
      console.log('selectedLocation', selectedLocation);

      if (selectedLocation) {
        lat = selectedLocation.lat;
        lon = selectedLocation.lon;
        distance = selectedLocation.distance;
        console.log('lat', lat, 'lon', lon, 'distance', distance);
      }
    }

    // build final query params
    const URLprams = new URLSearchParams({
      ...rest,
      ...(location && { location }),
      ...(lat && { lat }),
      ...(lon && { lon }),
      ...(distance && { distance }),
    }).toString();

    console.log('URLprams call', URLprams);

    const baseURL =
      props?.fields?.API_DoctifySearch_BaseURL?.value ||
      `https://api.doctify.com/api/hca/search`;

    const requestURL: string = `${baseURL}?${URLprams}`;
    setURLparams(URLprams);

    if (URLprams.length === 0) {
      setLoading(false);
      setPageNotFound(true);
      router.push('/finder/step-intro');
      return;
    }

    //reset the loading state before making a call to get the data,
    //will cancel outstanding slow requests for the next appointment data
    setDoctifyLoaded(false);
    setLoadingNextAppointmentText('loading...');
    axios
      .get(requestURL)
      .then((resp) => {
        // console.log(resp.data);
        setTotal(resp?.data?.total || 0);

        if (resp.data.rows.length > 0) {
          setResults(resp?.data?.rows || []);
          const totalPages = Math.ceil(resp.data.total / 12);
          // console.log('total pages', totalPages);
          setTotalPages(totalPages);
          if (resp.data.rows.length > 0) {
            // fill data with is live diary flag
            if (serverSideData?.LiveDiaryConsultantsSlugs && resp.data.rows) {
              // load the is live diary flag from the server side data, based on the results from the doctify search
              resp.data.rows.forEach(
                (consultant: {
                  isLiveDiaryConsultant: boolean;
                  slug: string;
                }) => {
                  consultant.isLiveDiaryConsultant =
                    serverSideData?.LiveDiaryConsultantsSlugs.indexOf(
                      consultant?.slug
                    ) > -1;
                }
              );
            }
            // set the state
            setResults(resp.data.rows);
          }
        } else {
          setResults([]);
          setTotalPages(0);
        }
        setLoading(false);
        setError(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setError(true);
      })
      .finally(() => {
        //console.log('set doctify loaded true');
        setDoctifyLoaded(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, router.query]);

  if (props.fields) {
    return (
      <div id={id ? id : undefined}>
        {router.isReady && !pageNotFound && (
          <>
            <Breadcrumbs
              backCta={{
                text: 'Consultant Finder',
                link: `${props?.fields?.BreadcrumbHomePage?.value?.href ||
                  '/finder/step-intro'
                  }`,
              }}
            >
              <TextLink>
                <a href="/">
                  <Icons iconName="iconHome"></Icons>
                  <span className="sr-only">Home</span>
                </a>
              </TextLink>
              <Link
                href={`${props?.fields?.BreadcrumbHomePage?.value?.href ||
                  '/finder/step-intro'
                  }`}
              >
                {props?.fields?.ConsultantFinderNodeText?.value ||
                  'Consultant Finder'}
              </Link>
              <span>{props?.fields?.ResultsNodeText?.value || 'Results'}</span>
            </Breadcrumbs>
            <div>
              <ConsultantListHeader>
                <ConsultantListHeaderSearch>
                  <Search
                    placeholder={
                      props?.fields?.SearchPlaceholderText?.value ||
                      'Type in a service, condition, treatment...'
                    }
                    doctifyBaseURL={
                      props?.fields?.API_Autocomplete_BaseURL?.value ||
                      'https://api.doctify.com/api/hca/search/autocomplete?search'
                    }
                    limit={
                      Number(props?.fields?.API_Autocomplete_Limit?.value) || 20
                    }
                    noResultsMsg={
                      props?.fields?.API_Autocomplete_NoResultsMsg?.value ||
                      'No matches found, please try typing something else.'
                    }
                    specialtyLabel={
                      props?.fields?.SpecialitiesFilterHeaderText?.value ||
                      'Specialties'
                    }
                    conditionsProceduresLabel={
                      props?.fields?.ConditionsTreatmentsFilterHeaderText
                        ?.value || 'Conditions/ Procedures'
                    }
                    setKeywordId={setKeywordId}
                    searchString={searchString}
                    setSearchString={setSearchString}
                    searchIcon={
                      props?.fields?.SearchIcon?.fields?.SvgMarkup?.value ||
                      null
                    }
                    conditionsTreatmentsList={
                      props?.fields?.ConditionsTreatmentsList || []
                    }
                    specialitiesList={props?.fields?.SpecialitiesList || []}
                    loadingText={
                      props?.fields?.API_Autocomplete_LoadingMsg?.value ||
                      'Loading...'
                    }
                  />
                </ConsultantListHeaderSearch>
                <Themes theme="A-HCA-White">
                  <ConsultantListHeaderFilters>
                    <Filters
                      filters={[
                        {
                          title:
                            props?.fields?.LocationFilterTitle?.value ||
                            'Locations',
                          contentVariation: 'filters',
                          children: (
                            <div>
                              {props?.fields?.LocationFilterOptions &&
                                props?.fields?.LocationFilterOptions.length >
                                0 &&
                                props?.fields?.LocationFilterOptions.map(
                                  (hospital: any, index: number) => (
                                    <Checkbox
                                      key={index}
                                      id={hospital?.fields?.slug?.value}
                                      value={hospital?.fields?.slug?.value}
                                      name={
                                        hospital?.fields?.doctifyName?.value
                                      }
                                      label={
                                        hospital?.fields?.doctifyName?.value
                                      }
                                      checked={checkedPractices.includes(
                                        hospital?.fields?.slug?.value
                                      )}
                                      onChange={handleCheckboxChange}
                                    ></Checkbox>
                                  )
                                )}
                            </div>
                          ),
                        },
                        {
                          title:
                            props?.fields?.VideoConsultationFilterTitle
                              ?.value || 'Video Consultation',
                          contentVariation: 'filters',
                          children: (
                            <div>
                              <Checkbox
                                key={'video'}
                                id={'video'}
                                value={'video_consultation'}
                                name={'video'}
                                label={
                                  props?.fields
                                    ?.VideoConsultationFilterOptionYesLabel
                                    ?.value || 'Yes'
                                }
                                checked={isChecked}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  const target = e.target;
                                  setIsChecked(target.checked);

                                  const queryParams = { ...router.query };
                                  if (target.checked) {
                                    queryParams.videoConsultation = 'true';
                                    queryParams.offset = '0';
                                  } else {
                                    delete queryParams.videoConsultation;
                                    delete queryParams.offset;
                                  }
                                  router.push(
                                    {
                                      pathname: router.pathname,
                                      query: queryParams,
                                    },
                                    undefined,
                                    { shallow: true }
                                  );
                                }}
                              ></Checkbox>
                            </div>
                          ),
                        },
                        {
                          title:
                            props?.fields?.GenderFilterTitle?.value || 'Gender',
                          contentVariation: 'filters',
                          children: (
                            <div>
                              {props?.fields?.GenderFilterOptions && (
                                <RadioButtons>
                                  {props?.fields?.GenderFilterOptions?.length >
                                    0 &&
                                    props?.fields?.GenderFilterOptions.map(
                                      (genderOption: any, index) => (
                                        <RadioButton
                                          key={index}
                                          label={genderOption?.name}
                                          name="gender"
                                          value={
                                            genderOption?.fields?.Value?.value
                                          }
                                          onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                          ) =>
                                            handleGenderOptions(e.target.value)
                                          }
                                          checked={
                                            checkedOptionGender ===
                                            genderOption?.fields?.Value?.value
                                          }
                                        />
                                      )
                                    )}
                                </RadioButtons>
                              )}
                            </div>
                          ),
                        },
                        {
                          title:
                            props?.fields?.CoverForTreatmentFilterTitle
                              ?.value || 'Cover for treatment or procedure',
                          contentVariation: 'filters',
                          children: (
                            <div>
                              <RadioButtons>
                                <RadioButton
                                  key="self-pay"
                                  label={
                                    props?.fields
                                      ?.CoverForTreatmentFilterOptionSelfPayLabel
                                      ?.value || 'I am paying by myself'
                                  }
                                  name="insurer"
                                  value="0"
                                  onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                  ) =>
                                    handleRadioButtonChange(
                                      Number(e.target.value)
                                    )
                                  }
                                  checked={selectedInsurer === 0}
                                />
                              </RadioButtons>
                              <Container
                                marginTop="spacing-2"
                                marginBottom="spacing-2"
                              >
                                <Text
                                  tag="h3"
                                  variation="body-bold-extra-large"
                                >
                                  {props?.fields?.InsurersFilterTitle?.value ||
                                    'Insurers available'}
                                </Text>
                              </Container>
                              {insurersDoctify && (
                                <RadioButtons>
                                  {insurersDoctify?.length > 0 &&
                                    insurersDoctify.map((insurer: any) => (
                                      <RadioButton
                                        key={insurer.id}
                                        label={capitalizeFirstLetter(
                                          insurer.name
                                        )}
                                        name="insurer"
                                        value={insurer.id}
                                        onChange={(
                                          e: React.ChangeEvent<HTMLInputElement>
                                        ) =>
                                          handleRadioButtonChange(
                                            Number(e.target.value)
                                          )
                                        }
                                        checked={selectedInsurer === insurer.id}
                                      />
                                    ))}
                                </RadioButtons>
                              )}
                            </div>
                          ),
                        },
                        {
                          title:
                            props?.fields?.LanguagesFilterOptionTitle?.value ||
                            'Languages',
                          contentVariation: 'filters',
                          children: (
                            <div>
                              {props?.fields?.LanguageFilterOptions &&
                                props?.fields?.LanguageFilterOptions?.length >
                                0 && (
                                  <select
                                    name="language"
                                    value={selectedLanguage}
                                    onChange={handleLanguageChange}
                                  >
                                    <option value="">
                                      {props?.fields
                                        ?.LanguagesFilterOptionPleaseSelectText
                                        ?.value || 'Please select language'}
                                    </option>
                                    {props.fields.LanguageFilterOptions.map(
                                      (language: any) => (
                                        <option
                                          key={language?.fields?.id?.value}
                                          value={language?.fields?.id?.value}
                                        >
                                          {language?.fields?.Value?.value}
                                        </option>
                                      )
                                    )}
                                  </select>
                                )}
                            </div>
                          ),
                        },
                      ]}
                      resultsCount={total}
                    ></Filters>
                    <Sorting
                      options={[
                        {
                          id: 'relevance',
                          defaultChecked: router.query.sortType === 'relevance',
                          labelText:
                            props?.fields?.SortByMostRelevantOptionText
                              ?.value || 'Most relevant',
                          value: 'relevance',
                        },
                        {
                          id: 'rating',
                          defaultChecked: router.query.sortType === 'rating',
                          labelText:
                            props?.fields?.SortByHigestRatedOptionText?.value ||
                            'Highest rated by patients',
                          value: 'rating',
                        },
                        {
                          id: 'nearest',
                          defaultChecked: router.query.sortType === 'nearest',
                          labelText:
                            props?.fields?.SortByMostNearestOptionText?.value ||
                            'Nearest',
                          value: 'nearest',
                        },
                      ]}
                      onChange={(e) => {
                        const target = e.target as HTMLInputElement;

                        if (target.checked) {
                          const queryParams = {
                            ...router.query,
                            sortType: target.value,
                            offset: 0,
                          };
                          if ('requestPath' in queryParams) {
                            delete queryParams.requestPath;
                          }
                          router.push(
                            {
                              pathname: router.pathname,
                              query: queryParams,
                            },
                            undefined,
                            { shallow: true }
                          );
                        }
                      }}
                    />
                    <TextButton theme="dark">
                      <button onClick={handleResetFilters}>
                        {props?.fields?.ResetAllText?.value || 'Reset all'}
                        <span
                          dangerouslySetInnerHTML={{
                            __html:
                              props?.fields?.ResetAllIcon?.fields?.SvgMarkup
                                ?.value || '',
                          }}
                        />
                      </button>
                    </TextButton>
                  </ConsultantListHeaderFilters>
                </Themes>
              </ConsultantListHeader>
              <ConsultantListHeaderTtitle
                title={
                  <Text tag="h1" variation="display-5">
                    {props?.fields?.TitleText?.value ||
                      `Let's get you to the right specialist`}
                  </Text>
                }
                locationSearch={
                  <><SearchLocation
                    isStepIntro={false}
                    isStepCards={true}
                    applyLocationToSearch={applyLocationToSearch}
                    placeholder={props?.fields?.SearchPlaceholderText?.value ||
                      'Type in a service, condition, treatment...'}
                    doctifyBaseURL={props?.fields?.API_Autocomplete_BaseURL?.value ||
                      'https://api.doctify.com/api/hca/search/autocomplete?search'}
                    limit={Number(props?.fields?.API_Autocomplete_Limit?.value) || 20}
                    noResultsMsg={props?.fields?.API_Autocomplete_NoResultsMsg?.value ||
                      'No matches found, please try typing something else.'}
                    setKeywordId={setKeywordId}
                    searchString={searchStringLocations}
                    locationList={locationConfig || []}
                    setSearchString={setSearchStringLocations}
                    searchIcon={props?.fields?.SearchIcon?.fields?.SvgMarkup?.value ||
                      null}
                    loadingText={props?.fields?.API_Autocomplete_LoadingMsg?.value ||
                      'Loading...'}
                    labelLocationsResults={props?.fields?.LocationsResultsLabelText?.value ||
                      'LOCATIONS'} />
                    {
                      !hasFunctionalConsentCookie && isOneTrustAvailable() &&
                      <FunctionalCookiesBox
                        title={props.fields?.FunctionalCookieSaveNextTimeTitle?.value || 'Save this location for next time?'}
                        label={props.fields?.FunctionalCookieSaveNextTimeLabel?.value || 'Activate functional cookies'}>
                      </FunctionalCookiesBox>
                    }
                  </>
                }
              ></ConsultantListHeaderTtitle>
              {loading && (
                <LoaderCF
                  loadingMsg={
                    props?.fields?.API_DoctifySearch_LoadingMsg?.value ||
                    'Loading....'
                  }
                ></LoaderCF>
              )}
              {!loading && !error && results.length === 0 && (
                <Container marginTop="spacing-5" marginBottom="spacing-6">
                  <Text tag="p" variation="body-small">
                    {selectedLocationConsultants === 'London' ||
                      selectedLocationConsultants === 'Anywhere'
                      ? props?.fields?.API_DoctifySearch_NoResultsMsg?.value ||
                      'No results'
                      : props?.fields?.API_DoctifySearch_NoResultsMsgLocations
                        ?.value ||
                      'No results, please select another location'}
                  </Text>
                </Container>
              )}
              <ConsultantFinderResults>
                {!loading &&
                  !error &&
                  results.length > 0 &&
                  results.map((consultant: any) => (
                    <ConsultantCard
                      key={consultant?.id}
                      ignoreReviewsConsultantsList={
                        serverSideData?.NoReviewsConsultants || []
                      }
                      profilePhoto={
                        consultant?.images?.logo ||
                        props?.fields?.ProfileImagePlaceholderImage?.value
                          ?.src ||
                        null
                      }
                      name={`${consultant?.firstName} ${consultant?.lastName}`}
                      slug={consultant?.slug}
                      keywords={consultant?.keywords || null}
                      hospitals={consultant?.practices || null}
                      reviewsCount={consultant?.averageRating || 0}
                      reviewsTotal={consultant?.reviewsTotal || 0}
                      doctifyLogo={
                        <JssImage field={props.fields.DoctifyLogoImage} />
                      }
                      doctifyText={
                        props?.fields?.DoctifyText?.value || 'Reviewed By'
                      }
                      hideAppointmentRequest={
                        consultant?.hideAppointmentRequest
                      }
                      consultantsSlugs={consultantsSlugs}
                      isLiveDiaryConsultant={consultant?.isLiveDiaryConsultant}
                      firstAppointment={consultant?.firstAppointment}
                      loadingNextAppointmentText={loadingNextAppointmentText}
                      enquireNowCTAText={
                        props?.fields?.EnquireNowLink?.value?.text ||
                        'Enquire Now'
                      }
                      bookNowCTAText={
                        props?.fields?.BookOnlineLink?.value?.text ||
                        'Book online'
                      }
                      viewProfileCTAText={
                        props?.fields?.ViewProfileLink?.value?.text ||
                        'View profile'
                      }
                      viewProfileLink={
                        props?.fields?.ViewProfileLink?.value?.href &&
                        props?.fields?.ViewProfileLink?.value?.href.replace(
                          /,-w-,/g,
                          ''
                        )
                      }
                      bookOnlineLink={
                        props?.fields?.BookOnlineLink?.value?.href
                      }
                      enquireNowLink={
                        props?.fields?.EnquireNowLink?.value?.href
                      }
                      nextAppointmentTitle={
                        props?.fields?.NextAppointmentOnText?.value ||
                        'Next appointment on'
                      }
                      lastUpdatedText={
                        props?.fields?.LastUpdatedText?.value || 'Last checked:'
                      }
                      showMoreText={
                        props?.fields?.ShowMoreText?.value || 'Show More'
                      }
                      showLessText={
                        props?.fields?.ShowLessText?.value || 'Show Less'
                      }
                      iconShowMore={
                        props?.fields?.ShowMoreIcon?.fields?.SvgMarkup?.value ||
                        null
                      }
                      iconShowLess={
                        props?.fields?.ShowLessIcon?.fields?.SvgMarkup?.value ||
                        null
                      }
                      practicesTitle={
                        props?.fields?.PracticesTitle?.value || 'Practices'
                      }
                      treatmentsTitle={
                        props?.fields?.TreatmentsTitle?.value || 'Treatments'
                      }
                      phoneNumberHref={
                        props?.fields?.PhoneNumberHref?.value || '02070794344'
                      }
                      phoneNumberDisplay={
                        props?.fields?.DisplayNumber?.value || '020 7079 4344'
                      }
                      callToBookButtonText={
                        props?.fields?.CallToBookButtonText?.value ||
                        'Call to book'
                      }
                      callToBookButtonIcon={
                        props?.fields?.CallToBookIcon?.fields?.SvgMarkup
                          ?.value || null
                      }
                      gmcNumber={
                        consultant?.registrationBodies?.filter(
                          (item: any) => item.name === 'General Medical Council'
                        )[0]?.registrationNumber || ''
                      }
                      callToBookModalTitle={
                        props?.fields?.CallToBookModalTitle?.value ||
                        'Appointments at'
                      }
                      doctifyPhoneSlugs={doctifyPhoneSlugs}
                      URLprams={URLparams}
                    />
                  ))}
              </ConsultantFinderResults>

              {error && !loading && (
                <div>There was an error, Please try again</div>
              )}

              {!error && !loading && totalPgaes > 1 && results.length > 0 && (
                <Container marginBottom="spacing-8">
                  <Themes theme={'A-HCA-White'}>
                    <Pagination
                      pageCount={totalPgaes}
                      callback={(newPage: number) => {
                        const offset = (newPage - 1) * 12;
                        setOffset(offset);
                        // Update the URL query parameters
                        const { requestPath, ...queryParams } = router.query;
                        router.push(
                          {
                            pathname: router.pathname,
                            query: { ...queryParams, offset: offset },
                          },
                          undefined,
                          { shallow: true }
                        );
                      }}
                      currentPage={Math.ceil((offset + 1) / 12)}
                    />
                  </Themes>
                </Container>
              )}
            </div>
          </>
        )}
      </div>
    );
  }

  return <StepDefaultComponent {...props} />;
};
