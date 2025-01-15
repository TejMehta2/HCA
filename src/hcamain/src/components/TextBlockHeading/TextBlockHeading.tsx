import React, { useEffect } from 'react';
import {
  Field,
  Text as JssText,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';
import TextBlockHeader from '@component-library/site-components/TextBlockHeader/TextBlockHeader';
import Text from '@component-library/foundation/Text/Text';
import { generateHtmlSafeId } from 'lib/utility-functions/generateHtmlSafeId';
import { useInPageNavigationContext } from 'src/context/InPageNavigationContext';

interface Fields {
  Heading?: Field<string>;
  Title?: Field<string>;
}

type TextBlockHeadingProps = {
  params?: Params;
  fields?: Fields;
};

const TextBlockHeadingDefaultComponent = (
  props: TextBlockHeadingProps
): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            Text Block Heading please click to select datasource
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

export const Default = (props: TextBlockHeadingProps): JSX.Element => {
  const { addComponent } = useInPageNavigationContext();

  const tableOfContentsLinkTitle =
    props.params?.TableOfContentsLinkTitle || props?.fields?.Title?.value;
  const hideEmptyComponent = !props.fields;
  const includeInTableOfContents =
    !props.params?.ExcludeFromTableOfContents && !hideEmptyComponent;

  const componentAnchorId = generateHtmlSafeId(tableOfContentsLinkTitle);

  useEffect(() => {
    if (includeInTableOfContents && tableOfContentsLinkTitle) {
      addComponent({
        Id: componentAnchorId,
        TableOfContentsLinkTitle: tableOfContentsLinkTitle,
      });
    }
  }, [includeInTableOfContents]);

  if (!props.fields) {
    return <TextBlockHeadingDefaultComponent {...props} />;
  }

  return (
    <TextBlockHeader id={componentAnchorId}>
      <Text variation={'subheading-1'}>
        <JssText field={props.fields?.Heading} />
      </Text>
      <Text variation={'display-2'}>
        <JssText field={props.fields?.Title} />
      </Text>
    </TextBlockHeader>
  );
};
