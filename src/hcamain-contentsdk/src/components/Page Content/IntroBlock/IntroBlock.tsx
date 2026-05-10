import { type JSX } from 'react';
import {
  Field,
  LinkField,
  Text as JSSText,
  RichText as JssRichText,
  Link as JssLink,
  ImageField,
  ComponentRendering,
  Placeholder,
} from '@sitecore-content-sdk/nextjs';
import Text from '@component-library/foundation/Text/Text';
import Params from 'src/types/params';
import { Default as Doctify } from '../Doctify/DoctifyGraphQl';
import { Default as CQCRating } from '../CQCRating/CQCRatingGraphQl';
import SitecoreSvg from 'src/jss-abstractions/SitecoreSvg/SitecoreSvg';
import NextJssImage from 'src/jss-abstractions/NextJssImage/NextJssImage';
import dynamic from 'next/dynamic';
import RichText from '@component-library/core-components/RichText/RichText';
import PlaceHolderWrapper from 'src/jss-abstractions/PlaceholderWrapper/PlaceholderWrapper';
import { inPageNavGlobalStore } from 'src/context/inPageNavGlobalStorage';
import getHeadingTags from 'lib/getHeadingTags';
import { DoctifyReviewsFieldsGraphQl } from 'src/components/Page Content/Doctify/DoctifyGraphQl.types';
import { CQCFieldsGraphQl } from 'src/components/Page Content/CQCRating/CQCRatingGraphQl.types';
import { ComponentWithContextProps } from 'lib/component-props';

const DynamicHomepageIntroBlock = dynamic(
  () =>
    import('@component-library/site-components/HomepageIntroBlock/HomepageIntroBlock'),
  {
    ssr: true,
  }
);

interface CountersFields {
  number?: {
    jsonValue: Field<string>;
  };
  text?: {
    jsonValue: Field<string>;
  };
}

interface Fields {
  title?: {
    jsonValue: Field<string>;
  };
  headline?: {
    jsonValue: Field<string>;
  };
  text?: {
    jsonValue: Field<string>;
  };
  image?: { jsonValue: ImageField };
  cTAIcon?: {
    targetItem: {
      svgMarkup?: Field<string>;
    };
  };
  cTALink: { jsonValue: LinkField };
  counters?: { targetItems: CountersFields[] };
  cQCStatus?: { targetItem: CQCFieldsGraphQl };
  doctifyReviews?: { targetItem: DoctifyReviewsFieldsGraphQl };
}

export type IntroBlockProps = ComponentWithContextProps & {
  params?: Params;
  fields?: {
    data?: {
      item?: Fields;
    };
  };
  rendering?: ComponentRendering;
};

const IntroBlockDefaultComponent = (props: IntroBlockProps): JSX.Element => {
  const isExperienceEditor = props.page.mode.isEditing;

  return !isExperienceEditor ? (
    <></>
  ) : (
    <div className={`component ${props.params?.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">
          Intro Block. Please click to select datasource.
        </span>
      </div>
    </div>
  );
};

interface ImageLeftProps extends IntroBlockProps {
  imageAlignment: 'left' | 'right';
}

export const ImageLeft = (props: ImageLeftProps): JSX.Element => {
  const { imageAlignment = 'left' } = props;
  const isExperienceEditor = props.page.mode.isEditing;

  const datasource = props?.fields?.data?.item;

  if (!datasource) {
    return <IntroBlockDefaultComponent {...props} />;
  }

  const tableOfContentsLinkTitle = datasource?.title?.jsonValue?.value;
  const componentAnchorId = inPageNavGlobalStore.addItem(
    props?.params,
    tableOfContentsLinkTitle
  );
  const tableOfContentTitle =
    props?.params?.TableOfContentsLinkTitle || tableOfContentsLinkTitle;

  const phKey = `intro-block-${props.params?.DynamicPlaceholderId}`;

  const cta = isExperienceEditor ? (
    <JssLink field={datasource?.cTALink?.jsonValue}></JssLink>
  ) : datasource?.cTALink?.jsonValue &&
    datasource?.cTALink?.jsonValue?.value?.text ? (
    <JssLink field={datasource?.cTALink?.jsonValue}>
      <SitecoreSvg>
        {datasource?.cTAIcon?.targetItem?.svgMarkup?.value}
      </SitecoreSvg>

      <JssRichText
        field={{
          value: datasource?.cTALink?.jsonValue?.value?.text,
        }}
      />
    </JssLink>
  ) : undefined;
  const stats = datasource?.counters?.targetItems?.map((counters) => ({
    value: <JSSText field={counters.number?.jsonValue} />,
    label: <JSSText field={counters.text?.jsonValue} />,
  }));
  const { headingTag, subheadingTag } = getHeadingTags(
    props?.params,
    datasource?.headline?.jsonValue?.value
  );
  const keepAspectRatio = props?.params?.KeepAspectRatio === '1';

  return (
    <DynamicHomepageIntroBlock
      id={componentAnchorId}
      {...(tableOfContentTitle &&
      props?.params?.ExcludeFromTableOfContents !== '1'
        ? { tableOfContentTitle: tableOfContentTitle }
        : {})}
      imageAlignment={imageAlignment}
      imageKeepAspectRatio={keepAspectRatio}
      theme={props.params?.Theme || 'A-HCA-White'}
      title={
        <Text
          tag={headingTag}
          variation={props.params?.HeadingSize || 'display-3'}
        >
          <JssRichText tag="span" field={datasource?.title?.jsonValue} />
        </Text>
      }
      subtitle={
        datasource?.headline?.jsonValue.value ? (
          <Text tag={subheadingTag} variation={'subheading-2'}>
            <JSSText field={datasource?.headline?.jsonValue} />
          </Text>
        ) : undefined
      }
      copy={
        <Text tag="div" variation="body-large">
          <RichText>
            <JssRichText field={datasource?.text?.jsonValue} />
          </RichText>
        </Text>
      }
      stats={stats || []}
      cta={cta || <></>}
      image={
        <NextJssImage
          field={datasource?.image?.jsonValue}
          editable={false}
          page={props.page}
          next={{
            width: 800,
            height: 1000,
            sizes: '(max-width: 768px) 100vw, 50vw',
          }}
        />
      }
      cqc={
        datasource?.cQCStatus?.targetItem ? (
          <CQCRating
            rendering={props.rendering}
            params={props.params}
            page={props.page}
            length="short"
            hideRating={true}
            fields={{
              data: { item: datasource?.cQCStatus?.targetItem },
            }}
          />
        ) : (
          <></>
        )
      }
      doctify={
        datasource?.doctifyReviews?.targetItem ? (
          <Doctify
            rendering={props.rendering}
            params={props.params}
            page={props.page}
            alignment="left"
            key={2}
            fields={{
              data: { item: { Reviews: datasource?.doctifyReviews } },
            }}
          />
        ) : (
          <></>
        )
      }
    >
      {props.rendering && (
        <PlaceHolderWrapper>
          <Placeholder name={phKey} rendering={props.rendering} />
        </PlaceHolderWrapper>
      )}
    </DynamicHomepageIntroBlock>
  );
};

export const ImageRight = (props: IntroBlockProps): JSX.Element => {
  if (!props.fields) {
    return <IntroBlockDefaultComponent {...props} />;
  }
  return <ImageLeft {...props} imageAlignment="right" />;
};
