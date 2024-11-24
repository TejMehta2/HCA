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

export async function recurseAppItems(
  graphQLClient: GraphQLRequestClient,
  path: string,
  lang: string,
  platform: string,
  currentJSON: any,
  findNode: any
): Promise<any> {
  try {
    /*console.log('result:', JSON.stringify(GQLResult), '');
    console.log(
      'path:',
      path,
      'GQLResult',
      GQLResult,
      'GQLResult?.results',
      GQLResult?.results,
      'GQLResult?.results?.hasChildren',
      GQLResult?.results?.hasChildren
    );*/

    if (currentJSON && !currentJSON.results && currentJSON.hasChildren) {
      // just a folder
      //console.log('folder1', path);
      const children = currentJSON.children?.results;
      //console.log('children', JSON.stringify(children));
      for (let childCnt = 0; childCnt < children.length; childCnt++) {
        const item: sitecoreItemProp = children[childCnt];
        await recurseAppItems(
          graphQLClient,
          `${path}/${item.name}`,
          lang,
          platform,
          children[childCnt],
          findNode
        );
      }
    } else if (
      currentJSON &&
      currentJSON.results &&
      currentJSON.results.hasChildren
    ) {
      //console.log('folder2', path);
      const children = currentJSON.results.children?.results;
      //console.log('children', JSON.stringify(children));
      for (let childCnt = 0; childCnt < children.length; childCnt++) {
        const item: sitecoreItemProp = children[childCnt];
        await recurseAppItems(
          graphQLClient,
          `${path}/${item.name}`,
          lang,
          platform,
          children[childCnt],
          findNode
        );
      }
    } else {
      const objPath = path
        .replace('/sitecore/content/HCA/App/', '')
        .replaceAll('/', '.');
      //const findNode: any = [];
      const objPropName = objPath + '.' + currentJSON.name;
      if (currentJSON.value) {
        findNode[objPropName] = currentJSON.value?.value; // value
      } else if (currentJSON.bVal) {
        findNode[objPropName] = currentJSON.bVal?.value === '1' ? true : false; // boolean value
      } else if (currentJSON.iVal) {
        findNode[objPropName] = Number(currentJSON.iVal?.value); // int value
      } else if (currentJSON.textValue) {
        switch (platform) {
          case 'ios':
            findNode[objPropName] = {
              longValue: `${currentJSON.textiOS?.value}`, // long text value
              shortValue: `${currentJSON.textiOSShort?.value}`, // short text value
            };
            break;
          case 'android':
            findNode[objPropName] = {
              longValue: `${currentJSON.textAndroid?.value}`, // long text value
              shortValue: `${currentJSON.textAndroidShort?.value}`, // short text value
            };
            break;
          case 'web':
            findNode[objPropName] = {
              longValue: `${currentJSON.textWeb?.value}`, // long text value
              shortValue: `${currentJSON.textWebShort?.value}`, // short text value
            };
            break;
          default:
            findNode[objPropName] = {
              longValue: `${currentJSON.textValue?.value}`, // long text value
              shortValue: `${currentJSON.textValueShort?.value}`, // short text value
            };
            break;
        }
      }
      console.log(
        'folder3',
        path,
        currentJSON?.name,
        objPath,
        JSON.stringify(findNode)
      );
    }
    /*
    // find the bottom of the object graph and create new nodes and assign values
    //console.log('path', path);
    const pathSplit = path.replace('/sitecore/content/HCA/App/', '').split('/');
    let findNode = obj;
    let objDepth = 0;
    for (objDepth = 0; objDepth < pathSplit.length; objDepth++) {
      if (objDepth == pathSplit.length - 1) {
        // console.log('objPropName', objPropName);
        // console.log('GQLResult.item', JSON.stringify(GQLResult.item));
        if (CurrentJSON.value) {
          findNode[objPropName] = CurrentJSON.value?.value; // value
        } else if (CurrentJSON.bVal) {
          findNode[objPropName] =
            CurrentJSON.bVal?.value === '1' ? true : false; // boolean value
        } else if (CurrentJSON.iVal) {
          findNode[objPropName] = Number(CurrentJSON.iVal?.value); // int value
        } else if (CurrentJSON.textValue) {
          switch (platform) {
            case 'ios':
              findNode[objPropName] = {
                longValue: `${CurrentJSON.textiOS?.value}`, // long text value
                shortValue: `${CurrentJSON.textiOSShort?.value}`, // short text value
              };
              break;
            case 'android':
              findNode[objPropName] = {
                longValue: `${CurrentJSON.textAndroid?.value}`, // long text value
                shortValue: `${CurrentJSON.textAndroidShort?.value}`, // short text value
              };
              break;
            case 'web':
              findNode[objPropName] = {
                longValue: `${CurrentJSON.textWeb?.value}`, // long text value
                shortValue: `${CurrentJSON.textWebShort?.value}`, // short text value
              };
              break;
            default:
              findNode[objPropName] = {
                longValue: `${CurrentJSON.textValue?.value}`, // long text value
                shortValue: `${CurrentJSON.textValueShort?.value}`, // short text value
              };
              break;
          }
        } else {
          findNode[objPropName] = {}; // folder/component/node place holder
        }
      }

      if (!findNode[pathSplit[objDepth]]) {
        findNode[pathSplit[objDepth]] = {}; // folder/component/node place holder
      }

      findNode = findNode[pathSplit[objDepth]];
    }*/
  } catch (e) {
    console.log(
      `Could not recurseAppItemsFromGraphQL path:${path} - failed with exception ${e}`
    );
    console.error(
      `Could not recurseAppItemsFromGraphQL path:${path} - failed with exception ${e}`
    );
  }

  return currentJSON;
}

