import { isServer, QueryClient } from "@tanstack/react-query";

function makeTanstackQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // staleTime: Infinity, // never becomes stale
        // gcTime: Infinity, // never garbage collected
        // refetchOnWindowFocus: false, // no refetch on tab focus
        // refetchOnMount: false, // no refetch on remount
        // refetchOnReconnect: false, // no refetch on reconnect

        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
        refetchOnWindowFocus: false,
        refetchOnMount: true, // ← Enable this
        refetchOnReconnect: true,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getTanstackQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeTanstackQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeTanstackQueryClient();
    return browserQueryClient;
  }
}
