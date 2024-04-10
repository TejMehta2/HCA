import React from 'react';
import {
  Text as JssText,
  Image as JssImage,
  RichText as JssRichText,
  Link as JssLink,
  useSitecoreContext,
  GetStaticComponentProps,
  useComponentProps,
} from '@sitecore-jss/sitecore-jss-nextjs';
import {
  PatientStoriesCardsProps,
  patientStoriesResult,
  StaticProps,
} from './PatientStoriesCards.types';
import CardBlock from '@component-library/site-components/CardBlock/CardBlock';
import CardPatientStories from '@component-library/components/CardPatientStories/CardPatientStories';
import { CardBlockProps } from '@component-library/site-components/CardBlock/CardBlock.types';
import AdvancedBlockHeader from '@component-library/components/AdvancedBlockHeader/AdvancedBlockHeader';
import Text from '@component-library/foundation/Text/Text';
import getSubheadingTag from 'lib/subheading-tag-getter';

const BASE_URL = `${process.env.NEXT_PUBLIC_DATALAYER_URL}/patientstories`;

const PatientStoriesCardsDefaultComponent = (
  props: PatientStoriesCardsProps
): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            Patient Stories Cards please click to select datasource
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

export const Default = (props: PatientStoriesCardsProps): JSX.Element => {
  const columns: CardBlockProps['variation'] =
    props.params?.Columns === '4' ? '4-columns' : '3-columns';

  const data = useComponentProps<StaticProps>(props.rendering?.uid);
  const quantity = props?.fields?.data?.item?.numberOfCards?.jsonValue?.value;
  const patientStories = data?.patientStories?.slice(0, Number(quantity) || 3);
  const ctaQuery = data?.ctaQuery;
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext?.pageEditing;

  let cards;

  if (!props.fields) {
    return <PatientStoriesCardsDefaultComponent {...props} />;
  }

  if (
    props?.fields?.data?.item?.patientStories?.PatientStoriesList &&
    props?.fields?.data?.item?.patientStories?.PatientStoriesList.length
  ) {
    cards = props?.fields?.data?.item?.patientStories?.PatientStoriesList.map(
      ({ title, text, image, url }, index) => (
        <CardPatientStories
          key={index}
          title={
            <Text
              tag={getSubheadingTag(props.params?.HeadingTag, 'h3')}
              variation="display-4"
            >
              <JssText field={title} />
            </Text>
          }
          bodyCopy={
            <Text tag="span" variation="body-large">
              <JssRichText field={text} />
            </Text>
          }
          image={<JssImage field={image?.jsonValue} />}
          link={
            <a href={`${url?.path}`}>
              <span>
                <JssText field={props.fields?.data?.item?.cTAText?.jsonValue} />
              </span>
            </a>
          }
        />
      )
    );
  } else {
    {
      cards =
        patientStories &&
        patientStories.map(
          ({ id, title, name, description, imageUrl, url }) => (
            <CardPatientStories
              key={id}
              title={
                <Text
                  tag={getSubheadingTag(props.params?.HeadingTag, 'h3')}
                  variation="display-4"
                >
                  {title || name}
                </Text>
              }
              bodyCopy={
                <Text tag="span" variation="body-large">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: description,
                    }}
                  ></span>
                </Text>
              }
              image={<img src={imageUrl} alt={title} />}
              link={
                <a href={url}>
                  <span>
                    <JssText
                      field={props.fields?.data?.item?.cTAText?.jsonValue}
                    />
                  </span>
                </a>
              }
            />
          )
        );
    }
  }

  return (
    <CardBlock
      variation={columns}
      gapSize={'small'}
      theme={props.params?.Theme || 'A-HCA-White'}
      header={
        <AdvancedBlockHeader
          paddingSize="small"
          title={
            <Text
              variation={props.params?.HeadingSize || 'heading-1'}
              tag={props.params?.HeadingTag || 'h2'}
            >
              <JssText
                tag={'span'}
                field={props.fields?.data?.item?.title?.jsonValue}
              />
            </Text>
          }
        />
      }
      cta={
        !isExperienceEditor ? (
          <a
            href={`${props.fields?.data?.item?.cTALink?.jsonValue?.value?.href}${ctaQuery}`}
          >
            {props.fields?.data?.item?.cTALink?.jsonValue?.value?.text && (
              <>
                <JssRichText
                  field={{
                    value:
                      props.fields?.data?.item?.cTALink?.jsonValue?.value
                        ?.text || '',
                  }}
                />
              </>
            )}
          </a>
        ) : (
          props.fields?.data?.item?.cTALink?.jsonValue?.value && (
            <JssLink
              field={props.fields?.data?.item?.cTALink?.jsonValue?.value}
            ></JssLink>
          )
        )
      }
    >
      <>{cards}</>
    </CardBlock>
  );
};

// Pre-fetch response data on the server, to be consumed as fallbackData by SWR, and into initial HTML response.
export const getStaticProps: GetStaticComponentProps = async (
  rendering: PatientStoriesCardsProps
) => {
  const fields = rendering.fields?.data?.item;

  // Format props into entries, then query params
  const customFilters =
    (fields?.filterOptions?.filterOptionsList &&
      fields?.filterOptions?.filterOptionsList.map((item) => [
        item.filter?.value,
        item.filterValueGuid?.targetItem?.id,
      ])) ||
    [];

  const contextSearchParams = customFilters.length
    ? ''
    : Object.entries(rendering.fields?.data?.contextItemSearchParams || {})
        .filter(([, nestedValue]) => nestedValue.value !== '')
        .map(([key, nestedValue]) => [
          key,
          nestedValue?.value &&
            nestedValue?.value.replaceAll(/[{},\-]/g, '').toLowerCase(),
        ]);

  const contextSearchIdParams = customFilters.length
    ? ''
    : Object.entries(rendering.fields?.data?.contextItemSearchIdParams || {})
        .filter(([, value]) => value !== '')
        .map(([key, value]) => [
          key,
          value.replaceAll(/[{},\-]/g, '').toLowerCase(),
        ]); // clean up bad ID characters

  const params = [
    ['verticalKey', 'patientstories'],
    ...customFilters,
    ...contextSearchParams,
    ...contextSearchIdParams,
  ].map((entry) => `${entry[0]}=${entry[1]}`); // Compute as query strings

  const query = `?${params.join('&')}`;

  const ctaParams = [
    ...customFilters,
    ...contextSearchParams,
    ...contextSearchIdParams,
  ].map((entry) => `${entry[0]}=${entry[1]}`); // Compute as query strings
  const ctaQuery = `?${ctaParams.join('&')}`;

  try {
    const url = new URL(query, `${BASE_URL}/search`);

    const response = await fetch(url.href);
    if (response.ok) {
      const data = await response.json();

      const selectedData = data.response.results.map(
        (result: patientStoriesResult) => {
          return result.data;
        }
      );

      return {
        patientStories: selectedData,
        ctaQuery,
        apiUrl: url.href,
      };
    } else {
      throw {
        url,
        statusText: response.statusText,
      };
    }
  } catch (error) {
    console.error(
      {
        message: 'Patient Stories server-side data fetching error',
        error: error,
      },
      error
    );
    return { patientStories: [], ctaQuery };
  }
};
