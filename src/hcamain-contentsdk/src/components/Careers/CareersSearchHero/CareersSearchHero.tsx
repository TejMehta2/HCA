'use client';

import React, { Suspense, useRef, type JSX } from 'react';
import {
  GetComponentServerProps,
  RichText,
  Text as JssText,
} from '@sitecore-content-sdk/nextjs';
import Text from '@component-library/foundation/Text/Text';

import Themes from '@component-library/foundation/Themes/Themes';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';
import CareersHomepageHero from '@component-library/careers/CareersHompageHero/CareersHompageHero';
import Button from '@component-library/core-components/Button/Button';
import SearchBar from '@component-library/components/SearchBar/SearchBar';
import SelectField from '@component-library/core-components/SelectField/SelectField';
import { CareersSearchHeroProps } from './CareersSearchHero.types';
import HeaderPlain, {
  getDynamicTitleStyle,
} from '@component-library/site-components/HeaderPlain/HeaderPlain';
import SearchFilterList from '@component-library/components/SearchFilterList/SearchFilterList';
import Checkbox from '@component-library/core-components/Checkbox/Checkbox';
import Checkboxes from '@component-library/core-components/Checkboxes/Checkboxes';
import Filters from '@component-library/site-components/Filters/Filters';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Icons from '@component-library/foundation/Icons/Icons';
import SitecoreSvg from 'src/jss-abstractions/SitecoreSvg/SitecoreSvg';
import CareersSearch from '@component-library/careers/CareersSearch/CareersSearch';
import getHeadingTags from 'lib/getHeadingTags';

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
  const { headingTag, subheadingTag } = getHeadingTags(
    props?.params,
    props.fields?.data?.contextItem?.subHeading?.jsonValue?.value,
    'h1'
  );
  const locationFacet = props.facets?.[0];
  const jobAreaFacet = props.facets?.[1];

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

const CompactContent = (props: CareersSearchHeroProps): JSX.Element => {
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  if (!props?.fields?.data?.item) {
    return <CareersSearchHeroDefaultComponent {...props} />;
  }

  const enabledFilters = props.fields?.data?.item?.filters?.targetItems;
  const enabledFilterNames =
    props.fields?.data?.item?.filters?.targetItems?.map(
      (filter) => filter.yextFieldId?.value
    ) || [];

  // Parse filter options to be used in multiple components
  const filterCategories = props?.facets
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
            id: `${name}-${option.displayName}`,
            value: option.displayName,
            name: name,
            label: option.displayName,
            checked: searchParams.getAll(name).includes(option.displayName),
            onChange: () => {},
          };
        }),
      };
    });

  const activeFilters = filterCategories?.reduce((previous, { fields }) => {
    return [...previous, ...fields.filter(({ checked }) => checked)];
  }, []);

  const handleChange = () => {
    const form = formRef.current;
    if (!form) return;
    const formData = new FormData(form);
    const entries = [...formData.entries()].filter(([, value]) => !!value);
    const params = new URLSearchParams(entries as string[][]);
    const url = `${pathname}?${params}`;
    router.replace(url, { scroll: false });
  };
  const { headingTag, subheadingTag } = getHeadingTags(
    props?.params,
    props.fields?.data?.contextItem?.subHeading?.jsonValue?.value,
    'h1'
  );
  return (
    <Themes theme={props.params?.Theme || 'D-HCA-Teal'}>
      <form
        ref={formRef}
        onChange={handleChange}
        onSubmit={(event) => {
          event.preventDefault();
          handleChange();
        }}
        method="get"
      >
        <HeaderPlain
          metatitle={
            <Text tag={subheadingTag} variation={'subheading-1'}>
              <JssText
                field={props.fields?.data?.contextItem?.subHeading?.jsonValue}
              />
            </Text>
          }
          heading={
            <Text
              variation={
                props.params?.HeadingSize ||
                getDynamicTitleStyle(
                  props.fields?.data?.contextItem?.title?.jsonValue?.value
                    .length
                )
              }
              tag={headingTag}
            >
              <JssText
                field={props.fields?.data?.contextItem?.title?.jsonValue}
              />
            </Text>
          }
          description={
            <Text tag="div" variation="body-large">
              <RichText
                field={props.fields?.data?.contextItem?.text?.jsonValue}
              />
            </Text>
          }
        >
          <>
            <SearchBar
              preventSubmitOnSuggestion={false}
              name="input"
              defaultValue={searchParams.get('input') || ''}
              placeholder={
                props.fields?.data?.item?.searchPhrasePlaceholder?.value
              }
            >
              <Filters
                buttonText={
                  <span>
                    <b>Filter</b> by
                  </span>
                }
                buttonIcon={<Icons iconName="iconFilterCircle" />}
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
          </>
        </HeaderPlain>
      </form>
    </Themes>
  );
};

export const Compact = (props: CareersSearchHeroProps): JSX.Element => (
  <Suspense fallback={null}>
    <CompactContent {...props} />
  </Suspense>
);

// Pre-fetch response data on the server, to be consumed as fallbackData by SWR, and into initial HTML response.
export const getComponentServerProps: GetComponentServerProps = async () => {
  try {
    const response = await fetch(
      `${process.env.INTEGRATION_LAYER_URL}/careers/search?verticalKey=jobs&retrieveFacets=true&limit=0`
    );
    if (!response.ok) {
      throw new Error(`Careers search facets request failed: ${response.status}`);
    }
    const data = await response.json();
    return JSON.parse(JSON.stringify(data.response ?? { facets: [] }));
  } catch (error) {
    console.error(error);
    return { facets: [] };
  }
};
