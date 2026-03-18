// "use client";

// import { useEffect, useState } from "react";

// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { Bookmark, BookmarkCheck } from "lucide-react";
// import { toast } from "sonner";

// import {
//   ToggleBookmark,
//   ToggleBookmarkActionError,
// } from "@/actions/job-seeker/toggle-bookmark";
// import { useClientSession } from "@/hooks/useClientSession";
// import { cn } from "@/lib/utils";

// import { Spinner } from "./spinner";

// interface BookmarkButtonProps {
//   jobId: string;
//   isBookmarked?: boolean;
//   className?: string;
// }

// export function BookmarkButton({
//   jobId,
//   isBookmarked,
//   className,
// }: BookmarkButtonProps) {
//   const [bookmarked, setBookmarked] = useState(isBookmarked);
//   const { data: session, isPending } = useClientSession();
//   const jobSeekerId = session?.user.id;
//   const queryClient = useQueryClient();

//   useEffect(() => {
//     setBookmarked(isBookmarked);
//   }, [isBookmarked]);

//   // Apply for job tanstack mutation
//   const { isPending: isMutating, mutate } = useMutation({
//     mutationFn: async () => {
//       if (!jobSeekerId) throw new Error("Authentication required");

//       return ToggleBookmark(jobId);
//     },

//     onSuccess: (response) => {
//       if (response.success) {
//         setBookmarked(response.success ? !bookmarked : bookmarked);
//         toast.success(response.message);
//         queryClient.invalidateQueries({ queryKey: ["jobs"] });
//         queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
//       } else {
//         toast.error(response.message);
//       }
//     },

//     onError: (error: ToggleBookmarkActionError) => {
//       toast.error(error.message);
//     },
//   });

//   // Handle job apply
//   const handleToggleBookmark = () => {
//     mutate();
//   };

//   const loading = isMutating || isPending;

//   return (
//     <button
//       type="button"
//       className={cn("text-brand", className)}
//       aria-label={`${bookmarked ? "remove from bookmarks" : "add to bookmarks"}`}
//       disabled={loading}
//       onClick={handleToggleBookmark}
//     >
//       {loading ? (
//         <Spinner size={20} color="text-brand" />
//       ) : bookmarked ? (
//         <BookmarkCheck size={20} />
//       ) : (
//         <Bookmark size={20} />
//       )}
//     </button>
//   );
// }

// ------------------------------------------------------------------------

// "use client";

// import { useEffect, useState } from "react";

// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { Bookmark, BookmarkCheck } from "lucide-react";
// import { toast } from "sonner";

// import {
//   ToggleBookmark,
//   ToggleBookmarkActionError,
// } from "@/actions/job-seeker/toggle-bookmark";
// import { useClientSession } from "@/hooks/useClientSession";
// import { cn } from "@/lib/utils";

// import { Spinner } from "./spinner";

// interface BookmarkButtonProps {
//   jobId: string;
//   isBookmarked?: boolean;
//   className?: string;
// }

// export function BookmarkButton({
//   jobId,
//   isBookmarked,
//   className,
// }: BookmarkButtonProps) {
//   const [bookmarked, setBookmarked] = useState(isBookmarked);
//   const { data: session, isPending } = useClientSession();
//   const jobSeekerId = session?.user.id;
//   const queryClient = useQueryClient();

//   // sync with server prop
//   useEffect(() => {
//     setBookmarked(isBookmarked);
//   }, [isBookmarked]);

//   const { mutate } = useMutation({
//     mutationFn: async () => {
//       if (!jobSeekerId) throw new Error("Authentication required");
//       return ToggleBookmark(jobId);
//     },

//     // 🔥 OPTIMISTIC UPDATE
//     onMutate: async () => {
//       await queryClient.cancelQueries({ queryKey: ["jobs"] });

//       const previousBookmarked = bookmarked;

//       // instant UI update
//       setBookmarked((prev) => !prev);

//       return { previousBookmarked };
//     },

//     // ❌ rollback if API fails
//     onError: (error: ToggleBookmarkActionError, _, context) => {
//       if (context?.previousBookmarked !== undefined) {
//         setBookmarked(context.previousBookmarked);
//       }
//       toast.error(error.message);
//     },

//     // ✅ show result (no UI toggle here!)
//     onSuccess: (response) => {
//       if (!response.success) {
//         toast.error(response.message);
//       } else {
//         toast.success(response.message);
//       }
//     },

//     // 🔄 ensure data consistency
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: ["jobs"] });
//     },
//   });

//   const handleToggleBookmark = () => {
//     mutate();
//   };

//   const loading = isPending;

//   return (
//     <button
//       type="button"
//       className={cn("text-brand", className)}
//       aria-label={bookmarked ? "remove from bookmarks" : "add to bookmarks"}
//       disabled={loading}
//       onClick={handleToggleBookmark}
//     >
//       {loading ? (
//         <Spinner size={20} color="text-brand" />
//       ) : bookmarked ? (
//         <BookmarkCheck size={20} />
//       ) : (
//         <Bookmark size={20} />
//       )}
//     </button>
//   );
// }

// ------------------------------------------------------------------------

// "use client";

// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { Bookmark, BookmarkCheck } from "lucide-react";
// import { toast } from "sonner";

// import {
//   ToggleBookmark,
//   ToggleBookmarkActionError,
// } from "@/actions/job-seeker/toggle-bookmark";
// import { useClientSession } from "@/hooks/useClientSession";
// import { cn } from "@/lib/utils";

