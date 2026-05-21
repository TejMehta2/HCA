'use server';
import { type NextRequest } from 'next/server';
/* eslint-disable @typescript-eslint/no-explicit-any */

// read data from an endpoint via http get and post it to another endpoint using http post
// schedule on a cron job for regular pushes
// output is a 'console style' http stream back to the browser or curl,
// can also see this status in Vercel
// example calls
// http://localhost:3000/api/cronAPI/PushData?key=HCA123!!&sourceUser=ISU_CR_029_OutbOund&sourcePass=Password@123&sourceURL=https://wd3-impl-services1.workday.com/ccx/service/customreport2/hcahealthcare5/ISU_CR_029_OutbOund/Workday_to_Career_Site_-_Job_Postings?format=json&destURL=https://6b31f67c-a8c6-431d-8fbe-18a2da2df781.mock.pstmn.io&destHeader=x-api-key:ABCDEFG
// or indirection through environment var
// http://localhost:3000/api/cronAPI/PushData?key=HCA123!!&useEnvVarCommandLine=WORKDAY_PUSH_COMMAND
// based on https://medium.com/@ruslanfg/long-running-nextjs-requests-eff158e75c1d

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface Notify {
  log: (message: string) => void;
  complete: (data: unknown) => void;
  error: (error: Error | unknown) => void;
  close: () => void;
}

let gStreamClosed = false;

const longRunning = async (
  sourceURL: string,
  sourceHeader: string,
  sourceUser: string,
  sourcePass: string,
  destURL: string,
  destHeader: string,
  destUser: string,
  destPass: string,
  notify: Notify
) => {
  try {
    notify.log(`Starting push job`);
    notify.log(`sourceURL: ${sourceURL}`);
    notify.log(`sourceHeader: ${sourceHeader}`);
    notify.log(`sourceUser: ${sourceUser}`);
    notify.log(`sourcePass: ${sourcePass}`);
    notify.log(`destURL: ${destURL}`);
    notify.log(`destHeader: ${destHeader}`);
    notify.log(`destUser: ${destUser}`);
    notify.log(`destPass: ${destPass}`);

    let dataToRelay: string = '';
    try {
      // get the data using credentials supplied in the request
      const credentials =
        sourceUser?.length > 0 && sourcePass?.length > 0
          ? btoa(`${sourceUser}:${sourcePass}`)
          : null;
      const hdrs = new Headers({
        Authorization: credentials ? `Basic ${credentials}` : `None`,
      });

      // any custom header to add? format is sourceHeader=<key>:<value>
      if (sourceHeader && sourceHeader.length > 0) {
        const KeyAndValue = sourceHeader.split(':');
        if (KeyAndValue.length == 2) {
          hdrs.append(KeyAndValue[0], KeyAndValue[1]);
        }
      }

      // fetch the data
      const res = await fetch(sourceURL, {
        cache: 'no-cache',
        headers: hdrs,
        next: {
          revalidate: false,
        },
      });

      // all good, then send it on using the same content type as what came back in the request
      if (res.ok) {
        const sourceFormat = res.headers.get('Content-Type');
        dataToRelay = await res.text();
        notify.log(
          `Got ${dataToRelay.length} bytes as content type ${sourceFormat}`
        );
        notify.log(`Posting data to ${destURL}`);

        // any credentials to use to post
        const credentials1 =
          destUser?.length > 0 && destPass?.length > 0
            ? btoa(`${destUser}:${destPass}`)
            : null;

        // any headers
        const hdrs1 = new Headers({
          'Content-Type': `${sourceFormat}`,
          Authorization: credentials1 ? `Basic ${credentials1}` : `None`,
          'Cache-Control': 'no-cache, no-transform',
          'X-Accel-Buffering': 'no',
        });

        // any custom header to add? format is destHeader=<key>:<value>
        if (destHeader && destHeader.length > 0) {
          const KeyAndValue = destHeader.split(':');
          if (KeyAndValue.length == 2) {
            hdrs1.append(KeyAndValue[0], KeyAndValue[1]);
          }
        }

        // post the request with the data in the body
        const res1 = await fetch(destURL, {
          headers: hdrs1,
          method: 'post',
          body: dataToRelay,
          cache: 'no-cache',
        });

        //console.log('res1', res1);
        if (res1.ok) {
          notify.log(`Data sent okay`);
          const retData = await res1.text();
          notify.log(`Data was sent okay result: ${retData}`);
        } else {
          notify.log(
            `Data was not sent okay status: ${res1.status} status text: ${res1.statusText}`
          );
        }
      }
    } catch (e) {
      notify.error(`Could not load: ${sourceURL} - ${e}`);
    }
    notify.log(`Completed!`);
  } catch (e) {
    notify.error(`Failed to run task ${e}`);
  }

  /* delay for status write, avoid error in the log Error, client disconnected from log stream TypeError: This ReadableStream is closed.*/
  await delay(2000);
  // mark complete
  notify.complete({ data: 'Completed!!' });
};

