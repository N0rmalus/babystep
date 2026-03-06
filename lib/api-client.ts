import qs from 'query-string';

type QueryValue = string | number | boolean | null | undefined;
type QueryParams = Record<string, QueryValue>;

type ApiGetOptions = Omit<RequestInit, 'method' | 'body'> & {
  query?: QueryParams;
};

const DEFAULT_CACHE: RequestCache = 'no-store';

const getApiBaseUrl = () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiBaseUrl) {
    throw new Error('NEXT_PUBLIC_API_URL is not set');
  }

  return apiBaseUrl.replace(/\/$/, '');
};

const buildApiUrl = (path: string, query?: QueryParams) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return qs.stringifyUrl({
    url: `${getApiBaseUrl()}${normalizedPath}`,
    query,
  });
};

export const apiGet = async <T>(path: string, options: ApiGetOptions = {}) => {
  const { query, cache = DEFAULT_CACHE, ...init } = options;
  const url = buildApiUrl(path, query);

  const response = await fetch(url, {
    ...init,
    cache,
  });

  if (!response.ok) {
    throw new Error(`GET ${path} failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
};