// import { Spinner } from "./spinner";

// interface BookmarkButtonProps {
//   jobId: string;
//   isBookmarked?: boolean; // comes from query
//   className?: string;
// }

// export function BookmarkButton({
//   jobId,
//   isBookmarked,
//   className,
// }: BookmarkButtonProps) {
//   const { data: session, isPending } = useClientSession();
//   const jobSeekerId = session?.user.id;
//   const queryClient = useQueryClient();

//   const { isPending: isMutating, mutate } = useMutation({
//     mutationFn: async () => {
//       if (!jobSeekerId) throw new Error("Authentication required");
//       return ToggleBookmark(jobId);
//     },

//     // 🔥 OPTIMISTIC CACHE UPDATE
//     onMutate: async () => {
//       await queryClient.cancelQueries({ queryKey: ["jobs"] });

//       const previousJobs = queryClient.getQueryData(["jobs"]);

//       // update all jobs in cache
//       queryClient.setQueryData(["jobs"], (old: any) => {
//         if (!old) return old;

//         return old.map((job: any) =>
//           job.id === jobId
//             ? { ...job, isBookmarked: !job.isBookmarked }
//             : job
//         );
//       });

//       return { previousJobs };
//     },

//     // ❌ rollback
//     onError: (error: ToggleBookmarkActionError, _, context) => {
//       if (context?.previousJobs) {
//         queryClient.setQueryData(["jobs"], context.previousJobs);
//       }
//       toast.error(error.message);
//     },

//     // ✅ success feedback
//     onSuccess: (response) => {
//       if (!response.success) {
//         toast.error(response.message);
//       } else {
//         toast.success(response.message);
//       }
//     },

//     // 🔄 final sync
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: ["jobs"] });
//     },
//   });

//   const loading = isMutating || isPending;

//   return (
//     <button
//       type="button"
//       className={cn("text-brand", className)}
//       aria-label={
//         isBookmarked ? "remove from bookmarks" : "add to bookmarks"
//       }
//       disabled={loading}
//       onClick={() => mutate()}
//     >
//       {loading ? (
//         <Spinner size={20} color="text-brand" />
//       ) : isBookmarked ? (
//         <BookmarkCheck size={20} />
//       ) : (
//         <Bookmark size={20} />
//       )}
//     </button>
//   );
// }

// ------------------------------------------------------------------------

"use client";

import { useEffect, useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { toast } from "sonner";

import {
  ToggleBookmark,
  ToggleBookmarkActionError,
} from "@/actions/job-seeker/toggle-bookmark";
import { useClientSession } from "@/hooks/useClientSession";
import { cn } from "@/lib/utils";

import { Spinner } from "./spinner";

interface BookmarkButtonProps {
  jobId: string;
  isBookmarked?: boolean;
  className?: string;
}

export function BookmarkButton({
  jobId,
  isBookmarked,
  className,
}: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const { data: session, isPending } = useClientSession();
  const jobSeekerId = session?.user.id;
  const queryClient = useQueryClient();

  useEffect(() => {
    setBookmarked(isBookmarked);
  }, [isBookmarked]);

  const { mutate, isPending: isMutating } = useMutation({
    mutationFn: async () => {
      if (!jobSeekerId) throw new Error("Authentication required");
      return ToggleBookmark(jobId);
    },

    // 🔥 Optimistic update
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["jobs"] });
      await queryClient.cancelQueries({ queryKey: ["bookmarks"] });

      const previousJobs = queryClient.getQueryData(["jobs"]);
      const previousBookmarks = queryClient.getQueryData(["bookmarks"]);

      const previousBookmarked = bookmarked;

      // instant UI
      setBookmarked((prev) => !prev);

      // update jobs cache
      queryClient.setQueryData(["jobs"], (old: any) => {
        if (!old) return old;

        return old.map((job: any) =>
          job.id === jobId ? { ...job, isBookmarked: !job.isBookmarked } : job,
        );
      });

      // update bookmarks cache
      queryClient.setQueryData(["bookmarks"], (old: any) => {
        if (!old) return old;

        const exists = old.bookmarks?.some((job: any) => job.id === jobId);

        if (exists) {
          return {
            ...old,
            bookmarks: old.bookmarks.filter((job: any) => job.id !== jobId),
          };
        }

        return old;
      });

      return { previousJobs, previousBookmarks, previousBookmarked };
    },

    // rollback if error
    onError: (error: ToggleBookmarkActionError, _, context) => {
      if (context?.previousJobs) {
        queryClient.setQueryData(["jobs"], context.previousJobs);
      }

      if (context?.previousBookmarks) {
        queryClient.setQueryData(["bookmarks"], context.previousBookmarks);
      }

      if (context?.previousBookmarked !== undefined) {
        setBookmarked(context.previousBookmarked);
      }

      toast.error(error.message);
    },

    onSuccess: (response) => {
      if (!response.success) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
      }
    },

    // ensure final sync
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
  });

  const loading = isPending;

  return (
    <button
      type="button"
      className={cn("text-brand w-11 h-11", className)}
      aria-label={bookmarked ? "remove from bookmarks" : "add to bookmarks"}
      disabled={loading}
      onClick={() => mutate()}
    >
      {loading ? (
        <Spinner size={20} color="text-brand" />
      ) : bookmarked ? (
        <BookmarkCheck size={20} />
      ) : (
        <Bookmark size={20} />
      )}
    </button>
  );
}
