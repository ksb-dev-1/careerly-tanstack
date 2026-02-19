// "use client";

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: Infinity, // never becomes stale
//       gcTime: Infinity, // never garbage collected
//       refetchOnWindowFocus: false, // no refetch on tab focus
//       refetchOnMount: false, // no refetch on remount
//       refetchOnReconnect: false, // no refetch on reconnect
//     },
//   },
// });

// export function TanstackProvider({ children }: { children: React.ReactNode }) {
//   return (
//     <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//   );
// }

"use client";

// External libraries
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Absolute imports
import { getTanstackQueryClient } from "@/lib/getTanstackQueryClient";

export function TanstackProvider({ children }: { children: React.ReactNode }) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getTanstackQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
