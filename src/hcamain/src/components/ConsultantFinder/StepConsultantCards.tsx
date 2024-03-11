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
import Button from '@component-library/core-components/Button/Button';
import Text from '@component-library/foundation/Text/Text';
import ConsultantCard from '@component-library/consultant-finder/ConsultantCard/ConsultantCard';
import CardGrid from '@component-library/site-components/CardGrid/CardGrid';
import Pagination from '@component-library/core-components/Pagination/Pagination';
import axios from 'axios';
import { ConsultantFinderContext } from 'src/context/consultantFinderContext';
import Themes from '@component-library/foundation/Themes/Themes';
import Checkbox from '@component-library/core-components/Checkbox/Checkbox';
import Filters from '@component-library/site-components/Filters/Filters';
import Search from '@component-library/consultant-finder/Search/Search';
import Tooltips from '@component-library/components/Tooltips/Tooltips';
import Sorting from '@component-library/components/Sorting/Sorting';
import ConsultantFinderResults from '@component-library/consultant-finder/ConsultantFinderResults/ConsultantFinderResults';
import Loader from '@component-library/foundation/Loader/Loader';
import Breadcrumbs from '@component-library/site-components/Breadcrumbs/Breadcrumbs';
import { getActiveConsultantSlugs } from 'lib/consultant-finder/API_HCA';
// import { getFacilitiesData } from 'lib/consultant-finder/API_Doctify';

interface Fields {
  // from the Specific component data template e.g. /sitecore/templates/Project/HCA/Consultant finder/StepSPECIFIC

  // add specific fields defined in the data template here...
  EnquireNowLink: LinkField;
  BookOnlineLink: LinkField;
  ViewProfileLink: LinkField;
  BackFromAdvSearchLink: LinkField;
  BackFromQuickSearchLink: LinkField;

  // from the StepCommon template e.g. /sitecore/templates/Project/HCA/Consultant finder/StepCommon
  TitleText: Field<string>;
  CardImage: ImageField;

  StartLink: LinkField;
  NextLink: LinkField;
  BackLink: LinkField;
}

type StepProps = {
  rendering: ComponentRendering;
  params: { [key: string]: string };
  fields: Fields;
};
interface ServerSideProps {
  HCAFacilities: any;
  Insurers: any;
  PopularLanguages: any;
  LiveDiaryConsultantsSlugs: object[];
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
  // get filters data
  const topLevelHospitalsURL = `https://www.hcahealthcare.co.uk/lookupApi/finder/default/findbytype/hospitals/TopLevelHospital`;
  const languages = [
    {
      UniqueKey: 'Language.English',
      Key: 'English',
      Type: 'Language',
      Value: 'English',
      Order: 1,
      Values: {
        Value: 'English',
        Order: '1',
        id: '114',
        name: 'english',
        isoCode: 'en',
      },
    },
    {
      UniqueKey: 'Language.Arabic',
      Key: 'Arabic',
      Type: 'Language',
      Value: 'Arabic',
      Order: 2,
      Values: {
        Value: 'Arabic',
        Order: '2',
        id: '113',
        name: 'arabic',
        isoCode: 'ar',
      },
    },
    {
      UniqueKey: 'Language.French',
      Key: 'French',
      Type: 'Language',
      Value: 'French',
      Order: 3,
      Values: {
        Value: 'French',
        Order: '3',
        id: '106',
        name: 'french',
        isoCode: 'fr',
      },
    },
    {
      UniqueKey: 'Language.Italian',
      Key: 'Italian',
      Type: 'Language',
      Value: 'Italian',
      Order: 4,
      Values: {
        Value: 'Italian',
        Order: '4',
        id: '101',
        name: 'italian',
        isoCode: 'it',
      },
    },
    {
      UniqueKey: 'Language.Hindi',
      Key: 'Hindi',
      Type: 'Language',
      Value: 'Hindi',
      Order: 5,
      Values: {
        Value: 'Hindi',
        Order: '5',
        id: '56',
        name: 'hindi',
        isoCode: 'hi',
      },
    },
    {
      UniqueKey: 'Language.Punjabi',
      Key: 'Punjabi',
      Type: 'Language',
      Value: 'Punjabi',
      Order: 6,
      Values: {
        Value: 'Punjabi',
        Order: '6',
        id: '104',
        name: 'punjabi',
        isoCode: 'pa',
      },
    },
    {
      UniqueKey: 'Language.Urdu',
      Key: 'Urdu',
      Type: 'Language',
      Value: 'Urdu',
      Order: 7,
      Values: {
        Value: 'Urdu',
        Order: '7',
        id: '105',
        name: 'urdu',
        isoCode: 'ur',
      },
    },
    {
      UniqueKey: 'Language.Gujarati',
      Key: 'Gujarati',
      Type: 'Language',
      Value: 'Gujarati',
      Order: 8,
      Values: {
        Value: 'Gujarati',
        Order: '8',
        id: '102',
        name: 'gujarati',
        isoCode: 'gu',
      },
    },
    {
      UniqueKey: 'Language.Greek',
      Key: 'Greek',
      Type: 'Language',
      Value: 'Greek',
      Order: 9,
      Values: {
        Value: 'Greek',
        Order: '9',
        id: '52',
        name: 'greek',
        isoCode: 'el',
      },
    },
    {
      UniqueKey: 'Language.Spanish',
      Key: 'Spanish',
      Type: 'Language',
      Value: 'Spanish',
      Order: 10,
      Values: {
        Value: 'Spanish',
        Order: '10',
        id: '109',
        name: 'spanish',
        isoCode: 'es',
      },
    },
  ];
  const insurersURL = `https://api.doctify.com/api/hca/listing/insurers`;
  const liveDiariesSlugURL =
    'https://www.hcahealthcare.co.uk/lookupApi/finder/default/findbydictionary/ldbConsultants';

