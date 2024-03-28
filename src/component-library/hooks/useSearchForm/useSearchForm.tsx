import { useSearchParams, usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { FormEvent } from 'react';
import useSWR from 'swr';

interface useSearchFormArgs<T> {
  baseUrl: string;
  baselineParams?: [string, string][];
  fallbackData?: T;
  searchPath?: string;
  autocompletePath?: string;
  baselineAutocompleteParams?: [string, string][];
  autoCompleteSearchParamName?: string;
  redirectUrl?: string;
  searchFieldName?: string;
}
const useSearchForm = <ResponseT, AutocompleteResponseT>(
  args: useSearchFormArgs<ResponseT>
) => {
  const {
    baseUrl,
    baselineParams = [],
    fallbackData,
    redirectUrl,
    searchPath = '/search',
    autocompletePath = '/autocomplete',
    baselineAutocompleteParams = [],
    autoCompleteSearchParamName = 'input',
    searchFieldName = 'input',
  } = args;
  const searchParams = useSearchParams(); // dynamic reference to page URL query params
  const router = useRouter();
  const pathname = usePathname();
  const combinedParams = [...baselineParams, ...(searchParams.entries() || [])]; // Collect defaults and dynamic params from query
  const paramsMap = new Map(combinedParams); // Express as Map to make keys unique
  const params = [...paramsMap.entries()].map(
    (entry) => `${entry[0]}=${entry[1]}`
  ); // Compute as query strings
  const query = `?${params.join('&')}`;
  const url = new URL(query, `${baseUrl}${searchPath}`); // compose API url

  const options = {
    keepPreviousData: true, // Never show nothing
    revalidateOnFocus: false, // Prevent re-render components when user re-opens browser tab/window - important for google maps embeds
  };

  const { data, error, isLoading } = useSWR<ResponseT>(
    url.href,
    (url: string) => fetch(url).then((res) => res.json()),
    {
      ...options,
      fallbackData,
      keepPreviousData: true,
    }
  );

  const input = searchParams.get(searchFieldName) || '';
  const autoCompleteCombinedParams: [string, string][] = [
    ...baselineAutocompleteParams,
    [autoCompleteSearchParamName, input],
  ];
  const autoCompleteParamsMap = new Map(autoCompleteCombinedParams); // Express as Map to make keys unique
  const autoCompleteParams = [...autoCompleteParamsMap.entries()].map(
    (entry) => `${entry[0]}=${entry[1]}`
  );
  const autoCompleteQuery = `?${autoCompleteParams.join('&')}`;
  const autocompleteUrl = new URL(
    autoCompleteQuery,
    `${baseUrl}${autocompletePath}`
  );

  const {
    data: autocompleteData,
    error: autocompleteError,
    isLoading: autocompleteIsLoading,
  } = useSWR<AutocompleteResponseT>(
    autocompleteUrl.href,
    (url: string) => fetch(url).then((res) => res.json()),
    options
  );

  // Update existing query params, to be read by useSwr hook
  const handleChangeEvent = (event: FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    const params = new URLSearchParams([...data.entries()] as string[][]);
    const url = `${pathname}?${params}`;
    router.replace(url, undefined, { shallow: true });
  };

  // Handlers to spread into a form element e.g. <form {...formhandlers} />
  const formHandlers = {
    onChange: (event: FormEvent<HTMLFormElement>) => {
      if (isLoading) return;
      handleChangeEvent(event);
    },
    onReset: (event: FormEvent<HTMLFormElement>) => {
      console.log(event);
    },
    onSubmit: (event: FormEvent<HTMLFormElement>) => {
      if (!redirectUrl) {
        event.preventDefault(); // prevent page refresh if user submits via "enter" key
        handleChangeEvent(event);
      }
    },
    action: `${redirectUrl}${query}`,
  };

  return {
    data,
    error,
    formHandlers,
    searchParams,
    autocompleteData,
    autocompleteError,
    autocompleteIsLoading,
    query,
  };
};

export default useSearchForm;
