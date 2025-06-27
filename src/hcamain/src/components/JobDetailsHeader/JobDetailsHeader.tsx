import React from 'react';
import {
  useSitecoreContext,
  GetStaticComponentProps,
  useComponentProps,
  RichText,
} from '@sitecore-jss/sitecore-jss-nextjs';

import Themes from '@component-library/foundation/Themes/Themes';
import VacancyHeader from '@component-library/careers/VacancyHeader/VacancyHeader';
import { JobDetailsHeaderProps, JobsResponse } from './JobDetailsHeader.types';
import { GetServerSidePropsContext } from 'next';
import Text from '@component-library/foundation/Text/Text';
import BlogContent from '@component-library/site-components/BlogContent/BlogContent';
import SitecoreSvg from 'src/jss-abstractions/SitecoreSvg/SitecoreSvg';
import Button from '@component-library/core-components/Button/Button';
import Icons from '@component-library/foundation/Icons/Icons';
import Head from 'next/head';
import Container from '@component-library/foundation/Containers/Container';
import { getDynamicTitleStyle } from '@component-library/site-components/HeaderPlain/HeaderPlain';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';
import { addThumbnailParameter } from 'lib/utility-functions/addThumbnailParameter';
import TextBlock from '@component-library/site-components/TextBlock/TextBlock';

const JobDetailsHeaderDefaultComponent = (
  props: JobDetailsHeaderProps
): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            Job Details Header. Please click to select datasource
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

const JobDetailsNotFoundHeaderDefaultComponent = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Vacancy not found</title>
      </Head>
      <TextBlock
        text={
          <RichText>
            <Text tag="p">Vacancy not found</Text>
          </RichText>
        }
      />
    </>
  );
};

export const Default = (props: JobDetailsHeaderProps): JSX.Element => {
  console.log('starting');
  const data = useComponentProps<JobsResponse>(props.rendering?.uid);
  console.log('data: ', data);

  if (!props?.fields?.data?.item || !data) {
    return <JobDetailsHeaderDefaultComponent {...props} />;
  }

  console.log('data not empty: ');

  if (!data.name) {
    return <JobDetailsNotFoundHeaderDefaultComponent />;
  }

  console.log('data.name not empty: ');

  const matchedSetting =
    props.fields?.data?.item?.headerImageMapping?.targetItems?.find(
      (setting) => {
        const value = setting.jobArea?.targetItem?.value?.value;
        return value && data.jobAreas?.some((jobArea) => jobArea === value);
      }
    );

  const heroImage = matchedSetting
    ? matchedSetting.image
    : props.fields?.data?.contextItem?.image;

  return (
    <Themes theme={props.params?.Theme || 'A-HCA-White'}>
      <Head>
        <title>{data.name}</title>
        <meta property="og:title" content={data.name} key="og:title" />
        {matchedSetting?.image && (
          <meta
            property="og:image"
            content={addThumbnailParameter(
              matchedSetting?.image?.jsonValue?.value?.src
            )}
            key="og:image"
          />
        )}
      </Head>
      <VacancyHeader
        title={
          <Text variation={getDynamicTitleStyle(data.name.length)} tag="h1">
            {data.name}
          </Text>
        }
        location={data.jobLocation}
        city={data.jobCity}
        clinical={data.jobFunction}
        timing={data.employmentType}
        vacancyCode={data.id}
        cta={
          <>
            <Button variation={'full'} size="large">
              <a href={data.applicationUrl}>
                <span>
                  Apply <strong>now</strong>
                </span>
                <Icons iconName={'iconArrowRight'} />
              </a>
            </Button>
          </>
        }
        image={
          heroImage?.jsonValue?.value && (
            <NextJssImage
              field={heroImage?.jsonValue}
              next={{
                fill: true,
                sizes: '100vw',
                loading: 'eager',
                priority: true,
              }}
            />
          )
        }
      />
      <BlogContent theme={props.params?.Theme || 'A-HCA-White'}>
        <div className="vacancy-rte">
          <SitecoreSvg>{data?.bodyPlain}</SitecoreSvg>
        </div>
        <Container marginTop="spacing-6" marginBottom="spacing-6">
          <Button variation={'full-dark'} size="large">
            <a href={data.applicationUrl}>
              <span>
                Apply <strong>now</strong>
              </span>
              <Icons iconName={'iconArrowRight'} />
            </a>
          </Button>
        </Container>
      </BlogContent>
    </Themes>
  );
};

// Pre-fetch response data on the server, to be consumed as fallbackData by SWR, and into initial HTML response.
export const getServerSideProps: GetStaticComponentProps = async (
  _,
  __,
  context: GetServerSidePropsContext
) => {
  try {
    const response = await fetch(
      `${process.env.INTEGRATION_LAYER_URL}/careers/job/${context.query.path}`
    );
    const data = await response.json();
    return await data.response;
  } catch (error) {
    //console.error('JobDetailsHeader fetch error:', error);
    return { error: error?.toString?.() ?? 'Unknown error' };
  }
};
