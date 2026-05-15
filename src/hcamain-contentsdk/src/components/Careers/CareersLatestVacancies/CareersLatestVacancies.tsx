'use client';

import {
  GetComponentServerProps,
  useComponentProps,
  Link as JssLink,
  Text as JssText,
} from '@sitecore-content-sdk/nextjs';

import Themes from '@component-library/foundation/Themes/Themes';
import Text from '@component-library/foundation/Text/Text';
import { CareersLatestVacanciesProps } from './CareersLatestVacancies.types';
import CareersSearchResults from '@component-library/careers/CareersSearchResults/CareersSearchResults';
import Filters from '@component-library/site-components/Filters/Filters';
import Checkboxes from '@component-library/core-components/Checkboxes/Checkboxes';
import Icons from '@component-library/foundation/Icons/Icons';
import Checkbox from '@component-library/core-components/Checkbox/Checkbox';
import { JobsResponse } from '../CareersSearchHero/CareersSearchHero.types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import Button from '@component-library/core-components/Button/Button';
import YextResultCardCareers from '@component-library/yext/YextResultCardCareers/YextResultCardCareers';
import { useRef, type JSX } from 'react';
import ErrorMessage from '@component-library/site-components/ErrorMessage/ErrorMessage';
import SitecoreSvg from 'src/jss-abstractions/SitecoreSvg/SitecoreSvg';
import CarouselCards from '@component-library/site-components/CarouselCards/CarouselCards';
import getHeadingTags from 'lib/getHeadingTags';

interface VariantCareersLatestVacanciesProps extends CareersLatestVacanciesProps {
  variant?: 'carousel';
}

