# ServiceLinesSearch documentation

## API integration

The Service lines search API is integrated using the useSearchForm hook. The hook handles all of the data fetching and async logic and returns a dynamic reference to the result data.

The SearchBar, Filters, Sorting and Pagination fields are native uncontrolled HTML form elements. The names and values for the form field correspond to the expected query params of the API and are populated from Sitecore CMS data.

As of time of writing, the component uses a mock API which does not respond to the changing query parameters.

## Additional information

1. Themes parameters [documentation](../../../../../documentation/backend/Themes.md).
2. Heading tag and size parameters [documentation](../../../../../documentation/backend/Heading%20Tag%20and%20Size.md).
