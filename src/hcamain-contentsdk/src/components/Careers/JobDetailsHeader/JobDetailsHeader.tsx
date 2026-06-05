import { type JSX } from 'react';
import Themes from '@component-library/foundation/Themes/Themes';
import VacancyHeader from '@component-library/careers/VacancyHeader/VacancyHeader';
import {
  JobDetailsHeaderProps,
  VacancyResponse,
  VacancyRoute,
} from './JobDetailsHeader.types';
import Text from '@component-library/foundation/Text/Text';
import Button from '@component-library/core-components/Button/Button';
import Icons from '@component-library/foundation/Icons/Icons';
import { getDynamicTitleStyle } from '@component-library/site-components/HeaderPlain/HeaderPlain';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';

const JobDetailsHeaderDefaultComponent = (
  props: JobDetailsHeaderProps
): JSX.Element => {
  const isExperienceEditor = props.page.mode.isEditing;
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
  const vacancydata = props.page.layout.sitecore.route as VacancyRoute | undefined;
  const data = vacancydata?.vacancy as VacancyResponse | undefined;

  if (!props?.fields?.data?.item) {
    return <JobDetailsHeaderDefaultComponent {...props} />;
  }

  if (props.page.mode.isEditing) {
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
