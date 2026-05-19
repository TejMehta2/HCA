import type { Metadata } from 'next';
import { draftMode, headers as nextHeaders } from 'next/headers';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import {
  ComponentPropsContext,
  type ComponentPropsCollection,
  type Page,
} from '@sitecore-content-sdk/nextjs';
import { isDesignLibraryPreviewData } from '@sitecore-content-sdk/nextjs/editing';
import componentMap from '.sitecore/component-map';
import client from 'src/lib/sitecore-client';
import Layout, { RouteFields } from 'src/Layout';
import Providers from 'src/Providers';

export type FinderRouteParams = {
  site: string;
  locale: string;
  path?: string | string[];
};

type ComponentContextParams = {
  site: string;
  locale: string;
  path?: string | string[];
  requestPath?: string | string[];
};

const asPathSegments = (path?: string | string[]) =>
  Array.isArray(path) ? path : path ? [path] : [];

export const toFinderWildcardPath = (path?: string | string[]) => {
  const pathSegments = asPathSegments(path);
  return pathSegments.length > 0
    ? `finder/${pathSegments.join('/')}/`
    : 'finder';
};

async function getPage(
  params: FinderRouteParams,
  pagePath: string,
  contextParams: ComponentContextParams
) {
  setRequestLocale(`${params.site}_${params.locale}`);

  const draft = await draftMode();
  let page: Page | null;

  if (draft.isEnabled) {
    const headers = await nextHeaders();
    const previewData = client.getPreviewData(headers);

    if (isDesignLibraryPreviewData(previewData)) {
      page = await client.getDesignLibraryData(previewData);
    } else {
      page = await client.getPreview(previewData);
    }
  } else {
    page = await client.getPage(pagePath, {
      site: params.site,
      locale: params.locale,
    });
  }

  if (!page?.layout.sitecore.route) {
    notFound();
  }

  const componentProps = await client.getComponentData(
    page.layout,
    { params: contextParams } as never,
    componentMap
  );

  return { page, componentProps };
}

export async function renderFinderPage(
  params: FinderRouteParams,
  pagePath: string,
  requestPath?: string | string[]
) {
  const { page, componentProps } = await getPage(params, pagePath, {
    site: params.site,
    locale: params.locale,
    path: pagePath,
    requestPath,
  });

  return (
    <NextIntlClientProvider>
      <ComponentPropsContext value={componentProps as ComponentPropsCollection}>
        <Providers page={page}>
          <Layout page={page} />
        </Providers>
      </ComponentPropsContext>
    </NextIntlClientProvider>
  );
}

export async function generateFinderMetadata(
  params: FinderRouteParams,
  pagePath: string
): Promise<Metadata> {
  const page = await client.getPage(pagePath, {
    site: params.site,
    locale: params.locale,
  });

  return {
    title:
      (page?.layout.sitecore.route?.fields as RouteFields)?.Title?.value?.toString() ||
      'Page',
  };
}
