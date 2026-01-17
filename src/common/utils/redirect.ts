export function getRedirectUrlWithParams(request: Request, basePath: string): string {
  const url = new URL(request.url);
  const searchParams = url.searchParams.toString();
  return searchParams ? `${basePath}?${searchParams}` : basePath;
}