  const getData = async (requestURL: string) => {
    const res = await fetch(requestURL, {
      cache: 'force-cache',
      next: { revalidate: 3600 },
    });

    let data: any = '';
    try {
      if (res.ok) {
        data = await res.json();
      } else {
        data = {
          errorCode: res.status,
          errorText: res.statusText,
        };
        console.warn(
          `Request failed with error ${data.errorCode}: ${data.errorText}`
        );
      }
    } catch (e) {
      const errorObj = {
        errorCode: 999,
        errorText: 'An unexpected error occurred. Please retry.',
      };
      data = errorObj;
      console.warn(`Request failed with exception: ${e}`);
    }

    return data;
  };

  const hcaFacilities = await getData(topLevelHospitalsURL);
  const insurers = await getData(insurersURL);
  const consultantsSlugsLD = await getData(liveDiariesSlugURL);

  const returnProps: ServerSideProps = {
    HCAFacilities: hcaFacilities,
    Insurers: insurers,
    PopularLanguages: languages,
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
  const consultantsSlugs: any = serverSideData?.LiveDiaryConsultantsSlugs.map(
    (item: any) => item.UniqueKey
  );
  console.log('consultantsSlugs', consultantsSlugs);
  console.log('consultant cards', props);
  console.log('ss data', serverSideData);
  const { searchString, setSearchString, setKeywordId, keywordId } = useContext(
    ConsultantFinderContext
  );
  const id = props.params.RenderingIdentifier;
  const searchParams = useSearchParams();
  const router = useRouter();
  const [totalPgaes, setTotalPages] = useState(0);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const initialOffset = router.query.offset ? Number(router.query.offset) : 0;
  // console.log('offset query', router.query.offset);
  const [offset, setOffset] = useState(initialOffset);
  const [isChecked, setIsChecked] = useState(false);
  console.log('queryParams', searchParams.toString());

  const [checkedPractices, setCheckedPractices] = useState<string[]>([]);

  const currentPage = Math.ceil((initialOffset + 1) / 12);
  // console.log('current page', currentPage);

  const topHospitalsList = serverSideData?.HCAFacilities.map(
    (item: any) => item.Values
  );

  const [relevance, setRelevance] = useState('');

  // if there is no search string then use default params
  // if there are then use whatever

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const practice = event.target.value;
    const isChecked = event.target.checked;

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
    if (practices.length > 0) {
      queryParams.practice = practices.join(',');
    }
    router.push({ pathname: router.pathname, query: queryParams });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

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

    if (videoPractice) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }

    // console.log('relevance', router.query.relevance);

    // console.log('call api');

    setLoading(true);
    //  console.log('queryParams', searchParams.toString());

    // sortType=relevance&keywordId=2339&lat=51.5072178&lon=-0.1275862&distance=700
    // .get(`https://api.doctify.com/api/hca/search?${searchParams.toString()}`)
    const defaultParams = `sortType=relevance&keywordId=2339&lat=51.5072178&lon=-0.1275862&distance=700`;
    // daca nu avem ce trebuie atunci sa luam default

