type SearchParamsLike = {
  forEach(callback: (value: string, key: string) => void): void;
};

export type QueryValue = string | string[] | number | boolean | null | undefined;
export type Query = Record<string, QueryValue>;

export const getQueryValue = (
  searchParams: { get(key: string): string | null },
  key: string
) =>
  searchParams.get(key) || '';

export const getQueryObject = (searchParams: SearchParamsLike): Query => {
  const query: Query = {};

  searchParams.forEach((value, key) => {
    const currentValue = query[key];

    if (Array.isArray(currentValue)) {
      currentValue.push(value);
    } else if (typeof currentValue === 'string') {
      query[key] = [currentValue, value];
    } else {
      query[key] = value;
    }
  });

  return query;
};

export const getPathSegments = (
  value: string | string[] | undefined
): string[] => {
  if (!value) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
};

export const buildUrl = (pathname: string, query: Query = {}) => {
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => params.append(key, String(item)));
      return;
    }

    params.set(key, String(value));
  });

  const queryString = params.toString();
  return `${pathname}${queryString ? `?${queryString}` : ''}`;
};
