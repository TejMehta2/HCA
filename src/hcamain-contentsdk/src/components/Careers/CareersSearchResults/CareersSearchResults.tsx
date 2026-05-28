'use client';

import React, {
  Suspense,
  useEffect,
  useMemo,
  useState,
  type JSX,
} from 'react';

import Params from 'src/types/params';
import Themes from '@component-library/foundation/Themes/Themes';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import { JobsResponse } from '../CareersSearchHero/CareersSearchHero.types';
import YextResultCardCareers from '@component-library/yext/YextResultCardCareers/YextResultCardCareers';
import Button from '@component-library/core-components/Button/Button';
import Text from '@component-library/foundation/Text/Text';
import Icons from '@component-library/foundation/Icons/Icons';
import CareerSearchResults from '@component-library/careers/CareersSearchResults/CareersSearchResults';
import ErrorMessage from '@component-library/site-components/ErrorMessage/ErrorMessage';
import { ComponentWithContextProps } from 'lib/component-props';
import LoaderCF from '@component-library/consultant-finder/LoaderCF/LoaderCF';
import { useTranslations } from 'next-intl';

interface Fields {
  ReadMoreCtaText?: { value?: string };
}

type CareersSearchResultsProps = ComponentWithContextProps & {
  params?: Params;
  fields?: Fields;
  rendering?: {
    uid?: string;
  };
};

type JobResult = JobsResponse['response']['results'][number];

const CareersSearchResultsDefaultComponent = (
  props: CareersSearchResultsProps
): JSX.Element => {
  const isExperienceEditor = props.page.mode.isEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            Careers Search Results. Please click to select datasource
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

const DefaultContent = (props: CareersSearchResultsProps): JSX.Element => {
  const searchParams = useSearchParams(); // dynamic reference to page URL query params (e.g. &input=job&jobLocation=London )
  const [offset, setOffset] = useState(0);
  const [results, setResults] = useState<JobResult[]>([]);
  const [resultsCount, setResultsCount] = useState(0);
  const t = useTranslations(props?.page?.siteName);
  const searchQuery = useMemo(
    () =>
      [...searchParams.entries()]
        .filter(
          ([key, value]) =>
            value?.length && key !== 'limit' && key !== 'offset'
        )
        .map(([key, value]) => `${key}=${value}`)
        .join('&'),
    [searchParams]
  );
  const [activeSearchQuery, setActiveSearchQuery] = useState(searchQuery);

  const resultsPerPage = 10;
  const isNewSearch = activeSearchQuery !== searchQuery;
  const requestOffset = isNewSearch ? 0 : offset;

  useEffect(() => {
    setActiveSearchQuery(searchQuery);
    setOffset(0);
    setResults([]);
    setResultsCount(0);
  }, [searchQuery]);

  /* 
    New search on each searchParams change
    searchParams are either:
    - updated by search bar or filters Moo12on same page
    - available on page load (redirect from e.g. careers home or user copy/paste)
  */
  const {
    data: response,
    error,
    isLoading,
    isValidating,
  } = useSWR<JobsResponse['response']>(
    `${
      process.env.NEXT_PUBLIC_INTEGRATION_LAYER_PROXY_PATH
    }/careers/search?verticalKey=jobs&limit=${resultsPerPage}&offset=${requestOffset}${
      searchQuery ? `&${searchQuery}` : ''
    }`,
    (url: string) =>
      fetch(url)
        .then((res) => res.json())
        .then((data) => data.response),
    {
      revalidateOnFocus: false, // Prevent re-render components when user re-opens browser tab/window
    }
  );
  const isResultsLoading = isLoading || isValidating;

  useEffect(() => {
    if (!response) {
      return;
    }

    setResultsCount(Number(response.resultsCount) || 0);
    setResults((previousResults) => {
      const nextResults = response.results || [];

      if (requestOffset === 0) {
        return nextResults;
      }

      const loadedResultIds = new Set(
        previousResults.map((job) => job.data.id)
      );
      const newResults = nextResults.filter(
        (job) => !loadedResultIds.has(job.data.id)
      );

      return [...previousResults, ...newResults];
    });
  }, [requestOffset, response]);

  if (!props?.fields) {
    return <CareersSearchResultsDefaultComponent {...props} />;
  }

  if (error && process.env.NODE_ENV === 'development') {
    console.error(error);
  }

  const hasResults = !isNewSearch && results.length > 0;
  const isInitialResultsLoading =
    (isResultsLoading || isNewSearch) && !hasResults;
  const isLoadingMoreResults = isResultsLoading && hasResults;
  const hasMoreResults = !isNewSearch && results.length < resultsCount;

  return (
    <Themes theme={props.params?.Theme || 'A-HCA-White'}>
      {isInitialResultsLoading ? (
        <CareerSearchResults
          results={<LoaderCF loadingMsg={t('loading-vacancies')} />}
        />
      ) : !hasResults ? (
        <ErrorMessage />
      ) : (
        <CareerSearchResults
          count={
            <>
              <Text variation="heading-1">
                {resultsCount} vacancies
              </Text>
              <Text variation="body-bold-medium">
                Showing 1 - {Math.min(resultsCount, results.length)}
              </Text>
            </>
          }
          results={
            <>
              {results.map((job) => {
                return (
                  <YextResultCardCareers
                    key={job.data.id}
                    location={job.data.jobLocation}
                    city={job.data.jobCity}
                    clinical={job.data.jobFunction}
                    timing={job.data.employmentType}
                    title={
                      <Text variation={'heading-1'}>{job.data.name}</Text>
                    }
                    cta={
                      <Button
                        contentVariation={'full-width'}
                        variation={'full'}
                        size={'small'}
                      >
                        <a
                          href={
                            job.data.landingPageUrl ||
                            job.data.applicationUrl ||
                            '#'
                          }
                        >
                          {props.fields?.ReadMoreCtaText?.value ||
                            'Read More & Apply'}
                        </a>
                      </Button>
                    }
                  />
                );
              })}
              {isLoadingMoreResults ? (
                <LoaderCF loadingMsg={t('loading-vacancies')} />
              ) : null}
            </>
          }
          cta={
            hasMoreResults ? (
              <Button size={'large'} variation={'full'}>
                <button
                  onClick={() => {
                    if (hasMoreResults && !isResultsLoading) {
                      setOffset(results.length);
                    }
                  }}
                  disabled={isResultsLoading || !hasMoreResults}
                >
                  <Icons iconName="iconPlus" />
                  <span>
                    Show <b>more</b>
                  </span>
                </button>
              </Button>
            ) : (
              <></>
            )
          }
        />
      )}
    </Themes>
  );
};

export const Default = (props: CareersSearchResultsProps): JSX.Element => {
  const t = useTranslations(props?.page?.siteName);
  return (
    <Suspense fallback={<LoaderCF loadingMsg={t('loading-vacancies')} />}>
      <DefaultContent {...props} />
    </Suspense>
  );
};
