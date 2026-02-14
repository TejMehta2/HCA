import { LinkField, LinkFieldValue } from '@sitecore-jss/sitecore-jss-nextjs';
import { generateHtmlSafeId } from 'lib/utility-functions/generateHtmlSafeId';
import { resolveSitecoreLink } from 'lib/utility-functions/resolveSitecoreLink';

type LinkFieldValueWithId = LinkFieldValue & { id?: string };

export type KeywordLinkResult = {
  href: string;
  text: string;
};

export const withKeywordIdIfNeeded = (
  linkField?: LinkField,
  keywordId?: string,
  paramName: string = 'keywordId',
  fallbackToStaticLink: boolean = false
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

  // If link is NOT the consultant cards page, just resolve it as-is
  if (id !== targetPageId) {
    return {
      href: resolveSitecoreLink(v),
      text: resolvedText,
    };
  }

  // If doctify mapping should exits, but it's not - return static link to Finder intro
  if (fallbackToStaticLink) {
    return STATIC_FALLBACK;
  }

  // No doctify mapping ie regular content page - resolve as-is
  if (!keywordId) {
    return {
      href: resolveSitecoreLink(v),
      text: resolvedText,
    };
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
