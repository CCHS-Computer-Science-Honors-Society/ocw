export interface SearchParams {
  search?: string;
  pgs?: string;
  page?: string;
}

export function parseSearchParams(
  params: Record<string, string | string[] | undefined>,
): SearchParams {
  return {
    search: typeof params.search === "string" ? params.search : undefined,
    pgs: Array.isArray(params.pgs) ? params.pgs[0] : params.pgs,
    page: typeof params.page === "string" ? params.page : undefined,
  };
}

export function stringifySearchParams(params: SearchParams): string {
  const urlParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      urlParams.append(key, value);
    }
  });
  return urlParams.toString();
}
