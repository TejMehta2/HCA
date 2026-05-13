import { type JSX } from 'react';
import {
  ImageField,
  RichText as JssRichText,
  Text as JssText,
  LinkField,
} from '@sitecore-content-sdk/nextjs';
import { ComponentWithContextProps } from 'lib/component-props';
import Text from '@component-library/foundation/Text/Text';
import Params from 'src/types/params';
import Image from 'next/image';
import { upsertQuerystringParam } from 'lib/utility-functions/addThumbnailParameter';
import PageTeaser from '@component-library/site-components/PageTeaser/PageTeaser';
import Themes from '@component-library/foundation/Themes/Themes';

interface PagesFields {
  abstractTitle?: { value?: string };
  abstractText?: { value?: string };
  abstractImage?: { jsonValue: ImageField };
  title?: { value?: string };
  text?: { value?: string };
  image?: { jsonValue: ImageField };
  url?: { path?: string; url?: string };
  proxyurl?: { jsonValue: LinkField; path?: string; text: string };
}

interface Fields {
  data?: {
    item?: PagesFields;
  };
}

export type PageTeaserProps = ComponentWithContextProps & {
  params?: Params;
  fields?: Fields;
  dataSource: string;
};

const PageTeaserDefaultComponent = (props: PageTeaserProps): JSX.Element => {
  const isExperienceEditor = props.page.mode.isEditing;

  return !isExperienceEditor ? (
    <></>
  ) : (
    <div className={`component ${props.params?.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">
          Page teaser. Please click to select datasource.
        </span>
      </div>
    </div>
  );
};

export const Default = (props: PageTeaserProps): JSX.Element => {
  if (!props.fields?.data?.item) {
    return <PageTeaserDefaultComponent {...props} />;
  }

  const targetPage = props.fields?.data?.item;

  const cardCtaUrl = targetPage?.proxyurl?.jsonValue?.value?.href
    ? targetPage?.proxyurl?.jsonValue?.value?.href
    : targetPage?.url?.url;

  return (
    <Themes theme={props.params?.Theme || 'L-HCA-Teal-5'}>
      <PageTeaser
        image={
          targetPage.abstractImage?.jsonValue.value?.src &&
          targetPage.abstractImage?.jsonValue.value?.class !==
            'scEmptyImage' ? (
            <Image
              src={upsertQuerystringParam(
                targetPage.abstractImage.jsonValue?.value?.src || '',
                't',
                'c200'
              )}
              alt={
                (targetPage.abstractImage.jsonValue?.value?.alt as string) || ''
              }
              width="150"
              height="150"
              quality={90}
            />
          ) : targetPage.image?.jsonValue?.value?.src ? (
            <Image
              src={upsertQuerystringParam(
                targetPage.image?.jsonValue?.value?.src || '',
                't',
                'c200'
              )}
              alt={(targetPage.image?.jsonValue?.value?.alt as string) || ''}
              width="150"
              height="150"
              quality={90}
            />
          ) : undefined
        }
        title={
          <Text tag="h3" variation="heading-2">
            {targetPage.abstractTitle?.value ? (
              <JssText field={targetPage.abstractTitle} />
            ) : (
              <JssText field={targetPage.title} />
            )}
          </Text>
        }
        bodyCopy={
          <Text tag="div" variation="body-large">
            {targetPage.abstractText?.value ? (
              <JssRichText tag="div" field={targetPage.abstractText} />
            ) : (
              <JssRichText tag="div" field={targetPage.text} />
            )}
          </Text>
        }
        link={
          cardCtaUrl ? (
            <a href={cardCtaUrl}>
              <Text tag="span">Learn more</Text>
            </a>
          ) : (
            <></>
          )
        }
      />
    </Themes>
  );
};
