import React from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Link as JssLink,
  Text as JssText,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Text from '@component-library/foundation/Text/Text';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';
import Params from 'src/types/params';
import FooterSmall from '@component-library/site-components/FooterSmall/FooterSmall';

interface NavigationLink {
  link?: { jsonValue?: LinkField };
}

interface NavigationLinksList {
  links?: { targetItems?: NavigationLink[] };
}

interface Fields {
  data?: {
    item?: {
      logo?: { jsonValue?: ImageField };
      linksFolder?: { targetItem?: NavigationLinksList };
      copyright?: Field<string>;
    };
  };
}

export type BasicFooterProps = {
  params?: Params;
  fields?: Fields;
};

const BasicFooterDefaultComponent = (props: BasicFooterProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;

  return !isExperienceEditor ? (
    <></>
  ) : (
    <div className={`component ${props.params?.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">
          Basic Footer. Please click to select datasource.
        </span>
      </div>
    </div>
  );
};

export const Default = (props: BasicFooterProps): JSX.Element => {
  if (!props.fields) {
    return <BasicFooterDefaultComponent {...props} />;
  }

  return (
    <FooterSmall
      copyright={
        props.fields?.data?.item?.copyright?.value ? (
          <Text tag="small" variation="body-small">
            <JssText field={props.fields?.data?.item?.copyright} />
          </Text>
        ) : undefined
      }
      ctas={
        props.fields?.data?.item?.linksFolder?.targetItem?.links?.targetItems
          ?.filter((link) => link?.link?.jsonValue)
          ?.map((link, index) => {
            if (!link?.link?.jsonValue) return <></>;

            return <JssLink key={index} field={link.link.jsonValue} />;
          }) || []
      }
      logo={
        (props.fields?.data?.item?.logo?.jsonValue?.value?.src &&
          props.fields.data.item.logo.jsonValue.value['class'] !==
            'scEmptyImage' && (
            <div className="basic-footer__logo">
              <NextJssImage
                editable={false}
                field={props.fields.data.item.logo.jsonValue}
                next={{ width: 209, height: 34 }}
              />
            </div>
          )) ||
        undefined
      }
      theme={props.params?.Theme || 'Palace-Red'}
    />
  );
};
