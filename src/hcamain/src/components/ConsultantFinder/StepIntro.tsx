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
import Search from '@component-library/consultant-finder/Search/Search';
import ImageAndTextBlock from '@component-library/site-components/ImageAndTextBlock/ImageAndTextBlock';
import Button from '@component-library/core-components/Button/Button';
import Text from '@component-library/foundation/Text/Text';
import Icons from '@component-library/foundation/Icons/Icons';
import TextButton from '@component-library/core-components/TextButton/TextButton';
import Container from '@component-library/foundation/Containers/Container';

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
  const { searchString, setSearchString, setKeywordId, keywordId } = useContext(
    ConsultantFinderContext
  );
  const [location, setLocation] = useState('London');

  // const readCookie = (name: string) => {
  //   if (typeof document === "undefined") return null;
  //   const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  //   return m ? decodeURIComponent(m[1]) : null;
  // };

  // const setLocationCookie = (value: string) => {
  //   document.cookie = `location=${encodeURIComponent(value)}; path=/; max-age=31536000; SameSite=Lax`;
  // };

  // const deleteLocationCookie = () => {
  //   // delete with the SAME attributes you used to set it
  //   document.cookie = "location=; path=/; max-age=0; SameSite=Lax";

  //   // also try deleting without path (covers a common “duplicate cookie” case)
  //   document.cookie = "location=; max-age=0; SameSite=Lax";
  // };

  // useEffect(() => {
  //   if (typeof window === "undefined") return;
  //   const groups = (window as any).OnetrustActiveGroups || "";
  //   const hasFunctionalConsent = groups.includes("C0003");
  //   console.log('hasFunctionalConsent', hasFunctionalConsent);

  //   if (hasFunctionalConsent) {
  //     const saved = readCookie("location");
  //     console.log('saved', saved);
  //     if (saved) setLocation(saved);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (typeof window === "undefined") return;

  //   const handleConsentChange = () => {
  //     const groups = (window as any).OnetrustActiveGroups || "";
  //     const hasFunctionalConsent = groups.includes("C0003");
  //     console.log('hasFunctionalConsent', hasFunctionalConsent);

  //     console.log("BEFORE:", { cookie: readCookie("location"), all: document.cookie });

  //     if (!hasFunctionalConsent) {
  //       deleteLocationCookie();
  //       console.log("AFTER DELETE:", { cookie: readCookie("location"), all: document.cookie });
  //       setTimeout(() => {
  //         console.log("NEXT TICK AFTER DELETE:", { cookie: readCookie("location"), all: document.cookie });
  //       }, 0);
  //       return;
  //     }

  //     if (location) {
  //       setLocationCookie(location);
  //       setLocation(readCookie("location"));
  //       console.log("AFTER SET:", { cookie: readCookie("location"), all: document.cookie });
  //       setTimeout(() => {
  //         console.log("NEXT TICK AFTER SET:", { cookie: readCookie("location"), all: document.cookie });
  //       }, 0);
  //     }
  //   };

  //   handleConsentChange();
  //   window.addEventListener("OneTrustGroupsUpdated", handleConsentChange);
  //   return () => window.removeEventListener("OneTrustGroupsUpdated", handleConsentChange);
  // }, [location]);

  // const [location, setLocation] = useState<string>("London");
  const [hydrated, setHydrated] = useState(false);
  const [hasFunctionalConsentCookie, setFunctionalConsentCookie] = useState(false);
  const [searchConsultant, setSearchConsultant] = useState(false);

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
      setFunctionalConsentCookie(true);
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

    setLocationCookie(location);
  }, [location, hydrated]);

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

  const handleClickQuickSearch = () => {
    const baseURLResults = props?.fields?.QuickSearchLink?.value?.href;

    const locationConfig: Record<string, { lat: number; lon: number; distance: number }> = {
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

    const selectedLocation = location ?? "London";

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


  const handleClickAdvanceSearch = () => {
    router.push({
      pathname: props.fields.AdvancedSearchLink.value.href,
      query: { keywordId: keywordId, searchString: searchString },
    });
  };

  if (props.fields) {
    return (
      <div id={id ? id : undefined}>
        <a href="javascript:OneTrust.ToggleInfoDisplay()">x</a>
        <ImageAndTextBlock
          contentVariation={'hero-cf'}
          locationCookies={location ?? 'London'}
          showRegion={true}
          hasFunctionalConsentCookie={hasFunctionalConsentCookie}
          setLocation={setLocation}
          noOverflownHidden={true}
          theme="A-HCA-White"
          imageAlignment="left"
          length="short"
          cfVariation={true}
          subheader={
            <Text tag="h3" variation="subheading-1">
              <JssRichText field={props.fields.HeadingText} />
            </Text>
          }
          header={
            <Text tag="h2" variation="display-2">
              <JssRichText field={props.fields.TitleText} />
            </Text>
          }
          image={<JssImage field={props.fields.CardImage} />}
        >
          <Text tag="div" variation="body-large">
            <JssRichText field={props.fields.BodyText} />
          </Text>




          {
            !searchConsultant &&
            <form autoComplete="off">
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
                  props?.fields?.ConditionsTreatmentsList || []
                }
                specialitiesList={props?.fields?.SpecialitiesList || []}
                loadingText={
                  props?.fields?.API_Autocomplete_LoadingMsg?.value ||
                  'Loading...'
                }
              />
            </form>
          }
          {
            !searchConsultant &&
            <div>
              <Container
                marginBottom="spacing-4"
                displayFlex="displayFlex"
                withButtons={true}
                customBtnDesktop={true}
              >
                <Button
                  size={'small'}
                  variation={'full-dark'}
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

                <Button
                  size={'small'}
                  variation={'outline-dark'}
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
              </Container>

              <Container marginBottom="spacing-2">
                <Text tag="h2" variation="heading-2">
                  {props.fields.FindConsultantHeaderText.value}
                </Text>
              </Container>
              {/* 
              <TextButton theme="dark">
                <button
                  onClick={() =>
                    router.push({
                      pathname: props.fields.SearchByConsultantLink.value.href,
                      query: { keywordId: keywordId, searchString: searchString },
                    })
                  }
                >
                  {props.fields.SearchByConsultantLink.value.text}
                  <Icons iconName="iconArrowSmallRight" />
                </button>
              </TextButton> */}
              <TextButton theme="dark">
                <button
                  onClick={() =>
                    setSearchConsultant(true)
                  }
                >
                  <Icons iconName="iconEdit" />
                  {'Search consultant'}
                </button>
              </TextButton>
            </div>
          }
          {/* <Container
            marginBottom="spacing-4"
            displayFlex="displayFlex"
            withButtons={true}
            customBtnDesktop={true}
          >
            <Button
              size={'small'}
              variation={'full-dark'}
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

            <Button
              size={'small'}
              variation={'outline-dark'}
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
          </Container>

          <Container marginBottom="spacing-2">
            <Text tag="h2" variation="heading-2">
              {props.fields.FindConsultantHeaderText.value}
            </Text>
          </Container>

          <TextButton theme="dark">
            <button
              onClick={() =>
                router.push({
                  pathname: props.fields.SearchByConsultantLink.value.href,
                  query: { keywordId: keywordId, searchString: searchString },
                })
              }
            >
              {props.fields.SearchByConsultantLink.value.text}
              <Icons iconName="iconArrowSmallRight" />
            </button>
          </TextButton> */}

          {
            searchConsultant &&
            <form autoComplete="off">
              <Search
                placeholder={

                  'Search for a consultant'
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
                  'Search Consultant'
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
                specialitiesList={props?.fields?.SpecialitiesList || []}
                loadingText={
                  props?.fields?.API_Autocomplete_LoadingMsg?.value ||
                  'Loading...'
                }
              />



              <TextButton theme="dark">
                <button
                  onClick={() =>
                    setSearchConsultant(false)
                  }
                >
                  <Icons iconName="iconEdit" />
                  {'Search consultant by condition, treatment, specialty'}
                </button>
              </TextButton>

            </form>

          }
        </ImageAndTextBlock>
      </div>
    );
  }

  return <StepDefaultComponent {...props} />;
};
