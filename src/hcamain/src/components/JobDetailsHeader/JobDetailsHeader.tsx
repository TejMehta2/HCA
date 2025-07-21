import React from 'react';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import Themes from '@component-library/foundation/Themes/Themes';
import VacancyHeader from '@component-library/careers/VacancyHeader/VacancyHeader';
import { JobDetailsHeaderProps, VacancyRoute } from './JobDetailsHeader.types';
import Text from '@component-library/foundation/Text/Text';
import Button from '@component-library/core-components/Button/Button';
import Icons from '@component-library/foundation/Icons/Icons';
import Head from 'next/head';
import { getDynamicTitleStyle } from '@component-library/site-components/HeaderPlain/HeaderPlain';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';
import { addThumbnailParameter } from 'lib/utility-functions/addThumbnailParameter';

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
  const { sitecoreContext } = useSitecoreContext();
  const vacancydata = sitecoreContext.route as VacancyRoute | undefined;
  const data = vacancydata?.vacancy;

  if (!props?.fields?.data?.item) {
    return <JobDetailsHeaderDefaultComponent {...props} />;
  }

  if (sitecoreContext?.pageEditing) {
    return <div>Vacancy details header</div>;
  }

  if (!data?.name) {
    return <></>;
  }

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
    </Themes>
  );
};
