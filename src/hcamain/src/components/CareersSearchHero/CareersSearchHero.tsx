import React, { useRef } from 'react';
import {
  RichText,
  Text as JssText,
  useSitecoreContext,
  GetStaticComponentProps,
  useComponentProps,
} from '@sitecore-jss/sitecore-jss-nextjs';
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
import HeaderPlain from '@component-library/site-components/HeaderPlain/HeaderPlain';
import SearchFilterList from '@component-library/components/SearchFilterList/SearchFilterList';
import Checkbox from '@component-library/core-components/Checkbox/Checkbox';
import Checkboxes from '@component-library/core-components/Checkboxes/Checkboxes';
import Filters from '@component-library/site-components/Filters/Filters';
import { usePathname, useSearchParams } from 'next/navigation';
import Icons from '@component-library/foundation/Icons/Icons';
import { useRouter } from 'next/router';
import SitecoreSvg from 'src/jss-abstractions/SitecoreSvg/SitecoreSvg';
import CareersSearch from '@component-library/careers/CareersSearch/CareersSearch';

const CareersSearchHeroDefaultComponent = (
  props: CareersSearchHeroProps
): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
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
  const data = useComponentProps<JobsResponse['response']>(
    props.rendering?.uid
  );
  if (!props?.fields?.data?.item) {
    return <CareersSearchHeroDefaultComponent {...props} />;
  }
  return (
    <Themes theme={props.params?.Theme || 'B-HCA-Navy-Blue'}>
      <form
        action={props.fields.data.item.searchRolesCTA?.jsonValue?.value.href}
        method="get"
      >
        <CareersHomepageHero
          title={
            <>
              <Text
                tag={props.params?.HeadingTag || 'p'}
                variation={'subheading-1'}
              >
                <JssText
                  field={props.fields?.data?.contextItem?.subHeading?.jsonValue}
                />
              </Text>
              <Text
                tag={props.params?.HeadingTag || 'h1'}
                variation={props.params?.HeadingSize || 'display-2'}
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
          children={
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
                    id={data?.facets?.[1]?.fieldId?.replace('c_', '') || ''}
                    options={
                      data?.facets?.[1]?.options.map((option) => ({
                        text: option.displayName,
                      })) || []
                    }
                  />
                  <SelectField
                    placeholder={
                      props.fields?.data?.item?.selectALocationLabel?.value
                    }
                    id={data?.facets[0].fieldId?.replace('c_', '') || ''}
                    options={
                      data?.facets[0].options.map((option) => ({
                        text: option.displayName,
                      })) || []
                    }
                  />
                </>
              }
              submit={
                <Button size={'large'} variation={'full'}>
                  <button type="submit">
                    {
                      props.fields.data.item.searchRolesCTA?.jsonValue?.value
                        .text
                    }
                  </button>
                </Button>
              }
            />
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
        />
      </form>
    </Themes>
  );
};

export const Compact = (props: CareersSearchHeroProps): JSX.Element => {
  const data = useComponentProps<JobsResponse['response']>(
    props.rendering?.uid
  );
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  if (!props?.fields?.data?.item) {
    return <CareersSearchHeroDefaultComponent {...props} />;
  }

  // Parse filter options to be used in multiple components
  const filterCategories = data?.facets?.map((facet) => ({
    title: facet.displayName,
    fields: facet.options?.map((option) => {
      return {
        id: option.displayName,
        value: option.displayName,
        name: facet.fieldId.replace('c_', ''),
        label: option.displayName,
        checked: searchParams
          .getAll(facet.fieldId.replace('c_', ''))
          .includes(option.displayName),
        onChange: () => {},
      };
    }),
  }));

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
    router.replace(url, undefined, { shallow: true });
  };

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
            <Text variation={'subheading-1'}>
              <JssText
                field={props.fields?.data?.contextItem?.subHeading?.jsonValue}
              />
            </Text>
          }
          heading={
            <Text
              variation={props.params?.HeadingSize || 'display-2'}
              tag={props.params?.HeadingTag || 'h2'}
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

// Pre-fetch response data on the server, to be consumed as fallbackData by SWR, and into initial HTML response.
export const getStaticProps: GetStaticComponentProps = async () => {
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
