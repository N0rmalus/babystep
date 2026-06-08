import qs from 'query-string';

type QueryValue = string | number | boolean | null | undefined;
type QueryParams = Record<string, QueryValue>;

type ApiGetOptions = Omit<RequestInit, 'method' | 'body'> & {
  query?: QueryParams;
};

const DEFAULT_FETCH_CACHE: RequestCache = 'no-store';

export class ApiGetError extends Error {
  readonly path: string;
  readonly status: number;

  constructor(path: string, status: number) {
    super(`GET ${path} failed with status ${status}`);
    this.name = 'ApiGetError';
    this.path = path;
    this.status = status;
  }
}

export const isApiNotFoundError = (error: unknown) => error instanceof ApiGetError && error.status === 404;

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
  const { query, cache, next, ...init } = options;
  const url = buildApiUrl(path, query);
  const requestInit = {
    ...init,
    ...(next ? { next } : { cache: cache ?? DEFAULT_FETCH_CACHE }),
  };

  const response = await fetch(url, {
    ...requestInit,
  });

  if (!response.ok) {
    throw new ApiGetError(path, response.status);
  }

  return response.json() as Promise<T>;
};
