import React, { Suspense, use, type JSX } from 'react';
import { RichText, Text as JssText } from '@sitecore-content-sdk/nextjs';
import Text from '@component-library/foundation/Text/Text';

import Themes from '@component-library/foundation/Themes/Themes';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';
import CareersHomepageHero from '@component-library/careers/CareersHompageHero/CareersHompageHero';
import Button from '@component-library/core-components/Button/Button';
import SearchBar from '@component-library/components/SearchBar/SearchBar';
import SelectField from '@component-library/core-components/SelectField/SelectField';
import {
  CareersSearchHeroProps,
  JobsResponse,
} from './CareersSearchHero.types';
import SitecoreSvg from 'src/jss-abstractions/SitecoreSvg/SitecoreSvg';
import CareersSearch from '@component-library/careers/CareersSearch/CareersSearch';
import getHeadingTags from 'lib/getHeadingTags';
import CareersSearchHeroCompactClient from './CareersSearchHeroCompactClient';

const CareersSearchHeroDefaultComponent = (
  props: CareersSearchHeroProps
): JSX.Element => {
  const isExperienceEditor = props.page.mode.isEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            Careers Search Hero. Please click to select datasource
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

export const Default = (props: CareersSearchHeroProps): JSX.Element => {
  if (!props?.fields?.data?.item) {
    return <CareersSearchHeroDefaultComponent {...props} />;
  }

  const data = use(getInitialVacanciesResponse());
  const facets = data?.facets || [];
  const { headingTag, subheadingTag } = getHeadingTags(
    props?.params,
    props.fields?.data?.contextItem?.subHeading?.jsonValue?.value,
    'h1'
  );
  const locationFacet = facets?.[0];
  const jobAreaFacet = facets?.[1];

  return (
    <Themes theme={props.params?.Theme || 'B-HCA-Navy-Blue'}>
      <form
        action={props.fields.data.item.searchRolesCTA?.jsonValue?.value.href}
        method="get"
      >
        <CareersHomepageHero
          title={
            <>
              <Text tag={subheadingTag} variation={'subheading-1'}>
                <JssText
                  field={props.fields?.data?.contextItem?.subHeading?.jsonValue}
                />
              </Text>
              <Text
                tag={headingTag}
                variation={props.params?.HeadingSize || 'display-3'}
              >
                <SitecoreSvg>
                  {props.fields?.data?.contextItem?.title?.jsonValue?.value}
                </SitecoreSvg>
              </Text>
              <Text tag={'div'} variation={'body-large'}>
                <RichText
                  field={props.fields?.data?.contextItem?.text?.jsonValue}
                />
              </Text>
            </>
          }
          image={
            <NextJssImage
              field={props.fields?.data?.contextItem?.image?.jsonValue}
              next={{
                fill: true,
                sizes: '100vw',
                loading: 'eager',
                priority: true,
              }}
            />
          }
        >
          <CareersSearch
            search={
              <SearchBar
                preventSubmitOnSuggestion={true}
                name="input"
                placeholder={
                  props.fields?.data?.item?.searchPhrasePlaceholder?.value
                }
              />
            }
            filters={
              <>
                <SelectField
                  placeholder={
                    props.fields?.data?.item?.selectAJobAreaLabel?.value
                  }
                  id={'jobArea'}
                  options={
                    jobAreaFacet?.options?.map((option) => ({
                      text: option.displayName,
                    })) || []
                  }
                />
                <SelectField
                  placeholder={
                    props.fields?.data?.item?.selectALocationLabel?.value
                  }
                  id={locationFacet?.fieldId?.replace('c_', '') || ''}
                  options={
                    locationFacet?.options?.map((option) => ({
                      text: option.displayName,
                    })) || []
                  }
                />
              </>
            }
            submit={
              <Button size={'large'} variation={'full'}>
                <button type="submit">
                  {props.fields.data.item.searchRolesCTA?.jsonValue?.value.text}
                </button>
              </Button>
            }
          />
        </CareersHomepageHero>
      </form>
    </Themes>
  );
};

export const Compact = (props: CareersSearchHeroProps): JSX.Element => {
  if (!props?.fields?.data?.item) {
    return <CareersSearchHeroDefaultComponent {...props} />;
  }

  const data = use(getInitialVacanciesResponse());

  return (
    <Suspense fallback={null}>
      <CareersSearchHeroCompactClient
        fields={props.fields}
        params={props.params}
        facets={data?.facets || []}
      />
    </Suspense>
  );
};

async function getInitialVacanciesResponse(): Promise<
  JobsResponse['response'] | null
> {
  try {
    const response = await fetch(
      `${process.env.INTEGRATION_LAYER_URL}/careers/search?verticalKey=jobs&retrieveFacets=true&limit=0`
    );

    if (!response.ok) {
      console.error(
        `Careers search facets request failed with status ${response.status}`
      );
      return null;
    }

    const data = (await response.json()) as JobsResponse;
    return data.response;
  } catch (error) {
    console.error(error);
    return null;
  }
}
