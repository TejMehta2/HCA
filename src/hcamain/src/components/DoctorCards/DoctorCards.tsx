/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Link as JssLink,
  useSitecoreContext,
  useComponentProps,
  GetStaticComponentProps,
} from '@sitecore-jss/sitecore-jss-nextjs';
import CardDoctorLayout from '@component-library/site-components/CardDoctorLayout/CardDoctorLayout';
import CardDoctor from '@component-library/site-components/CardDoctor/CardDoctor';
import Text from '@component-library/foundation/Text/Text';
import { DoctorCardsProps, StaticProps } from './DoctorCards.types';
import getSubheadingTag from 'lib/subheading-tag-getter';
import {
  FindResponse,
  SearchResponse,
  ConsultantExtract as Consultant,
} from './response.types';
import SitecoreSvg from 'src/jss-abstractions/SitecoreSvg/SitecoreSvg';
import JssTextWithEntityName from 'src/jss-abstractions/JssTextWithEntityName/JssTextWithEntityName';
import { FINDER_PROFILE_CANONICAL_BASE_URL } from 'lib/constants';
import Image from 'next/image';
import { inPageNavGlobalStore } from '../../context/inPageNavGlobalStorage';

const SERVER_API_URL = `${process.env.INTEGRATION_LAYER_URL}/consultants`;

const DoctorCardsDefaultComponent = (): JSX.Element => <></>;

export const Default = (props: DoctorCardsProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  const data = useComponentProps<StaticProps>(props.rendering?.uid);
  const quantity = props?.fields?.data?.item?.numberOfCards?.jsonValue?.value;
  const consultants = data?.consultants?.slice(0, Number(quantity) || 4);
  const ctaQuery = data?.ctaQuery;

  if (!props.fields || (!consultants?.length && !isExperienceEditor)) {
    return <DoctorCardsDefaultComponent />;
  }

  const cta =
    props.fields?.data?.item?.cTALink?.jsonValue?.value.href &&
      props.fields?.data?.item?.cTALink?.jsonValue?.value.text ? (
      <JssLink
        field={props.fields?.data?.item?.cTALink?.jsonValue}
        href={`${props.fields?.data?.item?.cTALink?.jsonValue.value.href}${ctaQuery}`}
      >
        {!isExperienceEditor && (
          <>
            <SitecoreSvg>
              {props.fields?.data?.item?.cTAIcon?.Icon?.svgMarkup?.value}
            </SitecoreSvg>

            <JssTextWithEntityName
              field={{
                value:
                  props.fields?.data?.item?.cTALink.jsonValue.value.text || '',
              }}
              isRichText={true}
            />
          </>
        )}
      </JssLink>
    ) : undefined;

  const getSpeciality = (doctor: Consultant) => {
    const keywords = doctor.keywords;

    const topSpecialty = keywords?.filter(
      (item) => item.parentName === 'ABSTRACT_TOP_LEVEL_KEYWORD'
    );

    return topSpecialty?.[0]?.name;
  };

  const showFallbackCard = !consultants?.length && isExperienceEditor;
  const fallbackCard = (
    <CardDoctor
      image={<></>}
      title={
        <Text
          variation="display-5"
          tag={getSubheadingTag(props.params?.HeadingTag, 'h3')}
        >
          <span>Doctor card</span>
        </Text>
      }
      department={<span>Speciality</span>}
      cta={
        props.fields?.data?.item?.cTACard?.jsonValue?.value && (
          <JssLink field={props.fields?.data?.item?.cTACard?.jsonValue} />
        )
      }
    />
  );

  if (!consultants?.length && !isExperienceEditor) {
    return <></>;
  }

  const tableOfContentsLinkTitle =
    props.fields?.data?.item?.title?.jsonValue?.value;
  const componentAnchorId = inPageNavGlobalStore.addItem(
    props?.params,
    tableOfContentsLinkTitle
  );
  const tableOfContentTitle = props?.params?.TableOfContentsLinkTitle;

  return (
    <CardDoctorLayout
      id={componentAnchorId}
      {...(tableOfContentTitle && !props?.params?.ExcludeFromTableOfContents ? { tableOfContentTitle: tableOfContentTitle } : {})}
      title={
        <Text
          tag={props.params?.HeadingTag || 'h2'}
          variation={props.params?.HeadingSize || 'display-3'}
        >
          <JssTextWithEntityName
            field={props.fields?.data?.item?.title?.jsonValue}
          />
        </Text>
      }
      cta={cta || <></>}
      theme={props.params?.Theme || 'D-HCA-Teal'}
    >
      {showFallbackCard
        ? fallbackCard
        : consultants?.map((consultant, index: number) => (
          <CardDoctor
            key={index}
            image={
              <Image
                src={consultant?.images?.logo || ''}
                alt={`${consultant.title} ${consultant.firstName} ${consultant.lastName}`}
                width="91"
                height="91"
              />
            }
            title={
              <Text
                variation="display-5"
                tag={getSubheadingTag(props.params?.HeadingTag, 'h3')}
              >
                <span>
                  {consultant.title} {consultant.firstName}{' '}
                  {consultant.lastName}
                </span>
              </Text>
            }
            department={<span>{getSpeciality(consultant)}</span>}
            cta={
              props.fields?.data?.item?.cTACard?.jsonValue?.value.text ? (
                <JssLink
                  field={props.fields?.data?.item?.cTACard?.jsonValue}
                  href={`${FINDER_PROFILE_CANONICAL_BASE_URL}/${consultant.slug}`}
                >
                  {!isExperienceEditor && (
                    <SitecoreSvg>
                      {props.fields?.data?.item?.cTACard.jsonValue.value.text}
                    </SitecoreSvg>
                  )}
                </JssLink>
              ) : (
                <></>
              )
            }
          />
        ))}
    </CardDoctorLayout>
  );
};

