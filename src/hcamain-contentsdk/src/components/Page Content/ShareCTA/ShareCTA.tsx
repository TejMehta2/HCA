'use client';

import { type JSX, useState } from 'react';
import {
  Field,
  LinkField,
  Text as JssText,
  RichText as JssRichText,
} from '@sitecore-content-sdk/nextjs';
import ShareCTA from '@component-library/components/ShareCTA/ShareCTA';
import Button from '@component-library/core-components/Button/Button';
import Icons from '@component-library/foundation/Icons/Icons';
import Text from '@component-library/foundation/Text/Text';
import Params from 'src/types/params';
import { removeTags } from '@component-library/utility-functions';

type CTAIconFields = {
  svgMarkup?: Field<string>;
};

type ShareTemplate =
  | 'CopyLinkShare'
  | 'FacebookShare'
  | 'MessengerShare'
  | 'TwitterXShare'
  | 'WhatsAppShare'
  | 'EmailShare';
type SharePlatformsFields = {
  template?: { name?: ShareTemplate };
  cTAText?: { jsonValue?: Field<string> };
};

const findSharePlatformCtaText =
  (platformList: SharePlatformsFields[]) => (template: ShareTemplate) =>
    platformList?.find((item) => item?.template?.name === template)?.cTAText
      ?.jsonValue;

interface Fields {
  data: {
    item: {
      title?: { jsonValue: Field<string> };
      text?: { jsonValue: Field<string> };
      cTAIcon?: {
        Icon: CTAIconFields;
      };
      cTALink?: { jsonValue: LinkField };
      sharePlatforms: {
        sharePlatformsList: SharePlatformsFields[];
      };
    };
    contextItem?: {
      title?: { value: string };
      text?: { value: string };
      url?: { url: string };
    };
  };
}

type ShareCTAProps = {
  params?: Params;
  fields?: Fields;
};

const ShareCTADefaultComponent = (props: ShareCTAProps): JSX.Element => (
  <div className={`component ${props.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">ShareCTA no datasource</span>
    </div>
  </div>
);

export const Default = (props: ShareCTAProps): JSX.Element => {
  const [copied, setCopied] = useState(false);

  if (!props.fields) {
    return <ShareCTADefaultComponent {...props} />;
  }

  // Prime the higher order function with the share list
  const findCtaText = findSharePlatformCtaText(
    props.fields?.data.item.sharePlatforms.sharePlatformsList
  );

  const shareText = props.fields?.data.contextItem?.text?.value
    ? removeTags(props.fields?.data.contextItem?.text?.value)
    : '';
  // Organize the re-usable share data
  const shareData = {
    url: props.fields?.data.contextItem?.url?.url || '',
    title: props.fields?.data.contextItem?.title?.value || '',
    text: shareText,
  };

  return (
    <ShareCTA
      shareCtaText={
        <JssRichText
          field={{
            value: props.fields?.data.item.cTALink?.jsonValue.value.text,
          }}
        />
      }
      shareCtaIcon={
        props.fields?.data?.item?.cTAIcon?.Icon?.svgMarkup?.value && (
          <span
            dangerouslySetInnerHTML={{
              __html:
                props.fields?.data?.item?.cTAIcon?.Icon?.svgMarkup?.value || '',
            }}
          ></span>
        )
      }
      shareData={shareData}
      heading={
        <Text tag="h2" variation="display-2">
          <JssText field={props.fields?.data?.item?.title?.jsonValue} />
        </Text>
      }
      subheading={
        <Text tag="p" variation="subheading-1">
          <JssText field={props.fields?.data?.item?.text?.jsonValue} />
        </Text>
      }
    >
      {findCtaText('CopyLinkShare') && (
        <Button size="large" variation="square-outline">
          <button
            onClick={() => {
              navigator?.clipboard?.writeText?.(shareData.url);
              setCopied(true);
            }}
          >
            {copied ? (
              <>
                <Icons iconName="iconCheck" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Icons iconName="iconCopy" />
                <JssText tag="span" field={findCtaText('CopyLinkShare')} />
              </>
            )}
          </button>
        </Button>
      )}
      {findCtaText('EmailShare') && (
        <Button size="large" variation="square-outline">
          <a
            href={`mailto:?subject=${encodeURI(
              shareData.title
            )}&body=${encodeURI(shareData.text)}`}
          >
            <Icons iconName="iconEmail" />
            <JssText tag="span" field={findCtaText('EmailShare')} />
          </a>
        </Button>
      )}
      {findCtaText('WhatsAppShare') && (
        <Button size="large" variation="square-outline">
          <a
            href={`https://wa.me/send?text=${shareData.url}`}
            rel="nofollow noopener"
            target="_blank"
          >
            <Icons iconName="iconWhatsapp" />
            <JssText tag="span" field={findCtaText('WhatsAppShare')} />
          </a>
        </Button>
      )}
      {findCtaText('FacebookShare') && (
        <Button size="large" variation="square-outline">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareData.url}`}
            rel="nofollow noopener"
            target="_blank"
          >
            <Icons iconName="iconFacebook" />
            <JssText tag="span" field={findCtaText('FacebookShare')} />
          </a>
        </Button>
      )}
      {findCtaText('MessengerShare') && (
        <Button size="large" variation="square-outline">
          <a
            href={`http://www.facebook.com/dialog/send?app_id=2003187033308504&link=${shareData.url}&redirect_uri=${shareData.url}`}
            rel="nofollow noopener"
            target="_blank"
          >
            <Icons iconName="iconMessenger" />
            <JssText tag="span" field={findCtaText('MessengerShare')} />
          </a>
        </Button>
      )}
      {findCtaText('TwitterXShare') && (
        <Button size="large" variation="square-outline">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURI(
              shareData.title
            )}&url=${shareData.url}`}
            rel="nofollow noopener"
            target="_blank"
          >
            <Icons iconName="iconX" />
            <JssText tag="span" field={findCtaText('TwitterXShare')} />
          </a>
        </Button>
      )}
    </ShareCTA>
  );
};
