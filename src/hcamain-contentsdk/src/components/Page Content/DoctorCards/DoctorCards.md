# DoctorCards documentation

DoctorCards are a unique API integration with two Doctify API endpoints: consultant find and search.

If the props are populated with a list of consultant slugs, then we use the find API, otherwise we use the search API.

## Find APP

- Request: consultant slug params and config params
- Response: Un-serialized array of consultant data.

## Search APP

- Request: filter params and config params
- Response: Nested array of consultant data serialized as as string

## CTA

- The main component CTA is composed from a base URL in the component props, and the same set of query params as the request URL

## Additional BE information

1. Heading tag and size parameters [documentation](../../../../../documentation/backend/Heading%20Tag%20and%20Size.md).
