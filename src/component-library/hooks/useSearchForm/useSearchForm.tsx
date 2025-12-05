import { useSearchParams, usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useRef } from 'react';
import useSWR from 'swr';
import { useDebouncedCallback } from 'use-debounce';

interface useSearchFormArgs<ResponseT> {
  baseUrl: string;
  baselineParams?: [string, string][];
  fallbackData?: ResponseT;
  searchPath?: string;
  autocompletePath?: string;
  baselineAutocompleteParams?: [string, string][];
  autoCompleteSearchParamName?: string;
  redirectUrl?: string;
  inputFieldName?: string;
  searchOnChange?: boolean;
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
    inputFieldName = 'input',
    searchOnChange = true,
  } = args;
  const ref = useRef<HTMLFormElement>(null);
  const searchParams = useSearchParams(); // dynamic reference to page URL query params
  const router = useRouter();
  const pathname = usePathname();

  const combinedParams = [...baselineParams, ...(searchParams.entries() || [])]; // Collect defaults and dynamic params from query

  // Apply near param from geolocation middleware cookie
  if (
    typeof window !== 'undefined' &&
    !combinedParams.some(([key]) => key === 'near')
  ) {
    const regex = new RegExp(/near=([\w\s]+)(?=;|$)/gm);
    const near = regex.exec(document?.cookie)?.[1];
    if (near?.length) {
      combinedParams.push(['near', near]);
    }
  }

  const options = {
    keepPreviousData: true, // Never show nothing
    revalidateOnFocus: false, // Prevent re-render components when user re-opens browser tab/window - important for google maps embeds
  };

  const input = searchParams.get(inputFieldName) || '';
  const autoComplete = searchParams.get('autocomplete') || '';
  const autoCompleteCombinedParams: [string, string][] = [
    ...baselineAutocompleteParams,
    [autoCompleteSearchParamName, autoComplete || input],
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

  const searchParamsObj = new URLSearchParams();

  combinedParams.forEach(([key, value]) => {
    if (key !== 'autocomplete' && value !== undefined) {
      searchParamsObj.append(key, value);
    }
  });

  const query = `?${searchParamsObj.toString()}`;
  const url = `${baseUrl}${searchPath}${query}`;

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
  const sendFormDataToPageQuery = (
    paramsCallback?: (params: URLSearchParams) => URLSearchParams
  ) => {
    if (!ref.current) return;
    const data = new FormData(ref.current);
    const params = new URLSearchParams([...data.entries()] as string[][]);
    const updatedParams = paramsCallback?.(params) || params;
    const url = `${pathname}?${updatedParams}`;
    router.replace(url, undefined, { shallow: true });
  };
  const handleChange = useDebouncedCallback(sendFormDataToPageQuery, 500);

  // Params helpers
  const resetPagination = (name: string, params: URLSearchParams) => {
    // Reset pagination params from URL, whenever something else changes i.e. input, filters, sorting
    if (!['offset', 'limit'].includes(name)) {
      const defaultOffset = new Map(baselineParams).get('offset') as string;
      params.set('offset', defaultOffset);
      const defaultLimit = new Map(baselineParams).get('limit') as string;
      params.set('limit', defaultLimit);
    }
    return params;
  };
  const setInputAsAutocomplete = (name: string, params: URLSearchParams) => {
    // Trigger a suggestions API call instead of a search API call, by changing param name
    if (!searchOnChange && name === inputFieldName) {
      params.set('autocomplete', params.get(inputFieldName) || '');
      params.delete('input');
    }
    return params;
  };

  // Handlers to spread into a form element e.g. <form {...formhandlers} />
  const formHandlers = {
    onChange: (event: ChangeEvent<HTMLFormElement>) => {
      if (isLoading) return;
      const target = event.target as unknown as HTMLInputElement;
      const name = target.name;

      if (target.form === null) return;

      handleChange((params) => {
        setInputAsAutocomplete(name, params);
        resetPagination(name, params);
        return params;
      });
    },
    onReset: (event: FormEvent<HTMLFormElement>) => {
      console.log(event);
    },
    onSubmit: (event: FormEvent<HTMLFormElement>) => {
      if (!redirectUrl) {
        event.preventDefault(); // prevent page refresh if user submits via "enter" key
        handleChange((params) => {
          return params;
        });
      }
    },
    action: redirectUrl ? `${redirectUrl}${query}` : '',
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
