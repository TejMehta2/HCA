import React from 'react';
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
        action={props.fields.data.item.searchRolesCTA.jsonValue.value.href}
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
                <JssText
                  field={props.fields?.data?.contextItem?.title?.jsonValue}
                />
              </Text>
              <Text tag={'div'} variation={'body-large'}>
                <RichText
                  field={props.fields?.data?.contextItem?.text?.jsonValue}
                />
              </Text>
            </>
          }
          search={
            <SearchBar
              preventSubmitOnSuggestion={true}
              name="query"
              suggestions={['test 1']}
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
                id={data?.facets[1].fieldId?.replace('c_', '') || ''}
                options={
                  data?.facets[1].options.map((option) => ({
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
          cta={
            <Button size={'large'} variation={'full'}>
              <button type="submit">
                {props.fields.data.item.searchRolesCTA.jsonValue.value.text}
              </button>
            </Button>
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
