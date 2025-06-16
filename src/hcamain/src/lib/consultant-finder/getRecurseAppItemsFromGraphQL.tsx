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
  type: { name: string };
}

const sitecoreAppPath = `${process.env.ADMIN_PROTECTION_KEY!}/`; // e.g. /sitecore/content/HCA/App/

async function loadRecursedAppItemsFromGraphQL(
  graphQLClient: GraphQLRequestClient,
  path: string,
  lang: string
): Promise<any> {
  let result: any = [];
  try {
    // build a query for App/Portal objects
    /*
  url {
    path
  },
  fields {
    name,
    value
  },*/
    const GQLQuery: string = `
fragment appFields on Item {
  name,
  hasChildren,
  path,
  url {
    path
  },
  displayName,
  ... on Array {
        type:template { 
          name
        }
    },
  ... on ArrayElement {
        type:template { 
          name
        }
    },    
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
  }
}

query {
   results:item(path: "${path}", language: "${lang}" ) {
    ...appFields,
    
    # find children for recursion
    children(first: 400) {
    results {
        name,
        ...appFields,
          children(first: 400) {
            results {
                name,
                ...appFields,
                children(first: 400) {
                results {
                    name,
                    ...appFields,
                    children(first: 400) {
                    results {
                        name,
                        ...appFields,
                        children(first: 400) {
                        results {
                            name,
                            ...appFields,
                            children(first: 400) {
                            results {
                                name,
                                ...appFields,
                                children(first: 400) {
                                results {
                                    name,
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
  }
}
    `;

    //console.log('GQLQuery: ', GQLQuery);
    result = await graphQLClient.request<any>(GQLQuery);
    //console.log('result:', JSON.stringify(result), '');
  } catch (e) {
    /*console.log(
      `Could not loadRecursedAppItemsFromGraphQL path:${path} - failed with exception ${e}`
    );*/
    console.error(
      `Could not loadRecursedAppItemsFromGraphQL path:${path} - failed with exception ${e}`
    );
  }

  return result;
}

