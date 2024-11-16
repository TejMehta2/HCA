/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLRequestClient } from '@sitecore-jss/sitecore-jss-nextjs/graphql';
import config from 'temp/config';

// dynamic GraphQL query, works on flat object at the mo...
// references
//https://www.getfishtank.com/blog/useful-sitecore-graphql-queries
//https://www.linkedin.com/pulse/useful-example-graphql-query-sitecore-context-arvind-gehlot
//https://doc.sitecore.com/xmc/en/developers/xm-cloud/query-examples.html

export async function recurseAppItemsFromGraphQL(path: string): Promise<any> {
  try {
    /*console.log(
        `GraphQL graphQLClient req itemId:${itemId} templateName:${templateName}`
      );*/

    const graphQLClient = new GraphQLRequestClient(config.graphQLEndpoint, {
      apiKey: config.sitecoreApiKey,
    });

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
              value {
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
    console.log('GraphQL itemToFetch result:', JSON.stringify(GQLResult));

    if (GQLResult && GQLResult.item && GQLResult.item.hasChildren) {
      const children = GQLResult.item.children?.results;
      console.log('children', JSON.stringify(children));
      interface sitecoreItemProp {
        id: string;
        name: string;
      }
      children.forEach((item: sitecoreItemProp) =>
        recurseAppItemsFromGraphQL(`${path}/${item.name}`)
      );
    }
  } catch (e) {
    console.log(
      `Could not getUntypedItemsFromGraphQL path:${path} - failed with exception ${e}`
    );
    console.error(
      `Could not getUntypedItemsFromGraphQL path:${path} - failed with exception ${e}`
    );
  }

  return null;
}

export async function getAppItemsFromGraphQL(path: string): Promise<any> {
  const result = await recurseAppItemsFromGraphQL(path);

  console.log('GraphQL itemToFetch result:', JSON.stringify(result));
  return result;
}
