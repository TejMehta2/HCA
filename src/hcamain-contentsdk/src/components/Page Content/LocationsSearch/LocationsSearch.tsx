'use client';

import { type JSX, type RefObject, useRef } from 'react';
import {
  GetComponentServerProps,
  Text as JssText,
  RichText as JssRichText,
  useComponentProps,
} from '@sitecore-content-sdk/nextjs';
import {
  Autocomplete,
  LocationsSearchProps,
  SearchResponse,
} from './LocationsSearch.types';
import HeaderPlain, {
  getDynamicTitleStyle,
} from '@component-library/site-components/HeaderPlain/HeaderPlain';
import SearchBar from '@component-library/components/SearchBar/SearchBar';
import SearchWrapper from '@component-library/site-components/SearchWrapper/SearchWrapper';
import Text from '@component-library/foundation/Text/Text';
import useSearchForm from '@component-library/hooks/useSearchForm/useSearchForm';
import Sorting from '@component-library/components/Sorting/Sorting';
import Checkbox from '@component-library/core-components/Checkbox/Checkbox';
import Checkboxes from '@component-library/core-components/Checkboxes/Checkboxes';
import SitecoreSvg from 'src/jss-abstractions/SitecoreSvg/SitecoreSvg';
import SearchFilterList from '@component-library/components/SearchFilterList/SearchFilterList';
import Themes from '@component-library/foundation/Themes/Themes';
import Icons from '@component-library/foundation/Icons/Icons';
import CardGrid from '@component-library/site-components/CardGrid/CardGrid';
//import SearchFormLoadMore from '@component-library/yext/SearchFormLoadMore/SearchFormLoadMore';
import SearchFormPagination from '@component-library/yext/SearchFormPagination/SearchFormPagination';
import Image from 'next/image';
import CardMap from '@component-library/components/CardMap/CardMap';
import LocationMap from '@component-library/components/LocationMap/LocationMap';
import Filters from '@component-library/site-components/Filters/Filters';
import { unpackFilterOptionJson } from 'lib/unpackFilterOption';
import Button from '@component-library/core-components/Button/Button';
import TextButton from '@component-library/core-components/TextButton/TextButton';
import { ApiSearchPropsJson } from 'src/types/searchProps';
import ErrorMessage from '@component-library/site-components/ErrorMessage/ErrorMessage';
import { useTranslations } from 'next-intl';
import SearchDetail from '@component-library/hooks/useSearchForm/components/SearchDetail';
import GeolocationPermissionsCta from './GeolocationPermissionsCta';
import ImageUrl from 'src/jss-abstractions/ImageUrl';
import returnDirections from 'src/jss-abstractions/GetDirections/GetDirections';
import getHeadingTags from 'lib/getHeadingTags';
import getBaselineParamsJson from 'lib/getBaselineParamsJson';
import { upsertQuerystringParam } from 'lib/utility-functions/addThumbnailParameter';

const CLIENT_API_PATH = `${process.env.NEXT_PUBLIC_INTEGRATION_LAYER_PROXY_PATH}`;
const SERVER_API_URL = `${process.env.INTEGRATION_LAYER_URL}`;
const SEARCH_PATH = '/locations/search';
const AUTOCOMPLETE_PATH = '/locationApi/suggestLocation';

