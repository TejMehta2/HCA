/* eslint-disable */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ConsultantFinderContext } from '@component-library/context/consultantFinderContext';

import {
  Image as JssImage,
  RichText as JssRichText,
  ImageField,
  Field,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SearchAll from '@component-library/consultant-finder/Search/SearchAll';
import Button from '@component-library/core-components/Button/Button';
import Text from '@component-library/foundation/Text/Text';
import Icons from '@component-library/foundation/Icons/Icons';
import TextButton from '@component-library/core-components/TextButton/TextButton';
import Container from '@component-library/foundation/Containers/Container';
import StepIntro from '@component-library/consultant-finder/StepIntro/StepIntro';
import SearchLocation from '@component-library/consultant-finder/Search/SearchLocation';
import FunctionalCookiesBox from '@component-library/consultant-finder/FunctionalCookiesBox/FunctionalCookiesBox';
import PopularSearchesBox from '@component-library/consultant-finder/PopularSearchesBox/PopularSearchesBox';
import Themes from 'temp/component-library/foundation/Themes/Themes';

interface Fields {
  QuickSearchLink: LinkField;
  AdvancedSearchLink: LinkField;
  SearchByConsultantLink: LinkField;
  API_Autocomplete_BaseURL: Field<string>;
  API_Autocomplete_Limit: Field<string>;
  API_Autocomplete_LoadingMsg: Field<string>;
  SearchPlaceholderText: Field<string>;
  API_Autocomplete_NoResultsMsg: Field<string>;
  ConditionsTreatmentsFilterHeaderText: Field<string>;
  SpecialitiesFilterHeaderText: Field<string>;
  SpecialistsFilterHeaderText: Field<string>;
  HeadingText: Field<string>;
  FindConsultantHeaderText: Field<string>;
  TitleText: Field<string>;
  CardImage: ImageField;
  BodyText: Field<string>;
  StartLink: LinkField;
  NextLink: LinkField;
  BackLink: LinkField;
  SearchIcon: any;
  ConditionsTreatmentsList: any;
  PopularConsultantsList: any;
  SpecialitiesList: any;
}

type StepProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const StepDefaultComponent = (props: StepProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Consultant Finder Step</span>
    </div>
  </div>
);

export const Default = (props: StepProps): JSX.Element => {
  const router = useRouter();
  const id = props.params.RenderingIdentifier;
  const { searchString, setSearchString, setKeywordId, keywordId, searchStringLocations, setSearchStringLocations } = useContext(
    ConsultantFinderContext
  );
  const [location, setLocation] = useState('London');

  // const [location, setLocation] = useState<string>("London");
  const [hydrated, setHydrated] = useState(false);
  const [hasFunctionalConsentCookie, setFunctionalConsentCookie] = useState(false);
  const [searchConsultant, setSearchConsultant] = useState(false);


  const popularSearch = [
    {
      "id": "776af934-062e-47ca-b015-6b9e63e2920c",
      "url": "/finder/data/popularsearchesconsultants/mr-andrew-goldberg",
      "name": "mr-andrew-goldberg",
      "displayName": "mr-andrew-goldberg",
      "fields": {
        "firstName": {
          "value": "Andrew"
        },
        "id": {
          "value": 6254
        },
        "lastName": {
          "value": "Goldberg OBE"
        },
        "slug": {
          "value": "mr-andrew-goldberg"
        },
        "specialty": {
          "value": "Orthopaedic Surgery"
        },
        "suffix": {
          "value": "MD MBBS FRCS FRCSI FRCS(Tr&Orth)"
        },
        "title": {
          "value": "Mr"
        },
        "Key": {
          "value": "mr-andrew-goldberg"
        },
        "Order": {
          "value": 1
        },
        "Type": {
          "value": "Consultant"
        },
        "Value": {
          "value": "Mr Andrew Goldberg OBE"
        }
      }
    },
    {
      "id": "27ddeea3-0636-4332-9541-07b4c9f740c5",
      "url": "/finder/data/popularsearchesconsultants/mr-sam-singh",
      "name": "mr-sam-singh",
      "displayName": "mr-sam-singh",
      "fields": {
        "firstName": {
          "value": "Sam"
        },
        "id": {
          "value": 7384
        },
        "lastName": {
          "value": "Singh"
        },
        "slug": {
          "value": "mr-sam-singh"
        },
        "specialty": {
          "value": "Orthopaedic Surgery"
        },
        "suffix": {
          "value": "MA MRCS FRCS(Orth)"
        },
        "title": {
          "value": "Mr"
        },
        "Key": {
          "value": "mr-sam-singh"
        },
        "Order": {
          "value": 2
        },
        "Type": {
          "value": "Consultant"
        },
        "Value": {
          "value": "Mr Sam Singh"
        }
      }
    },
    {
      "id": "53ce99ec-f8e2-4672-afcf-6b47191b957f",
      "url": "/finder/data/popularsearchesconsultants/mr-christian-brown",
      "name": "mr-christian-brown",
      "displayName": "mr-christian-brown",
      "fields": {
        "firstName": {
          "value": "Christian"
        },
        "id": {
          "value": 262
        },
        "lastName": {
          "value": "Brown"
        },
        "slug": {
          "value": "mr-christian-brown"
        },
        "specialty": {
          "value": "Urology"
        },
        "suffix": {
          "value": "BSc MD FRCS (Urol)"
        },
        "title": {
          "value": "Mr"
        },
        "Key": {
          "value": "mr-christian-brown"
        },
        "Order": {
          "value": 3
        },
        "Type": {
          "value": "Consultant"
        },
        "Value": {
          "value": "Mr Christian Brown"
        }
      }
    },
    {
      "id": "c812cbe2-ad49-4ba3-bd5e-d9d8a5434844",
      "url": "/finder/data/popularsearchesconsultants/dr-ajai-seth",
      "name": "dr-ajai-seth",
      "displayName": "dr-ajai-seth",
      "fields": {
        "firstName": {
          "value": "Ajai"
        },
        "id": {
          "value": 2988
        },
        "lastName": {
          "value": "Seth"
        },
        "slug": {
          "value": "dr-ajai-seth"
        },
        "specialty": {
          "value": "Sports & Exercise Medicine"
        },
        "suffix": {
          "value": "MBBS BSc MSc MRCS MRCGP FFSEM"
        },
        "title": {
          "value": "Dr"
        },
        "Key": {
          "value": "dr-ajai-seth"
        },
        "Order": {
          "value": 4
        },
        "Type": {
          "value": "Consultant"
        },
        "Value": {
          "value": "Dr Ajai Seth"
        }
      }
    },
    {
      "id": "7ea6a97e-8544-4895-8a33-f94e9ae14be9",
      "url": "/finder/data/popularsearchesconsultants/dr-nisith-sheth",
      "name": "dr-nisith-sheth",
      "displayName": "dr-nisith-sheth",
      "fields": {
        "firstName": {
          "value": "Nisith"
        },
        "id": {
          "value": 3870
        },
        "lastName": {
          "value": "Sheth"
        },
        "slug": {
          "value": "dr-nisith-sheth"
        },
        "specialty": {
          "value": "Dermatology"
        },
        "suffix": {
          "value": "MBBS, FRCP(UK), CCST(Derm)"
        },
        "title": {
          "value": "Dr"
        },
        "Key": {
          "value": "dr-nisith-sheth"
        },
        "Order": {
          "value": 5
        },
        "Type": {
          "value": "Consultant"
        },
        "Value": {
          "value": "Dr Nisith Sheth"
        }
      }
    }
  ]

  const mappedDoctors = popularSearch.map(item => ({
    id: item.fields.id.value,
    firstName: item.fields.firstName.value,
    lastName: item.fields.lastName.value,
    slug: item.fields.slug.value
  }));

  console.log('mappedDoctors', mappedDoctors);

  const hasFunctionalConsent = () => {
    const groups = (window as any).OnetrustActiveGroups || "";
    return groups.includes("C0003");
  };

  const readCookie = (name: string) => {
    const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return m ? decodeURIComponent(m[1]) : null;
  };

  const setLocationCookie = (value: string) => {
    document.cookie = `location=${encodeURIComponent(value)}; path=/; max-age=31536000; SameSite=Lax`;
  };

  const deleteLocationCookie = () => {
    document.cookie = "location=; path=/; max-age=0; SameSite=Lax";
    document.cookie = "location=; max-age=0; SameSite=Lax";
  };

  // 1) Hydrate location from cookie (once)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const init = () => {
      if (!hasFunctionalConsent()) {
        deleteLocationCookie(); // optional
        setHydrated(true);
        setFunctionalConsentCookie(false);
        return;
      }

      const saved = readCookie("location");
      if (saved) setLocation(saved);
      console.log('saved', saved);
      setFunctionalConsentCookie(true);
      setSearchStringLocations(saved || 'Anywhere');
      setHydrated(true);
    };

    init();
    window.addEventListener("OneTrustGroupsUpdated", init);
    return () => window.removeEventListener("OneTrustGroupsUpdated", init);
  }, []);

  // 2) Persist whenever location changes (only after hydration + only if consent)
  useEffect(() => {
    if (!hydrated) return;
    if (typeof window === "undefined") return;
    if (!hasFunctionalConsent()) return;

    setLocationCookie(searchStringLocations);
  }, [searchStringLocations, hydrated]);

  // 3) If consent revoked later, delete the cookie
  useEffect(() => {
    if (typeof window === "undefined") return;

    const onConsentChange = () => {
      if (!hasFunctionalConsent()) {
        deleteLocationCookie();
        setFunctionalConsentCookie(false);
      }

      if (hasFunctionalConsent()) {
        console.log('location', location);
        setLocationCookie(location);
        setFunctionalConsentCookie(true);
      }
    };

    window.addEventListener("OneTrustGroupsUpdated", onConsentChange);
    return () => window.removeEventListener("OneTrustGroupsUpdated", onConsentChange);
  }, []);

  const handleClickQuickSearch = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    const baseURLResults = props?.fields?.QuickSearchLink?.value?.href;

    // to do MH
    const locationConfig: Record<string, { lat: number; lon: number; distance: number }> = {
      Anywhere: {
        lat: 51.507217,
        lon: -0.1275862,
        distance: 0
      },
      London: {
        lat: 51.507217,
        lon: -0.1275862,
        distance: 0
      },
      Manchester: {
        lat: 53.480759,
        lon: -2.242631,
        distance: 30
      },
      Birmingham: {
        lat: 52.486244,
        lon: -1.890401,
        distance: 30
      },
    };

    const selectedLocation = searchStringLocations ?? "London";

    const { lat, lon, distance } =
      locationConfig[selectedLocation] || locationConfig.London;

    router.push(
      `${baseURLResults}?search=${searchString}` +
      `&keywordId=${keywordId}` +
      `&sortType=relevance` +
      `&lat=${lat}` +
      `&lon=${lon}` +
      `&distance=${distance}` +
      `&limit=12` +
      `&offset=0`
    );
  };

  // to do MH
  const popularSearches = [
    { label: "Cardiology", href: "#" },
    { label: "Dermatology", href: "#" },
    { label: "Knee pain", href: "#" },
    { label: "MRI scan", href: "#" },
    { label: "Private GP", href: "#" },
  ];


  const handleClickAdvanceSearch = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    router.push({
      pathname: props.fields.AdvancedSearchLink.value.href,
      query: { keywordId: keywordId, searchString: searchString },
    });
  };

  if (props.fields) {
    return (
      <div id={id ? id : undefined}>
        <a href="javascript:OneTrust.ToggleInfoDisplay()">Activate functional cookies</a>
        <StepIntro
          headline={
            <><Text tag="h2" variation="subheading-1">
              {/* // to do MH */}
              {'Over 1,250 consultants across the UK'}
            </Text><Text tag="h1" variation="display-1">
                {/* // to do MH */}
                {'Find a consultant'}
              </Text><Text tag="p" variation="body-large">
                {/* // to do MH */}
                {'Search by consultant name, specialty, or condition — we’ll help you find the right specialist quickly.'}
              </Text></>
          }
          search={
            <><SearchAll
              placeholder={props?.fields?.SearchPlaceholderText?.value ||
                'Type in a service, condition, treatment...'}
              doctifyBaseURL={props?.fields?.API_Autocomplete_BaseURL?.value ||
                'https://api.doctify.com/api/hca/search/autocomplete?search'}
              limit={Number(props?.fields?.API_Autocomplete_Limit?.value) || 20}
              noResultsMsg={props?.fields?.API_Autocomplete_NoResultsMsg?.value ||
                'No matches found, please try typing something else.'}
              specialistsLabel={props?.fields?.SpecialistsFilterHeaderText?.value ||
                'Specialists'}
              specialtyLabel={props?.fields?.SpecialitiesFilterHeaderText?.value ||
                'Specialties'}
              conditionsProceduresLabel={props?.fields?.ConditionsTreatmentsFilterHeaderText?.value ||
                'Conditions/ Procedures'}
              setKeywordId={setKeywordId}
              searchString={searchString}
              setSearchString={setSearchString}
              searchIcon={props?.fields?.SearchIcon?.fields?.SvgMarkup?.value || null}
              conditionsTreatmentsList={props?.fields?.ConditionsTreatmentsList || []}
              specialistsList={mappedDoctors}
              specialitiesList={props?.fields?.SpecialitiesList || []}
              popularConsultantsList={props?.fields?.PopularConsultantsList || []}
              loadingText={props?.fields?.API_Autocomplete_LoadingMsg?.value ||
                'Loading...'} />
              <SearchLocation
                isStepIntro={true}
                placeholder={props?.fields?.SearchPlaceholderText?.value ||
                  'Type in a service, condition, treatment...'}
                doctifyBaseURL={props?.fields?.API_Autocomplete_BaseURL?.value ||
                  'https://api.doctify.com/api/hca/search/autocomplete?search'}
                limit={Number(props?.fields?.API_Autocomplete_Limit?.value) || 20}
                noResultsMsg={props?.fields?.API_Autocomplete_NoResultsMsg?.value ||
                  'No matches found, please try typing something else.'}
                specialistsLabel={props?.fields?.SpecialistsFilterHeaderText?.value ||
                  'Specialists'}
                specialtyLabel={props?.fields?.SpecialitiesFilterHeaderText?.value ||
                  'Specialties'}
                conditionsProceduresLabel={props?.fields?.ConditionsTreatmentsFilterHeaderText?.value ||
                  'Conditions/ Procedures'}
                setKeywordId={setKeywordId}
                searchString={searchStringLocations}
                setSearchString={setSearchStringLocations}
                searchIcon={props?.fields?.SearchIcon?.fields?.SvgMarkup?.value || null}
                conditionsTreatmentsList={props?.fields?.ConditionsTreatmentsList || []}
                specialistsList={mappedDoctors}
                specialitiesList={props?.fields?.SpecialitiesList || []}
                popularConsultantsList={props?.fields?.PopularConsultantsList || []}
                loadingText={props?.fields?.API_Autocomplete_LoadingMsg?.value ||
                  'Loading...'} />
            </>
          }
          buttons={
            <>
              <Themes theme={'A-HCA-White'}>

                <Button
                  size={'small'}
                  variation={'full-light'}
                  contentVariation="full-width"
                >
                  <button
                    disabled={keywordId === 0 ? true : false}
                    onClick={handleClickQuickSearch}
                  >
                    <Icons iconName="iconSearch" />
                    <span>{props.fields.QuickSearchLink.value.text}</span>
                  </button>
                </Button>
              </Themes>
              <Button
                size={'small'}
                variation={'outline-light'}
                contentVariation="full-width"
              >
                <button
                  disabled={keywordId === 0 ? true : false}
                  onClick={handleClickAdvanceSearch}
                >
                  <Icons iconName="iconAdvanced" />
                  <span>{props.fields.AdvancedSearchLink.value.text}</span>
                </button>
              </Button></>
          }
          popularSearch={
            <PopularSearchesBox
              popularSearches={popularSearches}
              // to do MH
              popularSearchesTtitle={'Popular searches'}
            ></PopularSearchesBox>
          }
        >
          {
            !hasFunctionalConsentCookie &&
            <FunctionalCookiesBox></FunctionalCookiesBox>
          }
        </StepIntro>
      </div>
    );
  }

  return <StepDefaultComponent {...props} />;
};
