export const fetchers = new Set<() => any>();

function addFetcher(f: () => any) {
  fetchers.add(f);
}

function removeFetcher(f: () => any) {
  fetchers.delete(f);
}

export const useRealtimeRefetch = () => [addFetcher, removeFetcher];
