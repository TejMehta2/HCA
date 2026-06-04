'use client';
import { JSX } from 'react';
import { EditingScripts } from '@sitecore-content-sdk/nextjs';
import CdpPageView from 'components/content-sdk/CdpPageView';
import BYOCInit from './byoc';
import { CmsScript } from 'components/core-components/CmsScript';

const Scripts = (): JSX.Element => {
  return (
    <>
      <BYOCInit />
      <CdpPageView />
      <EditingScripts />
      {process.env.NEXT_PUBLIC_LOAD_COOKIES && (
        <CmsScript
          html={process.env.NEXT_PUBLIC_LOAD_COOKIES}
          id="load-cookies-script"
        />
      )}
    </>
  );
};

export default Scripts;