// Pre-fetch response data on the server, to be consumed as fallbackData by SWR, and into initial HTML response.
export const getStaticProps: GetStaticComponentProps = async (
  rendering: DoctorCardsProps
) => {
  const fields = rendering.fields?.data?.item;

  // Format props into entries, then query params
  const consultants =
    fields?.consultants?.ConsultantsList.map((item) => [
      'slug',
      item.doctifySlug?.value,
    ]) || [];

  const customFilters =
    fields?.customFilters?.CustomFiltersList.map((item) => [
      item.filter?.value,
      item.filterValueString?.value,
    ]) || [];

  const practiceList =
    fields?.practice?.PracticeList.map((item) => [
      'practice',
      item.practice?.value,
    ]) || [];

  const serviceList =
    fields?.service?.ServicesList.map((item) => [
      'service',
      item.keywordId?.value,
    ]) || [];

  const contextSearchParams = Object.entries(
    rendering.fields?.data?.contextItemSearchParams || {}
  ).map(([key, nestedValue]) => [key, nestedValue?.value]);

  const contextSearchIdParams = Object.entries(
    rendering.fields?.data?.contextItemSearchIdParams || {}
  ).map(([key, value]) => [key, value.replaceAll(/[{\-}]/g, '').toLowerCase()]); // clean up bad ID characters

  const ctaParams = customFilters.map((entry) => `${entry[0]}=${entry[1]}`); // Compute as query strings

  // Three cases to decide how to apply params to API call and "view all" CTA
  const hasConsultants = !!consultants?.length; // use the '/find' API with consultant slugs, only add customFilters to the CTA
  const hasPracticeAndService = !!(practiceList.length || serviceList.length); // add practiceList and/ore serviceList and customFilters to the API and to CTA
  // Else use contextSearchIdParams and contextSearchParams, customFilters for the API and CTA

  let ctaQuery;
  if (hasConsultants) {
    //  if consultants manually added then only add custom filters
    ctaQuery = `?${ctaParams.join('&')}`;
  } else {
    const paramSource = [
      ...practiceList,
      ...serviceList,
      ...contextSearchParams,
      ...contextSearchIdParams,
    ];

    const params = [...customFilters, ...paramSource].map(
      (entry) => `${entry[0]}=${entry[1]}`
    );
    ctaQuery = `?${params.join('&')}`;
  }

  try {
    if (hasConsultants) {
      const params = consultants.map((entry) => `${entry[0]}=${entry[1]}`); // Compute as query strings
      const query = `?${params.join('&')}`;
      const url = new URL(query, `${SERVER_API_URL}/find`);
      const response = await fetch(url.href);
      if (response.ok) {
        const consultants: FindResponse = await response.json();
        const selectedConsultants = consultants.map(
          ({ images, title, firstName, lastName, slug, keywords }) => ({
            images,
            title,
            firstName,
            lastName,
            slug,
            keywords,
          })
        ); // Select only necessary fields to reduce bundle size
        return {
          consultants: selectedConsultants,
          ctaQuery,
          apiUrl: url.href,
        };
      } else {
        throw {
          url,
          statusText: response.statusText,
        };
      }
    } else {
      const paramSource = hasPracticeAndService
        ? [...practiceList, ...serviceList]
        : [...contextSearchParams, ...contextSearchIdParams];

      const params = [...customFilters, ...paramSource].map(
        (entry) => `${entry[0]}=${entry[1]}`
      );
      const query = `?${params.join('&')}`;
      const url = new URL(query, `${SERVER_API_URL}/search`);
      const response = await fetch(url.href);
      if (response.ok) {
        const data: SearchResponse = await response.json();
        const selectedData = data.rows.map(
          ({ images, title, firstName, lastName, slug, keywords }) => ({
            images,
            title,
            firstName,
            lastName,
            slug,
            keywords,
          })
        ); // Select only necessary fields to reduce bundle size
        return {
          consultants: selectedData,
          ctaQuery,
          apiUrl: url.href,
        };
      } else {
        throw {
          url,
          statusText: response.statusText,
        };
      }
    }
  } catch (error) {
    console.error(
      {
        message: 'DoctorCards server-side data fetching error',
        error: error,
      },
      error
    );
    return { consultants: [], ctaQuery };
  }
};
