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
  flatNodes: any
): Promise<any> {
  try {
    if (currentJSON && !currentJSON.results && currentJSON.hasChildren) {
      // just a folder, have we got children to resolve?
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
          flatNodes
        );
      }
    } else if (
      currentJSON &&
      currentJSON.results &&
      currentJSON.results.hasChildren
    ) {
      // got children to resolve
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
          flatNodes
        );
      }
    } else {
      // got a value to resolve
      const objPath = path
        .replace('/sitecore/content/HCA/App/', '')
        .replaceAll('/', '.')
        .replaceAll(' ', '_');

      const objPropName = objPath; // + '.' + currentJSON.name;
      if (currentJSON.value) {
        flatNodes[objPropName] = currentJSON.value?.value; // value
      } else if (currentJSON.bVal) {
        flatNodes[objPropName] = currentJSON.bVal?.value === '1' ? true : false; // boolean value
      } else if (currentJSON.iVal) {
        flatNodes[objPropName] = Number(currentJSON.iVal?.value); // int value
      } else if (currentJSON.textValue) {
        switch (platform) {
          case 'ios':
            flatNodes[objPropName] = {
              longValue: `${currentJSON.textiOS?.value}`, // long text value
              shortValue: `${currentJSON.textiOSShort?.value}`, // short text value
            };
            break;
          case 'android':
            flatNodes[objPropName] = {
              longValue: `${currentJSON.textAndroid?.value}`, // long text value
              shortValue: `${currentJSON.textAndroidShort?.value}`, // short text value
            };
            break;
          case 'web':
            flatNodes[objPropName] = {
              longValue: `${currentJSON.textWeb?.value}`, // long text value
              shortValue: `${currentJSON.textWebShort?.value}`, // short text value
            };
            break;
          default:
            flatNodes[objPropName] = {
              longValue: `${currentJSON.textValue?.value}`, // long text value
              shortValue: `${currentJSON.textValueShort?.value}`, // short text value
            };
            break;
        }
      }

      /*
      console.log(
        'folder',
        path,
        currentJSON?.name,
        objPath,
        JSON.stringify(findNode)
      );*/
    }
  } catch (e) {
    console.log(
      `Could not recurseAppItemsFromGraphQL path:${path} - failed with exception ${e}`
    );
    console.error(
      `Could not recurseAppItemsFromGraphQL path:${path} - failed with exception ${e}`
    );
  }

  return flatNodes;
}

async function expandFlatNodes(flatNodes: any, expandedObj: any) {
  //const expandedObj: any = [];
  for (const path in flatNodes) {
    //console.log(`${path}: ${flatNodes[path]}`);
    const pathSplit = path.split('.');
    let objDepth = 0;
    let currentDepthObj = expandedObj;
    for (objDepth = 0; objDepth < pathSplit.length; objDepth++) {
      if (objDepth == pathSplit.length - 1) {
        // the value of the node
        currentDepthObj[pathSplit[objDepth]] = flatNodes[path];
      } else if (!currentDepthObj[objDepth]) {
        console.log('x');
        currentDepthObj[pathSplit[objDepth]] = {}; // folder/component/node place holder
        currentDepthObj = currentDepthObj[pathSplit[objDepth]];
      }
      console.log(
        'objDepth',
        objDepth,
        'currentDepthObj',
        JSON.stringify(currentDepthObj),
        'expandedObj',
        JSON.stringify(expandedObj)
      );
    }
  }

  return expandedObj;
}

export async function loadRecursedAppItemsFromGraphQL(
  graphQLClient: GraphQLRequestClient,
  path: string,
  lang: string
): Promise<any> {
  let result: any = [];
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

    //console.log('GQLQuery: ', GQLQuery);
    result = await graphQLClient.request<any>(GQLQuery);
    //console.log('result:', JSON.stringify(GQLResult), '');
  } catch (e) {
    console.log(
      `Could not loadRecursedAppItemsFromGraphQL path:${path} - failed with exception ${e}`
    );
    console.error(
      `Could not loadRecursedAppItemsFromGraphQL path:${path} - failed with exception ${e}`
    );
  }

  return result;
}

export async function getRecurseAppItemsFromGraphQL(
  path: string,
  lang: string,
  platform: string
): Promise<any> {
  const graphQLClient = new GraphQLRequestClient(config.graphQLEndpoint, {
    apiKey: config.sitecoreApiKey,
  });

  const resultRecursed = await loadRecursedAppItemsFromGraphQL(
    graphQLClient,
    path,
    lang.toLowerCase()
  );

  const flatNodes: any = {};
  await recurseAppItems(
    graphQLClient,
    path,
    lang.toLowerCase(),
    platform.toLowerCase(),
    resultRecursed,
    flatNodes
  );

  let expandedObj: any = [];
  const result = expandFlatNodes(flatNodes, expandedObj);

  return result; //flatNodes;
}
