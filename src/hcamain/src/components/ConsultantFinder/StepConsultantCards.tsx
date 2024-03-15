/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// Template finder component

import React, { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSearchParams, usePathname } from 'next/navigation';
import {
  GetStaticComponentProps,
  Image as JssImage,
  Link as JssLink,
  ImageField,
  Field,
  LinkField,
  useComponentProps,
  ComponentRendering,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Text from '@component-library/foundation/Text/Text';
import ConsultantCard from '@component-library/consultant-finder/ConsultantCard/ConsultantCard';
import Pagination from '@component-library/core-components/Pagination/Pagination';
import axios, { CancelTokenSource } from 'axios';
import { ConsultantFinderContext } from 'src/context/consultantFinderContext';
import Themes from '@component-library/foundation/Themes/Themes';
import Checkbox from '@component-library/core-components/Checkbox/Checkbox';
import Filters from '@component-library/site-components/Filters/Filters';
import Search from '@component-library/consultant-finder/Search/SearchConsultantsList';
import Sorting from '@component-library/components/Sorting/Sorting';
import ConsultantFinderResults from '@component-library/consultant-finder/ConsultantFinderResults/ConsultantFinderResults';
import Loader from '@component-library/foundation/Loader/Loader';
import Breadcrumbs from '@component-library/site-components/Breadcrumbs/Breadcrumbs';
import { getActiveLiveDiaryConsultantSlugs } from 'lib/consultant-finder/API_HCA';
import ConsultantListHeader from '@component-library/consultant-finder/ConsultantListHeader/ConsultantListHeader';
import ConsultantListHeaderFilters from '@component-library/consultant-finder/ConsultantListHeader/ConsultantListHeaderFilters';
import ConsultantListHeaderSearch from '@component-library/consultant-finder/ConsultantListHeader/ConsultantListHeaderSearch';
import TextButton from '@component-library/core-components/TextButton/TextButton';
import Icons from '@component-library/foundation/Icons/Icons';
import Container from '@component-library/foundation/Containers/Container';
import ConsultantListHeaderTtitle from '@component-library/consultant-finder/ConsultantListHeader/ConsultantListHeaderTitle';
import { getInsuranceData } from 'lib/consultant-finder/API_Doctify';
import RadioButtons from '@component-library/core-components/RadioButtons/RadioButtons';
import RadioButton from '@component-library/core-components/RadioButton/RadioButton';
import { capitalizeFirstLetter } from '@component-library/utility-functions/index';

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
}

type StepProps = {
  rendering: ComponentRendering;
  params: { [key: string]: string };
  fields: Fields;
};
interface ServerSideProps {
  Insurers: any;
  LiveDiaryConsultantsSlugs: string[];
}

/**
 * Will be called during SSG
 * @param {ComponentRendering} _rendering
 * @param {LayoutServiceData} _layoutData
 * @param {GetStaticPropsContext} _context
 */
export const getStaticProps: GetStaticComponentProps = async (
  _rendering,
  _layoutData,
  _context
) => {
  const insurers = await getInsuranceData(); // was getData(insurersURL);
  const consultantsSlugsLD = await getActiveLiveDiaryConsultantSlugs(); // array of strings containing slugs no need to map was getData(liveDiariesSlugURL);

  const returnProps: ServerSideProps = {
    Insurers: insurers,
    LiveDiaryConsultantsSlugs: consultantsSlugsLD,
  };

  return returnProps;
};

const StepDefaultComponent = (props: StepProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Consultant Finder Step</span>
    </div>
  </div>
);

