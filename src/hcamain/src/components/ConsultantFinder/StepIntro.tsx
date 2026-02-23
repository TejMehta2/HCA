/* eslint-disable */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ConsultantFinderContext } from '@component-library/context/consultantFinderContext';

import {
  ImageField,
  Field,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import SearchAll from '@component-library/consultant-finder/Search/SearchAll';
import Button from '@component-library/core-components/Button/Button';
import Text from '@component-library/foundation/Text/Text';
import Icons from '@component-library/foundation/Icons/Icons';
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
  Heading2Text: Field<string>;
  Heading3Text: Field<string>;
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
  PopularSearchesTitle: Field<string>;
  PopularSearchesList: any;
  LocationsList: any;
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
  const {
    searchString,
    setSearchString,
    setKeywordId,
    keywordId,
    searchStringLocations,
    setSearchStringLocations,
    selectedLocationConsultants,
    setSelectedLocationConsultants
  } = useContext(ConsultantFinderContext);
  const [location, setLocation] = useState('London');
  const [hydrated, setHydrated] = useState(false);
  const [hasFunctionalConsentCookie, setFunctionalConsentCookie] =
    useState(false);

  const popularSearch = props?.fields?.PopularConsultantsList;

  const mappedDoctors = popularSearch.map(
    (item: {
      fields: {
        id: { value: any };
        firstName: { value: any };
        lastName: { value: any };
        slug: { value: any };
      };
    }) => ({
      id: item.fields.id.value,
      firstName: item.fields.firstName.value,
      lastName: item.fields.lastName.value,
      slug: item.fields.slug.value,
    })
  );

  const locations = props?.fields?.LocationsList || [];
  const locationConfig = locations.map(
    (item: any) => (
      {
        name: item.fields.name.value,
        distance: item.fields.distance.value,
        lat: item.fields.lat.value,
        lon: item.fields.lon.value,
      })
  );

  const selectedLocation = selectedLocationConsultants ?? 'Anywhere';

  const selectedLocationConfig =
    locationConfig.find(
      (loc: { name: string; }) => loc.name === selectedLocation
    ) ||
    locationConfig.find(
      (loc: { name: string; }) => loc.name === 'Anywhere'
    );

  const { lat, lon, distance } = selectedLocationConfig ?? {};
  console.log('locations', locations);
  console.log('locationConfig', locationConfig);
  console.log(lat, lon, distance);

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

  // 1) Hydrate location from cookie (once)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const init = () => {
      if (!hasFunctionalConsent()) {
        deleteLocationCookie(); // optional
        setHydrated(true);
        setFunctionalConsentCookie(false);
        return;
      }

      const saved = readCookie('location');
      if (saved) setLocation(saved);
      setFunctionalConsentCookie(true);
      setSelectedLocationConsultants(saved || 'Anywhere');
      setSearchStringLocations(saved || 'Anywhere');
      setHydrated(true);
    };

    init();
    window.addEventListener('OneTrustGroupsUpdated', init);
    return () => window.removeEventListener('OneTrustGroupsUpdated', init);
  }, []);

  // 2) Persist whenever location changes (only after hydration + only if consent)
  useEffect(() => {
    if (!hydrated) return;
    if (typeof window === 'undefined') return;
    if (!hasFunctionalConsent()) return;

    setLocationCookie(searchStringLocations);
  }, [searchStringLocations, hydrated]);

  // 3) If consent revoked later, delete the cookie
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const onConsentChange = () => {
      if (!hasFunctionalConsent()) {
        deleteLocationCookie();
        setFunctionalConsentCookie(false);
      }

      if (hasFunctionalConsent()) {
        setLocationCookie(location);
        setFunctionalConsentCookie(true);
      }
    };

    window.addEventListener('OneTrustGroupsUpdated', onConsentChange);
    return () =>
      window.removeEventListener('OneTrustGroupsUpdated', onConsentChange);
  }, []);



  const handleClickQuickSearch = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    const baseURLResults = props?.fields?.QuickSearchLink?.value?.href;
    // const locations = props?.fields?.LocationsList || [];
    // const locationConfig = locations.map(
    //   (item: {
    //     fields: {
    //       name: { value: any };
    //       distance: { value: any };
    //       lat: { value: any };
    //       lon: { value: any };
    //     };
    //   }) => ({
    //     [item.fields.name.value]: {
    //       distance: item.fields.distance.value,
    //       lat: item.fields.lat.value,
    //       lon: item.fields.lon.value,
    //     },
    //   })
    // );
    // const selectedLocation = searchStringLocations ?? 'London';

    // const { lat, lon, distance } =
    //   locationConfig[selectedLocation] || locationConfig.London;

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

  const popularSearchData = props?.fields?.PopularSearchesList || [];
  const popularSearches = popularSearchData.map(
    (item: { fields: { name: { value: any }; HRef: { value: any } } }) => ({
      label: item.fields.name.value,
      href: item.fields.HRef.value,
    })
  );

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
        <a href="javascript:OneTrust.ToggleInfoDisplay()">
          Activate functional cookies
        </a>
        <StepIntro
          headline={
            <>
              <Text tag="h2" variation="subheading-1">
                {props.fields.Heading2Text?.value ||
                  'Over 1,250 consultants across the UK'}
              </Text>
              <Text tag="h1" variation="display-1">
                {props.fields.HeadingText?.value || 'Find a consultant'}
              </Text>
              <Text tag="p" variation="body-large">
                {props.fields.Heading3Text?.value ||
                  'Search by consultant name, specialty, or condition — we’ll help you find the right specialist quickly.'}
              </Text>
            </>
          }
          search={
            <>
              <SearchAll
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
                specialistsLabel={
                  props?.fields?.SpecialistsFilterHeaderText?.value ||
                  'Specialists'
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
                  props?.fields?.ConditionsTreatmentsList || []
                }
                specialistsList={mappedDoctors}
                specialitiesList={props?.fields?.SpecialitiesList || []}
                popularConsultantsList={
                  props?.fields?.PopularConsultantsList || []
                }
                loadingText={
                  props?.fields?.API_Autocomplete_LoadingMsg?.value ||
                  'Loading...'
                }
              />
              <SearchLocation
                isStepIntro={true}
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
                setKeywordId={setKeywordId}
                searchString={searchStringLocations}
                setSearchString={setSearchStringLocations}
                searchIcon={
                  props?.fields?.SearchIcon?.fields?.SvgMarkup?.value || null
                }
                locationList={
                  locationConfig || []
                }
                loadingText={
                  props?.fields?.API_Autocomplete_LoadingMsg?.value ||
                  'Loading...'
                }
                // MH to do
                labelLocationsResults={'LOCATIONS'}
              />
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
              </Button>
            </>
          }
          popularSearch={
            <PopularSearchesBox
              popularSearches={popularSearches}
              popularSearchesTtitle={props.fields.PopularSearchesTitle?.value || 'Popular searches'}
            ></PopularSearchesBox>
          }
        >
          {/* MH to do labels for cookies */}
          {!hasFunctionalConsentCookie && (
            <FunctionalCookiesBox
              title={'Save this location for next time?'}
              label={'Activate functional cookies'}>
            </FunctionalCookiesBox>
          )}
        </StepIntro>
      </div>
    );
  }

  return <StepDefaultComponent {...props} />;
};
