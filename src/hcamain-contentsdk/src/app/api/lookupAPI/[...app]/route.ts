/* eslint-disable @typescript-eslint/no-explicit-any */
import { getItemFromGraphQL } from 'lib/consultant-finder/getItemFromGraphQL';
import { revalidate } from 'lib/consultant-finder/revalidateNow';
import { type NextRequest, NextResponse } from 'next/server';
import * as XLSX from 'xlsx';

type RouteContext = {
  params: Promise<{
    app?: string[];
  }>;
};

// read excel xlsx file
export async function readExcel(
  file: Blob,
  sheetName: string
): Promise<unknown> {
  let data: unknown = '';
  try {
    const bufferArray = Buffer.from(await file.arrayBuffer());
    const wb = XLSX.read(bufferArray, {
      type: 'buffer',
    });
    //const wsname = wb.SheetNames[0];
    //const ws = wb.Sheets[wsname];
    const ws = wb?.Sheets[sheetName];
    if (ws) {
      data = XLSX.utils.sheet_to_json(ws);
    } else {
      data = `{"errorCode": ${401}, "errorText": "error reading data file"}`;
      console.warn(`errorCode: 402, readExcel - error reading file data`);
    }
  } catch (e) {
    data = `{"errorCode": ${402}, "errorText": "error reading data file"}`;
    console.warn(`errorCode: 402, readExcel - error reading file data, ${e}`);
  }

  return data;
}

const joinObjects = (obj1: any, obj2: any) => {
  return { ...obj1, ...obj2 };
};

const reduceToObjectWithArrays = (array: any[]) => {
  return array.reduce((acc, item) => {
    const key = Object.keys(item)[0];
    if (!acc[key]) {
      acc[key] = {};
    }
    acc[key] = joinObjects(acc[key], item[key]);
    return acc;
  }, {});
};

//Config
interface ILookupAPIConfig {
  aPI_Lookup_API_Media_BaseURL: string;
  aPI_Lookup_API_Media_LegacyBaseURL: string;
  aPI_Lookup_API_Media_UtilizesLegacy: boolean;
}

export async function getLookupAPIConfig(): Promise<ILookupAPIConfig> {
  // Sitecore item
  const LookupAPISettingsItemId = '{1378C9EB-4539-4D91-86B1-62C867709E12}';
  const LookupAPISettingsTemplateName = 'Lookup_API_Settings';

  let LookupAPIConfig: ILookupAPIConfig = {
    aPI_Lookup_API_Media_BaseURL: '',
    aPI_Lookup_API_Media_LegacyBaseURL: '',
    aPI_Lookup_API_Media_UtilizesLegacy: false,
  };
  LookupAPIConfig = await getItemFromGraphQL(
    LookupAPISettingsItemId,
    LookupAPISettingsTemplateName,
    LookupAPIConfig
  );
  return LookupAPIConfig;
}

type ValuesType = {
  [key: string]: unknown;
  propname?: string;
};

