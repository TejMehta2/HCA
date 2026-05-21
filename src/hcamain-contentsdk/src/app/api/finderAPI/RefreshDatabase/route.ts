/* eslint-disable @typescript-eslint/no-explicit-any */
import { getLDBFirstAppointmentDatas } from 'lib/consultant-finder/API_C2';
import { doctifyGetAllConsultantSlugs } from 'lib/consultant-finder/API_Doctify';
import { IConsultantRecord } from 'lib/consultant-finder/API_HCA';
import { type NextRequest } from 'next/server';
import { neon } from '@neondatabase/serverless';
import * as XLSX from 'xlsx';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Console in browser framework

//see https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
let gStreamClosed = false;

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
    console.log(`errorCode: 402, readExcel - error reading file data, ${e}`);
  }

  return wb;
}

async function loadExcel(
  notify: Notify,
  srcExcelURL: string,
  ocbSheetName: string
) {
  const existingConsultants: unknown[] = [];
  notify?.log(`Loading Excel consultant workbook...`);
  const wb = await readExcelWorkbook(srcExcelURL);

  if (wb) {
    notify?.log(`Loaded Excel consultant workbook`);
    try {
      // figure current no reviews and doctify phone entries.
      notify?.log(`Reading current excel reviews and doctify phone properties`);
      const currentOCBSheet = wb.Sheets[ocbSheetName];

      if (currentOCBSheet) {
        const data = XLSX.utils.sheet_to_json(currentOCBSheet);
        data.forEach((rec: any, cnt) => {
          const newRec: IConsultantRecord = {
            slug: rec?.Key,
            proId: `Temp${cnt}`,
            title: '',
            firstName: '',
            lastName: '',
            suffix: '',
            proIdType: 'temp',
            mnemonicMT: '',
            live: false,
            liveStatus: '',
            liveOnProd: false,
            liveOnUAT: false,
            refreshDate: new Date(),
            noReview: rec?.NoReview,
            doctifyPhone: rec?.DoctifyPhone,
            isGP: false,
          };
          existingConsultants.push(newRec);
          notify?.log(`Appending slug ${cnt} ${rec?.Key} from original Excel`);
        });
      }
    } catch (error) {
      notify?.log(`error creating Excel blob from DB -  ${error}`);
    }
  } else {
    notify?.log(`Could not load Excel consultant workbook - ${srcExcelURL}`);
  }
  return existingConsultants;
}

