import { GoogleTagManager } from '@next/third-parties/google';
import { debug } from '@sitecore-content-sdk/nextjs';

export default function GtmScript({ gtmKey }: { gtmKey?: string }) {
  const isGtmDisabled =
    process.env.NEXT_PUBLIC_DISABLE_GTM &&
    process.env.NEXT_PUBLIC_DISABLE_GTM !== 'false';

  debug.common('gtmKey', gtmKey);

  if (!gtmKey || isGtmDisabled) {
    return null;
  }

  return <GoogleTagManager gtmId={gtmKey} />;
}
