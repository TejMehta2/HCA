/**
 * Resolves a Sitecore General Link field value into a final URL string.
 *
 * @param value Sitecore General Link field value as returned by Layout Service
 * @returns Fully resolved URL string (path + query string + anchor)
 */
export function resolveSitecoreLink(value?: {
  href?: string;
  querystring?: string;
  anchor?: string;
}) {
  if (!value?.href) return '';

  const qs = value.querystring?.replace(/^\?/, '');
  const hash = value.anchor?.replace(/^#/, '');

  let url = value.href;

  if (qs) {
    url += (url.includes('?') ? '&' : '?') + qs;
  }

  if (hash) {
    url += `#${hash}`;
  }

  return url;
}
