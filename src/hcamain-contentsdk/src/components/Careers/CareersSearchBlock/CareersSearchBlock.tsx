'use client';

import React, { type JSX } from 'react';
import {
  GetComponentServerProps,
  useComponentProps,
} from '@sitecore-content-sdk/nextjs';

import Themes from '@component-library/foundation/Themes/Themes';
import Button from '@component-library/core-components/Button/Button';
import SearchBar from '@component-library/components/SearchBar/SearchBar';
import SelectField from '@component-library/core-components/SelectField/SelectField';
import { JobsResponse } from '../CareersSearchHero/CareersSearchHero.types';
import { CareersSearchBlockProps } from './CareersSearchBlock.types';
import CareersSearch from '@component-library/careers/CareersSearch/CareersSearch';

const CareersSearchBlockDefaultComponent = (
  props: CareersSearchBlockProps
): JSX.Element => {
  const isExperienceEditor = props.page.mode.isEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            Careers Search Block. Please click to select datasource
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

export const Default = (props: CareersSearchBlockProps): JSX.Element => {
  const data = useComponentProps<JobsResponse['response']>(
    props.rendering?.uid
  );
  if (!props?.fields?.data?.item) {
    return <CareersSearchBlockDefaultComponent {...props} />;
  }

  return (
    <Themes theme={props.params?.Theme || 'B-HCA-Navy-Blue'}>
      <form
        action={props.fields.data.item.searchRolesCTA?.jsonValue?.value.href}
        method="get"
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
              {data?.facets?.[2] && (
                <SelectField
                  placeholder={
                    props.fields?.data?.item?.selectALocationLabel?.value
                  }
                  id={data?.facets[2].fieldId?.replace('c_', '') || ''}
                  options={
                    data?.facets[2].options.map(
                      (
                        option: JobsResponse['response']['facets'][number]['options'][number]
                      ) => ({
                        text: option.displayName,
                      })
                    ) || []
                  }
                />
              )}
              {/* <Button size={'large'} variation={'full'}>
                <button type="button">
                  {props.fields.data.item.filtersCtaLabel?.value}
                </button>
              </Button> */}
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

        {/* {props.fields.data.item?.filters?.targetItems?.map((item, index) => {
          const facet = item as YextFacetJson;
          return (
            <div key={index}>
              <p>Display Name: {facet.displayName?.value}</p>
              <p>Filter: {facet.filter?.value}</p>
              <p>Yext Field ID: {facet.yextFieldId?.value}</p>
              <br />
            </div>
          );
        })} */}
      </form>
    </Themes>
  );
};

// Pre-fetch response data on the server, to be consumed as fallbackData by SWR, and into initial HTML response.
export const getComponentServerProps: GetComponentServerProps = async () => {
  try {
    const response = await fetch(
      `${process.env.INTEGRATION_LAYER_URL}/careers/search?verticalKey=jobs&retrieveFacets=true&limit=0`
    );
    const data = await response.json();
    return JSON.parse(JSON.stringify(data.response));
  } catch (error) {
    console.error(error);
    return {};
  }
};
