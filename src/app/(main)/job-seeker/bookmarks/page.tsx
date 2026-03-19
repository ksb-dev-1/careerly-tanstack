import { Metadata } from "next";

import { Bookmarks } from "./bookmarks";

export const metadata: Metadata = {
  title: "Bookmarks - Careerly",
  description: "View and manage all your bookmarks.",
};

export default function BookmarksPage() {
  return (
    <div className="min-h-screen max-w-custom w-full mx-auto mt-32 mb-16 px-4">
      <Bookmarks />
    </div>
  );
}

// ---------------------------------------------------------------------------
// import { Suspense } from "react";

// import { cookies } from "next/headers";

// import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
// import { Metadata } from "next";

// import { JobListSkeleton } from "@/components/skeletons/job-list-skeleton";
// import { getTanstackQueryClient } from "@/lib/getTanstackQueryClient";

// import { Bookmarks } from "./bookmarks";

// export const metadata: Metadata = {
//   title: "Bookmarks - Careerly",
//   description: "View and manage all your bookmarks.",
// };
// async function BookmarksContent() {
//   const queryClient = getTanstackQueryClient();
//   await queryClient.prefetchQuery({
//     queryKey: ["bookmarks"],
//     queryFn: async () => {
//       console.log("queryFn fired — cache miss, fetching from API");
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_APP_URL}/api/job-seeker/bookmarks`,
//         {
//           headers: {
//             cookie: cookies().toString(),
//           },
//         },
//       );
//       const body = await res.json();
//       if (!body.success) {
//         throw { status: res.status, message: body.error };
//       }
//       return body;
//     },
//   });
//   return (
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       <div className="min-h-screen max-w-custom w-full mx-auto mt-32 mb-16 px-4">
//         <Bookmarks />
//       </div>
//     </HydrationBoundary>
//   );
// }

// export default function BookmarksPage() {
//   return (
//     <div className="min-h-screen max-w-custom w-full mx-auto mt-32 mb-16 px-4">
//       <Suspense fallback={<JobListSkeleton />}>
//         <BookmarksContent />
//       </Suspense>
//     </div>
//   );
// }

// -------------------------------------------------------------------------------------------
// import { Suspense } from "react";

// import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
// import { Metadata } from "next";

// import { JobListSkeleton } from "@/components/skeletons/job-list-skeleton";
// import { getServerSession } from "@/lib/get-server-session";
// import { getTanstackQueryClient } from "@/lib/getTanstackQueryClient";
// import { fetchBookmarks } from "@/lib/job-seeker/fetch-bookmarks";
// import { BookmarksApiResponse } from "@/types/api";

// import { Bookmarks } from "./bookmarks";

// export const metadata: Metadata = {
//   title: "Bookmarks - Careerly",
//   description: "View and manage all your bookmarks.",
// };

// async function BookmarksContent() {
//   const session = await getServerSession();
//   const queryClient = getTanstackQueryClient();

//   if (session?.user?.id) {
//     await queryClient.prefetchQuery({
//       queryKey: ["bookmarks"],
//       queryFn: async () => {
//         console.log("queryFn fired — cache miss, fetching from API");
//         const bookmarks = await fetchBookmarks(session.user.id);

//         // wrap it to match exactly what useQuery expects
//         return { success: true, bookmarks } satisfies BookmarksApiResponse;
//       },
//     });
//   }

//   return (
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       <div className="min-h-screen max-w-custom w-full mx-auto mt-32 mb-16 px-4">
//         <Bookmarks />
//       </div>
//     </HydrationBoundary>
//   );
// }

// export default function BookmarksPage() {
//   return (
//     <div className="min-h-screen max-w-custom w-full mx-auto mt-32 mb-16 px-4">
//       <Suspense fallback={<JobListSkeleton />}>
//         <BookmarksContent />
//       </Suspense>
//     </div>
//   );
// }
