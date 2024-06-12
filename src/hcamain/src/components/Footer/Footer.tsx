import React from 'react';
import {
  Placeholder,
  Text as JssText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { FooterProps, Profile } from './Footer.types';
import { linkReducer, columnMapper, SocialMediaCta } from './Footer.utilities';
import { Default as Doctify } from '../Doctify/Doctify';
import { Default as CQCRating } from '../CQCRating/CQCRating';
import Text from '@component-library/foundation/Text/Text';
import dynamic from 'next/dynamic';

const DynamicFooter = dynamic(
  () => import('@component-library/site-components/Footer/Footer')
);

const FooterDefaultComponent = (props: FooterProps): JSX.Element => (
  <div className={`component ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Empty Footer</span>
    </div>
  </div>
);

export const Default = (props: FooterProps): JSX.Element => {
  if (!props.fields) {
    return <FooterDefaultComponent {...props} />;
  }
  // Map children using utilities
  const socials = props.fields?.SocialMediaProfilesGroup?.fields?.Profiles?.map(
    (profile: Profile, index: number) => (
      <SocialMediaCta key={index} {...profile} />
    )
  );
  const columns =
    props.fields?.NavigationColumnsFolders?.map(columnMapper(socials)) || [];
  const reviewColumn = {
    reviews: [
      props.fields?.CqcStatus?.fields ? (
        <CQCRating
          key={1}
          length="short"
          hideRating={true}
          {...props.fields?.CqcStatus}
        />
      ) : (
        <></>
      ),
      props.fields?.DoctifyReviews?.fields ? (
        <Doctify
          params={props.params}
          key={2}
          fields={{ Reviews: props.fields?.DoctifyReviews }}
        />
      ) : (
        <></>
      ),
    ],
  };
  const legals = props.fields?.BottomLineLinksFolder?.fields?.Links?.reduce(
    linkReducer,
    []
  );
  return (
    <DynamicFooter
      copyright={
        props.fields?.Copyright?.value ? (
          <Text variation={'body-small'}>
            <JssText field={props.fields?.Copyright} />
          </Text>
        ) : undefined
      }
      buttons={
        props.rendering ? (
          <Placeholder
            name={`cta-buttons-${props.params?.DynamicPlaceholderId}`}
            rendering={props.rendering}
          />
        ) : (
          <></>
        )
      }
      columns={[...columns, reviewColumn]}
      legals={legals}
    />
  );
};
