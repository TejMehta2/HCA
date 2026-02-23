/* eslint-disable */
/* eslint-disable @typescript-eslint/no-explicit-any */
// Template finder component

import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  ImageField,
  Field,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Button from '@component-library/core-components/Button/Button';
import LocationCardsWrapper from '@component-library/consultant-finder/LocationCardsWrapper/LocationCardsWrapper';
import LocationCard from '@component-library/consultant-finder/LocationCard/LocationCard';
import Navigation from '@component-library/consultant-finder/Navigation/Navigation';
import TextButton from '@component-library/core-components/TextButton/TextButton';
import Icons from '@component-library/foundation/Icons/Icons';
import { ConsultantFinderContext } from '@component-library/context/consultantFinderContext';
import LocationsTopSection from '@component-library/consultant-finder/LocationsTopSection/LocationsTopSection';
import LoaderCF from '@component-library/consultant-finder/LoaderCF/LoaderCF';
import Link from 'next/link';

interface Fields {
  TitleText: Field<string>;
  CardImage: ImageField;
  StartLink: LinkField;
  NextLink: LinkField;
  BackLink: LinkField;
  Hospitals: object[];
  API_HCA_Locations_BaseURL: Field<string>;
  BodyText: Field<string>;
  HeadingText: Field<string>;
  SearchPlaceholderText: Field<string>;
  SelectCardText: Field<string>;
  RemoveCardText: Field<string>;
  RemoveAllLocationsButtonText: Field<string>;
  SelectAllLocationsButtonText: Field<string>;
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
  // console.log('location', props.fields);
  const { selectedLocations } = useContext(ConsultantFinderContext);
  const [array, setArray] = useState([]);
  const [hospitals, setHospitals] = useState(props?.fields?.Hospitals || []);
  const [search, setSearch] = useState('');
  const [keywordId, setKewordId] = useState('');
  const [insurer, seInsurer] = useState('');
  const [calculate, setCalculate] = useState(false);
  const router = useRouter();
  // console.log('selectedLocations', selectedLocations);
  // console.log('array', array);
  const slugs = props?.fields?.Hospitals.map(
    (item: any) => item.fields.slug.value
  );
  const postcodes = props?.fields?.Hospitals.map(
    (item: any) => item.fields.postCode.value
  ).join(',');
  // console.log('slugs', slugs);
  // console.log('postcodes', postcodes);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    if (!router.isReady) {
      return;
    }

    // get keywordID from URL
    const keywordIdQuery = router?.query?.keywordId || '';
    setKewordId(keywordIdQuery.toString());

    // get searchString from URL
    const searchStringQuery = router?.query?.searchString || '';
    setSearch(searchStringQuery.toString());

    // get payment option from URL
    const paymentOption = router?.query?.insurer || '';
    seInsurer(paymentOption.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  if (props.fields) {
    return (
      <>
        {router.isReady && (
          <>
            <LocationsTopSection
              hospitals={hospitals}
              setHospitals={setHospitals}
              postcodesFacilities={postcodes}
              locationAPI={props?.fields?.API_HCA_Locations_BaseURL?.value}
              array={array}
              setArray={setArray}
              slugs={slugs}
              subheadline={
                props?.fields?.HeadingText?.value || 'facilities & hospitals'
              }
              title={props?.fields?.TitleText?.value || 'Preferred locations'}
              text={
                props?.fields?.BodyText?.value ||
                'Enter your postcode to see the locations closest to you. Please select any facilities you wish to visit, or continue to see consultants across all of our facilities.'
              }
              searchPlaceholderText={
                props?.fields?.SearchPlaceholderText?.value ||
                'Enter postcode or place name'
              }
              removeAllLocationsButtonText={
                props?.fields?.RemoveAllLocationsButtonText?.value ||
                'Remove all locations'
              }
              selectAllLocationsButtonText={
                props?.fields?.SelectAllLocationsButtonText?.value ||
                'Add all locations'
              }
              setCalculate={setCalculate}
            />
            {calculate && <LoaderCF loadingMsg="Calculating distances..." />}
            <LocationCardsWrapper>
              {hospitals.length > 0 &&
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                hospitals.map((hospital: any) => (
                  <LocationCard
                    key={hospital.id}
                    name={hospital?.fields?.HCAName?.value || ''}
                    addressLine1={hospital?.fields?.addressLine1?.value || ''}
                    city={hospital?.fields?.cityOrCounty?.value || ''}
                    postcode={hospital?.fields?.postCode?.value || ''}
                    slug={hospital?.fields?.slug?.value || ''}
                    array={array}
                    setArray={setArray}
                    distance={hospital?.distance || null}
                    selectCardText={
                      props?.fields?.SelectCardText?.value || 'Select'
                    }
                    removeCardText={
                      props?.fields?.RemoveCardText?.value || 'Remove'
                    }
                    search={search}
                    keywordId={keywordId}
                    insurance={insurer}
                  />
                ))}
            </LocationCardsWrapper>
            <Navigation>
              <TextButton>
                <Link
                  href={`${props.fields.BackLink.value.href}?keywordId=${keywordId}&searchString=${search}`}
                >
                  <Icons iconName="iconArrowSmallLeft" />
                  {props.fields.BackLink.value.text}
                </Link>
              </TextButton>

              <Button size={'small'} variation={'full-dark'}>
                <button
                  disabled={false}
                  onClick={() =>
                    router.push(
                      `${props?.fields?.NextLink?.value?.href
                      }?search=${search}&keywordId=${keywordId}&sortType=relevance${selectedLocations.length > 0
                        ? `&practice=${selectedLocations.join(',')}&`
                        : '&'
                      }lat=51.507217&lon=-0.1275862&distance=0&limit=12&${insurer ? `insurer=${insurer}&` : ''}offset=0`
                    )
                  }
                >
                  <span>{props.fields.NextLink.value.text}</span>
                </button>
              </Button>
            </Navigation>
          </>
        )}
      </>
    );
  }

  return <StepDefaultComponent {...props} />;
};
