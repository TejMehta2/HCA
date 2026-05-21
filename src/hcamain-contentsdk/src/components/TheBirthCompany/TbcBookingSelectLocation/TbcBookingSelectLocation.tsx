/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

// Template finder component
// Based on src\hcamain\src\components\ConsultantFinder\StepLocationSelect.tsx

import { type JSX, Suspense } from 'react';
import React, { useState, useEffect, useContext } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import {
  AppPlaceholder,
  Image as JssImage,
  ImageField,
  Field,
  LinkField,
} from '@sitecore-content-sdk/nextjs';
import type { ComponentMap } from '@sitecore-content-sdk/nextjs';
import Text from '@component-library/foundation/Text/Text';
import HeaderLDB from '@component-library/consultant-finder/HeaderLDB/HeaderLDB';
import ProgressBar from '@component-library/the-birth-company/ProgressBar/ProgressBar';
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
import { ComponentWithContextProps } from 'lib/component-props';

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

type StepProps = ComponentWithContextProps & {
  fields: Fields;
  componentMap?: ComponentMap;
};

interface LocationFields {
  id: string;
  name: string;
  description: string;
  nearestAvailability: string;
}

const StepDefaultComponent = (props: StepProps): JSX.Element => {
  const isExperienceEditor = props.page.mode.isEditing;
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
      <Suspense fallback={null}>
        <TbcLocations {...props} />
      </Suspense>
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
  }, [paramScanId, configurationId]);

  const chosenLocationHandler = (locationId: string) => {
    setSelectedLocation(locationId);
    nextPageParams.set('locationId', locationId);

    router.push(
      `${props?.fields?.NextLink?.value?.href}?${nextPageParams.toString()}`
    );
  };

  if (props.fields) {
    return (
      <div
        className={`component promo ${props.params.styles}`}
        id={id ? id : undefined}
      >
        {
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

                    {props.rendering && props.componentMap && (
                      <PlaceHolderWrapper>
                        <AppPlaceholder
                          name={phKey}
                          rendering={props.rendering}
                          page={props.page}
                          componentMap={props.componentMap}
                        />
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
                        chosenLocationHandler(location.id);
                      }}
                    >
                      {location.nearestAvailability && (
                        <span>
                          <Icons iconName="iconClock" />
                          <Text variation="body-small" tag="p">
                            {location.nearestAvailability}
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
            </Navigation>
          </>
        }
      </div>
    );
  }

  return <StepDefaultComponent {...props} />;
};
