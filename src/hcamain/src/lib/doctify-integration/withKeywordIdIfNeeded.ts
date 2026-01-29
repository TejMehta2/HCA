import { LinkField, LinkFieldValue } from '@sitecore-jss/sitecore-jss-nextjs';
import { generateHtmlSafeId } from 'lib/utility-functions/generateHtmlSafeId';
import { resolveSitecoreLink } from 'lib/utility-functions/resolveSitecoreLink';

type LinkFieldValueWithId = LinkFieldValue & { id?: string };

function withKeywordIdIfNeeded(
  linkField?: LinkField,
  keywordId?: string
): string {
  const v = linkField?.value as LinkFieldValueWithId | undefined;
  if (!v?.href) return '';

  const id = generateHtmlSafeId(v.id || undefined);
  if (id !== generateHtmlSafeId(process.env.FINDER_CONSULTANTCARDS_PAGE_ID))
    return resolveSitecoreLink(v);

  if (!keywordId) return resolveSitecoreLink(v);

  // Cloning props
  const next: LinkFieldValue = { ...v };

  // Add keywordid to querystring (preserve existing querystring)
  const existingQs = (next.querystring ?? '').replace(/^\?/, '').trim();
  const params = new URLSearchParams(existingQs);
  params.set('keywordId', keywordId);

  next.querystring = params.toString();

  return resolveSitecoreLink(next);
}

export default withKeywordIdIfNeeded;
