'use client';

import { type JSX, type RefObject, useRef } from 'react';
import {
  GetComponentServerProps,
  Text as JssText,
  RichText as JssRichText,
} from '@sitecore-content-sdk/nextjs';
import SearchBar from '@component-library/components/SearchBar/SearchBar';
import Text from '@component-library/foundation/Text/Text';
import Checkboxes from '@component-library/core-components/Checkboxes/Checkboxes';
import Checkbox from '@component-library/core-components/Checkbox/Checkbox';
import Filters from '@component-library/site-components/Filters/Filters';
import CardContent from '@component-library/components/CardContent/CardContent';
import Image from 'next/image';
import CardGrid from '@component-library/site-components/CardGrid/CardGrid';
import {
  Autocomplete,
  ApiResponse,
  ApiSearchProps,
} from 'src/types/searchProps';
import useSearchForm from '@component-library/hooks/useSearchForm/useSearchForm';
import SearchFormPagination from '@component-library/yext/SearchFormPagination/SearchFormPagination';
//import SearchFormLoadMore from '@component-library/yext/SearchFormLoadMore/SearchFormLoadMore';
//import Icons from '@component-library/foundation/Icons/Icons';
import getBaselineParams from 'lib/getBaselineParams';
import SearchContainer from '@component-library/site-components/SearchContainer/SearchContainer';
import Themes from '@component-library/foundation/Themes/Themes';
import SitecoreSvg from 'src/jss-abstractions/SitecoreSvg/SitecoreSvg';
import Sorting from '@component-library/components/Sorting/Sorting';
import SearchFilterList from '@component-library/components/SearchFilterList/SearchFilterList';
import unpackFilterOption from 'lib/unpackFilterOption';
import ErrorMessage from '@component-library/site-components/ErrorMessage/ErrorMessage';
import { useTranslations } from 'next-intl';
import SearchDetail from '@component-library/hooks/useSearchForm/components/SearchDetail';
import ImageUrl from 'src/jss-abstractions/ImageUrl';

const CLIENT_API_PATH = `${process.env.NEXT_PUBLIC_INTEGRATION_LAYER_PROXY_PATH}/servicelines`;
const SERVER_API_URL = `${process.env.INTEGRATION_LAYER_URL}/servicelines`;
const SEARCH_PATH = '/search';

