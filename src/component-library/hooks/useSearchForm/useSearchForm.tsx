import { useSearchParams, usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { FormEvent, useRef } from 'react';
import useSWR from 'swr';
import { useDebouncedCallback } from 'use-debounce';

interface useSearchFormArgs<ResponseT, AutocompleteResponseT> {
  baseUrl: string;
  baselineParams?: [string, string][];
  fallbackData?: ResponseT;
  searchPath?: string;
  autocompletePath?: string;
  baselineAutocompleteParams?: [string, string][];
  autoCompleteSearchParamName?: string;
  redirectUrl?: string;
  searchFieldName?: string;
  isInputValid?: (
    input?: string,
    autocompleteResults?: AutocompleteResponseT
  ) => boolean;
}
const useSearchForm = <ResponseT, AutocompleteResponseT>(
  args: useSearchFormArgs<ResponseT, AutocompleteResponseT>
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
    isInputValid = () => true,
  } = args;
  const ref = useRef<HTMLFormElement>(null);
  const searchParams = useSearchParams(); // dynamic reference to page URL query params
  const router = useRouter();
  const pathname = usePathname();
  const combinedParams = [...baselineParams, ...(searchParams.entries() || [])]; // Collect defaults and dynamic params from query

  const options = {
    keepPreviousData: true, // Never show nothing
    revalidateOnFocus: false, // Prevent re-render components when user re-opens browser tab/window - important for google maps embeds
  };

  const input = searchParams.get(searchFieldName) || '';
  const autoCompleteCombinedParams: [string, string][] = [
    ...baselineAutocompleteParams,
    [autoCompleteSearchParamName, input],
  ];
  const autoCompleteParamsMap = new Map(autoCompleteCombinedParams); // Express as Map to make keys unique
  const autoCompleteParams = [...autoCompleteParamsMap.entries()].map(
    (entry) => `${entry[0]}=${encodeURIComponent(entry[1])}`
  );
  const autoCompleteQuery = `?${autoCompleteParams.join('&')}`;

  const autocompleteUrl = `${baseUrl}${autocompletePath}${autoCompleteQuery}`;

  const {
    data: autocompleteData,
    error: autocompleteError,
    isLoading: autocompleteIsLoading,
  } = useSWR<AutocompleteResponseT>(
    autocompleteUrl,
    (url: string) => fetch(url).then((res) => res.json()),
    options
  );

  const paramsMap = new Map(combinedParams); // Express as Map to make keys unique

  // Process input after autocomplete
  const inputItem = paramsMap.get(searchFieldName);

  // accommodate if input is included in suggestions
  if (!isInputValid(inputItem, autocompleteData)) {
    paramsMap.delete(searchFieldName);
  }

  const params = [...paramsMap.entries()].map(
    (entry) => `${entry[0]}=${encodeURIComponent(entry[1])}` // encode to accommodate query breaking symbols e.g. &, = in values
  ); // Compute as query strings
  const query = `?${params.join('&')}`;
  const url = `${baseUrl}${searchPath}${query}`; // compose API url

  const { data, error, isLoading } = useSWR<ResponseT>(
    url,
    (url: string) => fetch(url).then((res) => res.json()),
    {
      ...options,
      fallbackData,
      keepPreviousData: true,
    }
  );

  // Update existing query params, to be read by useSwr hook
  const sendFormDataToPageQuery = () => {
    if (!ref.current) return;
    const data = new FormData(ref.current);
    const params = new URLSearchParams([...data.entries()] as string[][]);
    const url = `${pathname}?${params}`;
    router.replace(url, undefined, { shallow: true });
  };
  const handleChange = useDebouncedCallback(sendFormDataToPageQuery, 500);

  // Handlers to spread into a form element e.g. <form {...formhandlers} />
  const formHandlers = {
    onChange: () => {
      if (isLoading) return;
      handleChange();
    },
    onReset: (event: FormEvent<HTMLFormElement>) => {
      console.log(event);
    },
    onSubmit: (event: FormEvent<HTMLFormElement>) => {
      if (!redirectUrl) {
        event.preventDefault(); // prevent page refresh if user submits via "enter" key
        handleChange();
      }
    },
    action: `${redirectUrl}${query}`,
    ref: ref,
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
