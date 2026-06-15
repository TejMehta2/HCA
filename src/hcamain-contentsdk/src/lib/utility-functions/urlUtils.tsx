import { headers as nextHeaders } from 'next/headers';
import sites from '.sitecore/sites.json';

const normalizeBaseUrl = (hostOrUrl?: string, protocol = 'https') => {
  if (!hostOrUrl) {
    return undefined;
  }

  // Sitecore multisite host bindings can be a pipe-separated list
  // (e.g. "thebirthcompany.co.uk|www.thebirthcompany.co.uk"). Use the first
  // concrete host so the value is a valid single URL.
  const firstHost = hostOrUrl
    .split('|')
    .map((entry) => entry.trim())
    .find((entry) => entry && entry !== '*');

  if (!firstHost) {
    return undefined;
  }

  const value = firstHost.replace(/\/$/, '');

  return /^https?:\/\//i.test(value) ? value : `${protocol}://${value}`;
};

export const getSiteBaseUrl = async (siteName: string) => {
  const siteInfo = sites.find(
    (site) => site.name === siteName && site.hostName && site.hostName !== '*'
  );

  const siteBaseUrl = normalizeBaseUrl(siteInfo?.hostName);

  if (siteBaseUrl) {
    return siteBaseUrl;
  }

  const requestHeaders = await nextHeaders();
  const host =
    requestHeaders.get('x-forwarded-host') ??
    requestHeaders.get('host') ??
    requestHeaders.get(':authority');
  const protocol = requestHeaders.get('x-forwarded-proto') ?? 'https';

  return (
    normalizeBaseUrl(host ?? undefined, protocol) ||
    normalizeBaseUrl(process.env.NEXT_PUBLIC_SITE_URL)
  );
};

export const getPagePath = (itemPath?: string, path?: string[]) => {
  if (itemPath) {
    return itemPath.startsWith('/') ? itemPath : `/${itemPath}`;
  }

  return path?.length ? `/${path.join('/')}` : '/';
};

export const toTwitterCard = (card?: string) => {
  switch (card?.toLowerCase().replace(/\s+/g, '_')) {
    case 'summary_large_image':
      return 'summary_large_image';
    case 'summary':
      return 'summary';
    default:
      return undefined;
  }
};