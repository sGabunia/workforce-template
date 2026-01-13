import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 1
    }
  }
});

export async function getCachedQuery<T>({
  queryKey,
  queryFn
}: {
  queryKey: unknown[];
  queryFn: () => Promise<T>;
}): Promise<T> {
  let result = queryClient.getQueryData<T>(queryKey);

  if (!result) {
    result = await queryFn();
    queryClient.setQueryData(queryKey, result);
  }

  return result;
}

export function invalidateCache(queryKey: unknown[]) {
  queryClient.removeQueries({ queryKey });
}
