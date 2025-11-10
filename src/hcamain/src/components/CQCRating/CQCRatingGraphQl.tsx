import React from 'react';
import {
  Image as JssImage,
  Link as JssLink,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Icons from '@component-library/foundation/Icons/Icons';
import CQCBlock from '@component-library/components/CQCBlock/CQCBlock';
import { CQCBlockProps } from '@component-library/components/CQCBlock/CQCBlock.types';
import { CQCRatingProps } from './CQCRatingGraphQl.types';

const CQCRatingDefaultComponent = (props: CQCRatingProps): JSX.Element => (
  <div className={`component ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">CQC Rating no datasource</span>
    </div>
  </div>
);

export const Default = (props: CQCRatingProps): JSX.Element => {
  const datamodel = props?.fields?.data?.item;

  if (!datamodel) {
    return <CQCRatingDefaultComponent {...props} />;
  }
  const { hideRating = false, length = 'long' } = props;

  const defaultRating = (
    datamodel?.status?.targetItem.displayName
      ? datamodel?.status?.targetItem.displayName
      : datamodel?.status?.targetItem.fields?.displayName
  ) as CQCBlockProps['rating'];

  const ratingLink = datamodel?.reportLink?.jsonValue?.value?.href ? (
    <a href={datamodel?.reportLink?.jsonValue?.value?.href}></a>
  ) : (
    <></>
  );

  const lightLogo =
    datamodel?.status?.targetItem?.cQCLogoLight?.targetItem?.logo.jsonValue;
  const darkLogo =
    datamodel?.status?.targetItem?.cQCLogoDark?.targetItem?.logo.jsonValue;

  return (
    <div className={`component ${props.params?.styles}`} component-name="cqc">
      <CQCBlock
        title={datamodel?.title?.value}
        text={datamodel?.text?.value}
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
