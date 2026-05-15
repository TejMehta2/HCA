'use client';
import { Suspense, type JSX } from 'react';
import { RichText, Text as JssText } from '@sitecore-content-sdk/nextjs';
import Text from '@component-library/foundation/Text/Text';
import HeaderPlain, {
  getDynamicTitleStyle,
} from '@component-library/site-components/HeaderPlain/HeaderPlain';
import { BlogPageHeaderProps } from './BlogPageHeader.types';
import SearchFilterList from '@component-library/components/SearchFilterList/SearchFilterList';
import Checkbox from '@component-library/core-components/Checkbox/Checkbox';
import Checkboxes from '@component-library/core-components/Checkboxes/Checkboxes';
import Themes from '@component-library/foundation/Themes/Themes';
import useSearchForm from '@component-library/hooks/useSearchForm/useSearchForm';
import { Autocomplete, BlogResponse } from '../BlogSearch/BlogSearch.types';
import getBaselineParams from 'lib/getBaselineParams';
import SitecoreSvg from 'src/jss-abstractions/SitecoreSvg/SitecoreSvg';
import SearchBar from '@component-library/components/SearchBar/SearchBar';
import Filters from '@component-library/site-components/Filters/Filters';
import { ApiSearchProps } from 'src/types/searchProps';
import unpackFilterOption from 'lib/unpackFilterOption';
import getHeadingTags from 'lib/getHeadingTags';

const CLIENT_API_PATH = `${process.env.NEXT_PUBLIC_INTEGRATION_LAYER_PROXY_PATH}/articles`;
const SEARCH_PATH = '/search';

const BlogPageHeaderDefaultComponent = (): JSX.Element => {
  return <></>;
};

const DefaultContent = (props: BlogPageHeaderProps): JSX.Element => {
  const { fields, params } = props;

  // Set up default baseline parameters from CMS
  const { baselineParams, baselineAutocompleteParams } = getBaselineParams(
    props as ApiSearchProps
  );

  // Hooks
  const {
    data,
    formHandlers,
    searchParams,
    autocompleteData,
    autocompleteError,
  } = useSearchForm<BlogResponse, Autocomplete>({
    baseUrl: CLIENT_API_PATH,
    searchPath: SEARCH_PATH,
    baselineParams: [...baselineParams],
    redirectUrl: fields?.BlogUrl?.value.href || '',
    baselineAutocompleteParams,
  });

  if (!fields) {
    return <BlogPageHeaderDefaultComponent />;
  }
  // Computed properties
  const resultsCount = data?.response?.resultsCount || 0;

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
  return (
    <form {...formHandlers}>
      <Themes theme={params?.Theme || 'A-HCA-White'}>
        <HeaderPlain
          heading={
            <Text
              tag={headingTag}
              variation={
                props.params?.HeadingSize ||
                getDynamicTitleStyle(fields?.Title?.value?.length)
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
            searchOnEnter={true}
            defaultValue={searchParams.get('input') || undefined}
            name={'input'}
            placeholder={fields?.SearchPlaceholder?.value}
            suggestions={
              autocompleteError
                ? []
                : autocompleteData?.response?.results?.map(
                    (result: { value: string }) => `${result.value}`
                  )
            }
          >
            <Filters
              submitOnClose={true}
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
    </form>
  );
};

export const Default = (props: BlogPageHeaderProps): JSX.Element => (
  <Suspense fallback={null}>
    <DefaultContent {...props} />
  </Suspense>
);
