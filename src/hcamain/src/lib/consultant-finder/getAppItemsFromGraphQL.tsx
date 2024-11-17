/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLRequestClient } from '@sitecore-jss/sitecore-jss-nextjs/graphql';
import config from 'temp/config';

// dynamic GraphQL query, works on flat object at the mo...
// references
//https://www.getfishtank.com/blog/useful-sitecore-graphql-queries
//https://www.linkedin.com/pulse/useful-example-graphql-query-sitecore-context-arvind-gehlot
//https://doc.sitecore.com/xmc/en/developers/xm-cloud/query-examples.html

interface sitecoreItemProp {
  id: string;
  name: string;
}

export async function recurseAppItemsFromGraphQL(
  graphQLClient: GraphQLRequestClient,
  path: string,
  obj: any
): Promise<any> {
  try {
    // build a dynamic query
    const GQLQuery: string = `
          query {
        item( path: "${path}", language: "en" ) {
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
          ... on AppImage {
              value {
                value
              }
            },
          ... on AppInteger {
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
              androidValue {
                value
              }
              value {
                value
              }
              valueShort {
                value
              }
              androidValueShort {
                value
              }
              iOSValue {
                value
              }
              iOSValueShort {
                value
              }
              webValue {
                value
              }
              webValueShort {
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
    console.log('path', path);
    const pathSplit = path.replace('/sitecore/content/HCA/App/', '').split('/');
    let findNode = obj;
    let objDepth = 0;
    for (objDepth = 0; objDepth < pathSplit.length; objDepth++) {
      if (objDepth == pathSplit.length - 1) {
        // console.log('GQLResult.item?.name', GQLResult.item?.name);
        // console.log('GQLResult.item', JSON.stringify(GQLResult.item));
        if (!findNode[GQLResult.item?.name]) {
          if (!GQLResult.item?.value) {
            findNode[GQLResult.item?.name] = {}; // folder/component/node place holder
          } else {
            findNode[GQLResult.item?.name] = GQLResult.item?.value; // value
          }
        }
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

export async function getAppItemsFromGraphQL(path: string): Promise<any> {
  const graphQLClient = new GraphQLRequestClient(config.graphQLEndpoint, {
    apiKey: config.sitecoreApiKey,
  });
  const obj: any = {};
  const result = await recurseAppItemsFromGraphQL(graphQLClient, path, obj);

  console.log('Final itemToFetch result:', JSON.stringify(result));
  return result;
}