const LocationsSearchDefaultComponent = (
  props: LocationsSearchProps
): JSX.Element => (
  <div className={`component ${props?.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">LocationsSearch no datasource</span>
    </div>
  </div>
);

interface WithHeaderProps extends LocationsSearchProps {
  contentVariation: 'padding-small';
}

export const Default = (props: WithHeaderProps): JSX.Element => {
  const { fields, params, contentVariation } = props;
  const t = useTranslations(props?.page?.siteName);

  // Set up default baseline parameters from CMS
  const { defaultLimit, defaultOffset, baselineParams } =
    getBaselineParamsJson(props);
  const fallbackData = useComponentProps<SearchResponse>(props?.rendering?.uid);

  // Hooks
  const searchWrapperRef = useRef<HTMLDivElement>(null);
  const scrollRef = searchWrapperRef as RefObject<HTMLElement>;
  const {
    data,
    error,
    formHandlers,
    searchParams,
    autocompleteData,
    autocompleteError,
  } = useSearchForm<SearchResponse, Autocomplete>({
    baseUrl: CLIENT_API_PATH,
    searchPath: SEARCH_PATH,
    baselineParams: baselineParams,
    autocompletePath: AUTOCOMPLETE_PATH,
    autoCompleteSearchParamName: 'searchTerm',
    baselineAutocompleteParams: [
      ['provider', '1'],
      ['searchType', '1'],
    ],
    fallbackData,
    searchOnChange: false,
  });

  if (fallbackData && fallbackData.ip) {
    console.log(fallbackData.ip);
  }

  if (!fields) {
    return <LocationsSearchDefaultComponent {...props} />;
  }

  // Mutable query-based params
  const limit = Number(searchParams.get('limit')) || defaultLimit;
  const offset = Number(searchParams.get('offset')) || defaultOffset;

  // Computed properties
  const resultsCount = data?.response?.resultsCount || 0;
  const rangeStart = offset + 1;
  const rangeEnd = Math.min(offset + limit, resultsCount);
  const resultsRange = `${rangeStart}-${rangeEnd}`;

  // Parse filter options to be used in multiple components
  const filterCategories =
    props?.fields?.data?.item?.filterOptions?.targetItems?.map((category) => ({
      title: category?.header?.value || category?.header?.value || '',
      fields: category.filters?.targetItems.map((option) => {
        const { id, key, value, displayName } = unpackFilterOptionJson(option);
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
  const { headingTag, subheadingTag } = getHeadingTags(
    props?.params,
    props?.fields?.data?.item?.heading?.jsonValue?.value
  );
  return (
    <form {...formHandlers}>
      <Themes theme={params?.Theme || 'G-HCA-Orange'}>
        <HeaderPlain
          contentVariation={contentVariation}
          heading={
            <Text
              variation={
                props.params?.HeadingSize ||
                getDynamicTitleStyle(
                  props?.fields?.data?.item?.title?.jsonValue?.value?.length
                )
              }
              tag={headingTag}
            >
              <JssText field={props?.fields?.data?.item?.title?.jsonValue} />
            </Text>
          }
          metatitle={
            <Text tag={subheadingTag} variation="subheading-1">
              <JssText field={props?.fields?.data?.item?.heading?.jsonValue} />
            </Text>
          }
          description={
            <Text tag="div" variation="body-large">
              <JssRichText
                tag="span"
                field={props?.fields?.data?.item?.text?.jsonValue}
              />
            </Text>
          }
        >
          <>
            <SearchBar
              defaultValue={
                searchParams.get('input') ||
                searchParams.get('autocomplete') ||
                undefined
              }
              name={'input'}
              placeholder={fields?.data?.item?.searchPlaceholder?.value}
              suggestions={
                autocompleteError
                  ? []
                  : autocompleteData?.map((result) => `${result.LocationName}`)
              }
              locationCta={<GeolocationPermissionsCta />}
              error={'Please select a location from the dropdown'}
              scrollRef={scrollRef}
            >
              <Filters
                submitOnClose={true}
                buttonText={
                  <JssText field={fields?.data?.item?.filterOptionsText} />
                }
                buttonIcon={
                  <SitecoreSvg>
                    {
                      props?.fields?.data?.item?.filterOptionsIcon?.targetItem
                        ?.svgMarkup?.value
                    }
                  </SitecoreSvg>
                }
                resultsCount={resultsCount}
                filters={filterCategories?.map((category) => ({
                  title: category.title,
                  contentVariation: 'filters',
                  children: (
                    <Checkboxes>
                      {category.fields?.map((props) => {
                        return <Checkbox {...props} key={props.id} />;
                      })}
                    </Checkboxes>
                  ),
                }))}
              />
              <Sorting
                buttonText={
                  <JssText field={fields?.data?.item?.sortOptionsText} />
                }
                buttonIcon={
                  <SitecoreSvg>
                    {
                      props?.fields?.data?.item?.sortOptionsIcon?.targetItem
                        ?.svgMarkup?.value
                    }
                  </SitecoreSvg>
                }
                options={
                  props?.fields?.data?.item?.sortOptions?.targetItems?.map(
                    (option) => {
                      const { id, key, value, displayName } =
                        unpackFilterOptionJson(option);

                      return {
                        id,
                        value,
                        labelText: displayName,
                        name: key,
                        defaultChecked: searchParams?.get(key) === value,
                      };
                    }
                  ) || []
                }
              />
            </SearchBar>
            <SearchFilterList
              filters={activeFilters || []}
              clearFilters={() => {
                activeFilters?.forEach(({ id }, index) => {
                  const field = document.getElementById(id) as HTMLInputElement;
                  if (!field) return;
                  if (index === activeFilters.length - 1) {
                    field.click(); // interact with last field to trigger a form change event
                  } else {
                    field.checked = false; // update other fields without triggering form change event
                  }
                });
              }}
            />
          </>
        </HeaderPlain>
      </Themes>

      <Themes theme={params?.CardTheme || 'A-HCA-White'}>
        {error || !resultsCount ? (
          <ErrorMessage />
        ) : (
          <SearchWrapper
            ref={searchWrapperRef}
            searchDetail={
              <Text tag="h3" variation="heading-1">
                <SearchDetail
                  searchResultsTextWithInput={
                    fields?.data?.item?.searchResultsTextWithInput?.value
                  }
                  searchResultsText={
                    fields?.data?.item?.searchResultsText?.value
                  }
                  resultsCount={resultsCount}
                  input={
                    searchParams.get('input') ||
                    searchParams.get('autocomplete') ||
                    undefined
                  }
                />
              </Text>
            }
            showing={
              !!rangeEnd && (
                <Text variation="body-medium">
                  <span>
                    {t('showing') || 'Showing'} {resultsRange}
                  </span>
                </Text>
              )
            }
            tabbedResults={[
              {
                tab: {
                  icon: (
                    <SitecoreSvg>
                      {
                        props?.fields?.data?.item?.gridViewIcon?.targetItem
                          ?.svgMarkup?.value
                      }
                    </SitecoreSvg>
                  ),
                  label: props?.fields?.data?.item?.gridViewText?.value,
                },
                tabContent: (
                  <>
                    <CardGrid>
                      {data?.response?.results?.map(({ data }) => {
                        const {
                          id,
                          abstractTitle,
                          abstractImageUrl,
                          primaryImageUrl,
                          title,
                          description,
                          imageUrl,
                          url,
                          directions,
                          googlePlaceId,
                          geocodedCoordinate,
                        } = data;

                        const cardImageSrc = ImageUrl(
                          abstractImageUrl,
                          primaryImageUrl,
                          imageUrl
                        );

                        const directionsLink = returnDirections(
                          googlePlaceId,
                          directions,
                          geocodedCoordinate
                        );

                        return (
                          <CardMap
                            key={id}
                            title={
                              <Text variation="heading-1" tag="h4">
                                {abstractTitle ? abstractTitle : title}
                              </Text>
                            }
                            address={
                              description ? (
                                <Text variation="body-large">
                                  {description}
                                </Text>
                              ) : undefined
                            }
                            image={
                              cardImageSrc !== undefined ? (
                                <Image
                                  src={upsertQuerystringParam(
                                    cardImageSrc || '',
                                    't',
                                    'w750'
                                  )}
                                  alt=""
                                  quality={90}
                                  width="560"
                                  height="420"
                                />
                              ) : undefined
                            }
                            ctas={{
                              button1: url ? (
                                <Button size={'large'} variation={'full'}>
                                  <a href={url}>
                                    <JssRichText
                                      field={
                                        props?.fields?.data?.item?.cTACardText
                                      }
                                    />
                                  </a>
                                </Button>
                              ) : undefined,
                              button2: directionsLink ? (
                                <TextButton>
                                  <a
                                    href={directionsLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <span>
                                      <JssText
                                        field={
                                          fields.data?.item?.getDirectionsText
                                        }
                                      />
                                    </span>
                                  </a>
                                </TextButton>
                              ) : undefined,
                            }}
                          />
                        );
                      })}
                    </CardGrid>
                    {/* <SearchFormLoadMore
                      limit={limit}
                      resultsCount={resultsCount}
                      defaultLimit={defaultLimit}
                    >
                      <span>
                        <Icons iconName={'iconPlus'} />
                      </span>
                      <span>{t('show-more') || 'Show more'}</span>
                    </SearchFormLoadMore> */}
                    <SearchFormPagination
                      offset={offset}
                      limit={limit}
                      resultsCount={resultsCount}
                      scrollToRef={scrollRef}
                    />
                  </>
                ),
              },
              {
                tab: {
                  icon: (
                    <SitecoreSvg>
                      {
                        props?.fields?.data?.item?.mapViewIcon?.targetItem
                          ?.svgMarkup?.value
                      }
                    </SitecoreSvg>
                  ),
                  label: props?.fields?.data?.item?.mapViewText?.value,
                },
                tabContent: (
                  <LocationMap
                    apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
                    locations={
                      data?.response?.results.map(({ data }) => ({
                        center: {
                          lat: Number(data.lat) || 0,
                          lng: Number(data.lng) || 0,
                        },
                        card: (hideCard) => (
                          <CardMap
                            title={
                              <Text tag="h3" variation="heading-2">
                                {data.title}
                              </Text>
                            }
                            address={
                              <Text tag="p" variation="body-large">
                                {data.description}
                              </Text>
                            }
                            ctas={{
                              button1: (
                                <a href={data.url}>
                                  <JssRichText
                                    field={
                                      props?.fields?.data?.item?.cTACardText
                                    }
                                  />
                                </a>
                              ),
                              button2: returnDirections(
                                data.googlePlaceId,
                                data.directions,
                                data.geocodedCoordinate
                              ) ? (
                                <a
                                  href={returnDirections(
                                    data.googlePlaceId,
                                    data.directions,
                                    data.geocodedCoordinate
                                  )}
                                >
                                  <span>
                                    <JssText
                                      field={
                                        fields?.data?.item?.getDirectionsText
                                      }
                                    />
                                  </span>
                                </a>
                              ) : undefined,
                              close: (
                                <button onClick={hideCard}>
                                  <span>{t('close') || 'Close'}</span>
                                  <Icons iconName="iconCross" />
                                </button>
                              ),
                            }}
                          />
                        ),
                      })) || []
                    }
                  />
                ),
              },
            ]}
          />
        )}
      </Themes>
    </form>
  );
};

export const WithHeader = (props: LocationsSearchProps): JSX.Element => {
  if (!props.fields) {
    return <LocationsSearchDefaultComponent {...props} />;
  }

  return <Default {...props} contentVariation="padding-small" />;
};

// Pre-fetch response data on the server, to be consumed as fallbackData by SWR, and into initial HTML response.
export const getComponentServerProps: GetComponentServerProps = async (
  rendering: ApiSearchPropsJson
) => {
  const { baselineParams } = getBaselineParamsJson(rendering);
  const params = baselineParams.map((entry) => `${entry[0]}=${entry[1]}`); // Compute as query strings
  const query = `?${params.join('&')}`;
  const url = new URL(query, `${SERVER_API_URL}${SEARCH_PATH}`); // compose API url

  try {
    const response = await fetch(url);
    if (response.ok) {
      const fallbackData = await response.json();

      const res = await fetch('https://api.ipify.org/?format=text');
      const ip = await res.text();

      fallbackData.ip = ip;
      return fallbackData;
    } else {
      throw response.statusText;
    }
  } catch (error) {
    console.error(
      {
        message: 'LocationSearch server-side data fetching error',
        error: error,
        requestUrl: url.href,
      },
      error
    );
    return { locations: [] };
  }
};
