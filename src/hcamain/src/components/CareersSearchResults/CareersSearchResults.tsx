import React, { useState } from 'react';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

import Params from 'src/types/params';
import Themes from '@component-library/foundation/Themes/Themes';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import { JobsResponse } from 'components/CareersSearchHero/CareersSearchHero.types';
import YextResultCardCareers from '@component-library/yext/YextResultCardCareers/YextResultCardCareers';
import Button from '@component-library/core-components/Button/Button';
import Text from '@component-library/foundation/Text/Text';
import Icons from '@component-library/foundation/Icons/Icons';
import CareerSearchResults from '@component-library/careers/CareersSearchResults/CareersSearchResults';
import ErrorMessage from '@component-library/site-components/ErrorMessage/ErrorMessage';

interface Fields {
  ReadMoreCtaText?: { value?: string };
}

type CareersSearchResultsProps = {
  params?: Params;
  fields?: Fields;
};

const CareersSearchResultsDefaultComponent = (
  props: CareersSearchResultsProps
): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
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

export const Default = (props: CareersSearchResultsProps): JSX.Element => {
  const searchParams = useSearchParams(); // dynamic reference to page URL query params (e.g. &input=job&jobLocation=London )
  const [limit, setLimit] = useState(1);
  const resultsPerPage = 3;
  /* 
    New search on each searchParams change
    searchParams are either:
    - updated by search bar or filters Moo12on same page
    - available on page load (redirect from e.g. careers home or user copy/paste)
  */
  const { data: response, error } = useSWR<JobsResponse['response']>(
    `${
      process.env.NEXT_PUBLIC_INTEGRATION_LAYER_PROXY_PATH
    }/careers/search?verticalKey=jobs&limit=${limit * resultsPerPage}&${[
      ...searchParams.entries(),
    ]
      .filter(([, value]) => value?.length)
      .toString()}`,
    (url: string) =>
      fetch(url)
        .then((res) => res.json())
        .then((data) => data.response),
    {
      keepPreviousData: true, // Never show nothing
      revalidateOnFocus: false, // Prevent re-render components when user re-opens browser tab/window
    }
  );

  if (!props?.fields) {
    return <CareersSearchResultsDefaultComponent {...props} />;
  }

  if (error && process.env.NODE_ENV === 'development') {
    console.error(error);
  }

  return (
    <Themes theme={props.params?.Theme || 'A-HCA-White'}>
      {!response?.resultsCount && <ErrorMessage />}
      {!!response?.resultsCount && (
        <CareerSearchResults
          count={
            <>
              <Text variation="heading-1">
                {response?.resultsCount} vacancies
              </Text>
              <Text variation="body-bold-medium">
                Showing 1 - {limit * resultsPerPage}
              </Text>
            </>
          }
          results={response?.results?.map((job) => {
            return (
              <YextResultCardCareers
                key={job.data.id}
                location={job.data.jobLocation}
                clinical={job.data.jobFunction}
                timing={job.data.employmentType}
                title={<Text variation={'heading-1'}>{job.data.name}</Text>}
                cta={
                  <Button
                    contentVariation={'full-width'}
                    variation={'full'}
                    size={'small'}
                  >
                    <a
                      href={
                        job.data.applicationUrl ||
                        job.data.landingPageUrl ||
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
          cta={
            <Button size={'large'} variation={'full'}>
              <button onClick={() => setLimit((prev) => prev + 1)}>
                <Icons iconName="iconPlus" />
                <span>
                  Show <b>more</b>
                </span>
              </button>
            </Button>
          }
        />
      )}
    </Themes>
  );
};
