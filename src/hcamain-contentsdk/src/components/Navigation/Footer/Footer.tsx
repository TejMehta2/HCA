import React, { type JSX } from 'react';
import { Placeholder, Text as JssText } from '@sitecore-content-sdk/nextjs';
import { FooterProps, Profile } from './Footer.types';
import { linkReducer, columnMapper, SocialMediaCta } from './Footer.utilities';
import { Default as Doctify } from 'src/components/Page Content/Doctify/DoctifyGraphQl';
import { Default as CQCRating } from 'src/components/Page Content/CQCRating/CQCRatingGraphQl';
import Text from '@component-library/foundation/Text/Text';
import Footer from '@component-library/site-components/Footer/Footer';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';

const FooterDefaultComponent = (props: FooterProps): JSX.Element => {
  const { page } = props;
  const isExperienceEditor = page.mode.isEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            Footer. Please click to select datasource
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

export const Default = (props: FooterProps): JSX.Element => {
  if (!props.fields) {
    return <FooterDefaultComponent {...props} />;
  }
  // Map children using utilities
  const socials =
    props.fields?.data?.item?.socialMediaProfilesGroup?.targetItem?.profiles?.targetItems?.map(
      (profile: Profile, index: number) => (
        <SocialMediaCta key={index} {...profile} />
      )
    );
  const columns =
    props.fields?.data?.item?.navigationColumnsFolders?.targetItems?.map(
      columnMapper(socials)
    ) || [];

  const reviewColumn = {
    reviews: [
      props.fields?.data?.item?.cqcStatus?.targetItem ? (
        <CQCRating
          params={props.params}
          rendering={props.rendering}
          page={props.page}
          key={1}
          length="short"
          hideRating={true}
          fields={{
            data: {
              item: props.fields?.data?.item?.cqcStatus?.targetItem,
            },
          }}
        />
      ) : (
        <></>
      ),
      props.fields?.data?.item?.doctifyReviews?.targetItem &&
      typeof window !== 'undefined' &&
      window.location.href.indexOf(
        process.env.NEXT_PUBLIC_BASE_URL_CAREERS || 'careers'
      ) === -1 ? (
        <Doctify
          rendering={props.rendering}
          page={props.page}
          params={props.params}
          key={2}
          fields={{
            data: {
              item: { Reviews: props.fields?.data?.item?.doctifyReviews },
            },
          }}
        />
      ) : (
        <></>
      ),
    ],
  };
  const legals =
    props.fields?.data?.item?.bottomLineLinksFolder?.targetItem?.links?.targetItems?.reduce(
      linkReducer,
      []
    );

  const contact = props.fields.data?.item?.contact?.targetItem;
  const hasTelephone = contact?.telephoneNumber?.targetItems ? true : false;

  const contactUnitDetails: {
    internationalPhoneNumber: string | undefined;
    phoneNumber: string | undefined;
    unitName: string | undefined;
  } = {
    internationalPhoneNumber: hasTelephone
      ? contact?.telephoneNumber?.targetItems[0]?.internationPhoneNumber?.value
      : '',
    phoneNumber: hasTelephone
      ? contact?.telephoneNumber?.targetItems[0]?.phoneNumber?.value
      : '',
    unitName: contact?.contactUnitName?.value,
  };

  return (
    <Footer
      noLogo={props?.params?.NoLogo === '1'}
      logo={
        props?.fields?.data?.item?.logo?.jsonValue?.value &&
        props.fields.data.item.logo.jsonValue.value['class'] !==
          'scEmptyImage' &&
        props.fields.data.item.logo.jsonValue.value.src &&
        props.fields.data.item.logo.jsonValue.value.src.trim() !== '' ? (
          <NextJssImage
            editable={false}
            field={props.fields.data.item.logo.jsonValue}
            next={{
              width: 200,
              height: 55,
            }}
          />
        ) : undefined
      }
      theme={props.params?.Theme || 'B-HCA-Navy-Blue'}
      copyright={
        props.fields?.data?.item?.copyright?.value ? (
          <Text variation={'body-small'}>
            <JssText field={props.fields?.data?.item?.copyright} />
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
      contact={contactUnitDetails}
    />
  );
};
