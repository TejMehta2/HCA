/* eslint-disable @typescript-eslint/no-explicit-any */
// Template finder component

import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import {
  Image as JssImage,
  Link as JssLink,
  RichText as JssRichText,
  ImageField,
  Field,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Button from '@component-library/core-components/Button/Button';
import Text from '@component-library/foundation/Text/Text';
import LocationCardsWrapper from '@component-library/consultant-finder/LocationCardsWrapper/LocationCardsWrapper';
import LocationCard from '@component-library/consultant-finder/LocationCard/LocationCard';
import Navigation from '@component-library/consultant-finder/Navigation/Navigation';
import router from 'next/router';
import TextButton from '@component-library/core-components/TextButton/TextButton';
import Icons from '@component-library/foundation/Icons/Icons';
import { ConsultantFinderContext } from '../../context/consultantFinderContext';
import LocationsTopSection from '@component-library/consultant-finder/LocationsTopSection/LocationsTopSection';


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
  console.log('location', props.fields);
  const { selectedLocations } = useContext(ConsultantFinderContext);
  const [array, setArray] = useState([]);
  const [hospitals, setHospitals] = useState(props?.fields?.Hospitals || []);
  console.log('selectedLocations', selectedLocations);
  console.log('array', array);
  const slugs = props?.fields?.Hospitals.map(
    (item: any) => item.fields.slug.value
  );
  const postcodes = props?.fields?.Hospitals.map(
    (item: any) => item.fields.postCode.value
  ).join(',');
  console.log('slugs', slugs);
  console.log('postcodes', postcodes);

  if (props.fields) {
    return (
      <>
        <LocationsTopSection 
          hospitals={hospitals} 
          setHospitals={setHospitals} 
          postcodesFacilities={postcodes} 
          locationAPI={props?.fields?.API_HCA_Locations_BaseURL?.value || 'http://localhost:3000/api/locationAPI/'} 
          array={array} 
          setArray={setArray} 
          slugs={slugs} 
          subheadline={props?.fields?.HeadingText?.value || 'facilities & hospitals'} 
          title={props?.fields?.TitleText?.value ||'Preferred locations'} 
          text={props?.fields?.BodyText?.value || 'Enter your postcode to see the locations closest to you. Please select any facilities you wish to visit, or continue to see consultants across all of our facilities.'} 
        />
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
                selectCardText={props?.fields?.SelectCardText?.value || 'Select'} 
                removeCardText={props?.fields?.RemoveCardText?.value || 'Remove'}
              />
            ))}
        </LocationCardsWrapper>
        <Navigation>
          <TextButton>
            <JssLink field={props.fields.BackLink}>
              <Icons iconName="iconArrowSmallLeft" />
              {props.fields.BackLink.value.text}
            </JssLink>
          </TextButton>

          <Button size={'small'} variation={'full-dark'}>
            <button
              disabled={false}
              onClick={() =>
                router.push(
                  // sa iau practice si altele din passi urmatori si insurer
                  // props.fields.NextLink.value.href || 
                  `/Finder/Step-Consultant-Cards?search=Orthopaedics&keywordId=2865&sortType=relevance${selectedLocations.length > 0 ? `&practice=${selectedLocations.join(',')}&` : '&'}lat=51.507217&lon=-0.1275862&distance=700&limit=12&offset=0`
                )
              }
            >
              <span>{props.fields.NextLink.value.text}</span>
            </button>
          </Button>
        </Navigation>
      </>
    );
  }

  return <StepDefaultComponent {...props} />;
};
