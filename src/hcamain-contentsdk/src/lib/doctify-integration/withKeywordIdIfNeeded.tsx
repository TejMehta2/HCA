import { LinkField, LinkFieldValue } from '@sitecore-content-sdk/nextjs';
import { generateHtmlSafeId } from 'lib/utility-functions/generateHtmlSafeId';
import { resolveSitecoreLink } from 'lib/utility-functions/resolveSitecoreLink';

type LinkFieldValueWithId = LinkFieldValue & { id?: string };

export type KeywordLinkResult = {
  href: string;
  text: string;
};

export const withKeywordIdIfNeeded = (
  linkField?: LinkField,
  keywordId?: string | undefined,
  paramName: string = 'keywordId'
): KeywordLinkResult => {
  const STATIC_FALLBACK: KeywordLinkResult = {
    href: '/finder/step-intro',
    text: 'Book <b>an appointment</b>',
  };

  const v = linkField?.value as LinkFieldValueWithId | undefined;

  const resolvedText = (v?.text ?? '').toString().trim();

  const id = generateHtmlSafeId(v?.id || undefined);

  const targetPageId = generateHtmlSafeId(
    process.env.NEXT_PUBLIC_FINDER_CONSULTANTCARDS_PAGE_ID ||
      '{27B3FA77-28E9-419E-B7D0-6159A3ED3E24}'
  );

  //hack alert: modify only CTAs with dynamicfinder css class
  const hasDynamicClassFlag = (v?.class || '').indexOf('dynamicfinder') != -1;

  // If link is NOT the consultant cards page, just resolve it as-is
  if (id !== targetPageId || !hasDynamicClassFlag) {
    return {
      href: resolveSitecoreLink(v),
      text: resolvedText,
    };
  }

  // If doctify mapping is missing - return static link to Finder intro
  if (!keywordId) {
    return STATIC_FALLBACK;
  }

  // Clone props and inject keywordId into querystring (preserve existing qs)
  const next: LinkFieldValue = { ...v };

  const existingQs = (next.querystring ?? '').replace(/^\?/, '').trim();
  const params = new URLSearchParams(existingQs);
  params.set(paramName, keywordId);

  // IMPORTANT: Sitecore LinkFieldValue.querystring typically expects no leading '?'
  next.querystring = params.toString();

  return {
    href: resolveSitecoreLink(next),
    text: resolvedText,
  };
};
