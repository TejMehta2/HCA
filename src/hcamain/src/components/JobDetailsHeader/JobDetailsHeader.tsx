import React from 'react';
import {
  useSitecoreContext,
  GetStaticComponentProps,
} from '@sitecore-jss/sitecore-jss-nextjs';

import Themes from '@component-library/foundation/Themes/Themes';

import { JobDetailsHeaderProps } from './JobDetailsHeader.types';

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
  if (!props?.fields?.data?.item) {
    return <JobDetailsHeaderDefaultComponent {...props} />;
  }
  return (
    <Themes theme={props.params?.Theme || 'B-HCA-Navy-Blue'}>
      <p>
        header images are mapped with corresponding jobFamily/area page. find
        matching Job's jobFamily field value from the API response in dictionary
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
      {props.fields?.data?.contextItem?.image?.jsonValue?.value?.src}
    </Themes>
  );
};

// Pre-fetch response data on the server, to be consumed as fallbackData by SWR, and into initial HTML response.
export const getStaticProps: GetStaticComponentProps = async () => {
  try {
    const response = await fetch(
      `${process.env.INTEGRATION_LAYER_URL}/careers/job?name=`
    );
    const data = await response.json();
    return JSON.parse(JSON.stringify(data.response));
  } catch (error) {
    console.error(error);
    return {};
  }
};
