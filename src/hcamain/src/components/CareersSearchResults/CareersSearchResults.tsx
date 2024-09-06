import React from 'react';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

import Params from 'src/types/params';
import Themes from '@component-library/foundation/Themes/Themes';

interface Fields {
  ReadMoreCtaText?: { value?: string };
}

type CareersSearchResultsProps = {
  params?: Params;
  fields?: Fields;
};

const CareersSearchResultsDefaultComponent = (
  props: CareersSearchResultsProps
): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            Careers Search Results. Please click to select datasource
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

export const Default = (props: CareersSearchResultsProps): JSX.Element => {
  console.log('!props?.fields?:', props?.fields);
  if (!props?.fields) {
    return <CareersSearchResultsDefaultComponent {...props} />;
  }
  return (
    <Themes theme={props.params?.Theme || 'A-HCA-White'}>
      <p>Search controls:</p>
      <p>{props.fields.ReadMoreCtaText?.value}</p>
    </Themes>
  );
};
