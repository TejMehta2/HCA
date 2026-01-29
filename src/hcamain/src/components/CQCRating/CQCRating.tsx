import React from 'react';
import {
  Image as JssImage,
  Link as JssLink,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Icons from '@component-library/foundation/Icons/Icons';
import CQCBlock from '@component-library/components/CQCBlock/CQCBlock';
import { CQCBlockProps } from '@component-library/components/CQCBlock/CQCBlock.types';
import { CQCRatingProps } from './CQCRating.types';

const CQCRatingDefaultComponent = (props: CQCRatingProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;

  return !isExperienceEditor ? (
    <></>
  ) : (
    <div className={`component ${props.params?.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">
          CQC Ratings. Please click to select datasource.
        </span>
      </div>
    </div>
  );
};

export const Default = (props: CQCRatingProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;

  if (!props.fields) {
    return <CQCRatingDefaultComponent {...props} />;
  }
  const { hideRating = false, length = 'long' } = props;

  const defaultRating = (
    props.fields?.Status?.displayName
      ? props.fields?.Status?.displayName
      : props.fields?.Status?.fields?.displayName
  ) as CQCBlockProps['rating'];

  const ratingLink =
    props.fields?.ReportLink?.value?.href && !isExperienceEditor ? (
      <a href={props.fields?.ReportLink?.value?.href}></a>
    ) : (
      props.fields?.ReportLink && <JssLink field={props.fields?.ReportLink} />
    );

  const lightLogo = props.fields?.Status?.fields?.CQCLogoLight?.fields?.Logo
    .fields
    ? props.fields?.Status?.fields?.CQCLogoLight?.fields?.Logo.fields
    : props.fields?.Status?.fields?.CQCLogoLight?.fields?.Logo;

  const darkLogo = props.fields?.Status?.fields?.CQCLogoDark?.fields?.Logo
    .fields
    ? props.fields?.Status?.fields?.CQCLogoDark?.fields?.Logo.fields
    : props.fields?.Status?.fields?.CQCLogoDark?.fields?.Logo;

  return (
    <div className={`component ${props.params?.styles}`} component-name="cqc">
      <CQCBlock
        title={props.fields?.Title?.value}
        text={props.fields?.Text?.value}
        link={ratingLink}
        length={length}
        rating={hideRating ? undefined : defaultRating}
        icon={<Icons iconName="iconCheckCircle"></Icons>}
        logo={{
          dark: <JssImage field={lightLogo} width="120" height="37" />,
          light: <JssImage field={darkLogo} width="120" height="37" />,
        }}
      ></CQCBlock>
    </div>
  );
};
