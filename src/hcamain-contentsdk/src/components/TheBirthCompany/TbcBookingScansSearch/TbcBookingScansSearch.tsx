'use client';

import { type JSX, Suspense } from 'react';
import React, { useState, useContext, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import Themes from '@component-library/foundation/Themes/Themes';
import {
  ApiFields,
  GroupedScans,
  TbcBookingScansSearchProps,
  TbcDropdownColumn,
  TbcServiceExtra,
} from './TbcBookingScansSearch.types';
import Button from '@component-library/core-components/Button/Button';
import Search from '@component-library/the-birth-company/Search/Search';
import {
  TheBirthCompanyContext,
  TheBirthCompanyContextProvider,
} from '@component-library/context/theBirthCompanyContext';
import Text from '@component-library/foundation/Text/Text';
import Checkbox from '@component-library/core-components/Checkbox/Checkbox';
import Container from '@component-library/foundation/Containers/Container';
import LoaderCF from '@component-library/consultant-finder/LoaderCF/LoaderCF';

const formatPrice = (value: string): string => {
  return value.endsWith('%')
    ? `${value} scan price surcharge`
    : `£${Math.round(parseFloat(value))}`;
};

const groupByArea = (data: ApiFields[]): GroupedScans => {
  const grouped: Record<string, Record<string, ApiFields[]>> = {};

  data.forEach((item) => {
    const area = item.area;
    const subArea = item.subArea || '';

    if (!area) return;

    if (!grouped[area]) grouped[area] = {};
    if (!grouped[area][subArea]) grouped[area][subArea] = [];

    grouped[area][subArea].push(item);
  });

  const result: GroupedScans = {};

  Object.entries(grouped).forEach(([area, subAreas]) => {
    const sections: TbcDropdownColumn[] = Object.entries(subAreas).map(
      ([subArea, scans]) => ({
        title: subArea && subArea,
        scans,
      })
    );

    result[area] = sections;
  });

  return result;
};

const TbcBookingScansSearchDefaultComponent = (
  props: TbcBookingScansSearchProps
): JSX.Element => {
  const isExperienceEditor = props.page.mode.isEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            Tbc Booking Scans Search. Please click to select datasource
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

export const Default = (props: TbcBookingScansSearchProps): JSX.Element => {
  return (
    <TheBirthCompanyContextProvider>
      <Suspense fallback={null}>
        <TbcSearch {...props} />
      </Suspense>
    </TheBirthCompanyContextProvider>
  );
};

const TbcSearch = (props: TbcBookingScansSearchProps): JSX.Element => {
  const {
    searchString,
    setSearchString,
    keywordId,
    setKeywordId,
    extrasList,
    setExtrasList,
    selectedExtras,
    setSelectedExtras,
  } = useContext(TheBirthCompanyContext);

  const router = useRouter();
  const [scansList, setScansList] = useState<ApiFields[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const searchParams = useSearchParams();
  const nextPageParams = new URLSearchParams(searchParams.toString());

  const configurationId =
    props.fields?.data?.item?.servicesFolder.targetItem.id;

  // Fetch list of scans
  useEffect(() => {
    const paramLocationId = searchParams.get('locationId');
    const paramTypeId = searchParams.get('typeId');

    //  if any required params are missing redirect back to the start of the journey
    if (!paramLocationId || !paramTypeId || !configurationId)
      router.push('/booking/location');

    setLoading(true);

    const requestURL = `${process.env.NEXT_PUBLIC_INTEGRATION_LAYER_PROXY_PATH}/tbcbooking/scans?&locationid=${paramLocationId}&typeid=${paramTypeId}&configurationid=${configurationId}`;

    axios
      .get(requestURL)
      .then((res) => {
        setLoading(false);
        setError(false);
        setScansList(res?.data || []);
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      });
  }, [router, configurationId, searchParams]);

  // Use params to preselect search and extras
  useEffect(() => {
    const paramScanId = searchParams.get('scanId');
    const paramExtras = searchParams.getAll('extraId');

    if (!paramScanId) {
      return;
    }
    setKeywordId(paramScanId);

    const preSelectedScan = scansList.find(
      (element) => element.id === paramScanId
    );

    if (preSelectedScan?.name) {
      setSearchString(preSelectedScan?.name);
    }

    // Check for extras
    if (preSelectedScan?.extras) {
      setExtrasList(preSelectedScan?.extras);
      setSelectedExtras(paramExtras);
    }
  }, [
    scansList,
    searchParams,
    setKeywordId,
    setSearchString,
    setExtrasList,
    setSelectedExtras,
  ]);

  if (!props?.fields?.data?.item) {
    return <TbcBookingScansSearchDefaultComponent {...props} />;
  }

  const groupedServices = groupByArea(scansList);

  const handleSubmit = () => {
    const baseURLResults =
      props?.fields?.data?.item?.startBookingCTA.jsonValue?.value.href;

    nextPageParams.set('scanId', keywordId);
    const extras = selectedExtras.map((item) => `&extraId=${item}`).join('');
    router.push(`${baseURLResults}?${nextPageParams}${extras}`);
  };

  let extras;
  if (keywordId && searchString && extrasList) {
    extras = (
      <>
        <Container marginBottom="spacing-4">
          <Text variation="body-bold-extra-large" tag="p">
            {props.fields?.data?.item?.extrasLabel?.value}
          </Text>
        </Container>
        {extrasList.map((extra: TbcServiceExtra, index) => {
          const label = `${extra.name} (${formatPrice(extra.price)})`;

          return (
            <Container key={index} marginBottom="spacing-2">
              <Checkbox
                id={index.toString()}
                label={label}
                name={extra.name}
                value={extra.name}
                checked={(selectedExtras as string[]).includes(extra.id)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.checked) {
                    setSelectedExtras([...selectedExtras, extra.id]);
                  } else {
                    setSelectedExtras(
                      selectedExtras.filter((a) => a !== extra.id)
                    );
                  }
                }}
              />
            </Container>
          );
        })}
      </>
    );
  }

  return (
    <Themes theme={props.params?.Theme || 'A-HCA-White'}>
      {loading && <LoaderCF />}
      {!loading && !error && (
        <>
          <Search
            placeholder={
              props?.fields?.data?.item?.searchPhrasePlaceholder?.value ||
              'Type in a scan or test...'
            }
            dropdownColumn1Label={Object.keys(groupedServices)[0]}
            dropdownColumn1List={Object.values(groupedServices)[0] || []}
            dropdownColumn2Label={Object.keys(groupedServices)[1]}
            dropdownColumn2List={Object.values(groupedServices)[1] || []}
          />
          {extras}
          <Container width="fit" marginTop="spacing-5">
            <Button size={'large'} variation={'full'}>
              <button
                type="submit"
                disabled={keywordId === '0' ? true : false}
                onClick={handleSubmit}
              >
                {props.fields.data.item.startBookingCTA?.jsonValue?.value.text}
              </button>
            </Button>
          </Container>
        </>
      )}
    </Themes>
  );
};