const ServiceLinesSearchDefaultComponent = (
  props: ApiSearchProps
): JSX.Element => (
  <div className={`component ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">ServiceLinesSearch no datasource</span>
    </div>
  </div>
);

export const Default = (props: ApiSearchProps): JSX.Element => {
  const { fallbackData, fields, params } = props;
  const t = useTranslations();

  // Set up default baseline parameters from CMS
  const {
    defaultLimit,
    defaultOffset,
    baselineParams,
    baselineAutocompleteParams,
  } = getBaselineParams(props);

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
  } = useSearchForm<ApiResponse, Autocomplete>({
    baseUrl: CLIENT_API_PATH,
    searchPath: SEARCH_PATH,
    baselineParams,
    fallbackData: fallbackData,
    baselineAutocompleteParams,
  });

  if (!fields) {
    return <ServiceLinesSearchDefaultComponent {...props} />;
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
    title: category?.fields.Header?.value || category?.displayName || '',
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
    <Themes theme={params?.Theme || 'J-HCA-Tangerine-20'}>
      <form {...formHandlers}>
        <SearchContainer ref={searchWrapperRef}>
          {fields?.Heading?.value && (
            <Text variation={'subheading-1'}>
              <JssText field={fields?.Heading} />
            </Text>
          )}
          {fields?.Title?.value && (
            <Text
              variation={params?.HeadingSize || 'display-3'}
              tag={params?.HeadingTag || 'h2'}
            >
              <JssText field={fields?.Title} />
            </Text>
          )}
          {fields?.Text?.value && (
            <Text variation="body-large" tag="div">
              <JssRichText tag="div" field={fields?.Text} />
            </Text>
          )}
          <SearchBar
            defaultValue={searchParams.get('input') || undefined}
            name={'input'}
            placeholder={fields?.SearchPlaceholder?.value}
            suggestions={
              autocompleteError
                ? []
                : autocompleteData?.response.results?.map(
                    (result) => `${result.value}`
                  )
            }
          >
            <Filters
              buttonText={<JssText field={fields?.FilterOptionsText} />}
              buttonIcon={
                <SitecoreSvg>
                  {props?.fields?.FilterOptionsIcon?.fields?.SvgMarkup?.value}
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
              buttonText={<JssText field={fields?.SortOptionsText} />}
              buttonIcon={
                <SitecoreSvg>
                  {props?.fields?.SortOptionsIcon?.fields?.SvgMarkup?.value}
                </SitecoreSvg>
              }
              options={
                props?.fields?.SortOptions?.map((option) => {
                  const { id, key, value, displayName } =
                    unpackFilterOption(option);

                  return {
                    id,
                    value,
                    labelText: displayName,
                    name: key,
                    defaultChecked: searchParams?.get(key) === value,
                  };
                }) || []
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
          <Text tag="h3" variation="heading-1">
            <SearchDetail
              searchResultsTextWithInput={
                fields?.SearchResultsTextWithInput?.value
              }
              searchResultsText={fields?.SearchResultsText?.value}
              resultsCount={resultsCount}
              input={
                searchParams.get('input') ||
                searchParams.get('autocomplete') ||
                undefined
              }
            />
          </Text>
          {!!rangeEnd && (
            <Text variation="body-medium">
              <span>
                {t('showing') || 'Showing'} {resultsRange}
              </span>
            </Text>
          )}
          {error || !resultsCount ? (
            <ErrorMessage contentVariation={'no-container'} />
          ) : (
            <>
              <CardGrid>
                {data?.response.results?.map((item, index) => {
                  const { data } = item;
                  const {
                    abstractTitle,
                    abstractText,
                    abstractImageUrl,
                    primaryImageUrl,
                    title,
                    description,
                    imageUrl,
                    url,
                  } = data;

                  const cardImageSrc = ImageUrl(
                    abstractImageUrl,
                    primaryImageUrl,
                    imageUrl
                  );

                  return (
                    <CardContent
                      key={index}
                      title={
                        <Text variation="heading-1" tag="h4">
                          {abstractTitle ? abstractTitle : title}
                        </Text>
                      }
                      bodyCopy={
                        <Text tag={'div'} variation="body-large" isHtml={true}>
                          {abstractText ? abstractText : description}
                        </Text>
                      }
                      image={
                        cardImageSrc !== undefined ? (
                          <Image
                            src={cardImageSrc}
                            alt=""
                            quality={90}
                            width="560"
                            height="420"
                          />
                        ) : undefined
                      }
                      link={
                        <a href={url}>
                          <JssRichText field={props.fields?.CTACardText} />
                        </a>
                      }
                    />
                  );
                })}
              </CardGrid>

              <SearchFormPagination
                offset={offset}
                limit={limit}
                resultsCount={resultsCount}
                scrollToRef={scrollRef}
              />
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
            </>
          )}
        </SearchContainer>
      </form>
    </Themes>
  );
};

// Pre-fetch response data on the server, to be consumed as fallbackData by SWR, and into initial HTML response.
export const getComponentServerProps: GetComponentServerProps = async (
  rendering: ApiSearchProps
) => {
  const { baselineParams } = getBaselineParams(rendering);
  const params = baselineParams.map((entry) => `${entry[0]}=${entry[1]}`); // Compute as query strings
  const query = `?${params.join('&')}`;
  const url = new URL(query, `${SERVER_API_URL}${SEARCH_PATH}`); // compose API url

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
    console.error(
      {
        message: 'ServiceLinesSearch server-side data fetching error',
        error: error,
        requestUrl: url.href,
      },
      error
    );
    return { serviceLines: [] };
  }
};
