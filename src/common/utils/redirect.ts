export function getRedirectUrlWithParams(request: Request, basePath: string): string {
  const url = new URL(request.url);
  const searchParams = url.searchParams.toString();
  return searchParams ? `${basePath}?${searchParams}` : basePath;
}

/**
 * Redirect to the first page while preserving other query parameters (search, sort, filters, etc.)
 * Use this after creating a new record to show it at the top of the list.
 */
export function getRedirectUrlToFirstPage(request: Request, basePath: string): string {
  const url = new URL(request.url);

  // Remove the page parameter to go to page 1
  url.searchParams.delete('page');

  const searchParams = url.searchParams.toString();
  return searchParams ? `${basePath}?${searchParams}` : basePath;
}

interface SmartRedirectOptions {
  itemsDeleted?: number;
  itemsPerPage: number;
  totalCount: number;
}

/**
 * Calculate the appropriate page to redirect to after deletion.
 * If the current page becomes empty after deletion, navigates to the previous page or page 1.
 */
export function getRedirectUrlAfterDeletion(
  request: Request,
  basePath: string,
  options: SmartRedirectOptions
): string {
  const { totalCount, itemsPerPage, itemsDeleted = 1 } = options;
  const url = new URL(request.url);
  const currentPage = Number.parseInt(url.searchParams.get('page') || '1', 10);

  // Calculate new total count after deletion
  const newTotalCount = totalCount - itemsDeleted;

  // Calculate total pages after deletion
  const newTotalPages = Math.ceil(newTotalCount / itemsPerPage);

  // If current page is now beyond the last page, redirect to the last available page
  let targetPage = currentPage;
  if (currentPage > newTotalPages && newTotalPages > 0) {
    targetPage = newTotalPages;
  } else if (newTotalPages === 0) {
    targetPage = 1;
  }

  // Update or remove the page parameter
  if (targetPage === 1) {
    url.searchParams.delete('page');
  } else {
    url.searchParams.set('page', targetPage.toString());
  }

  const searchParams = url.searchParams.toString();
  return searchParams ? `${basePath}?${searchParams}` : basePath;
}
