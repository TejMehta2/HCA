/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Field,
  LinkField,
  ImageField,
  ComponentRendering,
  RichText as JssRichText,
  Image,
  Text as JSSText,
  Link as JSSLink,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';
import { ButtonProps } from '@component-library/core-components/Button/Button.types';
import LogoBlock from '@component-library/site-components/LogoBlock/LogoBlock';
import Text from '@component-library/foundation/Text/Text';
import AdvancedBlockHeader from '@component-library/components/AdvancedBlockHeader/AdvancedBlockHeader';
import { LogoBlockProps as ColumnProps } from '@component-library/site-components/LogoBlock/LogoBlock.types';
import { inPageNavGlobalStore } from '../../context/inPageNavGlobalStorage';
import getHeadingTags from 'lib/getHeadingTags';

interface LogosFields {
  fields?: {
    LogoImage?: ImageField;
    Link?: LinkField;
  };
}

interface Fields {
  Heading?: Field<string>;
  Title?: Field<string>;
  Text?: Field<string>;
  Logos?: LogosFields[];
}

type LogoBlockProps = {
  params?: Params;
  rendering?: ComponentRendering;
  fields?: Fields;
};

const LogoBlockDefaultComponent = (props: LogoBlockProps): JSX.Element => {
  return (
    <div className={`component ${props.params?.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">Component with logos and links</span>
      </div>
    </div>
  );
};

interface LogoBlockExtendedProps extends LogoBlockProps {
  variation?: 'standard' | 'side-by-side';
}
export const Default = (props: LogoBlockExtendedProps): JSX.Element => {
  const phKey = `cta-buttons-${props.params?.DynamicPlaceholderId}`;
  const { variation = 'standard' } = props;

  if (!props.fields) {
    return <LogoBlockDefaultComponent {...props} />;
  }

  const tableOfContentsLinkTitle = props?.fields?.Title?.value;
  const componentAnchorId = inPageNavGlobalStore.addItem(
    props?.params,
    tableOfContentsLinkTitle
  );
  const tableOfContentTitle = props?.params?.TableOfContentsLinkTitle || tableOfContentsLinkTitle;
  const buttonSize: ButtonProps['size'] = 'large'; // Explicit type here to provide type safety

  const columns: ColumnProps['columns'] = props.params?.Columns === '4' ? 4 : 3;
  const { headingTag, subheadingTag } = getHeadingTags(
    props?.params,
    props.fields?.Heading?.value
  );
  return (
    <LogoBlock
      id={componentAnchorId}
      {...(tableOfContentTitle && props?.params?.ExcludeFromTableOfContents !== '1' ? { tableOfContentTitle: tableOfContentTitle } : {})}
      theme={props.params?.Theme || 'A-HCA-White'}
      columns={columns}
      variation={variation}
      header={
        <AdvancedBlockHeader
          subtitle={
            <Text tag={subheadingTag} variation={'subheading-1'}>
              <JSSText field={props.fields?.Heading} />
            </Text>
          }
          title={
            <Text
              tag={headingTag}
              variation={props.params?.HeadingSize || 'display-3'}
            >
              <JSSText field={props.fields?.Title} />
            </Text>
          }
          body={
            <Text tag="div" variation={'body-large'}>
              <JssRichText field={props.fields?.Text} />
            </Text>
          }
          ctas={
            props.rendering && (
              <Placeholder
                name={phKey}
                rendering={props.rendering}
                size={buttonSize}
              />
            )
          }
        />
      }
      logos={props.fields?.Logos?.map((logo, index) =>
        logo?.fields?.Link ? (
          <JSSLink key={index} field={logo?.fields?.Link}>
            <Image field={logo.fields?.LogoImage} />
          </JSSLink>
        ) : (
          <></>
        )
      )}
    />
  );
};

export const SideBySide = (props: LogoBlockProps): JSX.Element => {
  if (!props.fields) {
    return <LogoBlockDefaultComponent {...props} />;
  }
  return <Default {...props} variation="side-by-side" />;
};
