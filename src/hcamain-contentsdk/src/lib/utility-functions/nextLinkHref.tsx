export function normalizeHref(href: string): string {
  const trimmedHref = href.trim();
  const malformedTelephoneHref = trimmedHref.match(/^https?:\/\/tel:(.+)$/i);

  if (malformedTelephoneHref?.[1]) {
    return `tel:${malformedTelephoneHref[1]}`;
  }

  return trimmedHref;
}

export function isValidNextLinkHref(href: string): boolean {
  if (!href || /^(tel|mailto):/i.test(href)) return false;
  if (href.startsWith('/') || href.startsWith('#')) return true;

  try {
    const url = new URL(href);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}