// worker thread
const longRunning = async (notify: Notify) => {
  const handle = setInterval(() => {
    notify?.log(`Working ...`);
  }, 2000);
  try {
    // get existing consultants from spreadsheet - there are some Doctify phone and no review consultants in the list
    notify?.log(`Loading existing Excel data ...`);
    const xlrecords = await loadExcel(
      notify,
      process.env.SITECORE_XL_ORIGINAL_SRC!,
      `ldbConsultants`
    );
    const records: IConsultantRecord[] = xlrecords as IConsultantRecord[];
    //console.log(JSON.stringify(records));

    if (records?.length > 500) {
      notify?.log(`Loaded ${records?.length} Excel consultant records`);
      // load up the basic record data from Doctify
      notify?.log(`Loading consultant data from Doctify...`);
      const doctifyRecords: IConsultantRecord[] =
        (await doctifyGetAllConsultantSlugs()) as IConsultantRecord[];
      if (doctifyRecords?.length > 2500) {
        notify?.log(
          `Loaded ${doctifyRecords?.length} Doctify consultant records`
        );
        //console.log(JSON.stringify(doctifyRecords));
        for (let consIdx = 0; consIdx < doctifyRecords.length; consIdx++) {
          const slug = doctifyRecords[consIdx].slug;
          const index = records.findIndex((rec: any) => rec.slug == slug);
          notify?.log(`Doctify slug ${consIdx}: ${slug} index: ${index}`);
          // not in original spreadsheet
          if (index == -1) {
            records.push(doctifyRecords[consIdx]);
            notify?.log(
              `Not in original spreadsheet...${JSON.stringify(doctifyRecords[consIdx])}`
            );
          } else {
            // copy flags from original spreadsheet
            doctifyRecords[consIdx].noReview = records[index].noReview;
            doctifyRecords[consIdx].doctifyPhone =
              records[index].doctifyPhone || doctifyRecords[consIdx].isGP;
            doctifyRecords[consIdx].refreshDate = new Date();
            // write the doctify version back to record
            records[index] = doctifyRecords[consIdx];
            if (doctifyRecords[consIdx].slug == 'miss-jenny-lo') {
              notify?.log(`GOT ${JSON.stringify(records[index])}`);
            }
          }
        }

        // TODO CHECK DOCTIFY DATA INTEGRITY

        notify?.log(`Getting Dynamics records ...`);
        const C2Response = await getLDBFirstAppointmentDatas(
          [],
          '',
          undefined,
          undefined,
          'includeLocations=true'
        );

        notify.log('Got C2 Response');

        if (!C2Response?.errorCode && C2Response?.length > 500) {
          notify?.log(`Loaded ${C2Response?.length} CRM consultant records`);
          for (let c2RecIdx = 0; c2RecIdx < C2Response.length; c2RecIdx++) {
            const c2Rec = C2Response[c2RecIdx];
            notify.log(JSON.stringify(c2Rec));
            const index = records.findIndex(
              (rec: any) => rec.proId == c2Rec?.professionalRegistrationNumber
            );

            if (index > -1) {
              const docRec = records[index];
              //const doctifyProfile = await getSpecialistProfileData(docRec?.slug);
              //const doctifyProfile = null;

              if (c2Rec?.refreshdate) {
                docRec.refreshDate = c2Rec?.refreshdate;
                docRec.live = c2Rec?.live;
                docRec.liveStatus = c2Rec?.live_status;
                docRec.mnemonicMT = c2Rec?.mnemonic;
                docRec.liveOnProd =
                  c2Rec?.live == true && c2Rec?.live_status === 'Live';
                docRec.liveOnUAT =
                  docRec.liveOnProd ||
                  (c2Rec?.live == true && c2Rec?.live_status === 'In Testing');
              }
            }
          }

          notify?.log(`Got ${records.length} combined records crmRecords`);

          //notify?.log(`Records: ${JSON.stringify(records)}`);

          // store results
          notify?.log(`storing all crmRecords in db`);

          try {
            ('use server');
            // Connect to the Neon database
            const sql = neon(`${process.env.DATABASE_URL}`);

            const recArray = { arr: records };
            notify?.log(`truncate ocbconsultants`);
            await sql.query(`truncate table ocbconsultants`);
            const query1 = `insert into ocbConsultants (updated, crmRecords) values(current_timestamp, $1);`;
            //notify?.log(`sql - ${query}`);
            const values = [recArray];
            const result1 = await sql.query(query1, values);
            notify?.log(
              `insert ocbconsultants query result - result: ${result1}`
            );
            notify?.log(
              `attempting delete of temp consultants in main table...`
            );
            await sql.query(
              `delete from consultants where professionalidtype like 'temp'`
            );
            notify?.log(`attempting merge into main table...`);
            const query2 = `
              MERGE INTO consultants c
                    USING 
                    (select * from ( 
                            select 
                            (jsonb_array_elements(ocbconsultants.crmrecords->'arr')->>'refreshDate')::timestamp at time zone '00:00' as updated, 
                            jsonb_array_elements(ocbconsultants.crmrecords->'arr')->>'proId' as professionalid, 
                            jsonb_array_elements(ocbconsultants.crmrecords->'arr')->>'proIdType' as professionalidtype, 
                            jsonb_array_elements(ocbconsultants.crmrecords->'arr')->>'mnemonicMT' as meditechid,
                            jsonb_array_elements(ocbconsultants.crmrecords->'arr')->>'slug' as doctifyid,
                            jsonb_array_elements(ocbconsultants.crmrecords->'arr')->>'crmid' as crmid,
                            jsonb_array_elements(ocbconsultants.crmrecords->'arr')->>'liveOnProd' = 'true' as liveOnProd,       
                            jsonb_array_elements(ocbconsultants.crmrecords->'arr')->>'liveOnUAT' = 'true' as liveOnUAT,
                            jsonb_array_elements(ocbconsultants.crmrecords->'arr')->>'noReview' = 'true' as noReview,       
                            jsonb_array_elements(ocbconsultants.crmrecords->'arr')->>'doctifyPhone' = 'true' as doctifyPhone
                            from ocbconsultants
                            order by updated asc) expanded
                      where updated is not null) o
                    ON c.doctifyid = o.doctifyid
                    WHEN NOT MATCHED THEN 
                    insert (
                    updated,
                    professionalid,
                    professionalidtype,
                    meditechid,
                    doctifyid,
                    crmid,
                    liveonprod,
                    liveonuat,
                    noreview,
                    doctifyphone)
                    values (
                    o.updated,
                    o.professionalid,
                    o.professionalidtype,
                    o.meditechid,
                    o.doctifyid,
                    o.crmid,
                    o.liveonprod,
                    o.liveonuat,
                    o.noreview,
                    o.doctifyphone
                    )
                    WHEN MATCHED THEN
                      update set 
                    updated = o.updated,
                    professionalid = o.professionalid,
                    professionalidtype = o.professionalidtype, 
                    meditechid = o.meditechid,
                    --doctifyid = o.doctifyid,
                    crmid = o.crmid,
                    liveonprod = o.liveonprod,
                    liveonuat = o.liveonuat,
                    noreview = o.noreview,
                    doctifyphone = o.doctifyphone;
            `;
            const result2 = await sql.query(query2);
            notify?.log(`merge consultants query result - result: ${result2}`);
          } catch (error) {
            notify?.log(
              `error storing all crmRecords in db -  ${JSON.stringify(error)}`
            );
          }
        } else {
          notify.log(
            `Error - C2/Kick error code ${C2Response?.errorCode} - number of records read ${C2Response?.length} - aborting`
          );
        }
      } else {
        notify.log(
          `Error - read only ${doctifyRecords?.length} records from Doctify - aborting`
        );
      }
    } else {
      notify.log(
        `Error - read only ${records?.length} records from source Excel - aborting`
      );
    }
    notify.log(`Completed!`);
  } catch (e) {
    notify.error(`Failed to get active consultant slugs ${JSON.stringify(e)}`);
  }
  clearInterval(handle);
  // allow logging buffer to clear
  await sleep(5000);
  notify.complete({ data: 'Completed!' });
};

/**
 * Implements long running response. Only works with edge runtime.
 * @link https://github.com/vercel/next.js/issues/9965
 */

// console in browser framework entrypoint
async function RefreshDatabase(req: NextRequest) {
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
      'error, CF admin - RefreshDatabase called with incorrect or missing admin key'
    );
    writer.write(
      encoder.encode(
        `${Date().toString()}: error missing or invalid admin protection\n`
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
        console.log('in close:');
        if (!gStreamClosed) {
          writer.close();
          gStreamClosed = true;
        }
      },
    })
      .then(() => {
        console.log('in then:');
        if (!gStreamClosed) {
          writer.close();
        }
      })
      .catch(() => {
        console.log('in catch:');
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
  return RefreshDatabase(req);
}

export async function POST(req: NextRequest) {
  return RefreshDatabase(req);
}

export async function PUT(req: NextRequest) {
  return RefreshDatabase(req);
}

export async function PATCH(req: NextRequest) {
  return RefreshDatabase(req);
}

export async function DELETE(req: NextRequest) {
  return RefreshDatabase(req);
}

export async function HEAD(req: NextRequest) {
  return RefreshDatabase(req);
}

export async function OPTIONS(req: NextRequest) {
  return RefreshDatabase(req);
}
