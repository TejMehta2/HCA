/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
// Template finder component
// Based on src\hcamain\src\components\ConsultantFinder\StepLocationSelect.tsx

import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import {
  Image as JssImage,
  ImageField,
  Field,
  LinkField,
  useSitecoreContext,
  Placeholder,
  ComponentRendering,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Button from '@component-library/core-components/Button/Button';
import Text from '@component-library/foundation/Text/Text';
import HeaderLDB from '@component-library/consultant-finder/HeaderLDB/HeaderLDB';
import ProgressBar from '@component-library/the-birth-company/ProgressBar/ProgressBar';
import Container from '@component-library/foundation/Containers/Container';
import TextButton from '@component-library/core-components/TextButton/TextButton';
import Navigation from '@component-library/consultant-finder/Navigation/Navigation';
import Icons from '@component-library/foundation/Icons/Icons';
import CantFind from '@component-library/consultant-finder/CantFind/CantFind';
import Headline from '@component-library/consultant-finder/Headline/Headline';
import LocationCard from '@component-library/the-birth-company/LocationCard/LocationCard';
import LocationCardBlock from '@component-library/the-birth-company/LocationCardBlock/LocationCardBlock';

import {
  TheBirthCompanyContext,
  TheBirthCompanyContextProvider,
} from '@component-library/context/theBirthCompanyContext';
import LoaderCF from '@component-library/consultant-finder/LoaderCF/LoaderCF';
import PlaceHolderWrapper from 'src/jss-abstractions/PlaceholderWrapper/PlaceholderWrapper';

interface Fields {
  HCALogo: ImageField;
  CurrentStep: any;
  Steps: any;
  TitleText: Field<string>;
  CardImage: ImageField;
  StartLink: LinkField;
  NextLink: LinkField;
  BackLink: LinkField;
  CardTimeIcon: any;
  CantFindBannerText: Field<string>;
  CantFindPhoneNumber: Field<string>;
  CantFindIcon: any;
  HeadingText: Field<string>;
  servicesFolder: {
    id: string;
  };
}

type StepProps = {
  params: { [key: string]: string };
  fields: Fields;
  rendering?: ComponentRendering;
};

interface LocationFields {
  id: string;
  name: string;
  description: string;
  nearestAvailability: string;
}

const StepDefaultComponent = (props: StepProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            TBC Booking Select Location Step
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

export const Default = (props: StepProps): JSX.Element => {
  return (
    <TheBirthCompanyContextProvider>
      <TbcLocations {...props} />
    </TheBirthCompanyContextProvider>
  );
};

export const TbcLocations = (props: StepProps): JSX.Element => {
  const { selectedLocation, setSelectedLocation } = useContext(
    TheBirthCompanyContext
  );
  const phKey = `booking-location-step-${props.params?.DynamicPlaceholderId}`;
  const id = props.params.RenderingIdentifier;
  const router = useRouter();
  const [locations, setLocations] = useState<LocationFields[]>([]);
  const [loading, seLoading] = useState(true);
  const [error, setError] = useState(false);

  const searchParams = useSearchParams();
  const paramScanId = searchParams.get('scanId');
  const paramLocationId = searchParams.get('locationId');
  const configurationId = props.fields.servicesFolder.id;

  // Set params for next page
  const nextPageParams = new URLSearchParams(searchParams.toString());
  if (selectedLocation) {
    nextPageParams.set('locationId', selectedLocation);
  }

  useEffect(() => {
    if (paramLocationId) {
      setSelectedLocation(paramLocationId);
    }
  }, [paramLocationId, setSelectedLocation]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    if (!router.isReady) {
      return;
    }

    const requestURL = `${process.env.NEXT_PUBLIC_INTEGRATION_LAYER_PROXY_PATH}/tbcbooking/locations?scanid=${paramScanId}&configurationId=${configurationId}`;

    axios
      .get(requestURL)
      .then((res) => {
        seLoading(false);
        setError(false);
        setLocations(res?.data || []);
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      });
  }, [router, router.isReady, paramScanId, configurationId]);

  if (props.fields) {
    return (
      <div
        className={`component promo ${props.params.styles}`}
        id={id ? id : undefined}
      >
        {router.isReady && (
          <>
            <HeaderLDB
              logo={<JssImage field={props?.fields?.HCALogo} />}
              progress={
                <ProgressBar
                  currentPage={props?.fields?.CurrentStep?.value}
                  steps={props?.fields?.Steps}
                ></ProgressBar>
              }
            ></HeaderLDB>
            <Headline>
              <Text tag="h1" variation="heading-1">
                {props?.fields?.HeadingText?.value ||
                  'Please select a location'}
              </Text>
            </Headline>
            {loading && <LoaderCF />}
            {!loading && !error && (
              <LocationCardBlock
                cta={
                  <>
                    {props?.fields?.CantFindBannerText?.value && (
                      <CantFind
                        contentVariation="the-birth-company"
                        title={
                          <Text tag="p" variation="body-medium-large">
                            {props?.fields?.CantFindBannerText?.value}
                          </Text>
                        }
                      ></CantFind>
                    )}

                    {props.rendering && (
                      <PlaceHolderWrapper>
                        <Placeholder name={phKey} rendering={props.rendering} />
                      </PlaceHolderWrapper>
                    )}
                  </>
                }
              >
                <>
                  {locations.map((location, index) => (
                    <LocationCard
                      key={index}
                      selected={selectedLocation === location.id}
                      name={
                        <Text variation="body-bold-large">{location.name}</Text>
                      }
                      description={
                        <Text variation="body-small">
                          {location.description}
                        </Text>
                      }
                      handleClick={() => {
                        setSelectedLocation(location.id);
                      }}
                    >
                      {location.nearestAvailability && (
                        <span>
                          <Icons iconName="iconClock" />
                          <Text variation="body-small" tag="p">
                            Available Sat 21 Oct 2023
                          </Text>
                        </span>
                      )}
                    </LocationCard>
                  ))}
                </>
              </LocationCardBlock>
            )}

            <Navigation>
              <div>
                <TextButton>
                  <Link
                    href={`${
                      props?.fields?.BackLink?.value?.href
                    }?${searchParams.toString()}`}
                  >
                    <Icons iconName="iconArrowSmallLeft" />
                    <span>{props.fields.BackLink.value.text || 'Back'}</span>
                  </Link>
                </TextButton>
              </div>
              <Container>
                <Button size={'small'} variation={'full-dark'}>
                  <button
                    disabled={selectedLocation.length === 0 ? true : false}
                    onClick={() =>
                      router.push(
                        `${
                          props?.fields?.NextLink?.value?.href
                        }?${nextPageParams.toString()}`
                      )
                    }
                  >
                    <span>
                      {props?.fields?.NextLink?.value?.text || 'Next'}
                    </span>
                  </button>
                </Button>
              </Container>
            </Navigation>
          </>
        )}
      </div>
    );
  }

  return <StepDefaultComponent {...props} />;
};
