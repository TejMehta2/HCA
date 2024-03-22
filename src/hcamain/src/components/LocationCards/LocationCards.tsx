import React, { useRef } from 'react';
import {
  Field,
  Item,
  ImageField,
  Text as JssText,
  Link as JssLink,
  Image as JssImage,
  RichText as JssRichText,
  LinkField,
  GetStaticComponentProps,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';
import CardMap from '@component-library/components/CardMap/CardMap';
import Text from '@component-library/foundation/Text/Text';
import CarouselCards from '@component-library/site-components/CarouselCards/CarouselCards';
import CardBlock from '@component-library/site-components/CardBlock/CardBlock';
import AdvancedBlockHeader from '@component-library/components/AdvancedBlockHeader/AdvancedBlockHeader';

import getBaselineParams from 'lib/getBaselineParams';
import {
  Autocomplete,
  LocationsSearchProps,
  SearchResponse,
} from '../LocationsSearch/LocationsSearch.types';
import unpackFilterOption from 'lib/unpackFilterOption';
import useSearchForm from '@component-library/hooks/useSearchForm/useSearchForm';
import { ApiResponse } from 'src/types/searchProps';

const BASE_URL = `${process.env.NEXT_PUBLIC_DATALAYER_URL}/locations`;

type CTAIconFields = {
  svgMarkup?: Field<string>;
};

type FilterOptionFields = {
  displayName?: { value?: string };
  filter?: { value?: string };
  filterValueString?: { value?: string };
  filterValueGuid?: { jsonValue?: Item };
};

type LocationsFields = {
  title?: { value?: string };
  image?: { jsonValue?: ImageField };
  city?: { value?: string };
  street?: { value?: string };
  postCode?: { value?: string };
  getDirections?: { value?: string };
  url: { path?: string };
};

interface Fields {
  data?: {
    item?: {
      heading?: { jsonValue?: Field<string> };
      title?: { jsonValue?: Field<string> };
      text?: { jsonValue?: Field<string> };
      cTAIcon?: {
        Icon?: CTAIconFields;
      };
      cTALink?: { jsonValue?: LinkField };
      locations?: {
        pagesList?: LocationsFields[];
      };
      filterOptions?: {
        filterOptionsList?: FilterOptionFields[];
      };
      cTAText?: { jsonValue?: Field<string> };
      getDirectionsText?: { jsonValue?: Field<string> };
      numberOfCards?: { jsonValue?: Field<string> };
    };
    contextItem?: {
      treatmentId?: string;
      serviceLineId?: string;
      scanId?: string;
      conditionId?: string;
    };
  };
}

type LocationCardsProps = {
  params?: Params;
  fields?: Fields;
  fallbackData?: SearchResponse;
};

const LocationCardsDefaultComponent = (
  props: LocationCardsProps
): JSX.Element => (
  <div className={`component ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">LocationCards no datasource</span>
    </div>
  </div>
);

const MapCards = (props: LocationCardsProps, data) => {
  // const isApiData = props.fields?.data?.item?.locations?.PagesList &&
  // props.fields?.data?.item?.locations?.PagesList.length

  const isApiData = true;

  const locations = isApiData
    ? data
    : props.fields?.data?.item?.locations?.PagesList;

  console.log(locations);
  return (
    locations &&
    locations.map((location, index) => {
      return (
        <CardMap
          key={index}
          title={
            <Text variation="heading-1" tag="h4">
              {isApiData ? (
                location.data.title
              ) : (
                <JssText field={location?.data.title} />
              )}
            </Text>
          }
          address={
            <>
              {location?.city?.value && (
                <Text variation={'body-large'} tag="span">
                  <JssText field={location?.city} />
                  &nbsp;
                </Text>
              )}
              {location?.street?.value && (
                <Text variation={'body-large'} tag="span">
                  <JssText field={location?.street} />
                  &nbsp;
                </Text>
              )}
              {location?.postCode?.value && (
                <Text variation={'body-large'} tag="span">
                  <JssText field={location?.postCode} />
                </Text>
              )}
            </>
          }
          image={
            isApiData ? (
              <img src={location.data.imageUrl} alt={location?.data.title} />
            ) : (
              <JssImage field={location?.image?.jsonValue} />
            )
          }
          ctas={{
            button1: (
              <a href={isApiData ? location?.url?.path : location.url}>
                <JssRichText
                  field={props?.fields?.data?.item?.cTAText?.jsonValue}
                />
              </a>
            ),
            button2: (
              <a
                href={
                  isApiData
                    ? location.directions
                    : location?.getDirections?.value
                }
              >
                <span>
                  <JssText
                    field={
                      props?.fields?.data?.item?.getDirectionsText?.jsonValue
                    }
                  />
                </span>
              </a>
            ),
          }}
        />
      );
    })
  );
};

// const mapApiCards = (data, props) => {
//   console.log(data);
//   return data?.map((location, index) => (
//     <CardMap
//       key={index}
//       title={
//         <Text variation="heading-1" tag="h4">
//           {location?.title}
//         </Text>
//       }
//       address={
//         <>
//           {location?.city?.value && (
//             <Text variation={'body-large'} tag="span">
//               <JssText field={location?.city} />
//               &nbsp;
//             </Text>
//           )}
//           {location?.street?.value && (
//             <Text variation={'body-large'} tag="span">
//               <JssText field={location?.street} />
//               &nbsp;
//             </Text>
//           )}
//           {location?.postCode?.value && (
//             <Text variation={'body-large'} tag="span">
//               <JssText field={location?.postCode} />
//             </Text>
//           )}
//         </>
//       }
//       image={<JssImage field={location?.image?.jsonValue} />}
//       ctas={{
//         button1: (
//           <a href={location?.url}>
//             {' '}
//             <JssRichText
//               field={props?.fields?.data?.item?.cTAText?.jsonValue}
//             />
//           </a>
//         ),
//         button2: (
//           <a href={location?.directions}>
//             <JssText
//               field={props?.fields?.data?.item?.getDirectionsText?.jsonValue}
//             />
//           </a>
//         ),
//       }}
//     />
//   ));
// };

export const Grid = (props: LocationCardsProps): JSX.Element => {
  if (!props.fields) {
    return <LocationCardsDefaultComponent {...props} />;
  }

  const { fallbackData, fields, params } = props;

  // Set up default baseline parameters from CMS
  const { defaultLimit, defaultOffset, baselineParams } =
    getBaselineParams(props);

  // Hooks
  const searchWrapperRef = useRef<HTMLDivElement>(null);
  const {
    data,
    error,
    formHandlers,
    searchParams,
    autocompleteData,
    autocompleteError,
  } = useSearchForm<SearchResponse, Autocomplete>({
    baseUrl: BASE_URL,
    baselineParams: [...baselineParams, ['verticalKey', 'locations']],
    fallbackData: fallbackData,
  });

  if (!fields || error || autocompleteError) {
    return <LocationCardsDefaultComponent {...props} />;
  }

  // Mutable query-based params
  const limit = Number(searchParams.get('limit')) || defaultLimit;
  const offset = Number(searchParams.get('offset')) || defaultOffset;

  // Computed properties
  const resultsCount = data?.response.resultsCount || 0;
  const rangeStart = offset + 1;
  const rangeEnd = Math.min(offset + limit, resultsCount);
  const resultsRange = `${rangeStart}-${rangeEnd}`;

  // Parse filter options to be used in multiple components
  const filterCategories = props.fields?.FilterOptions?.map((category) => ({
    title: category?.displayName || '',
    fields: category.fields?.Filters?.map((option) => {
      const { id, key, value, displayName } = unpackFilterOption(option);
      return {
        id,
        value,
        name: key,
        label: displayName,
        defaultChecked: searchParams.getAll(key).includes(value),
      };
    }),
  }));

  const activeFilters = filterCategories?.reduce((previous, { fields }) => {
    return [
      ...previous,
      ...fields.filter(({ defaultChecked }) => defaultChecked),
    ];
  }, []);

  return (
    <CardBlock
      theme={props.params?.Theme || 'A-HCA-White'}
      header={
        <AdvancedBlockHeader
          contentVariation="half-width"
          title={
            <Text
              tag={props.params?.HeadingTag || 'h3'}
              variation={props.params?.HeadingSize || 'display-5'}
            >
              {props.fields?.data?.item?.title?.jsonValue?.value}
            </Text>
          }
          body={
            <Text variation={'body-large'}>
              <JssText field={props.fields.data?.item?.text?.jsonValue} />
            </Text>
          }
          paddingSize="small"
        ></AdvancedBlockHeader>
      }
      variation="3-columns"
      cta={
        props.fields?.data?.item?.cTALink?.jsonValue?.value && (
          <JssLink field={props.fields?.data?.item?.cTALink?.jsonValue?.value}>
            <JssRichText
              tag="span"
              field={{
                value: props.fields?.data?.item?.cTALink?.jsonValue?.value.text,
              }}
            />
          </JssLink>
        )
      }
    >
      {/* {props.fields?.data?.item?.locations?.PagesList &&
      props.fields?.data?.item?.locations?.PagesList.length */}
      {MapCards(props, data?.response.results)}
      {/* mapApiCards(data?.response.results, props)
        : mapApiCards(data?.response.results, props)} */}

      {/* {data?.response.results?.map((item) => {
          console.log(item);
          const { data } = item;
          const { id, title, name, description, imageUrl, url, directions } =
            data;
          return <Text>{title}</Text>;
        })} */}

      {/* {MapCards(props)} */}
    </CardBlock>
  );
};

export const Slider = (props: LocationCardsProps): JSX.Element => {
  if (!props.fields) {
    return <LocationCardsDefaultComponent {...props} />;
  }

  return (
    <CarouselCards
      theme={props.params?.Theme || 'A-HCA-White'}
      title={
        <Text
          tag={props.params?.HeadingTag || 'h3'}
          variation={props.params?.HeadingSize || 'display-5'}
        >
          {props.fields?.data?.item?.title?.jsonValue?.value}
        </Text>
      }
      bodyCopy={
        <Text variation={'body-large'}>
          <JssText field={props.fields.data?.item?.text?.jsonValue} />
        </Text>
      }
      link={
        props.fields?.data?.item?.cTALink?.jsonValue?.value && (
          <JssLink field={props.fields?.data?.item?.cTALink?.jsonValue?.value}>
            <JssRichText
              tag="span"
              field={{
                value: props.fields?.data?.item?.cTALink?.jsonValue?.value.text,
              }}
            />
          </JssLink>
        )
      }
    >
      {MapCards(props)}
    </CarouselCards>
  );
};

// Pre-fetch response data on the server, to be consumed as fallbackData by SWR, and into initial HTML response.
export const getStaticProps: GetStaticComponentProps = async (
  rendering: ApiSearchProps
) => {
  const { baselineParams } = getBaselineParams(rendering);
  const params = baselineParams.map((entry) => `${entry[0]}=${entry[1]}`); // Compute as query strings
  const query = `?${params.join('&')}`;
  const url = new URL(query, BASE_URL); // compose API url

  try {
    const response = await fetch(url.href);
    if (response.ok) {
      const fallbackData = await response.json();
      rendering.fallbackData = fallbackData as ApiResponse;
      return rendering;
    } else {
      throw response.statusText;
    }
  } catch (error) {
    console.error(error);
    return rendering;
  }
};