    axios
      .get(`https://api.doctify.com/api/hca/search?${searchParams.toString()}`)
      .then((resp) => {
        console.log(resp.data);
        const totalPages = Math.ceil(resp.data.total / 12);
        // console.log('total pages', totalPages);
        setTotalPages(totalPages);
        if (resp.data.rows.length > 0) {
          setResults(resp.data.rows);
        } else {
          setResults([]);
        }
        setLoading(false);
        setError(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setError(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  if (props.fields) {
    return (
      <div
        className={`component promo ${props.params.styles}`}
        id={id ? id : undefined}
      >
        <Breadcrumbs>
          <Link href="/Finder/Step-Intro">
            {props?.fields?.Breadcrumb?.value || 'Consultant Finder'}
          </Link>
          <span>Results</span>
        </Breadcrumbs>
        <div>
          <Search
            placeholder={
              props?.fields?.SearchPlaceholderText?.value ||
              'Type in a service, condition, treatment...'
            }
            doctifyBaseURL={
              props?.fields?.API_Autocomplete_BaseURL?.value ||
              'https://api.doctify.com/api/hca/search/autocomplete?search'
            }
            limit={Number(props?.fields?.API_Autocomplete_Limit?.value) || 20}
            noResultsMsg={
              props?.fields?.API_Autocomplete_NoResultsMsg?.value ||
              'No matches found, please try typing something else.'
            }
            specialtyLabel={
              props?.fields?.SpecialitiesFilterHeaderText?.value ||
              'Specialties'
            }
            conditionsProceduresLabel={
              props?.fields?.ConditionsTreatmentsFilterHeaderText?.value ||
              'Conditions/ Procedures'
            }
            setKeywordId={setKeywordId}
            searchString={searchString}
            setSearchString={setSearchString}
            searchIcon={
              props?.fields?.SearchIcon?.fields?.SvgMarkup?.value || null
            }
            conditionsTreatmentsList={
              props?.fields?.ConditionsTreatmentsList ||
              conditionsTreatmentsListMock
            }
            specialitiesList={props?.fields?.SpecialitiesList || []}
            loadingText={
              props?.fields?.API_Autocomplete_LoadingMsg?.value || 'Loading...'
            }
          />
        </div>
        <div>
          <Filters
            filters={[
              {
                title: 'Locations',
                children: (
                  <div>
                    {topHospitalsList.length > 0 &&
                      topHospitalsList.map((hospital: any, index: number) => (
                        <Checkbox
                          key={index}
                          id={hospital?.slug}
                          value={hospital?.slug}
                          name={hospital?.doctifyName}
                          label={hospital?.doctifyName}
                          checked={checkedPractices.includes(hospital?.slug)}
                          onChange={handleCheckboxChange}
                        ></Checkbox>
                      ))}
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
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const target = e.target;
                        setIsChecked(target.checked);

                        const queryParams = { ...router.query };
                        if (target.checked) {
                          queryParams.videoConsultation = 'true';
                        } else {
                          delete queryParams.videoConsultation;
                        }
                        router.push({
                          pathname: router.pathname,
                          query: queryParams,
                        });
                      }}
                    ></Checkbox>
                  </div>
                ),
              },
            ]}
            resultsCount={0}
          ></Filters>
        </div>
        <div>
          {router.query.sortType && (
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
              onChange={(event) => {
                const target = event.target as HTMLInputElement;
                // console.log(target.value);
                // console.log(target.checked);

                if (target.checked) {
                  // Update URL parameters with selected sorting option
                  const queryParams = {
                    ...router.query,
                    sortType: target.value,
                  };
                  if ('requestPath' in queryParams) {
                    delete queryParams.requestPath;
                  }
                  router.push({
                    pathname: router.pathname,
                    query: queryParams,
                  });
                }
              }}
            />
          )}
        </div>

        {loading && (
          <div>
            Loading....
            <Loader theme={'light'} />
          </div>
        )}
        {!loading && !error && results.length === 0 && <div>No results</div>}
        {/* sa vad daca au online sau nu */}
        <ConsultantFinderResults>
          {!loading &&
            !error &&
            results.length > 0 &&
            results.map((consultant: any) => (
              <ConsultantCard
                key={consultant?.id}
                // placeholder
                profilePhoto={consultant?.images?.logo}
                name={`${consultant?.firstName} ${consultant?.lastName}`}
                slug={consultant?.slug}
                keywords={consultant?.keywords || null}
                hospitals={consultant?.practices || null}
                reviewsCount={consultant?.overallExperience || 0}
                hideAppointmentRequest={consultant?.hideAppointmentRequest}
                consultantsSlugs={consultantsSlugs}
              />
            ))}
        </ConsultantFinderResults>

        {error && !loading && <div>There was an error, Please try again</div>}

        {!error && !loading && totalPgaes > 1 && (
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
    );
  }

  return <StepDefaultComponent {...props} />;
};
