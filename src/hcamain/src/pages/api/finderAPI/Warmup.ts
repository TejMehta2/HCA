/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'node-html-parser';

// based on https://medium.com/@ruslanfg/long-running-nextjs-requests-eff158e75c1d

// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface Notify {
  log: (message: string) => void;
  complete: (data: unknown) => void;
  error: (error: Error | unknown) => void;
  close: () => void;
}

//see https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
async function asyncForEach(
  array: string | any[],
  callback: (arg0: any, arg1: number, arg2: any) => any
) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const longRunning = async (notify: Notify) => {
  // note we are running at the edge with no access to Sitecore GraphQL for config

  notify.log('Reading sitemap for active consultant slugs...');

  const baseURL: string = 'https://www.hcahealthcare.co.uk';

  const res = await fetch(`${baseURL}/sitemap.hca.consultant-finder.xml`, {
    cache: 'force-cache',
    next: { revalidate: 3600 },
  });

  let slugs: string[] = [];
  if (res.ok) {
    notify.log('Got sitemap for active consultant slugs');
    const consultants = await res.text();
    //console.log('consultants', consultants);
    const root = parse(consultants);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    root.getElementsByTagName('loc').forEach((urlEle: any, idx: number) => {
      const slug = urlEle.text.split('/').pop();
      //if (idx < 5) { // limit to x for testing
      slugs = slugs.concat(slug);
      //}
    });
    notify.log(`Got ${slugs.length} active consultant slugs...`);

    await asyncForEach(slugs, async (slug, idx) => {
      const pageURL = `https://hca-digital-dev-hca-main.vercel.app/Finder/StepConsultantProfile/${slug}`;
      notify.log(
        `loading ${slug} page ${pageURL}, Done ${Math.trunc(
          (idx / slugs.length) * 100
        )}%`
      );
      try {
        const timeStart = new Date().getTime();
        const profileResult = await fetch(pageURL, {
          cache: 'no-store',
        });
        const profile = await profileResult.text();
        const timeEnd = new Date().getTime();
        if (profileResult && profileResult.ok) {
          notify.log(`loaded ${slug}, load time ${timeEnd - timeStart}ms`);
        } else {
          notify.error(
            `Failed to load ${slug}, ${profileResult.status} ${profileResult.statusText}`
          );
        }
      } catch (e) {
        notify.error(`Failed to load ${slug}, ${e}`);
      }
    });
    notify.log(`Completed!`);
  } else {
    notify.error(
      `Failed to get active consultant slugs ${res.status} ${res.statusText}`
    );
  }

  notify.complete({ data: 'Completed!' });
};

/**
 * Implements long running response. Only works with edge runtime.
 * @link https://github.com/vercel/next.js/issues/9965
 */

// warm up by loading each consultant profile page
export default async function Warmup(
  _req: NextApiRequest,
  _res: NextApiResponse
) {
  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();
  const encoder = new TextEncoder();
  let closed = false;

  // Invoke long running process
  longRunning({
    log: (msg: string) => writer.write(encoder.encode('data: ' + msg + '\n\n')),
    complete: (obj: unknown) => {
      writer.write(encoder.encode('data: ' + JSON.stringify(obj) + '\n\n'));
      if (!closed) {
        writer.close();
        closed = true;
      }
    },
    error: (err: Error | unknown) => {
      writer.write(encoder.encode('data: ' + JSON.stringify(err) + '\n\n'));
      if (!closed) {
        writer.close();
        closed = true;
      }
    },
    close: () => {
      if (!closed) {
        writer.close();
        closed = true;
      }
    },
  })
    .then(() => {
      console.info('Done');
      if (!closed) {
        writer.close();
      }
    })
    .catch((e) => {
      console.error('Failed', e);
      if (!closed) {
        writer.close();
      }
    });

  // Return response connected to readable
  return new Response(responseStream.readable, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/event-stream; charset=utf-8',
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache, no-transform',
      'X-Accel-Buffering': 'no',
      'Content-Encoding': 'none',
    },
  });
}

export const config = {
  runtime: 'edge',
};
