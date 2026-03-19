import { QueryClient, isServer } from "@tanstack/react-query";

function makeTanstackQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        gcTime: Infinity,
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

// staleTime: Infinity, // never becomes stale
// gcTime: Infinity, // never garbage collected
// refetchOnWindowFocus: false, // no refetch on tab focus
// refetchOnMount: false, // no refetch on remount
// refetchOnReconnect: false, // no refetch on reconnect
