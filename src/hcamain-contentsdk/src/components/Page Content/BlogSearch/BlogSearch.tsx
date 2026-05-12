'use client';

import { RefObject, type JSX, useRef } from 'react';

import {
  Text as JssText,
  RichText,
} from '@sitecore-content-sdk/nextjs';
import SearchBar from '@component-library/components/SearchBar/SearchBar';
import Text from '@component-library/foundation/Text/Text';
import Checkboxes from '@component-library/core-components/Checkboxes/Checkboxes';
import Checkbox from '@component-library/core-components/Checkbox/Checkbox';
import Filters from '@component-library/site-components/Filters/Filters';
import Image from 'next/image';
import CardGrid from '@component-library/site-components/CardGrid/CardGrid';
import CardBlog from '@component-library/components/CardBlog/CardBlog';
import {
  Autocomplete,
  BlogResponse,
  BlogSearchProps,
} from './BlogSearch.types';
import useSearchForm from '@component-library/hooks/useSearchForm/useSearchForm';
import SearchFormPagination from '@component-library/yext/SearchFormPagination/SearchFormPagination';
import getBaselineParams from 'lib/getBaselineParams';
import SearchContainer from '@component-library/site-components/SearchContainer/SearchContainer';
import Themes from '@component-library/foundation/Themes/Themes';
import SitecoreSvg from 'src/jss-abstractions/SitecoreSvg/SitecoreSvg';
import SearchFilterList from '@component-library/components/SearchFilterList/SearchFilterList';
import HeaderPlain, {
  getDynamicTitleStyle,
} from '@component-library/site-components/HeaderPlain/HeaderPlain';
import Tags from '@component-library/core-components/Tags/Tags';
import formatDate from 'src/jss-abstractions/JssDate/formatDate';
import unpackFilterOption from 'lib/unpackFilterOption';
import ErrorMessage from '@component-library/site-components/ErrorMessage/ErrorMessage';
import { useTranslations } from 'next-intl';
import SearchDetail from '@component-library/hooks/useSearchForm/components/SearchDetail';
import ImageUrl from 'src/jss-abstractions/ImageUrl';
import getHeadingTags from 'lib/getHeadingTags';
import { upsertQuerystringParam } from 'lib/utility-functions/addThumbnailParameter';

const CLIENT_API_PATH = `${process.env.NEXT_PUBLIC_INTEGRATION_LAYER_PROXY_PATH}/articles`;
const SERVER_API_URL = `${process.env.INTEGRATION_LAYER_URL}/articles`;
const SEARCH_PATH = '/search';

const BlogSearchDefaultComponent = (props: BlogSearchProps): JSX.Element => (
  <div className={`component ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">BlogSearch no datasource</span>
    </div>
  </div>
);

export const Default = (props: BlogSearchProps): JSX.Element => {
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
  const {
    data,
    error,
    formHandlers,
    searchParams,
    autocompleteData,
    autocompleteError,
  } = useSearchForm<BlogResponse, Autocomplete>({
    baseUrl: CLIENT_API_PATH,
    searchPath: SEARCH_PATH,
    baselineParams,
    fallbackData: fallbackData,
    baselineAutocompleteParams,
  });

  if (!fields) {
    return <BlogSearchDefaultComponent {...props} />;
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
  const { headingTag, subheadingTag } = getHeadingTags(
    props?.params,
    fields?.Heading?.value,
    'h1'
  );

  const hasFilters = filterCategories?.some(
    (category) => category.fields && category.fields.length > 0
  );

  return (
    <form {...formHandlers}>
      <Themes theme={params?.Theme || 'A-HCA-White'}>
        <HeaderPlain
          heading={
            <Text
              tag={headingTag}
              variation={
                props.params?.HeadingSize ||
                getDynamicTitleStyle(props?.fields?.Title?.value.length)
              }
            >
              <JssText field={props?.fields?.Title} />
            </Text>
          }
          metatitle={
            !!fields?.Heading?.value && (
              <Text tag={subheadingTag} variation={'subheading-1'}>
                <JssText field={fields?.Heading} />
              </Text>
            )
          }
          description={
            <Text tag="div" variation="body-large">
              <RichText tag="span" field={props?.fields?.Text} />
            </Text>
          }
        >
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
            {hasFilters && (
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
            )}
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
        </HeaderPlain>
      </Themes>
      <Themes theme={params?.CardTheme || 'A-HCA-White'}>
        <SearchContainer ref={searchWrapperRef}>
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
            <ErrorMessage contentVariation="no-container" />
          ) : (
            <>
              <CardGrid>
                {data?.response.results?.map((item, index) => {
                  const { data } = item;
                  const {
                    abstractTitle,
                    abstractImageUrl,
                    title,
                    imageUrl,
                    primaryImageUrl,
                    url,
                    date,
                    typeName,
                  } = data;

                  const cardImageSrc = ImageUrl(
                    abstractImageUrl,
                    primaryImageUrl,
                    imageUrl
                  );

                  return (
                    <CardBlog key={index}>
                      {cardImageSrc !== undefined ? (
                        <Image
                          src={upsertQuerystringParam(
                            cardImageSrc,
                            't',
                            'w750'
                          )}
                          alt=""
                          width="560"
                          height="420"
                          quality={90}
                        />
                      ) : undefined}
                      <time>{formatDate(new Date(date))}</time>
                      <Text tag={'h3'} variation={'heading-2'}>
                        <a href={url}>
                          {abstractTitle ? abstractTitle : title}
                        </a>
                      </Text>
                      <div>
                        {!!typeName && (
                          <Tags>
                            <span>{typeName}</span>
                          </Tags>
                        )}
                      </div>
                    </CardBlog>
                  );
                })}
              </CardGrid>
              <SearchFormPagination
                offset={offset}
                limit={limit}
                resultsCount={resultsCount}
                scrollToRef={searchWrapperRef as RefObject<HTMLElement>}
              />
            </>
          )}
        </SearchContainer>
      </Themes>
    </form>
  );
};

// Pre-fetch response data on the server, to be consumed as fallbackData by SWR, and into initial HTML response.
export const getStaticProps = async (
  rendering: BlogSearchProps
) => {
  const { baselineParams } = getBaselineParams(rendering);
  const params = baselineParams.map(
    (entry: [string, string]) => `${entry[0]}=${entry[1]}`
  ); // Compute as query strings
  const query = `?${params.join('&')}`;
  const url = new URL(query, `${SERVER_API_URL}${SEARCH_PATH}`); // compose API url

  try {
    const response = await fetch(url.href);
    if (response.ok) {
      const fallbackData = await response.json();
      rendering.fallbackData = fallbackData as BlogResponse;
      return rendering;
    } else {
      throw response.statusText;
    }
  } catch (error) {
    console.error(
      {
        message: 'BlogSearch server-side data fetching error',
        error: error,
        requestUrl: url.href,
      },
      error
    );
    return { blog: [] };
  }
};
