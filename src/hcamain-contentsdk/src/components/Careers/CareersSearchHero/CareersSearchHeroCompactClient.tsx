'use client';

import React, { useRef, type JSX } from 'react';
import { RichText, Text as JssText } from '@sitecore-content-sdk/nextjs';
import Text from '@component-library/foundation/Text/Text';
import Themes from '@component-library/foundation/Themes/Themes';
import SearchBar from '@component-library/components/SearchBar/SearchBar';
import HeaderPlain, {
  getDynamicTitleStyle,
} from '@component-library/site-components/HeaderPlain/HeaderPlain';
import SearchFilterList from '@component-library/components/SearchFilterList/SearchFilterList';
import Checkbox from '@component-library/core-components/Checkbox/Checkbox';
import Checkboxes from '@component-library/core-components/Checkboxes/Checkboxes';
import Filters from '@component-library/site-components/Filters/Filters';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Icons from '@component-library/foundation/Icons/Icons';
import getHeadingTags from 'lib/getHeadingTags';
import {
  CareersSearchHeroProps,
  JobsResponse,
} from './CareersSearchHero.types';

type CareersSearchHeroCompactClientProps = Pick<
  CareersSearchHeroProps,
  'fields' | 'params'
> & {
  facets: JobsResponse['response']['facets'];
};

const CareersSearchHeroCompactClient = (
  props: CareersSearchHeroCompactClientProps
): JSX.Element => {
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  if (!props?.fields?.data?.item) {
    return <></>;
  }

  const enabledFilters = props.fields?.data?.item?.filters?.targetItems;
  const enabledFilterNames =
    props.fields?.data?.item?.filters?.targetItems?.map(
      (filter) => filter.yextFieldId?.value
    ) || [];

  const filterCategories = props.facets
    ?.filter(({ fieldId }) => enabledFilterNames.includes(fieldId))
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

export default CareersSearchHeroCompactClient;
