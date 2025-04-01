import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

import Themes from '@component-library/foundation/Themes/Themes';
import {
  TbcBookingScansSearchProps,
  TbcService,
  TbcServiceExtra,
} from './TbcBookingScansSearch.types';
import Button from '@component-library/core-components/Button/Button';
import Search from '@component-library/the-birth-company/Search/Search';
import {
  TheBirthCompanyContext,
  TheBirthCompanyContextProvider,
} from 'src/context/theBirthCompanyContext';
import Text from '@component-library/foundation/Text/Text';
import Checkbox from '@component-library/core-components/Checkbox/Checkbox';
import Container from '@component-library/foundation/Containers/Container';

// Function to help process total price when x% of surcharge needs to be added
// const applyPercentage = (value: string, baseValue: number): number => {
//   if (value.endsWith('%')) {
//     const percentage = parseFloat(value) / 100;
//     return Math.round(baseValue * percentage);
//   }
//   return parseFloat(value);
// };

const formatPrice = (value: string): string => {
  return value.endsWith('%')
    ? `${value} scan price surcharge`
    : `£${Math.round(parseFloat(value))}`;
};

const groupByArea = (services: TbcService[]) => {
  return services.reduce<Record<string, TbcService[]>>((acc, service) => {
    const area = service.area?.targetItem?.value?.value;
    if (!acc[area]) {
      acc[area] = [];
    }
    acc[area].push(service);
    return acc;
  }, {});
};

const TbcBookingScansSearchDefaultComponent = (
  props: TbcBookingScansSearchProps
): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
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
      <TbcSearch {...props} />
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
  const searchParams = useSearchParams();

  // Use params to preselect search and extras
  useEffect(() => {
    const paramScanId = searchParams.get('scanId');
    const paramExtras = searchParams.getAll('extraId');

    if (!paramScanId) {
      return;
    }
    setKeywordId(paramScanId);

    const preSelectedScan =
      props.fields?.data?.item?.servicesFolder.targetItem.children.results.find(
        (element) => element.id === paramScanId
      );

    if (preSelectedScan?.serviceName.value) {
      setSearchString(preSelectedScan?.serviceName.value);
    }

    // Check for extras
    if (preSelectedScan?.extras.targetItems) {
      setExtrasList(preSelectedScan?.extras.targetItems);
      setSelectedExtras(paramExtras);
    }
  }, [
    searchParams,
    setKeywordId,
    setSearchString,
    setExtrasList,
    setSelectedExtras,
    props.fields?.data?.item?.servicesFolder.targetItem.children.results,
  ]);

  if (!props?.fields?.data?.item) {
    return <TbcBookingScansSearchDefaultComponent {...props} />;
  }

  const groupedServices = groupByArea(
    props.fields.data.item.servicesFolder.targetItem.children.results
  );

  const handleSubmit = () => {
    const baseURLResults =
      props?.fields?.data?.item?.startBookingCTA.jsonValue?.value.href;

    const extras = selectedExtras.map((item) => `&extraId=${item}`).join('');
    router.push(`${baseURLResults}?scanId=${keywordId}${extras}`);
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
          const label = `${extra.serviceExtraName.value} (${formatPrice(
            extra.price.value
          )})`;

          return (
            <Container key={index} marginBottom="spacing-2">
              <Checkbox
                id={index.toString()}
                label={label}
                name={extra.serviceExtraName.value}
                value={extra.serviceExtraName.value}
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
    </Themes>
  );
};
