import { getUntypedItemsFromGraphQL } from 'lib/consultant-finder/getUntypedItemFromGraphQL';
import { revalidate } from 'lib/consultant-finder/revalidateNow';
import type { NextApiRequest, NextApiResponse } from 'next';

//Config
interface ILookupAPIConfig {
  aPI_Lookup_API_Media_BaseURL: string;
  aPI_Lookup_API_Media_LegacyBaseURL: string;
  aPI_Lookup_API_Media_UtilizesLegacy: boolean;
}

export async function getItemsFromGraphQL(): Promise<ILookupAPIConfig> {
  // Sitecore item
  //const AppRootItemId = '{07C68866-C86C-4856-97A4-5C81A5FFB4E7}';
  //const AppTemplateName = 'App';
  const appRootPath = '/sitecore/content/HCA/App/OneApp/Globals/';

  const result = await getUntypedItemsFromGraphQL(appRootPath);
  return result;
}

/*
type ValuesType = {
  [key: string]: unknown;
  propname?: string;
};
*/
/* 
Sitecore structure
App->[AppName]->[Versions]->[Version form v0001_0001 e.g. v{maj version}_{minor version}]
appAPI routing as follows 
<Lang>/<AppName>/<Version>/

*/

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
  let output: unknown[] = [];


  const frags = app as string[];
  
  console.log('API');
  getItemsFromGraphQL();
  /*let project: string = '';
  let datasourceType: string = '';
  let operation: string = '';
  let dictionary: string = '';
  let optionals: string = '';
  const queryValues_Key = req?.query?.key;
*/

  //console.log('key', queryValues_Key);

  let error: string = '';
  if (frags) {
    /*
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
  }*/

    //console.log(project, datasourceType, operation, dictionary, optionals);

    if (error === '') {
      /*
    switch (operation) {
      case 'findbydictionary':
        {
          const config = await getItemsFromGraphQL();

          const mediaURLBase = config.aPI_Lookup_API_Media_UtilizesLegacy
            ? config.aPI_Lookup_API_Media_LegacyBaseURL
            : config.aPI_Lookup_API_Media_BaseURL;

          //e.g. Finder---lookup-api-data.xlsx
          const mediaFileName = config.aPI_Lookup_API_Media_UtilizesLegacy
            ? '%20-%20Lookup%20API%20Data'
            : '---lookup-api-data.xlsx'; // lower-cased by pipeline

          const mediaURL = config.aPI_Lookup_API_Media_UtilizesLegacy
            ? `${mediaURLBase}/${project}${mediaFileName}`
            : `${mediaURLBase}/${project}${mediaFileName}`.toLowerCase();

          //console.log('mediaURL',mediaURL);
          let xlData = await fetch(
            //e.g. 'https://www.hcacloud.localhost/-/media/Project/HCA/Lookup%20API/Finder%20-%20Lookup%20API%20Data'
            //      https://edge.sitecorecloud.io/hcainternat0fd8-hcadigital-uat-34f6/media/Project/HCA/HCA-Main/Lookup-API/Finder---Lookup-API-Data.xlsx
            //e.g. 'https://hcahealthcare.co.uk/-/media/Lookup%20API/Finder%20-%20Lookup%20API%20Data',
            mediaURL,
            {
              redirect: 'manual',
              cache: 'force-cache',
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
              cache: 'force-cache',
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
            });
          } else {
            console.warn(
              `error processing xl file ${mediaURLBase}/${project}${mediaFileName}`,
              res
            );
          }
        }
        break;
    }
    */
    }
  }

  if (revalidate.now() || revalidate.noCache()) {
    res.appendHeader('Cache-Control', 'no-cache');
    res.appendHeader('CDN-Cache-Control', 'no-cache');
    res.appendHeader('Vercel-CDN-Cache-Control', 'no-cache');
  } else {
    res.appendHeader('Cache-Control', 'max-age=600');
    res.appendHeader('CDN-Cache-Control', 'max-age=1800');
    res.appendHeader('Vercel-CDN-Cache-Control', 'max-age=3600');
  }

  return res.status(200).json(output);
}
