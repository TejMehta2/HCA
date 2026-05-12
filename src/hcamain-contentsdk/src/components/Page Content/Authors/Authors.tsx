import { type JSX } from 'react';

import {
  Field,
  Text as JssText,
} from '@sitecore-content-sdk/nextjs';
import BlogContent from '@component-library/site-components/BlogContent/BlogContent';
import Params from 'src/types/params';
import RichText from '@component-library/core-components/RichText/RichText';
import Text from '@component-library/foundation/Text/Text';
import Container from '@component-library/foundation/Containers/Container';
import { inPageNavGlobalStore } from 'src/context/inPageNavGlobalStorage';
import { AuthorFields } from 'src/types/authorFields';
import { MapAuthorsToBlockQuotes } from './Authors.mapping';
import { ComponentWithContextProps } from 'lib/component-props';

interface Fields {
  Title?: Field<string>;
  Authors?: AuthorFields[];
}

type AuthorsProps = ComponentWithContextProps & {
  params?: Params;
  fields?: Fields;
};

const AuthorsDefaultComponent = (props: AuthorsProps): JSX.Element => {
  const isExperienceEditor = props.page.mode.isEditing;

  return !isExperienceEditor ? (
    <></>
  ) : (
    <div className={`component ${props.params?.styles}`}>
      <div className="component-content">
        <span className="is-empty-hint">
          Authors Block. Please click to select datasource.
        </span>
      </div>
    </div>
  );
};

export const Default = (props: AuthorsProps): JSX.Element => {
  if (!props.fields?.Authors || !props.fields?.Authors.length) {
    return <AuthorsDefaultComponent {...props} />;
  }

  const quoteBlocks = MapAuthorsToBlockQuotes(props?.fields?.Authors);

  const componentTitle = props?.fields?.Title?.value;
  const componentAnchorId = inPageNavGlobalStore.addItem(
    props?.params,
    componentTitle
  );

  const tableOfContentTitle =
    props?.params?.TableOfContentsLinkTitle || componentTitle;

  const isContainerized = props?.params?.Containerized === '1';

  if (isContainerized) {
    return (
      <RichText additionalStyles={props?.params?.styles} id={componentAnchorId}>
        <figure>{quoteBlocks}</figure>
      </RichText>
    );
  }

  return (
    <BlogContent
      theme={props.params?.Theme || 'A-HCA-White'}
      contentVariation="quote"
      id={componentAnchorId}
      {...(tableOfContentTitle &&
      props?.params?.ExcludeFromTableOfContents !== '1'
        ? { tableOfContentTitle: tableOfContentTitle }
        : {})}
    >
      {props?.fields?.Title && (
        <Container marginBottom="spacing-4">
          <Text tag="div" variation={'subheading-1'}>
            <JssText field={props?.fields?.Title} />
          </Text>
        </Container>
      )}
      <RichText>{quoteBlocks}</RichText>
    </BlogContent>
  );
};
