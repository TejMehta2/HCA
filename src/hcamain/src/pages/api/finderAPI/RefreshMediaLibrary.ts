/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest } from 'next';
import { neon } from '@neondatabase/serverless';
import * as XLSX from 'xlsx';
import axios from 'axios';
import FormData from 'form-data';

//see https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
let gStreamClosed = false;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface Notify {
  log: (message: string) => void;
  complete: (data: unknown) => void;
  error: (error: Error | unknown) => void;
  close: () => void;
}

// Excel
export async function readExcelWorkbook(
  xlUrl: string
): Promise<XLSX.WorkBook | undefined> {
  // https://www.npmjs.com/package/xlsx
  // read excel xlsx file
  let wb: XLSX.WorkBook | undefined = undefined;

  try {
    // load excel from url
    let xlData = await fetch(xlUrl, {
      redirect: 'manual',
      next: {
        revalidate: 100,
      },
    });

    // redirect if necessary
    if (xlData.redirected) {
      xlData = await fetch(xlData.url, {
        next: {
          revalidate: 100,
        },
      });
    }

    const buffer = await xlData.arrayBuffer();
    wb = XLSX.read(buffer);
  } catch (e) {
    console.warn(`errorCode: 402, readExcel - error reading file data, ${e}`);
  }

  return wb;
}

// Sitecore
async function sitecoreGrantAuthoringAccessToken(notify: Notify) {
  notify?.log(`Requesting Sitecore authoring token`);

  const data = JSON.stringify({
    audience: 'https://api.sitecorecloud.io',
    grant_type: 'client_credentials',
    client_id: process.env.SITECORE_AUTH_ID!,
    client_secret: process.env.SITECORE_AUTH_SECRET!,
  });

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://auth.sitecorecloud.io/oauth/token',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  let accessToken: string | null = null;
  await axios
    .request(config)
    .then((response: { data: any }) => {
      //console.log(JSON.stringify(response.data));
      accessToken = response?.data?.access_token;
      if (accessToken) {
        notify.log(`got Sitecore access token`);
      }
    })
    .catch((error: any) => {
      notify.error(error);
    });

  return accessToken;
}

async function sitecoreGetPresignedMediaItemUploadLink(
  notify: Notify,
  token: string,
  itemPath: string
) {
  notify?.log(`Getting Sitecore media item upload link ${itemPath}`);

  const data = JSON.stringify({
    operationName: null,
    variables: {},
    query:
      'mutation {uploadMedia(input: {itemPath: "' +
      itemPath +
      '"}) {presignedUploadUrl}}',
  });

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: process.env.SITECORE_AUTH_GRAPH_QL_ENDPOINT!,
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    data: data,
  };

  let link: string | null = null;
  await axios
    .request(config)
    .then((response) => {
      link = response?.data?.data?.uploadMedia?.presignedUploadUrl;
      notify?.log(`link ${link}`);
    })
    .catch((error) => {
      notify?.log(`Error getting link - ${link} - ${JSON.stringify(error)}`);
    });

  return link;
}

async function sitecoreDeleteMediaItem(
  notify: Notify,
  token: string,
  itemPath: string
) {
  notify?.log(`Deleting Sitecore media item ${itemPath}`);

  const data = JSON.stringify({
    query: `mutation {
      deleteItem( input: { 
          path: "/sitecore/media library/${itemPath}"
          permanently: true
        }
      ) {
        successful
      }
    }`,
    variables: {},
  });

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: process.env.SITECORE_AUTH_GRAPH_QL_ENDPOINT!,
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    data: data,
  };

  let ok = true;
  await axios
    .request(config)
    .then((response) => {
      //console.log(JSON.stringify(response.data));
      if (
        response?.data?.errors?.length > 0 &&
        response?.data?.errors[0].message?.includes('not found')
      ) {
        notify?.log(`Sitecore media item ${itemPath} not available to delete`);
        ok = true; // not there, or already deleted.
      } else {
        ok = response?.data?.data?.deleteItem?.successful; // deleted?
        ok
          ? notify?.log(`Deleted Sitecore media item ${itemPath}`)
          : notify?.log(
              `Error deleting Sitecore media item ${itemPath} - ${JSON.stringify(
                response
              )}`
            );
      }
    })
    .catch((error) => {
      notify?.log(`Error deleting media - ${JSON.stringify(error)}`);
    });

  return ok;
}

