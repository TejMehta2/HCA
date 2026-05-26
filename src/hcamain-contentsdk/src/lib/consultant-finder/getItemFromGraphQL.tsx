/* eslint-disable @typescript-eslint/no-explicit-any */
import scConfig from 'sitecore.config';
import client from 'src/lib/sitecore-client';

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

    // build a dynamic query
    let GQLQuery: string = `
    query GetItem($itemId: String!, $language: String!)
    {
      item(path: $itemId, language: $language) {
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
    const GQLResult = await client.getData<any>(GQLQuery, {
      itemId,
      language: scConfig.defaultLanguage || 'en',
    });
    //console.log('GraphQL itemToFetch result:', JSON.stringify(itemToFetch));
    //map the result back to the requesting object
    if (GQLResult?.item) {
      Object.keys(itemToFetch).forEach((key) => {
        const value = GQLResult.item?.[key]?.value;

        if (value !== undefined) {
          itemToFetch[key] = value;
        }
      });
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