export async function loadRecursedAppItemsFromGraphQL(
  graphQLClient: GraphQLRequestClient,
  path: string,
  lang: string,
  platform: string,
  obj: any
): Promise<any> {
  try {
    // build a query for App/Portal objects
    const GQLQuery: string = `
fragment appFields on Item {
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
  }
}

query {
   results:item(path: "${path}", language: "${lang}" ) {
    ...appFields,
    
    # find children for recursion
    children() {
    results {
        name,
        id,
        ...appFields,
          children() {
            results {
                name,
                id,
                ...appFields,
                children() {
                results {
                    name,
                    id,
                    ...appFields,
                    children() {
                    results {
                        name,
                        id,
                        ...appFields,
                        children() {
                        results {
                            name,
                            id,
                            ...appFields,
                            children() {
                            results {
                                name,
                                id,
                                ...appFields,
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
      }
    }
  }
}
    `;

    console.log('GQLQuery: ', GQLQuery);
    const GQLResult = await graphQLClient.request<any>(GQLQuery);
    obj = GQLResult;
    console.log('result:', JSON.stringify(GQLResult), '');
  } catch (e) {
    console.log(
      `Could not loadRecursedAppItemsFromGraphQL path:${path} - failed with exception ${e}`
    );
    console.error(
      `Could not loadRecursedAppItemsFromGraphQL path:${path} - failed with exception ${e}`
    );
  }

  return obj;
}

export async function getRecurseAppItemsFromGraphQL(
  path: string,
  lang: string,
  platform: string
): Promise<any> {
  const graphQLClient = new GraphQLRequestClient(config.graphQLEndpoint, {
    apiKey: config.sitecoreApiKey,
  });
  const obj: any = {};
  const resultRecursed = await loadRecursedAppItemsFromGraphQL(
    graphQLClient,
    path,
    lang.toLowerCase(),
    platform.toLowerCase(),
    obj
  );
  const findNode: any = {};
  const result = await recurseAppItems(
    graphQLClient,
    path,
    lang.toLowerCase(),
    platform.toLowerCase(),
    resultRecursed,
    findNode
  );
  //const result = obj;
  /*
  //console.log('path', path);
  const result = await recurseAppItemsFromGraphQL(
    graphQLClient,
    path,
    lang.toLowerCase(),
    platform.toLowerCase(),
    obj
  );*/

  //console.log('Final itemToFetch result:', JSON.stringify(result));
  return result;
}
