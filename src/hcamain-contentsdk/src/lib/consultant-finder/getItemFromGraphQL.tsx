/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLRequestClient } from '@sitecore-content-sdk/nextjs/client';

const sitecoreApiHost = process.env.NEXT_PUBLIC_SITECORE_API_HOST || '';
const sitecoreApiKey = process.env.NEXT_PUBLIC_SITECORE_API_KEY || '';
const graphQLEndpoint =
  process.env.GRAPH_QL_ENDPOINT ||
  (sitecoreApiHost ? `${sitecoreApiHost}/sitecore/api/graph/edge` : '');

// dynamic GraphQL query, works on flat object at the mo...
// references
//https://www.getfishtank.com/blog/useful-sitecore-graphql-queries
//https://www.linkedin.com/pulse/useful-example-graphql-query-sitecore-context-arvind-gehlot
//https://doc.sitecore.com/xmc/en/developers/xm-cloud/query-examples.html

export async function getItemFromGraphQL(
  itemId: string,
  templateName: string,
  itemToFetch: any
): Promise<any> {
  try {
    /*console.log(
      `GraphQL graphQLClient req itemId:${itemId} templateName:${templateName}`
    );*/

    const graphQLClient = new GraphQLRequestClient(graphQLEndpoint, {
      apiKey: sitecoreApiKey,
    });

    // build a dynamic query
    let GQLQuery: string = `
    query
    {
      item(path: "${itemId}", language: "en") {
        ... on ${templateName} { 
    `;
    // map in desired keys (properties) to fetch
    Object.keys(itemToFetch).forEach(
      (key) =>
        (GQLQuery += `
          ${key} { 
            value 
          }`)
    );
    // end query
    GQLQuery += `
        } 
      }
    }
    `;

    //console.log('GQLQuery: ', GQLQuery);
    const GQLResult = await graphQLClient.request<any>(GQLQuery);
    //console.log('GraphQL itemToFetch result:', JSON.stringify(itemToFetch));
    //map the result back to the requesting object
    if (GQLResult) {
      Object.keys(itemToFetch).forEach(
        (key) => (itemToFetch[key] = GQLResult.item[key].value)
      );
    }
    //console.log('GraphQL itemToFetch result:', JSON.stringify(GQLResult));
  } catch (e) {
    console.log(
      `Could not getItemFromGraphQL itemId:${itemId} templateName:${templateName} - failed with exception ${e}`
    );
    console.error(
      `Could not getItemFromGraphQL itemId:${itemId} templateName:${templateName} - failed with exception ${e}`
    );
  }

  return itemToFetch;
}