async function sitecoreUploadMediaItem(
  notify: Notify,
  token: string,
  preSignedUploadURL: string,
  itemPath: string,
  itemName: string,
  blob: Blob
) {
  notify?.log(
    `Uploading file name ${itemName} Sitecore media item ${itemPath} size ${blob.size} to ${preSignedUploadURL}`
  );
  let ok = false;

  try {
    const data = new FormData();
    data.append('file', blob, itemName);

    const response = await fetch(`${preSignedUploadURL}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data as any,
    });

    if (!response.ok) {
      notify?.error(
        `Error uploading file name ${itemName} Sitecore media item ${itemPath} size ${
          blob.size
        } to ${preSignedUploadURL} - ${JSON.stringify(response)}`
      );
    } else {
      ok = true;
      notify?.log('upload finished');
    }
  } catch (error) {
    notify?.error(`error uploading media item -  ${error}`);
  }

  return ok;
}

async function sitecorePublishMediaItem(
  notify: Notify,
  token: string,
  itemPath: string
) {
  notify?.log(`Publishing Sitecore media item ${itemPath}`);

  const data = JSON.stringify({
    query: `mutation{
  publishItem(
    input: {
      rootItemPath: "/sitecore/media library/${itemPath}"
      languages: "en"
      targetDatabases: "experienceedge"
      publishItemMode: SMART
      publishRelatedItems: false
      publishSubItems: true
    }
  ) {
    operationId
  }
}`,
    variables: {},
  });

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: process.env.SITECORE_AUTH_GRAPH_QL_ENDPOINT!,
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    data: data,
  };

  let ok = true;
  await axios
    .request(config)
    .then((response) => {
      //console.log(JSON.stringify(response.data));
      if (
        response?.data?.errors?.length > 0 &&
        response?.data?.errors[0].message?.includes('not found')
      ) {
        notify?.log(
          `Sitecore media item ${itemPath} not available to publish - ${JSON.stringify(
            response
          )}`
        );
        ok = false; // not there, or deleted.
      } else {
        ok = response?.data?.data?.publishItem?.operationId; // published?
        ok
          ? notify?.log(`Published Sitecore media item ${itemPath}`)
          : notify?.log(
              `Error publishing Sitecore media item ${itemPath} - ${JSON.stringify(
                response
              )}`
            );
      }
    })
    .catch((error) => {
      notify?.log(`Error publishing media - ${JSON.stringify(error)}`);
      ok = false;
    });

  return ok;
}

async function reMediaLibraryExcel(
  notify: Notify,
  srcExcelURL: string,
  environment: string,
  ocbSheetName: string,
  outputItemPath: string,
  outputItemFileName: string
) {
  notify?.log(`Loading Excel consultant workbook ${environment}...`);
  const wb = await readExcelWorkbook(srcExcelURL);

  if (wb) {
    notify?.log(`Loaded Excel consultant workbook`);

    const newSheetArray: (string | boolean)[][] = [
      ['Key', 'Value', 'NoReview', 'DoctifyPhone'], // headers
    ];

    notify?.log(`Reading database records`);

    try {
      ('use server');
      // Connect to the Neon database
      const sql = neon(`${process.env.DATABASE_URL}`);
      //let recArray = { arr: records };
      const existingConsultants = await sql.query(
        environment == 'UAT'
          ? 'select doctifyid, liveonuat as active, noreview, doctifyphone from consultants'
          : 'select doctifyid, liveonprod as active, noreview, doctifyphone from consultants'
      );
      //notify?.log(`DB consultants -  ${JSON.stringify(existingConsultants)}`);

      notify?.log(`Updating Excel consultant workbook`);
      for (let consIdx = 0; consIdx < existingConsultants.length; consIdx++) {
        const key = existingConsultants[consIdx].doctifyid;
        const value = existingConsultants[consIdx].active ?? false;
        const noReview = existingConsultants[consIdx].noreview ?? false;
        const doctifyPhoneNum =
          existingConsultants[consIdx].doctifyphone ?? false;
        if (key) {
          newSheetArray.push([key, value, noReview, doctifyPhoneNum]);
        }
      }

      // compose the new ocb sheet
      const ocbWorksheet = XLSX.utils.aoa_to_sheet(newSheetArray);
      //Replace the OCB worksheet in place
      wb.Sheets[ocbSheetName] = ocbWorksheet;

      notify?.log(
        `Writing Excel consultant workbook to Sitecore media libaray`
      );

      // get Excel as a buffer
      const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
      // Convert buffer to Blob (for browser environment)
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      const authoringToken = await sitecoreGrantAuthoringAccessToken(notify);
      if (authoringToken) {
        // get a pre-signed upload link
        const uploadLink = await sitecoreGetPresignedMediaItemUploadLink(
          notify,
          authoringToken,
          outputItemPath
        );
        if (uploadLink) {
          // remove existing to replace
          if (
            await sitecoreDeleteMediaItem(
              notify,
              authoringToken,
              outputItemPath
            )
          ) {
            // upload new item
            if (
              await sitecoreUploadMediaItem(
                notify,
                authoringToken,
                uploadLink,
                outputItemPath,
                outputItemFileName,
                blob
              )
            ) {
              // publish new item
              if (
                await sitecorePublishMediaItem(
                  notify,
                  authoringToken,
                  outputItemPath
                )
              ) {
                notify?.log(
                  `Written and published Excel consultant workbook to Sitecore media libaray`
                );
              }
            }
          }
        }
      }
    } catch (error) {
      notify?.log(
        `error creating Excel media item from DB -  ${JSON.stringify(error)}`
      );
    }
  } else {
    notify?.log(
      `Error, could not loaded Excel consultant workbook - ${srcExcelURL}`
    );
  }
}

// Console in browser framework
const longRunning = async (notify: Notify) => {
  try {
    notify?.log(`Creating Sitecore Media Excels...`);

    await reMediaLibraryExcel(
      notify,
      process.env.SITECORE_XL_ORIGINAL_SRC!,
      `UAT`,
      `ldbConsultants`,
      `Project/HCA/HCA Main/Lookup API/UAT/finder - Lookup API Data`,
      `UATFinderData.xlsx`
    );

    await reMediaLibraryExcel(
      notify,
      process.env.SITECORE_XL_ORIGINAL_SRC!,
      `PROD`,
      `ldbConsultants`,
      `Project/HCA/HCA Main/Lookup API/Prod/finder - Lookup API Data`,
      `ProdFinderData.xlsx`
    );
  } catch (e) {
    notify.error(`Failed to create Sitecore Media - ${JSON.stringify(e)}`);
  }

  // allow logging buffer to clear
  await sleep(5000);
  notify.complete({ data: 'Completed!' });
};

/**
 * Implements long running response. Only works with edge runtime.
 * @link https://github.com/vercel/next.js/issues/9965
 */

// entry point - console in browser functionality
export default async function RefreshMediaLibrary(req: NextApiRequest) {
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

  //console.log("req.query", req);

  const protectionParamsKey =
    (req as any).nextUrl?.searchParams?.get('key') ?? '';
  //console.log("protectionParamsKey", protectionParamsKey);

  /*
  console.log(
    "process.env.ADMIN_PROTECTION_KEY!",
    process.env.ADMIN_PROTECTION_KEY!
  );*/

  if (
    process.env.ADMIN_PROTECTION_KEY! != undefined &&
    protectionParamsKey != process.env.ADMIN_PROTECTION_KEY!
  ) {
    console.warn(
      'error, CF admin - RefreshMediaLibrary called with incorrect or missing admin key'
    );
    writer.write(
      encoder.encode(
        `${Date().toString()}: error missing or invalid admin protection\n`
      )
    );
    writer.close();
    gStreamClosed = true;
  } else if (process.env.SITECORE_XL_ORIGINAL_SRC! === undefined) {
    console.warn(
      'error, SITECORE_XL_ORIGINAL_SRC - missing key for original excel media url'
    );
    writer.write(
      encoder.encode(
        `${Date().toString()}: error missing key SITECORE_XL_ORIGINAL_SRC for original excel media url\n`
      )
    );
    writer.close();
    gStreamClosed = true;
  } else if (process.env.SITECORE_AUTH_GRAPH_QL_ENDPOINT! === undefined) {
    console.warn(
      'error, SITECORE_AUTH_GRAPH_QL_ENDPOINT - missing key SITECORE_AUTH_GRAPH_QL_ENDPOINT for Sitecore GraphQL url'
    );
    writer.write(
      encoder.encode(
        `${Date().toString()}: error missing key SITECORE_AUTH_GRAPH_QL_ENDPOINT for Sitecore GraphQL url\n`
      )
    );
    writer.close();
    gStreamClosed = true;
  } else {
    // Invoke long running process
    longRunning({
      log: (msg: string) => {
        writer.ready
          .then(() =>
            writer?.write(encoder.encode(`${Date().toString()}: ${msg}\n`))
          )
          .catch((err) => {
            gStreamClosed = true;
            return console.error(
              `Error, client disconnected from log stream repeating log here: ${Date().toString()}: ${msg}\n`,
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

// needed from streaming console in browser
export const config = {
  runtime: 'edge',
};
