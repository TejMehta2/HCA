/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLRequestClient } from '@sitecore-jss/sitecore-jss-nextjs/graphql';
import config from 'temp/config';

// GraphQL query for App / Portal project objects
// references
//https://www.getfishtank.com/blog/useful-sitecore-graphql-queries
//https://www.linkedin.com/pulse/useful-example-graphql-query-sitecore-context-arvind-gehlot
//https://doc.sitecore.com/xmc/en/developers/xm-cloud/query-examples.html

interface sitecoreItemProp {
  id: string;
  name: string;
}

const sitecoreAppPath = `${process.env.ADMIN_PROTECTION_KEY!}/`; // e.g. /sitecore/content/HCA/App/

export async function recurseAppItemsFromGraphQL(
  graphQLClient: GraphQLRequestClient,
  path: string,
  lang: string,
  platform: string,
  obj: any
): Promise<any> {
  try {
    // build a query for App/Portal objects
    const GQLQuery: string = `
          query {
        item( path: "${path}", language: "${lang}" ) {
          id,
          name,
          displayName,
          hasChildren,
          ... on AppSimple {
              value {
                value
              }
            },
          ... on AppBool {
              bVal:value {
                value
              }
            },
          ... on AppInteger {
              iVal:value {
                value
              }
            },            
          ... on AppImage {
              value {
                value
              }
            },
          ... on AppLink {
              value {
                value
              }
            },
          ... on AppRichText {
              value {
                value
              }
            },                                                                                       
          ... on AppText {
              textValue:value {
                value
              }
              textValueShort:valueShort {
                value
              }
              textAndroid:androidValue {
                value
              }
              textAndroidShort:androidValueShort {
                value
              }
              textiOS:iOSValue {
                value
              }
              textiOSShort:iOSValueShort {
                value
              }
              textWeb:webValue {
                value
              }
              textWebShort:webValueShort {
                value
              }
          },
          # find children for recursion
          children() {
           results {
              name,
              id,
            }
          }
        }
      }
      `;

    //console.log('GQLQuery: ', GQLQuery);
    const GQLResult = await graphQLClient.request<any>(GQLQuery);
    //console.log('result:', JSON.stringify(GQLResult));

    // find the bottom of the object graph and create new nodes and assign values
    //console.log('path', path);
    const pathSplit = path.replace(sitecoreAppPath, '').split('/');
    let findNode = obj;
    let objDepth = 0;
    for (objDepth = 0; objDepth < pathSplit.length; objDepth++) {
      if (objDepth == pathSplit.length - 1) {
        // console.log('GQLResult.item?.name', GQLResult.item?.name);
        // console.log('GQLResult.item', JSON.stringify(GQLResult.item));
        if (GQLResult.item?.value) {
          findNode[GQLResult.item?.name] = GQLResult.item?.value?.value; // value
        } else if (GQLResult.item?.bVal) {
          findNode[GQLResult.item?.name] =
            GQLResult.item?.bVal?.value === '1' ? true : false; // boolean value
        } else if (GQLResult.item?.iVal) {
          findNode[GQLResult.item?.name] = Number(GQLResult.item?.iVal?.value); // int value
        } else if (GQLResult.item?.textValue) {
          switch (platform) {
            case 'ios':
              findNode[GQLResult.item?.name] = {
                longValue: `${GQLResult.item?.textiOS?.value}`, // long text value
                shortValue: `${GQLResult.item?.textiOSShort?.value}`, // short text value
              };
              break;
            case 'android':
              findNode[GQLResult.item?.name] = {
                longValue: `${GQLResult.item?.textAndroid?.value}`, // long text value
                shortValue: `${GQLResult.item?.textAndroidShort?.value}`, // short text value
              };
              break;
            case 'web':
              findNode[GQLResult.item?.name] = {
                longValue: `${GQLResult.item?.textWeb?.value}`, // long text value
                shortValue: `${GQLResult.item?.textWebShort?.value}`, // short text value
              };
              break;
            default:
              findNode[GQLResult.item?.name] = {
                longValue: `${GQLResult.item?.textValue?.value}`, // long text value
                shortValue: `${GQLResult.item?.textValueShort?.value}`, // short text value
              };
              break;
          }
        } else {
          findNode[GQLResult.item?.name] = {}; // folder/component/node place holder
        }
      }

      if (!findNode[pathSplit[objDepth]]) {
        findNode[pathSplit[objDepth]] = {}; // folder/component/node place holder
      }

      findNode = findNode[pathSplit[objDepth]];
    }

    if (GQLResult && GQLResult.item && GQLResult.item.hasChildren) {
      const children = GQLResult.item.children?.results;
      //console.log('children', JSON.stringify(children));
      for (let childCnt = 0; childCnt < children.length; childCnt++) {
        const item: sitecoreItemProp = children[childCnt];
        await recurseAppItemsFromGraphQL(
          graphQLClient,
          `${path}/${item.name}`,
          lang,
          platform,
          obj
        );
      }
    }
  } catch (e) {
    console.log(
      `Could not recurseAppItemsFromGraphQL path:${path} - failed with exception ${e}`
    );
    console.error(
      `Could not recurseAppItemsFromGraphQL path:${path} - failed with exception ${e}`
    );
  }

  return obj;
}

export async function getAppItemsFromGraphQL(
  path: string,
  lang: string,
  platform: string
): Promise<any> {
  const graphQLClient = new GraphQLRequestClient(config.graphQLEndpoint, {
    apiKey: config.sitecoreApiKey,
  });
  const obj: any = {};
  //console.log('path', path);
  const result = await recurseAppItemsFromGraphQL(
    graphQLClient,
    path,
    lang.toLowerCase(),
    platform.toLowerCase(),
    obj
  );

  //console.log('Final itemToFetch result:', JSON.stringify(result));
  return result;
}
