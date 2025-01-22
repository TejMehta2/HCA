import React, { useRef } from 'react';
import {
  GetStaticComponentProps,
  Text as JssText,
  RichText,
} from '@sitecore-jss/sitecore-jss-nextjs';
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
} from '../../types/searchProps';
import useSearchForm from '@component-library/hooks/useSearchForm/useSearchForm';
import SearchFormPagination from '@component-library/yext/SearchFormPagination/SearchFormPagination';
// import SearchFormLoadMore from '@component-library/yext/SearchFormLoadMore/SearchFormLoadMore';
import getBaselineParams from 'lib/getBaselineParams';
import Themes from '@component-library/foundation/Themes/Themes';
import SitecoreSvg from 'src/jss-abstractions/SitecoreSvg/SitecoreSvg';
import Sorting from '@component-library/components/Sorting/Sorting';
import SearchFilterList from '@component-library/components/SearchFilterList/SearchFilterList';
import HeaderPlain, {
  getDynamicTitleStyle,
} from '@component-library/site-components/HeaderPlain/HeaderPlain';
import SearchWrapper from '@component-library/site-components/SearchWrapper/SearchWrapper';
import unpackFilterOption from 'lib/unpackFilterOption';
import ErrorMessage from '@component-library/site-components/ErrorMessage/ErrorMessage';
import { useI18n } from 'next-localization';
import SearchDetail from '@component-library/hooks/useSearchForm/components/SearchDetail';
import ImageUrl from 'src/jss-abstractions/ImageUrl';
import getHeadingTags from 'lib/getHeadingTags';

const CLIENT_API_PATH = `${process.env.NEXT_PUBLIC_INTEGRATION_LAYER_PROXY_PATH}/patientstories`;
const SERVER_API_URL = `${process.env.INTEGRATION_LAYER_URL}/patientstories`;
const SEARCH_PATH = '/search';

const PatientStoriesSearchDefaultComponent = (
  props: ApiSearchProps
): JSX.Element => (
  <div className={`component ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">PatientStoriesSearch no datasource</span>
    </div>
  </div>
);

export const Default = (props: ApiSearchProps): JSX.Element => {
  const { fallbackData, fields, params } = props;
  const { t } = useI18n();

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
  } = useSearchForm<ApiResponse, Autocomplete>({
    baseUrl: CLIENT_API_PATH,
    searchPath: SEARCH_PATH,
    baselineParams,
    fallbackData: fallbackData,
    baselineAutocompleteParams,
  });

  if (fallbackData && fallbackData.ip) {
    console.log(fallbackData.ip);
  }

  if (!fields) {
    return <PatientStoriesSearchDefaultComponent {...props} />;
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
    props.fields?.Heading?.value
  );
  return (
    <form {...formHandlers}>
      <Themes theme={params?.Theme || 'J-HCA-Tangerine-20'}>
        <HeaderPlain
          metatitle={
            fields?.Heading?.value && (
              <Text tag={subheadingTag} variation={'subheading-1'}>
                <JssText field={fields?.Heading} />
              </Text>
            )
          }
          heading={
            fields?.Title?.value && (
              <Text
                variation={
                  params?.HeadingSize ||
                  getDynamicTitleStyle(fields?.Title.value.length)
                }
                tag={headingTag}
              >
                <JssText field={fields?.Title} />
              </Text>
            )
          }
          description={
            <Text tag="div" variation="body-large">
              <RichText tag="span" field={props?.fields?.Text} />
            </Text>
          }
        >
          <>
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
          >
            <CardGrid>
              {data?.response.results?.map((item, index) => {
                const { data } = item;

                const {
                  abstractTitle,
                  abstractText,
                  abstractImageUrl,
                  title,
                  description,
                  imageUrl,
                  primaryImageUrl,
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
                          width="363"
                          height="243"
                        />
                      ) : undefined
                    }
                    link={
                      <a href={url}>
                        <RichText field={props.fields?.CTACardText} />
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
              scrollToRef={searchWrapperRef}
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
          </SearchWrapper>
        )}
      </Themes>
    </form>
  );
};

// Pre-fetch response data on the server, to be consumed as fallbackData by SWR, and into initial HTML response.
export const getStaticProps: GetStaticComponentProps = async (
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
      const res = await fetch('https://api.ipify.org/?format=text');
      const ip = await res.text();

      fallbackData.ip = ip;
      return rendering;
    } else {
      throw response.statusText;
    }
  } catch (error) {
    console.error(error);
    return rendering;
  }
};
