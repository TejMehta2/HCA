import React, { useRef } from 'react';
import { Text as JssText, RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import SearchWrapper from '@component-library/site-components/SearchWrapper/SearchWrapper';
import HeaderPlain from '@component-library/site-components/HeaderPlain/HeaderPlain';
import SearchBar from '@component-library/components/SearchBar/SearchBar';
import Text from '@component-library/foundation/Text/Text';
import Checkboxes from '@component-library/core-components/Checkboxes/Checkboxes';
import Checkbox from '@component-library/core-components/Checkbox/Checkbox';
import Filters from '@component-library/site-components/Filters/Filters';
import Sorting from '@component-library/components/Sorting/Sorting';
import CardContent from '@component-library/components/CardContent/CardContent';
import Pagination from '@component-library/core-components/Pagination/Pagination';
import Image from 'next/image';
import CardGrid from '@component-library/site-components/CardGrid/CardGrid';
import {
  TestsAndScansResponse,
  TestAndScansSearchProps,
} from './TestsAndScansSearch.types';
import useSearchForm from 'src/hooks/useSearchForm/useSearchForm';

const TestAndScansSearchDefaultComponent = (
  props: TestAndScansSearchProps
): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">TestAndScansSearch no datasource</span>
    </div>
  </div>
);

export const Default = (props: TestAndScansSearchProps): JSX.Element => {
  // Hooks
  const paginationRef = useRef<HTMLInputElement>(null);
  const searchWrapperRef = useRef<HTMLDivElement>(null);

  const { data, error, formHandlers, searchParams } =
    useSearchForm<TestsAndScansResponse>({
      baseUrl: process.env.NEXT_PUBLIC_TESTS_AND_SCANS_REQUEST_URL as string,
    });

  if (!props.fields || error) {
    return <TestAndScansSearchDefaultComponent {...props} />;
  }

  // TODO - get/compute these from API response when API implemented
  const resultsPerPage = props.fields.ResultsPerPage.value || 12;
  const resultsLength = data?.scans?.length || 0;
  const resultsRange = `1-${resultsPerPage}`;
  const pageCount = 3;

  // Flatten CMS params for mapping
  const filterByList = props.fields.FilterBy.map(
    (item) => item.fields.Filter.value
  );
  const SearchByList = props.fields.SearchBy.map(
    (item) => item.fields.Filter.value
  );

  return (
    <>
      <form {...formHandlers}>
        {/* Map CMS params */}
        {[...filterByList, ...SearchByList].map((param) => (
          <input
            key={param}
            type={'hidden'}
            name={param.split('=')[0]}
            value={param.split('=')[0]}
          />
        ))}

        <SearchWrapper
          ref={searchWrapperRef}
          theme={props.params.Theme || 'I-HCA-Goldenrod'}
          header={
            <HeaderPlain
              subheading={
                <Text variation={'subheading-1'}>
                  <JssText field={props.fields.Heading} />
                </Text>
              }
              heading={
                <Text
                  variation={props.params.HeadingSize || 'display-4'}
                  tag={props.params.HeadingTag || 'h3'}
                >
                  <JssText field={props.fields.Title} />
                </Text>
              }
              search={
                <SearchBar
                  defaultValue={searchParams.get('searchString') || undefined}
                  name={'searchString'}
                  placeholder={props.fields.SearchPlaceholder.value}
                />
              }
              theme={props.params.Theme || 'I-HCA-Goldenrod'}
              filters={
                <Filters
                  buttonText={
                    <JssText field={props.fields.FilterOptionsText} />
                  }
                  buttonIcon={
                    props?.fields?.FilterOptionsIcon && (
                      <span
                        dangerouslySetInnerHTML={{
                          __html:
                            props?.fields?.FilterOptionsIcon.fields.SvgMarkup
                              .value,
                        }}
                      />
                    )
                  }
                  resultsCount={resultsLength}
                  filters={props.fields.FilterOptions.map(
                    (option, optionIndex) => ({
                      contentVariation: 'filters',
                      title: option.fields.Header.value,
                      children: (
                        <Checkboxes>
                          {option.fields.Filters.map((filter, filterIndex) => {
                            const queryParts =
                              filter.fields.Filter.value.split('=');
                            const queryKey = queryParts[0];
                            const queryValue = queryParts[1];
                            return (
                              <Checkbox
                                key={filterIndex}
                                id={
                                  filter.id ||
                                  `filter-${optionIndex}-${filterIndex}`
                                }
                                value={queryValue}
                                name={queryKey}
                                label={filter.fields.DisplayName.value}
                                defaultChecked={
                                  searchParams
                                    .getAll(queryKey)
                                    .includes(queryValue) || undefined
                                }
                              />
                            );
                          })}
                        </Checkboxes>
                      ),
                    })
                  )}
                />
              }
              sort={
                <Sorting
                  buttonText={<JssText field={props.fields.SortOptionsText} />}
                  buttonIcon={
                    props?.fields?.SortOptionsIcon && (
                      <span
                        dangerouslySetInnerHTML={{
                          __html:
                            props?.fields?.SortOptionsIcon.fields.SvgMarkup
                              .value,
                        }}
                      />
                    )
                  }
                  options={props.fields.SortOptions.map((option, index) => {
                    const queryParts = option.fields.Filter.value.split('=');
                    const queryKey = queryParts[0];
                    const queryValue = queryParts[1];
                    return {
                      id: option.id || `sort-by-${index}`,
                      value: queryValue,
                      labelText: option.fields.DisplayName.value,
                      name: queryKey,
                      defaultChecked: searchParams.get(queryKey) === queryValue,
                    };
                  })}
                />
              }
            >
              <Text variation="body-large" tag="div">
                <RichText field={props.fields.Text} />
              </Text>
            </HeaderPlain>
          }
          searchDetail={
            <Text tag="h3" variation="heading-1">
              <span>{resultsLength} </span>
              <JssText field={props.fields.SearchResultsText} />
            </Text>
          }
          showing={
            <Text variation="body-medium">
              <span>Showing {resultsRange}</span>
            </Text>
          }
        >
          <CardGrid theme={props.params.Theme || 'I-HCA-Goldenrod'}>
            {data?.scans?.map((item, index) => (
              <CardContent
                key={index}
                title={
                  <Text variation="heading-1" tag="h4">
                    {item.Title}
                  </Text>
                }
                bodyCopy={
                  <Text variation="body-large">{item.Description}</Text>
                }
                image={
                  <Image src={item.Image} alt="" width="363" height="243" />
                }
                // TODO have link come from API
                link={
                  <a href="#">
                    <span>
                      Learn <strong>more</strong>
                    </span>
                  </a>
                }
              />
            ))}
          </CardGrid>
          <>
            {pageCount > 1 && (
              <Pagination
                pageCount={pageCount}
                currentPage={Number(searchParams.get('page')) || 1}
                callback={(value) => {
                  // Convert state-based pagination callback to native HTML input change event
                  const pageField = paginationRef.current as HTMLInputElement;
                  if (pageField) {
                    const prevValue = pageField.value;
                    pageField.stepUp(value - Number(pageField.value));
                    const newValue = pageField.value;
                    if (prevValue !== newValue) {
                      const event = new Event('change', { bubbles: true });
                      pageField.dispatchEvent(event);
                      searchWrapperRef?.current?.scrollIntoView({
                        behavior: 'smooth',
                      });
                    }
                  }
                }}
              />
            )}
          </>
          <input
            type={'number'}
            className="sr-only"
            name="page"
            defaultValue={Number(searchParams.get('page'))}
            ref={paginationRef}
            max={pageCount}
            min={1}
            aria-label="page"
          />
        </SearchWrapper>
      </form>
    </>
  );
};
