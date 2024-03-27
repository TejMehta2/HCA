import { getItemFromGraphQL } from 'lib/consultant-finder/getItemFromGraphQL';
import type { NextApiRequest, NextApiResponse } from 'next';
import * as XLSX from 'xlsx';

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

//Config
interface ILookupAPIConfig {
  aPI_Lookup_API_Media_BaseURL: string;
  aPI_Lookup_API_Media_UtilizesLegacy: boolean;
}

export async function getLookupAPIConfig(): Promise<ILookupAPIConfig> {
  // Sitecore item
  const LookupAPISettingsItemId = '{1378C9EB-4539-4D91-86B1-62C867709E12}';
  const LookupAPISettingsTemplateName = 'Lookup_API_Settings';

  let LookupAPIConfig: ILookupAPIConfig = {
    aPI_Lookup_API_Media_BaseURL: '',
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
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { app } = req.query;

  const frags = app as string[];
  let project: string = '';
  let datasourceType: string = '';
  let operation: string = '';
  let dictionary: string = '';
  let optionals: string = '';

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
    }
  }

  let output: unknown;
  if (error === '') {
    switch (operation) {
      case 'findbydictionary':
        {
          const config = getLookupAPIConfig();
          //console.log('loading xl');
          const mediaURLBase =
            (await config).aPI_Lookup_API_Media_BaseURL ||
            'https://hcahealthcare.co.uk/-/media/Lookup%20API/';
          const mediaFileName = (await config)
            .aPI_Lookup_API_Media_UtilizesLegacy
            ? '%20-%20Lookup%20API%20Data'
            : '---Lookup-API-Data.xlsx';
          const xlData = await fetch(
            //e.g. 'https://www.hcacloud.localhost/-/media/Project/HCA/Lookup%20API/Finder%20-%20Lookup%20API%20Data'
            //e.g. 'https://hcahealthcare.co.uk/-/media/Lookup%20API/Finder%20-%20Lookup%20API%20Data',
            `${mediaURLBase}${project}${mediaFileName}`,
            {
              cache: 'force-cache',
              next: { revalidate: 3600 },
            }
          );
          //console.log('loaded xl');
          const res = (await readExcel(await xlData.blob(), dictionary)) as [];
          //Type Key Value Order
          /* eg
          "Type": "UKPublicHoliday",
          "Key": "2027-05-31",
          "Value": "Spring bank holiday",
          "Order": 31,
          */
          //console.log('res', res);
          if (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            !(res as any).errorCode &&
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            !(res as any).errorText &&
            res?.length
          ) {
            // should be an array, with heading
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            output = res?.map((item: any) => {
              let UniqueKey = '';
              if (item.Type) {
                UniqueKey += item.Type + '.';
              }

              if (item.Key) {
                UniqueKey += item.Key;
              }

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
                  key != 'Type' &&
                  key != 'Key' // &&
                  //key != 'Value' &&
                  //key != 'Order'
                ) {
                  ret.Values[key] = value;
                }
              }
              return ret;
            });
          }
        }
        break;
    }
  }

  return res.status(200).json(output);
}