const CareersLatestVacanciesDefaultComponent = (
  props: CareersLatestVacanciesProps
): JSX.Element => {
  const isExperienceEditor = props.page.mode.isEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            Careers Latest Vacancies. Please click to select datasource
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

export const Default = (
  props: VariantCareersLatestVacanciesProps
): JSX.Element => {
  const fallbackData = useComponentProps<JobsResponse['response']>(
    props.rendering?.uid
  );
  const searchParams = useSearchParams(); // dynamic reference to page URL query params (e.g. &input=job&jobLocation=London )
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const limit = 1;
  const resultsPerPage = 6;
  /* 
    New search on each searchParams change
    searchParams are either:
    - updated by search bar or filters Moo12on same page
    - available on page load (redirect from e.g. careers home or user copy/paste)
  */
  const scope = getJobFamiliesQueryString(props);
  const query = [...searchParams.entries()]
    .filter(([, value]) => value?.length)
    .map(([key, value]) => `${key}=${value}`);

  const { data: response } = useSWR<JobsResponse['response']>(
    `${
      process.env.NEXT_PUBLIC_INTEGRATION_LAYER_PROXY_PATH
    }/careers/search?verticalKey=jobs&retrieveFacets=true&${scope}&limit=${
      limit * resultsPerPage
    }&${query.join('&')}`,
    (url: string) =>
      fetch(url)
        .then((res) => res.json())
        .then((data) => data.response),
    {
      keepPreviousData: true, // Never show nothing
      revalidateOnFocus: false, // Prevent re-render components when user re-opens browser tab/window
      fallbackData,
    }
  );

  if (!props?.fields?.data?.item) {
    return <CareersLatestVacanciesDefaultComponent {...props} />;
  }

  const enabledFilters =
    props.fields?.data?.item?.searchConfiguration?.targetItem?.filters
      ?.targetItems;
  const enabledFilterNames =
    props.fields?.data?.item?.searchConfiguration?.targetItem?.filters?.targetItems?.map(
      (filter) => filter.yextFieldId?.value
    ) || [];

  // Parse filter options to be used in multiple components
  const filterCategories = response?.facets
    ?.filter(({ fieldId }) => enabledFilterNames.includes(fieldId))
    // Uncomment this part when implementing separate filter dropdowns
    // ?.filter(
    //   ({ fieldId }) =>
    //     enabledFilterNames.includes(fieldId) &&
    //     !['c_jobCity', 'c_jobFamily'].includes(fieldId)
    // )
    ?.map((facet) => {
      const contentFilter = enabledFilters?.find(
        (filter) => filter.yextFieldId?.value === facet.fieldId
      );
      return {
        title: contentFilter?.displayName?.value,
        fields: facet.options?.map((option) => {
          const name = contentFilter?.filter?.value || '';
          return {
            id: option.displayName,
            value: option.displayName,
            name: name,
            label: option.displayName,
            checked: searchParams.getAll(name).includes(option.displayName),
            onChange: () => {},
          };
        }),
      };
    });

  const cta =
    props.fields.data.item?.searchConfiguration?.targetItem?.viewAllVacanciesCTA
      .jsonValue.value.href &&
    props.fields.data.item?.searchConfiguration?.targetItem?.viewAllVacanciesCTA
      .jsonValue.value.text ? (
      <Button size={'large'} variation={'full'}>
        <JssLink
          href={`${
            props.fields.data.item.searchConfiguration.targetItem
              .viewAllVacanciesCTA.jsonValue.value.href
          }?${[...query, scope].join('&')}`}
          field={
            props.fields.data.item?.searchConfiguration?.targetItem
              ?.viewAllVacanciesCTA.jsonValue.value
          }
        >
          <SitecoreSvg>
            {props.fields.data.item?.searchConfiguration?.targetItem?.viewAllVacanciesCTA.jsonValue.value.text?.replaceAll(
              /\s{jobsCount}/gm,
              response?.resultsCount ? ` ${response?.resultsCount}` : ''
            )}
          </SitecoreSvg>
        </JssLink>
      </Button>
    ) : (
      <></>
    );

  const { headingTag, subheadingTag } = getHeadingTags(
    props?.params,
    props.fields?.data?.item?.heading?.jsonValue?.value
  );

  return (
    <Themes theme={props.params?.Theme || 'A-HCA-White'}>
      <form
        ref={formRef}
        onChange={() => {
          if (!formRef?.current) return;
          const formData = new FormData(formRef.current);
          const params = new URLSearchParams([
            ...formData.entries(),
          ] as string[][]);
          const url = `${pathname}?${params}`;
          router.replace(url, { scroll: false });
        }}
      >
        {props.variant === 'carousel' ? (
          <CarouselCards
            theme={props.params?.Theme || 'A-HCA-White'}
            cardsToDisplay={4}
            link={cta}
            subtitle={
              <Text tag={subheadingTag} variation="subheading-1">
                <JssText field={props.fields?.data?.item?.heading?.jsonValue} />
              </Text>
            }
            title={
              <Text
                tag={headingTag}
                variation={props.params?.HeadingSize || 'display-3'}
              >
                <JssText field={props.fields.data.item?.title?.jsonValue} />
              </Text>
            }
          >
            {response?.results?.map((job) => {
              return (
                <YextResultCardCareers
                  variation="carousel"
                  key={job.data.id}
                  location={job.data.jobLocation}
                  city={job.data.jobCity}
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
                          job.data.landingPageUrl ||
                          job.data.applicationUrl ||
                          '#'
                        }
                      >
                        {props.fields?.data?.item?.searchConfiguration
                          ?.targetItem?.readMoreCtaText?.value ||
                          'Read More & Apply'}
                      </a>
                    </Button>
                  }
                />
              );
            })}
          </CarouselCards>
        ) : (
          <CareersSearchResults
            header={
              <>
                <Text
                  tag={props.params?.HeadingTag || 'h2'}
                  variation={props.params?.HeadingSize || 'display-3'}
                >
                  <JssText field={props.fields.data.item?.title?.jsonValue} />
                </Text>
                <Filters
                  hideResultsCount={true}
                  buttonText={
                    <span>
                      <b>Filter</b> by
                    </span>
                  }
                  buttonIcon={<Icons iconName="iconFilterCircle" />}
                  resultsCount={Number(response?.resultsCount)}
                  filters={filterCategories
                    ?.filter(
                      (category) =>
                        category.title !== 'Job Family' || !scope?.length
                    )
                    .map((category) => ({
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
              </>
            }
            results={
              response?.resultsCount ? (
                response?.results?.map((job) => {
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
                            {props.fields?.data?.item?.searchConfiguration
                              ?.targetItem?.readMoreCtaText?.value ||
                              'Read More & Apply'}
                          </a>
                        </Button>
                      }
                    />
                  );
                })
              ) : (
                <ErrorMessage contentVariation={'no-container'} />
              )
            }
            cta={cta}
          />
        )}
      </form>
    </Themes>
  );
};

export const Carousel = (
  props: VariantCareersLatestVacanciesProps
): JSX.Element => {
  if (!props.fields?.data?.item) {
    return <CareersLatestVacanciesDefaultComponent {...props} />;
  }

  return <Default {...props} variant={'carousel'} />;
};

// Pre-fetch response data on the server, to be consumed as fallbackData by SWR, and into initial HTML response.
export const getComponentServerProps: GetComponentServerProps = async (
  rendering
) => {
  try {
    const scope = getJobFamiliesQueryString({
      fields: rendering.fields as CareersLatestVacanciesProps['fields'],
    });
    const response = await fetch(
      `${process.env.INTEGRATION_LAYER_URL}/careers/search?verticalKey=jobs&retrieveFacets=true&limit=6&${scope}`
    );
    const data = await response.json();
    return JSON.parse(JSON.stringify(data.response));
  } catch (error) {
    console.error(error);
    return {};
  }
};

// Function to map jobFamilies to query string
const getJobFamiliesQueryString = (
  props: Pick<CareersLatestVacanciesProps, 'fields'>
): string => {
  const jobFamilies = props.fields?.data?.item?.jobFamilies?.targetItems;
  if (!jobFamilies || jobFamilies.length === 0) {
    return '';
  }

  const queryString = jobFamilies
    .map((family) => {
      const keyValue = family.value?.value;
      const key = family.key?.value;
      return keyValue ? `${key}=${encodeURIComponent(keyValue)}` : '';
    })
    .filter(Boolean) // Remove empty values
    .join('&');

  return queryString;
};
