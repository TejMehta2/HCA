import { FINDER_PROFILE_ROOT_PATH } from 'lib/constants';
import { revalidate } from 'lib/consultant-finder/revalidateNow';
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { type NextRequest } from 'next/server';
import { parse } from 'node-html-parser';

// based on https://medium.com/@ruslanfg/long-running-nextjs-requests-eff158e75c1d

//const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface Notify {
  log: (message: string) => void;
  complete: (data: unknown) => void;
  error: (error: Error | unknown) => void;
  close: () => void;
}

//see https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
let gStreamClosed = false;
async function asyncForEach(
  array: string | any[],
  callback: (arg0: any, arg1: number, arg2: any) => any
) {
  for (let index = 0; index < array.length; index++) {
    if (gStreamClosed) {
      console.log('Exiting long running process as client is disconnected');
      break;
    }
    await callback(array[index], index, array);
  }
}

const longRunning = async (
  incommingHost: string,
  start: number,
  notify: Notify
) => {
  // note we are running at the edge with no access to Sitecore GraphQL for config

  notify.log('Reading sitemap for active consultant slugs...');

  const baseURL: string = 'https://www.hcahealthcare.co.uk';

  const res = await fetch(`${baseURL}/sitemap.hca.consultant-finder.xml`, {
    next: {
      revalidate: revalidate.now() || revalidate.noCache() ? false : 3600,
    },
  });

  let slugs: string[] = [];
  if (res.ok) {
    notify.log('Got sitemap for active consultant slugs');
    const consultants = await res.text();
    //console.log('consultants', consultants);
    const root = parse(consultants);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    root.getElementsByTagName('loc').forEach((urlEle: any, _idx: number) => {
      const slug = urlEle.text.split('/').pop();
      //if (idx < 100) {
      // limit to x for testing
      slugs = slugs.concat(slug);
      //}
    });
    notify?.log(`Got ${slugs.length} active consultant slugs...`);

    await asyncForEach(slugs, async (slug, idx) => {
      if (idx >= start) {
        const pageURL = `https://${incommingHost}/${FINDER_PROFILE_ROOT_PATH}/${slug}`;
        notify?.log(
          `loading ${slug} page ${pageURL}, Done ${Math.trunc(
            (idx / slugs.length) * 100
          )}% (${idx + 1} of ${slugs.length})`
        );
        try {
          const timeStart = new Date().getTime();
          const profileResult = await fetch(pageURL, {
            cache: 'no-store',
          });
          // const _profile = await profileResult.text(); // force the data to load - but disguraded
          const timeEnd = new Date().getTime();
          if (profileResult && profileResult.ok) {
            notify?.log(`loaded ${slug}, load time ${timeEnd - timeStart}ms`);
          } else {
            notify.error(
              `Warn: Failed to load ${slug}, ${profileResult.status} ${profileResult.statusText}`
            );
          }
        } catch (e) {
          notify.error(`Warn: Failed to load ${slug}, ${e}`);
        }
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
async function Warmup(req: NextRequest) {
  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();
  const encoder = new TextEncoder();
  gStreamClosed = false;

  // for some reason not getting access directly from req.headers - seems like a known issue in Next13
  const flatHeaders = Object.fromEntries(
    req.headers as unknown as Iterable<readonly [PropertyKey, any]>
  );
  let requestingHost = flatHeaders
    ? (flatHeaders['x-forwarded-host'] ?? flatHeaders['host'])
    : 'hcahealthcare.co.uk';
  if (requestingHost == 'www.hcacloud.localhost') {
    // can't introspect on local as running in Docker
    requestingHost = 'hca-digital-dev-hca-main.vercel.app'; // use dev instead
  }

  const protectionParamsKey =
    (req as any).nextUrl?.searchParams?.get('key') ?? '';
  console.log('req.query', req);
  if (protectionParamsKey != process.env.ADMIN_PROTECTION_KEY!) {
    console.warn(
      'error, CF admin - Warmup called with incorrect or missing admin key'
    );
    writer.write(
      encoder.encode(
        `${Date().toString()}: error missing or invalid admin protection\n`
      )
    );
    writer.close();
    gStreamClosed = true;
  } else {
    const start = (req as any).nextUrl?.searchParams?.get('start') ?? 0;
    console.log(`Starting at index: ${start}`);

    // Invoke long running process
    longRunning(requestingHost, start, {
      log: (msg: string) => {
        writer.ready
          .then(() =>
            writer?.write(encoder.encode(`${Date().toString()}: ${msg}\n`))
          )
          .catch((err) => {
            gStreamClosed = true;
            return console.error(
              'Error, client disconnected from log stream',
              err
            );
          });
        return null;
      },
      complete: (obj: unknown) => {
        writer.write(
          encoder.encode(
            `${Date().toString()}: complete: ${JSON.stringify(obj)}\n`
          )
        );
        if (!gStreamClosed) {
          writer.close();
          gStreamClosed = true;
        }
      },
      error: (err: Error | unknown) => {
        writer.write(encoder.encode(`${Date().toString()}: error: ${err}\n`));
        if (!gStreamClosed) {
          writer.close();
          gStreamClosed = true;
        }
      },
      close: () => {
        if (!gStreamClosed) {
          writer.close();
          gStreamClosed = true;
        }
      },
    })
      .then(() => {
        if (!gStreamClosed) {
          writer.close();
        }
      })
      .catch((_e) => {
        if (!gStreamClosed) {
          writer.close();
        }
      });
  }
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

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  return Warmup(req);
}

export async function POST(req: NextRequest) {
  return Warmup(req);
}

export async function PUT(req: NextRequest) {
  return Warmup(req);
}

export async function PATCH(req: NextRequest) {
  return Warmup(req);
}

export async function DELETE(req: NextRequest) {
  return Warmup(req);
}

export async function HEAD(req: NextRequest) {
  return Warmup(req);
}

export async function OPTIONS(req: NextRequest) {
  return Warmup(req);
}
