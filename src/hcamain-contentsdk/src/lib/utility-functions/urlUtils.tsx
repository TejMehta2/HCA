import { headers as nextHeaders } from 'next/headers';
import sites from '.sitecore/sites.json';

const normalizeBaseUrl = (hostOrUrl?: string, protocol = 'https') => {
  if (!hostOrUrl || hostOrUrl === '*') {
    return undefined;
  }

  const value = hostOrUrl.replace(/\/$/, '');

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