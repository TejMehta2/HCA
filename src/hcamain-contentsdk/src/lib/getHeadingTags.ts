import Params from 'src/types/params';
import type { HeadingTag } from 'src/types/params';

// Utility function to evalute which heading should use a CMSable semantic heading tag, and which should use a span.
// Intended to be used on component integrations which have a subtitle and title field

type Tag = HeadingTag | 'span' | undefined;

const getHeadingTags = (
  params?: Params,
  subtitle?: string,
  fallbackTag: Tag = 'h2'
) => {
  const semanticTag = params?.HeadingTag || fallbackTag;
  const titleKeepsSemanticTag = params?.DisableHeadersToggle === '1';
  const subtitleExists = !!subtitle;
  const subheadingTag: Tag = titleKeepsSemanticTag ? 'span' : semanticTag;
  const headingFallbackTag = subtitleExists ? 'span' : semanticTag;

  const headingTag: Tag = titleKeepsSemanticTag
    ? semanticTag
    : headingFallbackTag;
  return { headingTag, subheadingTag };
};

export default getHeadingTags;
