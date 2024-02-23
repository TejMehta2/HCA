import React from 'react';
import {
  Field,
  LinkField,
  Text as JssText,
  Link as JssLink,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';

type CTAIconFields = {
  svgMarkup: Field<string>;
};

type SharePlatformsFields = {
  cTAText: { jsonValue: Field<string> };
};

interface Fields {
  data: {
    item: {
      title: { jsonValue: Field<string> };
      text: { jsonValue: Field<string> };
      cTAIcon: {
        Icon: CTAIconFields;
      };
      cTALink: { jsonValue: LinkField };
      sharePlatforms: {
        sharePlatformsList: SharePlatformsFields[];
      };
    };
    contextItem: {
      title: { value: string };
      text: { value: string };
      url: { url: string };
    };
  };
}

type ShareCTAProps = {
  params: {
    [key: string]: string;
  };
  fields: Fields;
};

const ShareCTADefaultComponent = (props: ShareCTAProps): JSX.Element => (
  <div className={`component ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">ShareCTA no datasource</span>
    </div>
  </div>
);

export const Default = (props: ShareCTAProps): JSX.Element => {
  const { t: localise } = useI18n();
  if (!props.fields) {
    return <ShareCTADefaultComponent {...props} />;
  }
  return (
    <div className={`component ${props.params.styles}`}>
      <JssText field={props.fields.data?.item?.title.jsonValue} />
      <br />
      <JssText field={props.fields.data?.item?.text.jsonValue} />
      <br />
      <ul>
        {props.fields.data?.item?.sharePlatforms.sharePlatformsList.map(
          (sharePlatform, index) => (
            <li key={index}>
              <JssText field={sharePlatform.cTAText.jsonValue} />
              <br />
            </li>
          )
        )}
      </ul>
      <br />
      <JssLink field={props.fields.data?.item?.cTALink.jsonValue}></JssLink>
      <br />
      {props?.fields?.data?.item?.cTAIcon?.Icon && (
        <span
          dangerouslySetInnerHTML={{
            __html: props.fields.data?.item?.cTAIcon.Icon.svgMarkup.value,
          }}
        />
      )}
      <br />
      <JssText field={props.fields.data?.contextItem.title} />
      <br />
      <JssText field={props.fields.data?.contextItem.text} />
      <br />
      <a href={props.fields.data?.contextItem.url.url}>
        {props.fields.data?.contextItem.url.url}
      </a>
      <br />
      <p>Text: {localise('close')}</p>
    </div>
  );
};