/**
 * Implements long running response. Only works with edge runtime.
 * @link https://github.com/vercel/next.js/issues/9965
 */
async function PushData(
  req: NextRequest //,
  //_res: NextApiResponse
) {
  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();
  const encoder = new TextEncoder();
  gStreamClosed = false;
  //console.log("req.query", req);

  const protectionParamsKey =
    (req as any).nextUrl?.searchParams?.get('key') ?? '';
  //console.log('protectionParamsKey', protectionParamsKey);

  /*
  console.log(
    'process.env.ADMIN_PROTECTION_KEY!',
    process.env.ADMIN_PROTECTION_KEY!
  );*/

  let searchParams = (req as any).nextUrl?.searchParams;

  if (
    process.env.ADMIN_PROTECTION_KEY! != undefined &&
    protectionParamsKey != process.env.ADMIN_PROTECTION_KEY!
  ) {
    console.warn('error,PushData called with incorrect or missing admin key');
    writer.write(
      encoder.encode(
        `${Date().toString()}: error missing or invalid admin protection\n`
      )
    );
    writer.close();
    gStreamClosed = true;
  } else {
    // find the command line from an environment variable, allows for different command line in dev,uat,prod
    // e.g. http://localhost:3000/api/cronAPI/PushData?key=HCA123!!&useEnvVarCommandLine=WORKDAY_PUSH_COMMAND
    const useEnvVarCommandLine: string =
      (req as any).nextUrl?.searchParams?.get('useEnvVarCommandLine') ?? '';
    if (useEnvVarCommandLine.length > 0) {
      const cmdLine = process.env[useEnvVarCommandLine];
      if (cmdLine && cmdLine?.length > 0) {
        //console.log('cmdLine', cmdLine);
        // command line is via the specified environment variable, deconstruct the string
        searchParams = new URLSearchParams(cmdLine);
      }
    }

    const sourceURL: string = (
      searchParams?.get('sourceURL') ?? ''
    )?.replaceAll('|', '&');
    const sourceHeader: string = (
      searchParams?.get('sourceHeader') ?? ''
    )?.replaceAll('|', '&');
    const sourceUser: string = (
      searchParams?.get('sourceUser') ?? ''
    )?.replaceAll('|', '&');
    const sourcePass: string = (
      searchParams?.get('sourcePass') ?? ''
    )?.replaceAll('|', '&');
    const destURL: string = (searchParams?.get('destURL') ?? '')?.replaceAll(
      '|',
      '&'
    );
    const destHeader: string = (
      searchParams?.get('destHeader') ?? ''
    )?.replaceAll('|', '&');
    const destUser: string = (searchParams?.get('destUser') ?? '')?.replaceAll(
      '|',
      '&'
    );
    const destPass: string = (searchParams?.get('destPass') ?? '')?.replaceAll(
      '|',
      '&'
    );

    // Invoke long running process
    longRunning(
      sourceURL,
      sourceHeader,
      sourceUser,
      sourcePass,
      destURL,
      destHeader,
      destUser,
      destPass,
      {
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
      }
    )
      .then(() => {
        if (!gStreamClosed) {
          writer.close();
        }
      })
      .catch(() => {
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
  return PushData(req);
}

export async function POST(req: NextRequest) {
  return PushData(req);
}

export async function PUT(req: NextRequest) {
  return PushData(req);
}

export async function PATCH(req: NextRequest) {
  return PushData(req);
}

export async function DELETE(req: NextRequest) {
  return PushData(req);
}

export async function HEAD(req: NextRequest) {
  return PushData(req);
}

export async function OPTIONS(req: NextRequest) {
  return PushData(req);
}
