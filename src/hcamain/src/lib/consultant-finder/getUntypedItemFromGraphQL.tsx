/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLRequestClient } from '@sitecore-jss/sitecore-jss-nextjs/graphql';
import config from 'temp/config';

// dynamic GraphQL query, works on flat object at the mo...
// references
//https://www.getfishtank.com/blog/useful-sitecore-graphql-queries
//https://www.linkedin.com/pulse/useful-example-graphql-query-sitecore-context-arvind-gehlot
//https://doc.sitecore.com/xmc/en/developers/xm-cloud/query-examples.html

export async function getUntypedItemsFromGraphQL(path: string): Promise<any> {
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
        children() {
         results {
            name,
            #fields() {
            #  name,
            #  id,
            #},
            field(name: "Value") {
              ... on TextField {
                value
              },
              ... on LinkField {
                value
              },
              ... on ImageField {
                value
              },
              ... on CheckboxField {
                value
              },
              ... on IntegerField {
                value
              },
              ... on RichTextField {
                value
              },
              #... on MattsField {
              #  value
              #},
            }
          }
        }
        #fields() {
        #  name,
        #  id,
        #}
      }
    }

    `;

    /*
    
    
    name,
            id,
            
            hasChildren,
                        language
                {
                name
                },
            children() {
             results {
                name
              }
            }*/



    /*
            children(excludeTemplateIDs: "{00000000-0000-0000-0000-000000000000}") {
             # nodes {
             #   name,
             #   template {
             #     templateId,
             #     name
             #   }
             #   fields(ownFields: true, excludeStandardFields: true) {
                  #nodes {
                  #  name,
                  #  value
                  #}
             #   }
             # }
            }
    
    */

    console.log('GQLQuery: ', GQLQuery);
    const GQLResult = await graphQLClient.request<any>(GQLQuery);
    console.log('GraphQL itemToFetch result:', JSON.stringify(GQLResult));
    //map the result back to the requesting object
    /*
    if (GQLResult) {
      Object.keys(itemToFetch).forEach(
        (key) => (itemToFetch[key] = GQLResult.item[key].value)
      );
    }
    console.log('GraphQL itemToFetch result:', JSON.stringify(GQLResult));*/
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