export const Default = (props: StepProps): JSX.Element => {
  const conditionsTreatmentsListMock = [
    {
      id: '036f2449-86bb-41d3-a5a1-3ad396c9b27d',
      url: '/Finder/Step-Intro/Data/StepIntroData/FilterOptions/Hip-Replacement',
      name: 'Hip Replacement',
      displayName: 'Hip Replacement',
      fields: {
        id: {
          value: 1140,
        },
        Value: {
          value: 'Hip Replacement',
        },
        Key: {
          value: 'HipReplacement',
        },
        name: {
          value: 'Hip Replacement',
        },
        Order: {
          value: 101,
        },
        type: {
          value: 'procedure',
        },
      },
    },
    {
      id: 'c990a95c-bee5-4b59-8496-02e28eb05e3f',
      url: '/Finder/Step-Intro/Data/StepIntroData/FilterOptions/Asthma',
      name: 'Asthma',
      displayName: 'Asthma',
      fields: {
        id: {
          value: 1017,
        },
        Value: {
          value: 'Asthma',
        },
        Key: {
          value: 'Asthma',
        },
        name: {
          value: 'Asthma',
        },
        Order: {
          value: 102,
        },
        type: {
          value: 'condition',
        },
      },
    },
    {
      id: '4b7599f9-17a9-4f6e-a501-6579d518607f',
      url: '/Finder/Step-Intro/Data/StepIntroData/FilterOptions/Paediatrics',
      name: 'Paediatrics',
      displayName: 'Paediatrics',
      fields: {
        id: {
          value: 706,
        },
        Value: {
          value: 'Paediatrics (Pediatrics)',
        },
        Key: {
          value: 'PaediatricsSpecialty',
        },
        name: {
          value: 'Paediatrics',
        },
        Order: {
          value: 3,
        },
        type: {
          value: 'specialty',
        },
      },
    },
    {
      id: 'c66c3baa-2f2b-4329-b161-ebc71c4e1092',
      url: '/Finder/Step-Intro/Data/StepIntroData/FilterOptions/Fertilisation',
      name: 'Fertilisation',
      displayName: 'Fertilisation',
      fields: {
        id: {
          value: 1369,
        },
        Value: {
          value: 'Fertilisation',
        },
        Key: {
          value: 'Fertilisation',
        },
        name: {
          value: 'Fertilisation',
        },
        Order: {
          value: 104,
        },
        type: {
          value: 'procedure',
        },
      },
    },
    {
      id: '495a1ae2-5463-4603-8adf-96e57f18de31',
      url: '/Finder/Step-Intro/Data/StepIntroData/FilterOptions/Anti-reflux-Surgery',
      name: 'Anti-reflux Surgery',
      displayName: 'Anti-reflux Surgery',
      fields: {
        id: {
          value: 1838,
        },
        Value: {
          value: 'Anti-reflux Surgery',
        },
        Key: {
          value: 'AntiRefluxSurgery',
        },
        name: {
          value: 'Anti-reflux Surgery',
        },
        Order: {
          value: 105,
        },
        type: {
          value: 'procedure',
        },
      },
    },
    {
      id: '00df76f2-8a8a-40bc-99ba-75b247b74a83',
      url: '/Finder/Step-Intro/Data/StepIntroData/FilterOptions/Soft-tissue-Therapy-Treatments',
      name: 'Soft-tissue Therapy Treatments',
      displayName: 'Soft-tissue Therapy Treatments',
      fields: {
        id: {
          value: 119,
        },
        Value: {
          value: 'Soft-tissue Therapy Treatments',
        },
        Key: {
          value: 'SoftTissueTherapyTreatments',
        },
        name: {
          value: 'Soft-tissue Therapy Treatments',
        },
        Order: {
          value: 106,
        },
        type: {
          value: 'procedure',
        },
      },
    },
    {
      id: '0d706374-0f19-4284-8914-a52d7739c7f8',
      url: '/Finder/Step-Intro/Data/StepIntroData/FilterOptions/Tendon-Repair-Surgery',
      name: 'Tendon Repair Surgery',
      displayName: 'Tendon Repair Surgery',
      fields: {
        id: {
          value: 210,
        },
        Value: {
          value: 'Tendon Repair Surgery',
        },
        Key: {
          value: 'TendonRepairSurgery',
        },
        name: {
          value: 'Tendon Repair Surgery',
        },
        Order: {
          value: 107,
        },
        type: {
          value: 'procedure',
        },
      },
    },
    {
      id: '18937c7b-9c49-44e7-86aa-43076d9a0ce4',
      url: '/Finder/Step-Intro/Data/StepIntroData/FilterOptions/Knee-Replacement',
      name: 'Knee Replacement',
      displayName: 'Knee Replacement',
      fields: {
        id: {
          value: 1354,
        },
        Value: {
          value: 'Knee Replacement',
        },
        Key: {
          value: 'KneeReplacement',
        },
        name: {
          value: 'Knee Replacement',
        },
        Order: {
          value: 108,
        },
        type: {
          value: 'procedure',
        },
      },
    },
    {
      id: '09611714-0852-41f9-b70c-2a41ce4b9d7c',
      url: '/Finder/Step-Intro/Data/StepIntroData/FilterOptions/Coronary-Angioplasty',
      name: 'Coronary Angioplasty',
      displayName: 'Coronary Angioplasty',
      fields: {
        id: {
          value: 1100,
        },
        Value: {
          value: 'Coronary Angioplasty',
        },
        Key: {
          value: 'CoronaryAngioplasty',
        },
        name: {
          value: 'Coronary Angioplasty',
        },
        Order: {
          value: 109,
        },
        type: {
          value: 'procedure',
        },
      },
    },
  ];

  const serverSideData = useComponentProps<ServerSideProps>(
    props.rendering.uid
  );

  // console.log(serverSideData?.Insurers);
  const insurersDoctify = serverSideData?.Insurers.sort((a: any, b: any) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );
  // console.log('insurers', insurersDoctify);
  const consultantsSlugs: any = serverSideData?.LiveDiaryConsultantsSlugs;

  //console.log('consultantsSlugs', consultantsSlugs);
  console.log('consultant cards', props);
  // console.log('ss data', serverSideData);
  const { searchString, setSearchString, setKeywordId, keywordId } = useContext(
    ConsultantFinderContext
  );
  const id = props.params.RenderingIdentifier;
  const searchParams = useSearchParams();
  const router = useRouter();
  const [totalPgaes, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [checkedOptionGender, setCheckedOptionGender] = useState('');
  const [selectedInsurer, setSelectedInsurer] = useState<number>(0);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const initialOffset = router.query.offset ? Number(router.query.offset) : 0;
  const [isChecked, setIsChecked] = useState(false);
  const [checkedPractices, setCheckedPractices] = useState<string[]>([]);
  const currentPage = Math.ceil((initialOffset + 1) / 12);
  // console.log('offset query', router.query.offset);
  const [offset, setOffset] = useState(initialOffset);
  const [doctifyLoaded, setDoctifyLoaded] = useState(false);
  const cardAvailableAppointmentLoadingText: string =
    props.fields.API_C2_FirstAppointment_LoadingMsg.value;
  const [nextAptRequestToken, setNextAptRequestToken] =
    useState<CancelTokenSource | null>(null);
  const [loadingNextAppointmentText, setLoadingNextAppointmentText] = useState(
    cardAvailableAppointmentLoadingText
  );

  // if there is no search string then use default params
  // if there are then use whatever

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

  useEffect(() => {
    console.log('next apt useEffect', doctifyLoaded);
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
    console.log('reset');
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

    // Update offset and sortBy to their default values
    newQueryParams.offset = 0;
    newQueryParams.sortType = 'relevance';

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
    const defaultParams = `sortType=relevance&keywordId=2339&lat=51.5072178&lon=-0.1275862&limit=12&distance=700`;
    // daca nu avem ce trebuie atunci sa luam default
    const URLprams = searchParams.toString();
    const baseURL = `https://api.doctify.com/api/hca/search?`;
    let requestURL: string;
    // console.log('URLprams', URLprams);
    // to remove
    if (URLprams.length > 0) {
      console.log('query params');
      requestURL = `${baseURL}${URLprams}`;
    } else {
      console.log('default params');
      requestURL = `${baseURL}${defaultParams}`;
    }

    //reset the loading state before making a call to get the data,
    //will cancel outstanding slow requests for the next appointment data
    setDoctifyLoaded(false);
    setLoadingNextAppointmentText('loading...');
    axios
      .get(requestURL)
      .then((resp) => {
        console.log(resp.data);
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
        console.log('set doctify loaded true');
        setDoctifyLoaded(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, router.query]);

  if (props.fields) {
    const fields = props?.fields as any;
    return (
      <div id={id ? id : undefined}>
        <Breadcrumbs>
          <Link href="/Finder/Step-Intro">
            {fields?.Breadcrumb?.value || 'Consultant Finder'}
          </Link>
          <span>Results</span>
        </Breadcrumbs>
        {router.isReady && (
          <div>
            <ConsultantListHeader>
              <ConsultantListHeaderSearch>
                <Search
                  placeholder={
                    fields?.SearchPlaceholderText?.value ||
                    'Type in a service, condition, treatment...'
                  }
                  doctifyBaseURL={
                    (props?.fields as any)?.API_Autocomplete_BaseURL?.value ||
                    'https://api.doctify.com/api/hca/search/autocomplete?search'
                  }
                  limit={Number(fields?.API_Autocomplete_Limit?.value) || 20}
                  noResultsMsg={
                    fields?.API_Autocomplete_NoResultsMsg?.value ||
                    'No matches found, please try typing something else.'
                  }
                  specialtyLabel={
                    fields.SpecialitiesFilterHeaderText?.value || 'Specialties'
                  }
                  conditionsProceduresLabel={
                    fields.ConditionsTreatmentsFilterHeaderText?.value ||
                    'Conditions/ Procedures'
                  }
                  setKeywordId={setKeywordId}
                  searchString={searchString}
                  setSearchString={setSearchString}
                  searchIcon={
                    fields?.SearchIcon?.fields?.SvgMarkup?.value || null
                  }
                  conditionsTreatmentsList={
                    fields?.ConditionsTreatmentsList ||
                    conditionsTreatmentsListMock
                  }
                  specialitiesList={fields?.SpecialitiesList || []}
                  loadingText={
                    fields?.API_Autocomplete_LoadingMsg?.value || 'Loading...'
                  }
                />
              </ConsultantListHeaderSearch>
              <ConsultantListHeaderFilters>
                <Filters
                  filters={[
                    {
                      title: 'Locations',
                      children: (
                        <div>
                          {props?.fields?.LocationFilterOptions &&
                            props?.fields?.LocationFilterOptions.length > 0 &&
                            props?.fields?.LocationFilterOptions.map(
                              (hospital: any, index: number) => (
                                <Checkbox
                                  key={index}
                                  id={hospital?.fields?.slug?.value}
                                  value={hospital?.fields?.slug?.value}
                                  name={hospital?.fields?.doctifyName?.value}
                                  label={hospital?.fields?.doctifyName?.value}
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
                      title: 'Video Consultation',
                      children: (
                        <div>
                          <Checkbox
                            key={'video'}
                            id={'video'}
                            value={'video_consultation'}
                            name={'video'}
                            label={'Yes'}
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
                      title: 'Gender',
                      children: (
                        <div>
                          {props?.fields?.GenderFilterOptions && (
                            <RadioButtons>
                              {props?.fields?.GenderFilterOptions?.length > 0 &&
                                props?.fields?.GenderFilterOptions.map(
                                  (genderOption: any, index) => (
                                    <RadioButton
                                      key={index}
                                      label={genderOption?.name}
                                      mode="light"
                                      name="gender"
                                      value={genderOption?.fields?.Value?.value}
                                      onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                      ) => handleGenderOptions(e.target.value)}
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
                      title: 'Cover for treatment or procedure',
                      children: (
                        <div>
                          <RadioButtons>
                            <RadioButton
                              key="self-pay"
                              label={'I am paying by myself'}
                              mode="light"
                              name="insurer"
                              value="0"
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) =>
                                handleRadioButtonChange(Number(e.target.value))
                              }
                              checked={selectedInsurer === 0}
                            />
                          </RadioButtons>
                          <Container
                            marginTop="spacing-2"
                            marginBottom="spacing-2"
                          >
                            <Text tag="h3" variation="body-bold-extra-large">
                              Insurers available
                            </Text>
                          </Container>
                          {insurersDoctify && (
                            <RadioButtons>
                              {insurersDoctify?.length > 0 &&
                                insurersDoctify.map((insurer: any) => (
                                  <RadioButton
                                    key={insurer.id}
                                    label={capitalizeFirstLetter(insurer.name)}
                                    mode="light"
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
                      title: 'Languages',
                      children: (
                        <div>
                          {props?.fields?.LanguageFilterOptions &&
                            props?.fields?.LanguageFilterOptions?.length >
                              0 && (
                              <select
                                title="language selection"
                                name="language"
                                value={selectedLanguage}
                                onChange={handleLanguageChange}
                              >
                                <option value="">Please select language</option>
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
                <Container marginLeft="spacing-4">
                  <Sorting
                    options={[
                      {
                        id: 'relevance',
                        defaultChecked: router.query.sortType === 'relevance',
                        labelText: 'Most relevant',
                        value: 'relevance',
                      },
                      {
                        id: 'rating',
                        defaultChecked: router.query.sortType === 'rating',
                        labelText: 'Highest rated by patients',
                        value: 'rating',
                      },
                      {
                        id: 'nearest',
                        defaultChecked: router.query.sortType === 'nearest',
                        labelText: 'Nearest',
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
                </Container>
                <Container marginLeft="spacing-4">
                  <TextButton theme="dark">
                    <button onClick={handleResetFilters}>
                      Reset all
                      <Icons iconName="iconReset" />
                    </button>
                  </TextButton>
                </Container>
              </ConsultantListHeaderFilters>
            </ConsultantListHeader>
            <ConsultantListHeaderTtitle>
              <Text tag="h5" variation="display-5">
                {`Let's get you to the right specialist`}
              </Text>
            </ConsultantListHeaderTtitle>

            {loading && (
              <div>
                Loading....
                <Loader theme={'light'} />
              </div>
            )}
            {!loading && !error && results.length === 0 && (
              <div>No results</div>
            )}
            {/* sa vad daca au online sau nu */}

            {/* sa mut logica  */}
            <ConsultantFinderResults>
              {!loading &&
                !error &&
                results.length > 0 &&
                results.map((consultant: any) => (
                  <ConsultantCard
                    key={consultant?.id}
                    // placeholder
                    profilePhoto={
                      consultant?.images?.logo ||
                      props?.fields?.ProfileImagePlaceholderImage?.value?.src ||
                      null
                    }
                    name={`${consultant?.firstName} ${consultant?.lastName}`}
                    slug={consultant?.slug}
                    keywords={consultant?.keywords || null}
                    hospitals={consultant?.practices || null}
                    reviewsCount={consultant?.overallExperience || 0}
                    doctifyLogo={
                      <JssImage field={props.fields.DoctifyLogoImage} />
                    }
                    hideAppointmentRequest={consultant?.hideAppointmentRequest}
                    consultantsSlugs={consultantsSlugs}
                    isLiveDiaryConsultant={consultant?.isLiveDiaryConsultant}
                    firstAppointment={consultant?.firstAppointment}
                    nextAppointmentTitle="Next appointment on"
                    loadingNextAppointmentText={loadingNextAppointmentText}
                  />
                ))}
            </ConsultantFinderResults>

            {error && !loading && (
              <div>There was an error, Please try again</div>
            )}

            {!error && !loading && totalPgaes > 1 && results.length > 0 && (
              <Themes theme={'A-HCA-White'}>
                <Pagination
                  pageCount={totalPgaes}
                  callback={(newPage: number) => {
                    // console.log(newPage);

                    const offset = (newPage - 1) * 12;
                    setOffset(offset);
                    // console.log('offset: ', offset);

                    // Update the URL query parameters
                    const { requestPath, ...queryParams } = router.query; // Exclude requestPath
                    router.push(
                      {
                        pathname: router.pathname,
                        query: { ...queryParams, offset: offset },
                      },
                      undefined,
                      { shallow: true }
                    );
                  }}
                  currentPage={currentPage}
                />
              </Themes>
            )}
          </div>
        )}
      </div>
    );
  }

  return <StepDefaultComponent {...props} />;
};
