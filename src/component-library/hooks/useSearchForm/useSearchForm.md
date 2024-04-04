# useSearchForm

## Description

This hook is used to fetch data from APIs and render it in a NextJS template.

It also syncs the current form state with the **page** URL, so that searches can be shared, or linked to from other site components. E.g. a search bar can link to a pre-populated search results page.

## Usage

The hook returns a dynamic reference to the API response data and a set of form handler functions, which are intended to be spread onto an HTML form element.

Any input fields within the form element will become handlers for the form, and their names and values will be appended to the URL when fetching data from the API specified.

### Code example

```tsx
const MyComponent = () => {
  const { data, error, formHandlers, searchParams } =
    useSearchForm<ServiceLinesResponse>({
      baseUrl: 'https://my-base-url.com',
   });
  if (!error) return <></>
  return 
    (
      <form {...formHandlers}>
        <input
          type={'hidden'}
          name={defaultParamFromSitecore}
          value={defaultValueFromSitecore}
        />
        <input name={'searchString'} value={'test search'}>
        {data.serviceLines.map(item => <p>{item.title}</p>)}
      </form>
    )
}
// Example API search url:
// https://my-base-url.com/?defaultParam=defaultValue&searchString=test+search
```

## Under the hood

We use the native browser fetch API, but handled via SWR. 

Read the documentation: https://swr.vercel.app/docs/getting-started

Also read up on uncontrolled react components: https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components

### Flow of logic 

#### User makes a change

- User changes a form element
- HTML form event handler is called
- Form data is unpacked from form, parsed and replaced in **page** URL via NextJS `useRouter`
- The dynamic reference to the **page** URL search params via NextJS `useSearchParams` updates
- We parse a dynamic reference to the URL search params into an **API** URL and pass it to the `useSwr` hook
- `useSwr` detects a change in argument key in the **API** URL and fetches from the API
- The dynamic reference to the response `data` returned from `useSwr` updates
- We return the updated data from the hook as a dynamic reference
- The data is unpacked and the results rendered to the user

#### Page loads with query params populated

- User loads the page with pre-populated URL query params matching the form
- The URL search params are returned from NextJS `useSearchParams` hook
- We reference the URL search params in the defaultChecked and defaultValue props of the form fields
- The form fields initially update to match the query param state

### Dynamic references

This is similar to the state you would return from the React `useState` hook, in that you can directly consume it as a variable. So in the case of the url params returned from `useSearchParams` and the data returned from `useSwr`, we don't need to apply async logic to receive updates.