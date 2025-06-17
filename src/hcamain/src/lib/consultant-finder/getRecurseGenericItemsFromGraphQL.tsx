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

async function loadRecursedGenericItemsFromGraphQL(
  graphQLClient: GraphQLRequestClient,
  path: string,
  lang: string
): Promise<any> {
  let result: any = [];
  try {
    // build a query for generic Sitecore items
    const GQLQueryGeneric: string = `
    fragment scFields on Item {
      name,
      type:template { 
        name
      },
      hasChildren,
      path,
      url {
        path
      }, 
      fields {
        name,
        value: jsonValue,
      }  
    }
    
    query {
       results:item(path: "${path}", language: "${lang}" ) {
        ...scFields,
        
        # find children for recursion
        children(first: 400) {
        results {
            name,
            ...scFields,
              children(first: 400) {
                results {
                    name,
                    ...scFields,
                    children(first: 400) {
                    results {
                        name,
                        ...scFields,
                        children(first: 400) {
                        results {
                            name,
                            ...scFields,
                            children(first: 400) {
                            results {
                                name,
                                ...scFields,
                                children(first: 400) {
                                results {
                                    name,
                                    ...scFields,
                                    children(first: 400) {
                                    results {
                                        name,
                                        ...scFields,
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
    result = await graphQLClient.request<any>(GQLQueryGeneric);
    //console.log('result:', JSON.stringify(result), '');
  } catch (e) {
    /*console.log(
      `Could not loadRecursedGenericItemsFromGraphQL path:${path} - failed with exception ${e}`
    );*/
    console.error(
      `Could not loadRecursedGenericItemsFromGraphQL path:${path} - failed with exception ${e}`
    );
  }

  return result;
}

export async function recurseGenericItemsFlat(
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
      }
      // just a folder, have we got children to resolve?
      const children = currentJSON.children?.results;
      if (children) {
        for (let childCnt = 0; childCnt < children.length; childCnt++) {
          const item: sitecoreItemProp = children[childCnt];
          await recurseGenericItemsFlat(
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
      const children = currentJSON.results.children?.results;
      for (let childCnt = 0; childCnt < children.length; childCnt++) {
        const item: sitecoreItemProp = children[childCnt];
        await recurseGenericItemsFlat(
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

      const objPropName = objPath;
      // write out base props
      flatNodes[objPropName] = {
        name: `${currentJSON.name}`,
        path: `${currentJSON.path}`,
        url: `${currentJSON.url?.path}`,
      };

      // write out fields
      currentJSON.fields.forEach(
        (field: { name: string | number; value: any }) => {
          /*
          console.log(
            'member field.name:',
            field.name.toString(),
            'field.value:',
            field.value,
            'isArray',
            Array.isArray(field.value),
            'type',
            typeof field.value?.value
          );*/

          if (typeof field.value?.value === 'boolean') {
            flatNodes[objPropName][field.name] = field.value.value;
          } else if (typeof field.value?.value === 'string') {
            flatNodes[objPropName][field.name] = field.value.value;
          } else if (Array.isArray(field.value)) {
            flatNodes[objPropName][field.name] = field.value;
          } else if (field.value?.value) {
            flatNodes[objPropName][field.name] = field.value.value;
          } else if (field.value?.value === null) {
            flatNodes[objPropName][field.name] = null;
          }
        }
      );
      /*
      console.log(
        'folder',
        path,
        currentJSON,
        objPath,
        JSON.stringify(flatNodes)
      );*/
    }
  } catch (e) {
    console.log(
      `Could not recurseGenericItemsFromGraphQL path:${path} - failed with exception ${e}`
    );
    console.error(
      `Could not recurseGenericItemsFromGraphQL path:${path} - failed with exception ${e}`
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
  const truncPath = path.replace(sitecoreAppPath, '').replaceAll('/', '.');
  // map in desired keys (properties) to fetch
  const newFlatNodes: any = {};
  Object.keys(flatNodes).forEach((key) => {
    const newKey = key.replaceAll(truncPath, '').substring(1);
    newFlatNodes[newKey] = flatNodes[key];
  });
  return newFlatNodes;
}

// load up items from Sitecore via GraphQL
// flatten and simplify structure for use in the consuming app
// then unflatten simplified object and return it
export async function getRecurseGenericItemsFromGraphQL(
  path: string,
  lang: string,
  platform: string
): Promise<any> {
  const graphQLClient = new GraphQLRequestClient(config.graphQLEndpoint, {
    apiKey: config.sitecoreApiKey,
  });

  const resultRecursed = await loadRecursedGenericItemsFromGraphQL(
    graphQLClient,
    path,
    lang.toLowerCase()
  );
  //console.log('resultRecursed', JSON.stringify(resultRecursed));

  const flatNodes: any = {};
  await recurseGenericItemsFlat(
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
