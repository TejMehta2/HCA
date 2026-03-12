import React from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Link as JssLink,
  Text as JssText,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';
import Params from 'src/types/params';

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
    <div className={`component basic-footer ${props.params?.styles || ''}`}>
      <div className="component-content">
        {props.fields?.data?.item?.logo?.jsonValue?.value?.src &&
          props.fields.data.item.logo.jsonValue.value['class'] !==
            'scEmptyImage' && (
            <div className="basic-footer__logo">
              <NextJssImage
                editable={false}
                field={props.fields.data.item.logo.jsonValue}
                next={{ width: 200, height: 55 }}
              />
            </div>
          )}
        {props.fields?.data?.item?.linksFolder?.targetItem?.links?.targetItems &&
          props.fields.data.item.linksFolder.targetItem.links.targetItems
            .length > 0 && (
            <nav className="basic-footer__links">
              {props.fields.data.item.linksFolder.targetItem.links.targetItems.map(
                (link, index) =>
                  link?.link?.jsonValue ? (
                    <JssLink
                      key={index}
                      field={link.link.jsonValue}
                      editable={false}
                    />
                  ) : null
              )}
            </nav>
          )}
        {props.fields?.data?.item?.copyright?.value && (
          <div className="basic-footer__copyright">
            <JssText
              field={props.fields.data.item.copyright}
              editable={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};