/* Lookup API routing as follows:
<project>/<datasourcetype>/<operation>/<dictionary>/<optional output format (default is Object)>?<optional filter query params>
example: finder/default/findbydictionary/doctifyFacilities
<project> - just the name of the project e.g. Finder
<datasourcetype> - e.g default uses the default backing store | Excel | Sitecore | FileSystem | Database
<dictionary> - the name of the dictionary - i.e. the Tab if the data source is Excel 
<optional output format>
Options are
• Standard - produces output as a simple flat array of records e.g. [0],[1]…[x] with properties that 
match the input data format
• Keyed - produces output as with records accessible via their key e.g. [“<key name>”]
• Object - produces output as a JSON object allowing deep structure defined by the data-definition
<optional filter>
The optional filter can contain a Type filter where there is a dictionary containing records with multiple 
types, for example TopLevelHospital when requesting the hospitals dictionary

original interface
  ResponseResult<string> FindByKey(string project, LookupAPIDatasourceType dsType,  string dictionary, string key, Dictionary<string, string> queryValues = null);
  ResponseResult<string> FindByKeys(string project, LookupAPIDatasourceType dsType, string dictionary, string keys, OutputFormat outputFormat = OutputFormat.Standard, Dictionary<string, string> queryValues = null);
  ResponseResult<string> FindByType(string project, LookupAPIDatasourceType dsType, string dictionary, string type, OutputFormat outputFormat = OutputFormat.Standard, Dictionary<string, string> queryValues = null);
  ResponseResult<string> FindByDictionary(string project, LookupAPIDatasourceType dsType, string dictionary, OutputFormat outputFormat = OutputFormat.Standard, Dictionary<string, string> queryValues = null);
  ResponseResult<string> FindByTypeAndKey(string project, LookupAPIDatasourceType dsType,  string dictionary, string type, string key, Dictionary<string, string> queryValues = null);
  ResponseResult<string> FindByTypeAndKeys(string project, LookupAPIDatasourceType dsType, string dictionary, string type, string keys, OutputFormat outputFormat = OutputFormat.Standard, Dictionary<string, string> queryValues = null);
  ResponseResult<string> SearchKeys(string project, LookupAPIDatasourceType dsType,  string dictionary, string type, string key, Dictionary<string, string> queryValues = null);
*/
async function handler(req: NextRequest, context: RouteContext) {
  const { app } = await context.params;

  const frags = app as string[];
  let project: string = '';
  let datasourceType: string = '';
  let operation: string = '';
  let dictionary: string = '';
  let optionals: string = '';
  const queryValues_Key =
    req.nextUrl.searchParams.getAll('key').length > 1
      ? req.nextUrl.searchParams.getAll('key')
      : req.nextUrl.searchParams.get('key');

  //console.log('key', queryValues_Key);

  let error: string = '';
  if (frags) {
    if (frags.length > 0) {
      project = frags[0];
    } else {
      error =
        'No project specified in the route: format is <project>/<datasourcetype>/<operation>/<dictionary>/<optional output format (default is Object)>?<optional filter query params>';
    }
    if (frags.length > 1) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      datasourceType = frags[1]?.toLowerCase();
    } else {
      error =
        'No data source type specified in the route: format is <project>/<datasourcetype>/<operation>/<dictionary>/<optional output format (default is Object)>?<optional filter query params>';
    }
    if (frags.length > 2) {
      operation = frags[2]?.toLowerCase();
    } else {
      error =
        'No operation specified in the route: format is <project>/<datasourcetype>/<operation>/<dictionary>/<optional output format (default is Object)>?<optional filter query params>';
    }
    if (frags.length > 3) {
      dictionary = frags[3];
    } else {
      error =
        'No dictionary specified in the route: format is <project>/<datasourcetype>/<operation>/<dictionary>/<optional output format (default is Object)>?<optional filter query params>';
    }
    if (frags.length > 4) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      optionals = frags[4];
      console.log(datasourceType, optionals);
    }
  }

  //console.log(project, datasourceType, operation, dictionary, optionals);
  let output: unknown[] = [];
  if (error === '') {
    switch (operation) {
      case 'findbydictionary':
      case 'findbydictionarynolegacy':
      case 'findbydictionaryasobject':
      case 'findbydictionaryasobjectnolegacy':
        {
          const config = await getLookupAPIConfig();

          const mediaURLBase =
            config.aPI_Lookup_API_Media_UtilizesLegacy &&
            operation != 'findbydictionaryasobjectnolegacy' &&
            operation != 'findbydictionarynolegacy'
              ? config.aPI_Lookup_API_Media_LegacyBaseURL
              : config.aPI_Lookup_API_Media_BaseURL;

          //e.g. Finder---lookup-api-data.xlsx
          const mediaFileName =
            config.aPI_Lookup_API_Media_UtilizesLegacy &&
            operation != 'findbydictionaryasobjectnolegacy' &&
            operation != 'findbydictionarynolegacy'
              ? '%20-%20Lookup%20API%20Data'
              : '---lookup-api-data.xlsx'; // lower-cased by pipeline

          const mediaURL =
            config.aPI_Lookup_API_Media_UtilizesLegacy &&
            operation != 'findbydictionaryasobjectnolegacy' &&
            operation != 'findbydictionarynolegacy'
              ? `${mediaURLBase}/${project}${mediaFileName}`
              : `${mediaURLBase}/${project}${mediaFileName}`.toLowerCase();

          //console.log('mediaURL', mediaURL);
          let xlData = await fetch(
            //e.g. 'https://www.hcacloud.localhost/-/media/Project/HCA/Lookup%20API/Finder%20-%20Lookup%20API%20Data'
            //      https://edge.sitecorecloud.io/hcainternat0fd8-hcadigital-uat-34f6/media/Project/HCA/HCA-Main/Lookup-API/Finder---Lookup-API-Data.xlsx
            //e.g. 'https://hcahealthcare.co.uk/-/media/Lookup%20API/Finder%20-%20Lookup%20API%20Data',
            mediaURL,
            {
              redirect: 'manual',
              next: {
                revalidate:
                  revalidate.now() || revalidate.noCache() ? false : 3600,
              },
            }
          );
          //console.log('loaded xl', xlData);
          //console.log('redirected', xlData.redirected, xlData.url);
          if (xlData.redirected) {
            xlData = await fetch(xlData.url, {
              next: {
                revalidate:
                  revalidate.now() || revalidate.noCache() ? false : 3600,
              },
            });
          }
          const blob = await xlData.blob();
          //console.log('mediaFileName',`${mediaURLBase}${project}${mediaFileName}`);
          const res = (await readExcel(blob, dictionary)) as [];
          //Type Key Value Order
          /* eg
          "Type": "UKPublicHoliday",
          "Key": "2027-05-31",
          "Value": "Spring bank holiday",
          "Order": 31,
          */
          //console.log('res', res);
          if (res.map != undefined) {
            // should be an array, with heading
            if (queryValues_Key && queryValues_Key.length > 0) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              output = res?.filter(
                (rec: { Key: string | unknown[] }) =>
                  rec.Key === queryValues_Key
              );

              //console.log('output', output, 'key', queryValues_Key);
            } else {
              output = res;
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            output = output?.map((item: any) => {
              let UniqueKey = '';
              if (item.Type) {
                UniqueKey += item.Type + '.';
              }

              if (item.Key) {
                UniqueKey += item.Key;
              }

              if (operation.includes('asobject')) {
                const myValues: ValuesType = {};
                const ret = {
                  UniqueKey: UniqueKey,
                  Key: item.Key,
                  Type: item.Type,
                  Value: item.Value,
                  Order: item.Order,
                  Values: myValues,
                };

                for (const [key, value] of Object.entries(item)) {
                  //console.log(`${key}: ${value}`);
                  if (
                    key != 'Key' &&
                    key != 'Type' // &&
                    //key != 'Value' &&
                    //key != 'Order'
                  ) {
                    ret.Values[key] = value;
                  }
                }

                // object as string
                const objStr: string = `
                  {"${ret['Type']}": {
                    "${ret['Key']}": 
                      ${JSON.stringify(ret['Values'])}
                    }
                  }
                `;
                //console.log(`objStr`, objStr);
                return JSON.parse(objStr);
              } else {
                const myValues: ValuesType = {};
                const ret = {
                  UniqueKey: UniqueKey,
                  Key: item.Key,
                  Type: item.Type,
                  Value: item.Value,
                  Order: item.Order,
                  Values: myValues,
                };

                for (const [key, value] of Object.entries(item)) {
                  //console.log(`${key}: ${value}`);
                  if (
                    key != 'Key' &&
                    key != 'Type' // &&
                    //key != 'Value' &&
                    //key != 'Order'
                  ) {
                    ret.Values[key] = value;
                  }
                }
                return ret;
              }
            });

            // if we are working with objects, then we need to flatten the data and group by top level property name
            if (operation.includes('asobject')) {
              output = reduceToObjectWithArrays(output);
              //console.log(output);
            }
          } else {
            console.warn(
              `error processing xl file ${mediaURLBase}/${project}${mediaFileName}`,
              res
            );
          }
        }
        break;
    }
  }

  if (revalidate.now() || revalidate.noCache()) {
    const nextResponse = NextResponse.json(output, { status: 200 });
    nextResponse.headers.set('Cache-Control', 'no-cache');
    nextResponse.headers.set('CDN-Cache-Control', 'no-cache');
    nextResponse.headers.set('Vercel-CDN-Cache-Control', 'no-cache');
    return nextResponse;
  } else {
    const nextResponse = NextResponse.json(output, { status: 200 });
    nextResponse.headers.set('Cache-Control', 'max-age=600');
    nextResponse.headers.set('CDN-Cache-Control', 'max-age=1800');
    nextResponse.headers.set('Vercel-CDN-Cache-Control', 'max-age=3600');
    return nextResponse;
  }
}

export async function GET(req: NextRequest, context: RouteContext) {
  return handler(req, context);
}

export async function POST(req: NextRequest, context: RouteContext) {
  return handler(req, context);
}

export async function PUT(req: NextRequest, context: RouteContext) {
  return handler(req, context);
}

export async function PATCH(req: NextRequest, context: RouteContext) {
  return handler(req, context);
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  return handler(req, context);
}

export async function HEAD(req: NextRequest, context: RouteContext) {
  return handler(req, context);
}

export async function OPTIONS(req: NextRequest, context: RouteContext) {
  return handler(req, context);
}
