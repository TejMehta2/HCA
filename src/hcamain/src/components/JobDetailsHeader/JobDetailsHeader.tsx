import React from 'react';
import {
  useSitecoreContext,
  GetStaticComponentProps,
  useComponentProps,
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

export const Default = (props: JobDetailsHeaderProps): JSX.Element => {
  const data = useComponentProps<JobsResponse>(props.rendering?.uid);

  if (!props?.fields?.data?.item || !data) {
    return <JobDetailsHeaderDefaultComponent {...props} />;
  }

  return (
    <Themes theme={props.params?.Theme || 'A-HCA-White'}>
      <Head>
        <title>{data.name}</title>
        <meta property="og:title" content={data.name} />
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
      {/* V2
      <p>
        header images are mapped with corresponding jobFamily/area page. find
        matching Job s jobFamily field value from the API response in dictionary
        below and use corresponding image{' '}
      </p>
      {props.fields?.data?.item?.headerImageMapping?.targetItems.map(
        (setting, key) => {
          return (
            <p key={key}>
              jobfamily:{setting.jobFamily?.value}
              image:{setting.image?.jsonValue?.value?.src}
            </p>
          );
        }
      )}
      <p>if there is no match, use default header image:</p>
      {props.fields?.data?.contextItem?.image?.jsonValue?.value?.src} */}
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
    console.error(error);
    return {};
  }
};