export async function recurseAppItemsFlat(
  graphQLClient: GraphQLRequestClient,
  path: string,
  lang: string,
  platform: string,
  currentJSON: any,
  flatNodes: any
): Promise<any> {
  try {
    if (currentJSON && !currentJSON.results && currentJSON.hasChildren) {
      let isArray: boolean = false;
      // for array types, convert
      //  {"Component.AnArray.0.text":"hello 1","Component.AnArray.1.text":"test 2"}
      // to
      //  {'Component.AnArray[0].text': 'hello 1','Component.AnArray[1].text': 'test 2'}
      if (currentJSON.type && currentJSON.type.name === 'Array') {
        isArray = true;
        /*console.log(
          'currentJSON',
          JSON.stringify(currentJSON),
          'isArray',
          isArray
        );*/
      }
      // just a folder, have we got children to resolve?
      const children = currentJSON.children?.results;
      //console.log('children', children, 'isArray', isArray);
      if (children) {
        //console.log('children', JSON.stringify(children));
        for (let childCnt = 0; childCnt < children.length; childCnt++) {
          const item: sitecoreItemProp = children[childCnt];
          //isArray = item?.type?.name == 'Array';
          //console.log('item', item);
          await recurseAppItemsFlat(
            graphQLClient,
            isArray ? `${path}[${item.name}]` : `${path}/${item.name}`,
            lang,
            platform,
            children[childCnt],
            flatNodes
          );
        }
      } else if (currentJSON) {
        console.error(
          'unprocessed currentJSON (recursion too deep)',
          currentJSON
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
        await recurseAppItemsFlat(
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
        .replace(sitecoreAppPath, '')
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
      } else {
        // catch all not app specific
        flatNodes[objPropName] = {
          name: `${currentJSON.name}`,
          path: `${currentJSON.path}`,
          url: `${currentJSON.url?.path}`,
        };
        //console.log('not app specific');
        //console.log('objPath', objPath);
        //console.log('currentJSON', currentJSON);
      }

      /*
      console.log(
        'folder',
        path,
        currentJSON?.name,
        objPath,
        JSON.stringify(flatNodes)
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

// https://stackoverflow.com/questions/19098797/fastest-way-to-flatten-un-flatten-nested-javascript-objects
async function expandFlatNodes(flatNodes: { [x: string]: any }) {
  if (Object(flatNodes) !== flatNodes || Array.isArray(flatNodes))
    return flatNodes;
  const regex = /\.?([^.\[\]]+)|\[(\d+)\]/g,
    resultholder: any = {};
  for (const p in flatNodes) {
    // eslint-disable-next-line no-var
    let cur: any = resultholder,
      prop = '',
      m;
    while ((m = regex.exec(p))) {
      cur = cur[prop] || (cur[prop] = m[2] ? [] : {});
      prop = m[2] || m[1];
    }
    cur[prop] = flatNodes[p];
  }
  return resultholder[''] || resultholder;
}

async function shortenToRequestedPath(flatNodes: any, path: string) {
  //console.log(JSON.stringify(flatNodes));
  //console.log('path', path);
  const truncPath = path.replace(sitecoreAppPath, '').replaceAll('/', '.');
  //console.log('truncPath', truncPath);
  // map in desired keys (properties) to fetch
  const newFlatNodes: any = {};
  Object.keys(flatNodes).forEach((key) => {
    const newKey = key.replaceAll(truncPath, '').substring(1);
    newFlatNodes[newKey] = flatNodes[key];
    //console.log('key to', newKey);
  });
  return newFlatNodes;
}

// load up items from Sitecore via GraphQL
// flatten and simplify structure for use in the consuming app
// then unflatten simplified object and return it
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
  //console.log('resultRecursed', JSON.stringify(resultRecursed));

  const flatNodes: any = {};
  await recurseAppItemsFlat(
    graphQLClient,
    path,
    lang.toLowerCase(),
    platform.toLowerCase(),
    resultRecursed,
    flatNodes
  );
  //console.log('flatNodes', JSON.stringify(flatNodes));
  const newFlatNodes: any = await shortenToRequestedPath(flatNodes, path);
  //console.log('result2', JSON.stringify(newFlatNodes));
  const result = await expandFlatNodes(newFlatNodes);
  //console.log('result3', JSON.stringify(result));
  return result;
}

/*  Example flat data
  const flatNodes: any = {
    'MattsApp.0_1.Settings.NewSchema': false,
    'MattsApp.0_1.UI.AppWide.AppSimple': 'test',
    'MattsApp.0_1.UI.Home.Nav.TabHome.Link': '',
    'MattsApp.0_1.UI.Home.Nav.TabHome.Text': 'Home',
    'MattsApp.0_1a.Settings.NewSchema': true,
    'MattsApp.0_1a.UI.AppWide.AppSimple': 'test',
    'MattsApp.0_1a.UI.Home.Nav.TabHome.Link': '',
    'MattsApp.0_1a.UI.Home.Nav.TabHome.Text': 'Home',
    'MattsApp.0_1b.Settings.NewSchema': true,
    'MattsApp.0_1b.UI.AppWide.AppSimple': 'test',
    'MattsApp.0_1b.UI.Home.Nav.TabHome.Link': '',
    'MattsApp.0_1b.UI.Home.Nav.TabHome.Text': 'Home',
    'MattsApp.11.Settings.NewSchema': true,
    'MattsApp.11.UI.AppWide.AppSimple': 'test',
    'MattsApp.11.UI.Home.Nav.TabHome.Link': '',
    'MattsApp.11.UI.Home.Nav.TabHome.Text': 'Home',
    'MattsApp.12.Settings.NewSchema': true,
    'MattsApp.12.UI.AppWide.AppSimple': 'test',
    'MattsApp.12.UI.Home.Nav.TabHome.Link': '',
    'MattsApp.12.UI.Home.Nav.TabHome.Text': 'Home',
    'MattsApp.13.Settings.NewSchema': true,
    'MattsApp.13.UI.AppWide.AppSimple': 'test',
    'MattsApp.13.UI.Home.Nav.TabHome.Link': '',
    'MattsApp.13.UI.Home.Nav.TabHome.Text': 'Home',
    'MattsApp.14.Settings.NewSchema': true,
    'MattsApp.14.UI.AppWide.AppSimple': 'test',
    'MattsApp.14.UI.Home.Nav.TabHome.Link': '',
    'MattsApp.14.UI.Home.Nav.TabHome.Text': 'Home',
    'MattsApp.15.Settings.NewSchema': true,
    'MattsApp.15.UI.AppWide.AppSimple': 'test',
    'MattsApp.15.UI.Home.Nav.TabHome.Link': '',
    'MattsApp.15.UI.Home.Nav.TabHome.Text': 'Home',
    'MattsApp.Copy_of_0_1.Settings.NewSchema': true,
    'MattsApp.Copy_of_0_1.UI.AppWide.AppSimple': 'test',
    'MattsApp.Copy_of_0_1.UI.Home.Nav.TabHome.Link': '',
    'MattsApp.Copy_of_0_1.UI.Home.Nav.TabHome.Text': 'Home',
    'MattsApp.Globals.OnlineSettings.Heading': {
      longValue: '',
      shortValue: '',
    },
    'MattsApp.Globals.OnlineSettings.HELLO_WORLD': '',
    'MattsApp.Globals.OnlineSettings.Message': 'We are back soon',
    'MattsApp.Globals.OnlineSettings.Online': true,
  };

  console.log('flatnodes', JSON.stringify(flatNodes));

  */
